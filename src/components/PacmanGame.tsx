'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Pause, Play, RotateCcw } from 'lucide-react';

/**
 * Classic Pac-Man with 4 ghosts and authentic targeting AI:
 *   Blinky (red)   — chase: targets Pac-Man's tile directly.
 *   Pinky  (pink)  — chase: targets 4 tiles ahead of Pac-Man.
 *   Inky   (cyan)  — chase: (Blinky's tile + 2-tiles-ahead) vector flipped from Pac-Man.
 *   Clyde  (orange)— chase: targets Pac-Man if far, scatters home if close (<8 tiles).
 *
 * Rendering is a single <canvas> — walls are pre-baked to an offscreen layer,
 * entities are interpolated between sim ticks for smooth 60fps motion over a
 * ~7fps logic tick.
 *
 * Controls (all devices):
 *   • Arrow keys / WASD  — steer (only while the board is focused).
 *   • Swipe on the board — steer (touch).
 *   • On-screen D-pad    — steer + pause/restart.
 *   • Space / Esc        — pause / resume.  Enter — start / restart.
 *
 * Quality: responsive cell size, auto-pause when scrolled off-screen or tab
 * hidden, persistent high score, endless levels with speed ramp, arcade
 * 200/400/800/1600 fright-combo scoring, theme-reactive colors, and
 * prefers-reduced-motion support.
 */

const COLS = 21;
const ROWS = 23;
const BASE_TICK_MS = 140;
const FRIGHT_MS = 6000;
const HI_KEY = 'portfolio.pacman.hi';

const MODE_SCHEDULE: { mode: 'scatter' | 'chase'; ms: number }[] = [
  { mode: 'scatter', ms: 5000 },
  { mode: 'chase',   ms: 20000 },
  { mode: 'scatter', ms: 5000 },
  { mode: 'chase',   ms: 20000 },
  { mode: 'scatter', ms: 5000 },
  { mode: 'chase',   ms: Infinity },
];

// 21 chars wide, 23 rows tall. Symmetric. Two horizontal tunnels.
const MAZE: string[] = [
  '#####################',
  '#.........#.........#',
  '#o###.###.#.###.###o#',
  '#.###.###.#.###.###.#',
  '#...................#',
  '#.###.#.#####.#.###.#',
  '#.....#...#...#.....#',
  '#####.#       #.#####',
  '    #.####-####.#    ',
  '#####.###   ###.#####',
  'T....   #   #   ....T',
  '#####.# ##### #.#####',
  '    #.#       #.#    ',
  '#####.# ##### #.#####',
  '#.........#.........#',
  '#.###.###.#.###.###.#',
  '#o..#.....P.....#..o#',
  '###.#.#.#####.#.#.###',
  '#.....#...#...#.....#',
  '#.#######.#.#######.#',
  '#.#.....#...#.....#.#',
  '#...###.#####.###...#',
  '#####################',
];

type Dir = 'up' | 'down' | 'left' | 'right';
type Status = 'idle' | 'playing' | 'paused' | 'gameover';

const DIR_VEC: Record<Dir, [number, number]> = {
  up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0],
};
const OPPOSITE: Record<Dir, Dir> = { up: 'down', down: 'up', left: 'right', right: 'left' };
const DIR_ROT: Record<Dir, number> = { right: 0, down: Math.PI / 2, left: Math.PI, up: -Math.PI / 2 };

interface Entity { x: number; y: number; px: number; py: number; dir: Dir; }
interface GhostState extends Entity {
  name: 'blinky' | 'pinky' | 'inky' | 'clyde';
  color: string;
  scatterTarget: [number, number];
  housed: boolean;   // still in the ghost house
  eaten: boolean;    // eyes returning to the house
  releaseAt: number; // clock ms at which it leaves the house
}

interface GameState {
  pac: Entity;
  nextDir: Dir | null;
  ghosts: GhostState[];
  dots: Set<string>;
  power: Set<string>;
  score: number;
  lives: number;
  level: number;
  clock: number;          // sim time, only advances while playing
  tickMs: number;
  frame: number;
  frightenedUntil: number; // clock ms
  frightCombo: number;
  lastStepWall: number;    // performance.now() of last sim step (for interpolation)
  freezeUntilWall: number; // wall-clock gate: death pause
  bannerUntilWall: number; // wall-clock gate: "LEVEL n" banner
  autoPaused: boolean;     // paused by scroll/visibility, eligible for auto-resume
}

interface Colors {
  primaryRaw: string; fgRaw: string; mutedRaw: string; bgRaw: string; borderRaw: string;
}

// ---------------------------------------------------------------------------
// Maze parsing + geometry
// ---------------------------------------------------------------------------

function parseMaze() {
  const walls = new Set<string>();
  const dots = new Set<string>();
  const power = new Set<string>();
  const tunnel = new Set<string>();
  const door = new Set<string>();
  let pacSpawn: [number, number] = [10, 16];
  let ghostSpawn: [number, number] = [10, 9];
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const c = MAZE[y][x];
      const key = `${x},${y}`;
      if (c === '#') walls.add(key);
      else if (c === '.') dots.add(key);
      else if (c === 'o') power.add(key);
      else if (c === 'T') tunnel.add(key);
      else if (c === '-') { walls.add(key); door.add(key); } // ghost-house gate: solid for pac + normal ghosts
      else if (c === 'P') pacSpawn = [x, y];
      else if (c === 'G') ghostSpawn = [x, y];
    }
  }
  return { walls, dots, power, tunnel, door, pacSpawn, ghostSpawn };
}

const PARSED = parseMaze();

// Ghost-house waypoints derived from the spawn tile.
const HOUSE_EXIT: [number, number] = [PARSED.ghostSpawn[0], PARSED.ghostSpawn[1] - 2]; // just above the gate
const HOUSE_INSIDE: [number, number] = [PARSED.ghostSpawn[0], PARSED.ghostSpawn[1]];   // top-center of the house

function isWall(x: number, y: number): boolean {
  if (y < 0 || y >= ROWS) return true;
  if (x < 0 || x >= COLS) return false; // tunnel wrap horizontally
  return PARSED.walls.has(`${x},${y}`);
}

function wrap(x: number, y: number): [number, number] {
  if (x < 0) return [COLS - 1, y];
  if (x >= COLS) return [0, y];
  return [x, y];
}

function tryMove(x: number, y: number, dir: Dir): [number, number] | null {
  const [dx, dy] = DIR_VEC[dir];
  const [nx, ny] = wrap(x + dx, y + dy);
  if (isWall(nx, ny)) return null;
  return [nx, ny];
}

function distSq(a: [number, number], b: [number, number]): number {
  const dx = a[0] - b[0]; const dy = a[1] - b[1];
  return dx * dx + dy * dy;
}

function legalDirs(x: number, y: number, dir: Dir): Dir[] {
  const dirs: Dir[] = ['up', 'left', 'down', 'right']; // arcade tie-break order
  return dirs.filter(d => d !== OPPOSITE[dir] && tryMove(x, y, d) !== null);
}

function pickGhostDir(g: GhostState, target: [number, number], frightened: boolean): Dir {
  const options = legalDirs(g.x, g.y, g.dir);
  if (options.length === 0) return OPPOSITE[g.dir];
  if (frightened) return options[Math.floor(Math.random() * options.length)];
  let best = options[0];
  let bestD = Infinity;
  for (const d of options) {
    const [nx, ny] = tryMove(g.x, g.y, d)!;
    const dd = distSq([nx, ny], target);
    if (dd < bestD) { bestD = dd; best = d; }
  }
  return best;
}

function chaseTarget(name: GhostState['name'], pac: Entity, blinky: GhostState | null): [number, number] {
  if (name === 'blinky') return [pac.x, pac.y];
  if (name === 'pinky') {
    const [dx, dy] = DIR_VEC[pac.dir];
    return [pac.x + dx * 4, pac.y + dy * 4];
  }
  if (name === 'inky') {
    const [dx, dy] = DIR_VEC[pac.dir];
    const ahead: [number, number] = [pac.x + dx * 2, pac.y + dy * 2];
    if (!blinky) return ahead;
    return [ahead[0] + (ahead[0] - blinky.x), ahead[1] + (ahead[1] - blinky.y)];
  }
  const dist = Math.sqrt(distSq([pac.x, pac.y], [10, 22]));
  return dist > 8 ? [pac.x, pac.y] : [0, 22];
}

// ---------------------------------------------------------------------------
// Fresh state
// ---------------------------------------------------------------------------

function mkGhosts(clock: number, staggered: boolean): GhostState[] {
  const [gx, gy] = PARSED.ghostSpawn;
  const rel = staggered ? [0, 2000, 5000, 8000] : [0, 1500, 3500, 6000];
  const base = (x: number, y: number) => ({ x, y, px: x, py: y });
  return [
    { ...base(gx, gy - 2), name: 'blinky', color: '#ff4136', dir: 'left', scatterTarget: [COLS - 1, 0],        housed: false, eaten: false, releaseAt: clock + rel[0] },
    { ...base(gx, gy),     name: 'pinky',  color: '#ff8ad0', dir: 'down', scatterTarget: [0, 0],               housed: true,  eaten: false, releaseAt: clock + rel[1] },
    { ...base(gx - 1, gy), name: 'inky',   color: '#2ee6ff', dir: 'up',   scatterTarget: [COLS - 1, ROWS - 1], housed: true,  eaten: false, releaseAt: clock + rel[2] },
    { ...base(gx + 1, gy), name: 'clyde',  color: '#ffb14e', dir: 'up',   scatterTarget: [0, ROWS - 1],        housed: true,  eaten: false, releaseAt: clock + rel[3] },
  ];
}

function mkPac(): Entity {
  const [x, y] = PARSED.pacSpawn;
  return { x, y, px: x, py: y, dir: 'left' };
}

function createGame(): GameState {
  return {
    pac: mkPac(),
    nextDir: null,
    ghosts: mkGhosts(0, true),
    dots: new Set(PARSED.dots),
    power: new Set(PARSED.power),
    score: 0,
    lives: 3,
    level: 1,
    clock: 0,
    tickMs: BASE_TICK_MS,
    frame: 0,
    frightenedUntil: 0,
    frightCombo: 0,
    lastStepWall: 0,
    freezeUntilWall: 0,
    bannerUntilWall: 0,
    autoPaused: false,
  };
}

function currentMode(clock: number): 'scatter' | 'chase' {
  let acc = 0;
  for (const entry of MODE_SCHEDULE) {
    acc += entry.ms;
    if (clock < acc) return entry.mode;
  }
  return 'chase';
}

function loadHi(): number {
  try {
    const v = window.localStorage.getItem(HI_KEY);
    return v ? Math.max(0, parseInt(v, 10) || 0) : 0;
  } catch { return 0; }
}
function saveHi(v: number) {
  try { window.localStorage.setItem(HI_KEY, String(v)); } catch { /* ignore */ }
}
function buzz(pattern: number | number[]) {
  try { navigator.vibrate?.(pattern); } catch { /* ignore */ }
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

function buildWallLayer(cell: number, c: Colors): HTMLCanvasElement {
  const cv = document.createElement('canvas');
  cv.width = COLS * cell;
  cv.height = ROWS * cell;
  const ctx = cv.getContext('2d')!;
  ctx.fillStyle = `hsl(${c.primaryRaw} / 0.14)`;
  ctx.strokeStyle = `hsl(${c.primaryRaw} / 0.34)`;
  ctx.lineWidth = 1;
  for (const k of PARSED.walls) {
    if (PARSED.door.has(k)) continue; // leave a visible gap at the gate
    const [x, y] = k.split(',').map(Number);
    const px = x * cell;
    const py = y * cell;
    ctx.fillRect(px, py, cell, cell);
    ctx.strokeRect(px + 0.5, py + 0.5, cell - 1, cell - 1);
  }
  return cv;
}

function screenPos(e: Entity, t: number): [number, number] {
  let sx = e.px + (e.x - e.px) * t;
  let sy = e.py + (e.y - e.py) * t;
  if (Math.abs(e.x - e.px) > 1) sx = e.x; // tunnel wrap — don't lerp across the board
  if (Math.abs(e.y - e.py) > 1) sy = e.y;
  return [sx, sy];
}

function drawGhost(
  ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number,
  g: GhostState, gs: GameState, reduced: boolean, now: number,
) {
  const [dvx, dvy] = DIR_VEC[g.dir];
  const ex = r * 0.4;
  const eyeY = -r * 0.05;
  const eyeR = r * 0.32;

  if (!g.eaten) {
    // body colour: frightened (with end-of-fright blink), else identity colour
    let fill = g.color;
    if (gs.frightenedUntil > gs.clock) {
      const remain = gs.frightenedUntil - gs.clock;
      const blink = remain < 1800 && Math.floor(now / 220) % 2 === 0;
      fill = blink ? '#f4f4ff' : '#2b3aff';
    }
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.arc(cx, cy - r * 0.08, r, Math.PI, 0);
    ctx.lineTo(cx + r, cy + r * 0.72);
    const feet = 3;
    const w = (2 * r) / feet;
    for (let i = 0; i < feet; i++) {
      const x0 = cx + r - i * w;
      ctx.lineTo(x0 - w * 0.5, cy + r * 0.44);
      ctx.lineTo(x0 - w, cy + r * 0.72);
    }
    ctx.closePath();
    ctx.fill();
  }

  // eyes (always — eaten ghosts are just eyes gliding home)
  for (const s of [-1, 1]) {
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(cx + s * ex, cy + eyeY, eyeR * 0.78, eyeR, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#1a1a2e';
    ctx.beginPath();
    ctx.arc(cx + s * ex + dvx * eyeR * 0.42, cy + eyeY + dvy * eyeR * 0.42, eyeR * 0.46, 0, Math.PI * 2);
    ctx.fill();
  }
  void reduced;
}

function render(
  gs: GameState, canvas: HTMLCanvasElement | null, cell: number,
  c: Colors | null, status: Status, reduced: boolean, hi: number,
  wallLayer: { canvas: HTMLCanvasElement; key: string } | null,
): { canvas: HTMLCanvasElement; key: string } | null {
  if (!canvas || !c) return wallLayer;
  const ctx = canvas.getContext('2d');
  if (!ctx) return wallLayer;

  const boardW = COLS * cell;
  const boardH = ROWS * cell;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  if (canvas.width !== Math.round(boardW * dpr) || canvas.height !== Math.round(boardH * dpr)) {
    canvas.width = Math.round(boardW * dpr);
    canvas.height = Math.round(boardH * dpr);
    canvas.style.width = `${boardW}px`;
    canvas.style.height = `${boardH}px`;
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, boardW, boardH);

  // wall layer cache (rebuilt on cell-size or theme change)
  const wantKey = `${cell}|${c.primaryRaw}`;
  let layer = wallLayer;
  if (!layer || layer.key !== wantKey) {
    layer = { canvas: buildWallLayer(cell, c), key: wantKey };
  }
  ctx.drawImage(layer.canvas, 0, 0, boardW, boardH);

  const now = performance.now();
  let t = 1;
  if (status === 'playing' && gs.lastStepWall && now >= gs.freezeUntilWall) {
    t = Math.min(1, (now - gs.lastStepWall) / gs.tickMs);
  }
  if (reduced) t = 1;

  // dots
  ctx.fillStyle = `hsl(${c.fgRaw} / 0.7)`;
  const dr = Math.max(1, cell * 0.09);
  for (const k of gs.dots) {
    const [x, y] = k.split(',').map(Number);
    ctx.beginPath();
    ctx.arc(x * cell + cell / 2, y * cell + cell / 2, dr, 0, Math.PI * 2);
    ctx.fill();
  }

  // power pellets
  const pulse = reduced ? 1 : 0.72 + 0.28 * Math.sin(now / 220);
  ctx.fillStyle = `hsl(${c.primaryRaw})`;
  for (const k of gs.power) {
    const [x, y] = k.split(',').map(Number);
    if (!reduced) { ctx.shadowColor = `hsl(${c.primaryRaw})`; ctx.shadowBlur = 8 * pulse; }
    ctx.beginPath();
    ctx.arc(x * cell + cell / 2, y * cell + cell / 2, cell * 0.26 * pulse, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.shadowBlur = 0;

  // pac-man
  {
    const [sx, sy] = screenPos(gs.pac, t);
    const cx = sx * cell + cell / 2;
    const cy = sy * cell + cell / 2;
    const r = cell * 0.46;
    const chomp = reduced || status !== 'playing' ? 0.22 : Math.abs(Math.sin(now / 70));
    const mouth = 0.02 * Math.PI + chomp * 0.3 * Math.PI;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(DIR_ROT[gs.pac.dir]);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, r, mouth, Math.PI * 2 - mouth);
    ctx.closePath();
    ctx.fillStyle = now < gs.freezeUntilWall ? `hsl(${c.mutedRaw})` : `hsl(${c.primaryRaw})`;
    ctx.fill();
    ctx.restore();
  }

  // ghosts
  for (const g of gs.ghosts) {
    const gt = g.eaten ? 1 : t;
    const [sx, sy] = screenPos(g, gt);
    let cy = sy * cell + cell / 2;
    if (g.housed && g.releaseAt > gs.clock && !g.eaten && !reduced) {
      cy += Math.sin(now / 260) * cell * 0.12; // idle bob in the house
    }
    drawGhost(ctx, sx * cell + cell / 2, cy, cell * 0.46, g, gs, reduced, now);
  }

  // banners / overlays
  const line = (text: string, sub?: string) => {
    ctx.save();
    ctx.fillStyle = `hsl(${c.bgRaw} / 0.78)`;
    ctx.fillRect(0, 0, boardW, boardH);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = `hsl(${c.fgRaw})`;
    ctx.font = `${Math.max(10, Math.round(cell * 0.62))}px ui-monospace, SFMono-Regular, Menlo, monospace`;
    ctx.fillText(text, boardW / 2, boardH / 2 - (sub ? cell * 0.5 : 0));
    if (sub) {
      ctx.fillStyle = `hsl(${c.mutedRaw})`;
      ctx.font = `${Math.max(8, Math.round(cell * 0.46))}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.fillText(sub, boardW / 2, boardH / 2 + cell * 0.7);
    }
    ctx.restore();
  };

  if (now < gs.bannerUntilWall) line(`LEVEL ${gs.level}`);
  else if (status === 'idle') line('PICK A DIRECTION', 'swipe · arrows · wasd');
  else if (status === 'paused') line('PAUSED', 'click or space to resume');
  else if (status === 'gameover') {
    line('GAME OVER', gs.score >= hi && gs.score > 0 ? `new best · ${gs.score}` : `${gs.score} pts · tap to retry`);
  }

  return layer;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface PacmanGameProps {
  /** Upper bound for one maze cell in px; the board scales down to fit its container. */
  cellSize?: number;
}

export default function PacmanGame({ cellSize = 16 }: PacmanGameProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [cell, setCell] = useState(cellSize);
  const [status, setStatus] = useState<Status>('idle');
  const [visible, setVisible] = useState(true);
  const [coarse, setCoarse] = useState(false); // touch-primary device → show the D-pad
  const [hud, setHud] = useState({ score: 0, lives: 3, level: 1 });
  const [highScore, setHighScore] = useState(0);

  const gRef = useRef<GameState>(createGame());
  const statusRef = useRef<Status>(status);
  const hudRef = useRef(hud);
  const hiRef = useRef(0);
  const colorsRef = useRef<Colors | null>(null);
  const reducedRef = useRef(false);
  const wallLayerRef = useRef<{ canvas: HTMLCanvasElement; key: string } | null>(null);
  const touchRef = useRef<{ x: number; y: number; t: number } | null>(null);
  const coarseRef = useRef(false);

  statusRef.current = status;
  hudRef.current = hud;
  coarseRef.current = coarse;

  const syncHud = useCallback(() => {
    const g = gRef.current;
    const h = hudRef.current;
    if (g.score !== h.score || g.lives !== h.lives || g.level !== h.level) {
      const next = { score: g.score, lives: g.lives, level: g.level };
      hudRef.current = next;
      setHud(next);
    }
  }, []);

  const endGame = useCallback(() => {
    const g = gRef.current;
    const hi = Math.max(hiRef.current, g.score);
    if (hi !== hiRef.current) { hiRef.current = hi; saveHi(hi); setHighScore(hi); }
    setStatus('gameover');
  }, []);

  // Rebuild a fresh game and wait — the round only begins once a direction is chosen.
  const resetGame = useCallback(() => {
    gRef.current = createGame();
    hudRef.current = { score: 0, lives: 3, level: 1 };
    setHud(hudRef.current);
    setStatus('idle');
  }, []);

  const setDir = useCallback((d: Dir) => {
    const st = statusRef.current;
    if (st === 'paused') return;
    if (st === 'gameover') {
      resetGame();
      gRef.current.nextDir = d;
      setStatus('playing');
      buzz(6);
      return;
    }
    gRef.current.nextDir = d;
    if (st === 'idle') setStatus('playing'); // first input starts the round
    if (!reducedRef.current) buzz(5);
  }, [resetGame]);

  const togglePause = useCallback(() => {
    const s = statusRef.current;
    if (s === 'playing') { gRef.current.autoPaused = false; setStatus('paused'); }
    else if (s === 'paused') setStatus('playing');
    else if (s === 'gameover') resetGame();
  }, [resetGame]);

  // ---- one simulation step (stable; all state via refs) --------------------
  const step = useCallback(() => {
    const g = gRef.current;
    const now = performance.now();

    // death pause / level banner: freeze the sim but keep interpolation calm
    if (now < g.freezeUntilWall || now < g.bannerUntilWall) {
      g.lastStepWall = now;
      return;
    }

    g.frame++;
    g.clock += g.tickMs;
    g.lastStepWall = now;

    // ---- Pac-Man ----
    g.pac.px = g.pac.x; g.pac.py = g.pac.y;
    let moved: [number, number] | null = null;
    if (g.nextDir && tryMove(g.pac.x, g.pac.y, g.nextDir)) {
      moved = tryMove(g.pac.x, g.pac.y, g.nextDir);
      g.pac.dir = g.nextDir;
    } else {
      moved = tryMove(g.pac.x, g.pac.y, g.pac.dir);
    }
    if (moved) { g.pac.x = moved[0]; g.pac.y = moved[1]; }

    const key = `${g.pac.x},${g.pac.y}`;
    if (g.dots.delete(key)) g.score += 10;
    if (g.power.delete(key)) {
      g.score += 50;
      g.frightenedUntil = g.clock + FRIGHT_MS;
      g.frightCombo = 0;
      for (const gh of g.ghosts) if (!gh.eaten && !gh.housed) gh.dir = OPPOSITE[gh.dir];
    }

    const frightened = g.frightenedUntil > g.clock;
    const mode = currentMode(g.clock);
    const blinky = g.ghosts.find(gh => gh.name === 'blinky') ?? null;

    // ---- Ghosts ----
    for (const gh of g.ghosts) {
      gh.px = gh.x; gh.py = gh.y;

      // eyes returning home — race to the gate, then drop through it
      if (gh.eaten) {
        for (let s = 0; s < 2; s++) {
          if (gh.x === HOUSE_EXIT[0] && gh.y === HOUSE_EXIT[1]) {
            gh.x = HOUSE_INSIDE[0]; gh.y = HOUSE_INSIDE[1];
            gh.eaten = false; gh.housed = true; gh.dir = 'up';
            gh.releaseAt = g.clock + 1200;
            break;
          }
          const d = pickGhostDir(gh, HOUSE_EXIT, false);
          const nxt = tryMove(gh.x, gh.y, d);
          if (!nxt) break;
          gh.x = nxt[0]; gh.y = nxt[1]; gh.dir = d;
        }
        continue;
      }

      // in the house, waiting
      if (gh.housed && g.clock < gh.releaseAt) continue;
      if (gh.housed && g.clock >= gh.releaseAt) {
        gh.housed = false;
        gh.x = HOUSE_EXIT[0]; gh.y = HOUSE_EXIT[1]; gh.px = gh.x; gh.py = gh.y;
        gh.dir = 'left';
        continue;
      }

      // frightened ghosts move at half speed
      if (frightened && g.frame % 2 === 0) continue;

      let target: [number, number];
      if (frightened) target = [Math.floor(Math.random() * COLS), Math.floor(Math.random() * ROWS)];
      else if (mode === 'scatter') target = gh.scatterTarget;
      else target = chaseTarget(gh.name, g.pac, blinky);

      const d = pickGhostDir(gh, target, frightened);
      const nxt = tryMove(gh.x, gh.y, d);
      if (nxt) { gh.x = nxt[0]; gh.y = nxt[1]; gh.dir = d; }
    }

    // ---- Collisions ----
    for (const gh of g.ghosts) {
      if (gh.x !== g.pac.x || gh.y !== g.pac.y || gh.housed) continue;
      if (gh.eaten) continue;
      if (frightened) {
        gh.eaten = true;
        const gain = 200 * Math.pow(2, Math.min(g.frightCombo, 3));
        g.score += gain;
        g.frightCombo++;
        buzz(18);
      } else {
        g.lives--;
        buzz([30, 40, 30]);
        if (g.lives <= 0) { endGame(); return; }
        g.pac = mkPac();
        g.nextDir = null;
        g.ghosts = mkGhosts(g.clock, false);
        g.frightenedUntil = 0;
        g.freezeUntilWall = now + 900;
        syncHud();
        return;
      }
    }

    // ---- Level clear ----
    if (g.dots.size === 0 && g.power.size === 0) {
      g.level++;
      g.tickMs = Math.max(75, BASE_TICK_MS - (g.level - 1) * 12);
      g.dots = new Set(PARSED.dots);
      g.power = new Set(PARSED.power);
      g.pac = mkPac();
      g.nextDir = null;
      g.ghosts = mkGhosts(g.clock, false);
      g.frightenedUntil = 0;
      g.frightCombo = 0;
      g.bannerUntilWall = now + 1400;
    }

    syncHud();
  }, [endGame, syncHud]);

  // ---- sim driver: self-scheduling timeout, reads live tickMs -------------
  useEffect(() => {
    if (status !== 'playing') return;
    let id: number;
    const run = () => { step(); id = window.setTimeout(run, gRef.current.tickMs); };
    id = window.setTimeout(run, gRef.current.tickMs);
    return () => window.clearTimeout(id);
  }, [status, step]);

  // ---- draw loop (paused when off-screen / tab hidden) -------------------
  useEffect(() => {
    if (!visible) {
      wallLayerRef.current = render(
        gRef.current, canvasRef.current, cell, colorsRef.current,
        statusRef.current, reducedRef.current, hiRef.current, wallLayerRef.current,
      );
      return;
    }
    let raf = 0;
    const draw = () => {
      wallLayerRef.current = render(
        gRef.current, canvasRef.current, cell, colorsRef.current,
        statusRef.current, reducedRef.current, hiRef.current, wallLayerRef.current,
      );
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [cell, visible]);

  // ---- responsive cell size --------------------------------------------
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      const avail = el.clientWidth || cellSize * COLS;
      const next = Math.max(10, Math.min(cellSize, Math.floor(avail / COLS)));
      setCell(prev => (prev === next ? prev : next));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [cellSize]);

  // ---- theme-reactive colours ----------------------------------------
  useEffect(() => {
    const read = () => {
      const cs = getComputedStyle(document.documentElement);
      const raw = (n: string) => cs.getPropertyValue(n).trim() || '0 0% 50%';
      colorsRef.current = {
        primaryRaw: raw('--primary'),
        fgRaw: raw('--foreground'),
        mutedRaw: raw('--muted-foreground'),
        bgRaw: raw('--background'),
        borderRaw: raw('--border'),
      };
    };
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class', 'style'] });
    return () => mo.disconnect();
  }, []);

  // ---- prefers-reduced-motion ---------------------------------------
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => { reducedRef.current = mq.matches; };
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  // ---- coarse (touch) pointer detection ----------------------------
  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    const apply = () => setCoarse(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  // ---- high score bootstrap ---------------------------------------
  useEffect(() => {
    const hi = loadHi();
    hiRef.current = hi;
    setHighScore(hi);
  }, []);

  // ---- auto-pause: scroll off-screen + tab hidden ----------------
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      const onScreen = entry.isIntersecting;
      setVisible(onScreen);
      if (!onScreen && statusRef.current === 'playing') {
        gRef.current.autoPaused = true;
        setStatus('paused');
      } else if (onScreen && statusRef.current === 'paused' && gRef.current.autoPaused && !document.hidden) {
        gRef.current.autoPaused = false;
        setStatus('playing');
      }
    }, { threshold: 0.35 });
    io.observe(el);

    const onVis = () => {
      if (document.hidden && statusRef.current === 'playing') {
        gRef.current.autoPaused = true;
        setStatus('paused');
      } else if (!document.hidden && statusRef.current === 'paused' && gRef.current.autoPaused) {
        gRef.current.autoPaused = false;
        setStatus('playing');
      }
    };
    document.addEventListener('visibilitychange', onVis);
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', onVis); };
  }, []);

  // ---- input: keyboard (scoped to the board, no window hijack) --------
  const onKeyDown = (e: React.KeyboardEvent) => {
    const k = e.key.toLowerCase();
    if (k === 'arrowup' || k === 'w') { e.preventDefault(); setDir('up'); }
    else if (k === 'arrowdown' || k === 's') { e.preventDefault(); setDir('down'); }
    else if (k === 'arrowleft' || k === 'a') { e.preventDefault(); setDir('left'); }
    else if (k === 'arrowright' || k === 'd') { e.preventDefault(); setDir('right'); }
    else if (k === ' ' || k === 'escape') { e.preventDefault(); togglePause(); }
    else if (k === 'enter') {
      e.preventDefault();
      if (statusRef.current === 'gameover') resetGame();
    }
  };

  // Desktop: clicking away from the board pauses the round.
  const onBlur = () => {
    if (!coarseRef.current && statusRef.current === 'playing') {
      gRef.current.autoPaused = false;
      setStatus('paused');
    }
  };

  // ---- input: swipe / tap on the board ------------------------------
  const onTouchStart = (e: React.TouchEvent) => {
    const tch = e.touches[0];
    touchRef.current = { x: tch.clientX, y: tch.clientY, t: Date.now() };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const s = touchRef.current;
    touchRef.current = null;
    if (!s) return;
    const tch = e.changedTouches[0];
    const dx = tch.clientX - s.x;
    const dy = tch.clientY - s.y;
    const adx = Math.abs(dx);
    const ady = Math.abs(dy);
    wrapRef.current?.focus();
    if (Math.max(adx, ady) < 20) {
      // tap — resume or restart only; a fresh round still waits for a direction
      if (statusRef.current === 'paused') setStatus('playing');
      else if (statusRef.current === 'gameover') resetGame();
      return;
    }
    setDir(adx > ady ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up'));
  };

  const onBoardClick = () => {
    wrapRef.current?.focus();
    if (status === 'paused') setStatus('playing');
    else if (status === 'gameover') resetGame();
  };

  const centerLabel =
    status === 'playing' ? 'Pause' :
    status === 'gameover' ? 'Restart' : 'Play';
  const CenterIcon = status === 'playing' ? Pause : status === 'gameover' ? RotateCcw : Play;

  const boardW = COLS * cell;

  return (
    <div className="flex w-full max-w-[340px] flex-col items-center gap-3">
      {/* HUD */}
      <div
        className="flex w-full items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em]"
        style={{ maxWidth: boardW }}
      >
        <span className="text-muted-foreground">
          Score <span className="text-foreground tabular-nums">{hud.score}</span>
        </span>
        <span className="text-muted-foreground">
          Hi <span className="text-foreground tabular-nums">{Math.max(highScore, hud.score)}</span>
        </span>
        <span aria-label={`${hud.lives} lives`} className="tabular-nums">
          {Array.from({ length: Math.max(0, hud.lives) }).map((_, i) => (
            <span key={i} className="mx-0.5 text-primary">●</span>
          ))}
        </span>
      </div>

      {/* Board */}
      <div
        ref={wrapRef}
        role="application"
        aria-label="Pac-Man mini game. Steer with arrow keys, WASD, swipe, or the on-screen pad."
        tabIndex={0}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        onClick={onBoardClick}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="relative w-full overflow-hidden rounded-md border border-border bg-background/40 outline-none backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-primary"
        style={{ maxWidth: boardW, touchAction: 'none' }}
      >
        <canvas ref={canvasRef} className="block h-auto w-full" />
      </div>

      <p aria-live="polite" className="sr-only">
        {status === 'gameover'
          ? `Game over. Final score ${hud.score}.`
          : status === 'paused'
            ? 'Paused.'
            : `Level ${hud.level}.`}
      </p>

      {/* D-pad — touch devices only; desktop steers with keys */}
      {coarse && (
        <div className="grid grid-cols-3 grid-rows-3 gap-1.5" style={{ touchAction: 'none' }}>
          <span />
          <DpadButton label="Up" onPress={() => setDir('up')}>▲</DpadButton>
          <span />
          <DpadButton label="Left" onPress={() => setDir('left')}>◀</DpadButton>
          <button
            type="button"
            aria-label={centerLabel}
            onPointerDown={(e) => { e.preventDefault(); togglePause(); }}
            className="flex h-9 w-9 items-center justify-center rounded border border-primary/50 bg-primary/10 text-primary transition-colors hover:bg-primary/20 active:bg-primary/30"
          >
            <CenterIcon className="h-4 w-4" />
          </button>
          <DpadButton label="Right" onPress={() => setDir('right')}>▶</DpadButton>
          <span />
          <DpadButton label="Down" onPress={() => setDir('down')}>▼</DpadButton>
          <span />
        </div>
      )}

      <p className="text-center font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        {coarse ? 'Swipe or use the pad · ● to pause' : 'Arrows · WASD to move · click away to pause'}
      </p>
    </div>
  );
}

function DpadButton({
  label, onPress, children,
}: { label: string; onPress: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onPointerDown={(e) => { e.preventDefault(); onPress(); }}
      className="flex h-9 w-9 items-center justify-center rounded border border-border text-[11px] text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary active:bg-primary/20"
    >
      {children}
    </button>
  );
}
