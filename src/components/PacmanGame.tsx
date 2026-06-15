'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/**
 * Classic Pac-Man with 4 ghosts and authentic targeting AI:
 *   Blinky (red)   — chase: targets Pac-Man's tile directly.
 *   Pinky  (pink)  — chase: targets 4 tiles ahead of Pac-Man.
 *   Inky   (cyan)  — chase: uses (Blinky's tile + 2-tiles-ahead) vector flipped from Pac-Man.
 *   Clyde  (orange)— chase: targets Pac-Man if far, scatters home corner if close (<8 tiles).
 *
 * Modes:
 *   scatter   — each ghost retreats to its corner.
 *   chase     — each ghost uses its chase target above.
 *   frightened— ghosts flee, can be eaten for big score. Triggered by power pellets.
 *
 * Controls:
 *   arrow keys (or WASD) — pac direction.
 *   Esc — pause / unpause.
 *   Click the board — focus + start.
 *
 * Maze: hand-authored, 21 cols × 23 rows including walls. '#'=wall, '.'=dot,
 * 'o'=power pellet, ' '=empty, 'P'=pacman spawn, 'G'=ghost house spawn,
 * 'T'=tunnel passage.
 */

const COLS = 21;
const ROWS = 23;
const TICK_MS = 140; // movement speed
const FRIGHT_MS = 6000; // frightened mode duration
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
  '#####.### # ###.#####',
  '    #.#       #.#    ',
  '#####.# ##G## #.#####',
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
const DIR_VEC: Record<Dir, [number, number]> = {
  up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0],
};
const OPPOSITE: Record<Dir, Dir> = { up: 'down', down: 'up', left: 'right', right: 'left' };

interface Entity { x: number; y: number; dir: Dir; }
interface GhostState extends Entity {
  name: 'blinky' | 'pinky' | 'inky' | 'clyde';
  color: string;
  scatterTarget: [number, number];
  housed: boolean;     // still in the ghost house
  eaten: boolean;      // returning to the house
  releaseAt: number;   // ms timestamp to leave the house
}

// Find Pacman + ghost spawn tiles from the maze
function parseMaze() {
  const walls = new Set<string>();
  const dots = new Set<string>();
  const power = new Set<string>();
  const tunnel = new Set<string>();
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
      else if (c === 'P') pacSpawn = [x, y];
      else if (c === 'G') ghostSpawn = [x, y];
    }
  }
  return { walls, dots, power, tunnel, pacSpawn, ghostSpawn };
}

const PARSED = parseMaze();

function isWall(x: number, y: number): boolean {
  if (y < 0 || y >= ROWS) return true;
  // tunnel wrap horizontally
  if (x < 0 || x >= COLS) return false;
  return PARSED.walls.has(`${x},${y}`);
}

function wrap(x: number, y: number): [number, number] {
  if (x < 0) return [COLS - 1, y];
  if (x >= COLS) return [0, y];
  return [x, y];
}

function tryMove(e: Entity, dir: Dir): [number, number] | null {
  const [dx, dy] = DIR_VEC[dir];
  const [nx, ny] = wrap(e.x + dx, e.y + dy);
  if (isWall(nx, ny)) return null;
  return [nx, ny];
}

// Manhattan-ish euclidean for ghost targeting (real Pacman uses straight-line distance squared)
function distSq(a: [number, number], b: [number, number]): number {
  const dx = a[0] - b[0]; const dy = a[1] - b[1];
  return dx * dx + dy * dy;
}

// Get legal next-direction options for a ghost at (x,y), excluding reverse
function legalDirs(e: Entity): Dir[] {
  const dirs: Dir[] = ['up', 'left', 'down', 'right']; // tie-break order matches arcade
  return dirs.filter(d => d !== OPPOSITE[e.dir] && tryMove(e, d) !== null);
}

function pickGhostDir(g: GhostState, target: [number, number], frightened: boolean): Dir {
  const options = legalDirs(g);
  if (options.length === 0) {
    // dead-end, reverse
    return OPPOSITE[g.dir];
  }
  if (frightened) {
    return options[Math.floor(Math.random() * options.length)];
  }
  let best = options[0];
  let bestD = Infinity;
  for (const d of options) {
    const next = tryMove(g, d)!;
    const dd = distSq(next, target);
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
    // vector from blinky to ahead, doubled
    return [ahead[0] + (ahead[0] - blinky.x), ahead[1] + (ahead[1] - blinky.y)];
  }
  // clyde
  const dist = Math.sqrt(distSq([pac.x, pac.y], [10, 22]));
  return dist > 8 ? [pac.x, pac.y] : [0, 22];
}

interface PacmanGameProps {
  /** Cell size in pixels; board is COLS×size wide × ROWS×size tall. */
  cellSize?: number;
}

export default function PacmanGame({ cellSize = 16 }: PacmanGameProps) {
  const [pac, setPac] = useState<Entity>(() => ({
    x: PARSED.pacSpawn[0], y: PARSED.pacSpawn[1], dir: 'left',
  }));
  const [nextDir, setNextDir] = useState<Dir | null>(null);
  const [ghosts, setGhosts] = useState<GhostState[]>(() => initGhosts());
  const [dots, setDots] = useState<Set<string>>(() => new Set(PARSED.dots));
  const [power, setPower] = useState<Set<string>>(() => new Set(PARSED.power));
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [status, setStatus] = useState<'idle' | 'playing' | 'paused' | 'gameover' | 'won'>('idle');
  const [frightenedUntil, setFrightenedUntil] = useState(0);
  const startedAt = useRef(0);
  const mouthOpen = useRef(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const isFrightened = status === 'playing' && Date.now() < frightenedUntil;

  function initGhosts(): GhostState[] {
    const gx = PARSED.ghostSpawn[0];
    const gy = PARSED.ghostSpawn[1];
    return [
      { name: 'blinky', color: '#ff3b30', x: gx,     y: gy - 2, dir: 'left',  scatterTarget: [COLS - 1, 0], housed: false, eaten: false, releaseAt: 0 },
      { name: 'pinky',  color: '#ff80c0', x: gx,     y: gy,     dir: 'down',  scatterTarget: [0, 0],         housed: true,  eaten: false, releaseAt: 2000 },
      { name: 'inky',   color: '#00d0ff', x: gx - 1, y: gy,     dir: 'up',    scatterTarget: [COLS - 1, ROWS - 1], housed: true, eaten: false, releaseAt: 5000 },
      { name: 'clyde',  color: '#ffb347', x: gx + 1, y: gy,     dir: 'up',    scatterTarget: [0, ROWS - 1],  housed: true,  eaten: false, releaseAt: 8000 },
    ];
  }

  const reset = useCallback((full = true) => {
    setPac({ x: PARSED.pacSpawn[0], y: PARSED.pacSpawn[1], dir: 'left' });
    setNextDir(null);
    setGhosts(initGhosts());
    if (full) {
      setDots(new Set(PARSED.dots));
      setPower(new Set(PARSED.power));
      setScore(0);
      setLives(3);
    }
    setFrightenedUntil(0);
    startedAt.current = Date.now();
  }, []);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const inGame = status === 'playing' || status === 'paused' || status === 'idle';
      if (!inGame) return;
      let d: Dir | null = null;
      if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'w') d = 'up';
      else if (e.key === 'ArrowDown' || e.key.toLowerCase() === 's') d = 'down';
      else if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') d = 'left';
      else if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') d = 'right';
      else if (e.key === 'Escape') {
        e.preventDefault();
        if (status === 'playing') setStatus('paused');
        else if (status === 'paused') setStatus('playing');
        return;
      }
      if (d) {
        e.preventDefault();
        setNextDir(d);
        if (status === 'idle') {
          setStatus('playing');
          startedAt.current = Date.now();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [status]);

  // Main tick
  useEffect(() => {
    if (status !== 'playing') return;
    const id = setInterval(() => {
      mouthOpen.current = !mouthOpen.current;

      // Move Pacman
      setPac(prev => {
        // Try the buffered direction first
        if (nextDir && tryMove(prev, nextDir) !== null) {
          const [nx, ny] = tryMove(prev, nextDir)!;
          return { x: nx, y: ny, dir: nextDir };
        }
        // Otherwise continue current direction
        const cont = tryMove(prev, prev.dir);
        if (cont) return { x: cont[0], y: cont[1], dir: prev.dir };
        return prev;
      });
    }, TICK_MS);
    return () => clearInterval(id);
  }, [status, nextDir]);

  // Process pacman's tile each frame: eat dots/pellets, check ghost collisions
  useEffect(() => {
    if (status !== 'playing') return;
    const key = `${pac.x},${pac.y}`;
    if (dots.has(key)) {
      setDots(s => { const next = new Set(s); next.delete(key); return next; });
      setScore(s => s + 10);
    }
    if (power.has(key)) {
      setPower(s => { const next = new Set(s); next.delete(key); return next; });
      setScore(s => s + 50);
      setFrightenedUntil(Date.now() + FRIGHT_MS);
    }
    // Ghost collision
    for (const g of ghosts) {
      if (g.x === pac.x && g.y === pac.y && !g.eaten && !g.housed) {
        if (isFrightened) {
          // Eat the ghost
          setGhosts(prev => prev.map(gg =>
            gg.name === g.name ? { ...gg, eaten: true, x: PARSED.ghostSpawn[0], y: PARSED.ghostSpawn[1], housed: true, releaseAt: Date.now() - startedAt.current + 3000 } : gg
          ));
          setScore(s => s + 200);
        } else {
          // Pacman dies
          setLives(l => {
            const next = l - 1;
            if (next <= 0) setStatus('gameover');
            else reset(false);
            return next;
          });
        }
        break;
      }
    }
    // Win
    if (dots.size === 0 && power.size === 0) setStatus('won');
  }, [pac.x, pac.y, status, dots, power, ghosts, isFrightened, reset]);

  // Move ghosts
  useEffect(() => {
    if (status !== 'playing') return;
    const id = setInterval(() => {
      setGhosts(prev => {
        // inline mode calc so the effect doesn't depend on currentMode()
        const elapsed = Date.now() - startedAt.current;
        let acc = 0;
        let mode: 'scatter' | 'chase' = 'chase';
        for (const entry of MODE_SCHEDULE) {
          acc += entry.ms;
          if (elapsed < acc) { mode = entry.mode; break; }
        }
        const blinky = prev.find(g => g.name === 'blinky') ?? null;
        return prev.map(g => {
          // Eaten ghost: scoot back to house, then re-spawn
          if (g.eaten) {
            return { ...g, eaten: false, housed: true, releaseAt: elapsed + 2000 };
          }
          // Housed and not yet released
          if (g.housed && elapsed < g.releaseAt) return g;
          if (g.housed && elapsed >= g.releaseAt) {
            // exit house — move up to (gx, gy - 2)
            const exited: GhostState = { ...g, x: PARSED.ghostSpawn[0], y: PARSED.ghostSpawn[1] - 2, dir: 'left', housed: false };
            return exited;
          }
          // Pick target
          let target: [number, number];
          if (isFrightened) target = [Math.floor(Math.random() * COLS), Math.floor(Math.random() * ROWS)];
          else if (mode === 'scatter') target = g.scatterTarget;
          else target = chaseTarget(g.name, pac, blinky);

          const nextDir = pickGhostDir(g, target, isFrightened);
          const nxt = tryMove(g, nextDir);
          if (!nxt) return g;
          return { ...g, x: nxt[0], y: nxt[1], dir: nextDir };
        });
      });
    }, TICK_MS);
    return () => clearInterval(id);
  }, [status, isFrightened, pac]);

  // Canvas rendering
  const boardWidth = COLS * cellSize;
  const boardHeight = ROWS * cellSize;
  const handleBoardClick = () => {
    containerRef.current?.focus();
    if (status === 'idle') {
      setStatus('playing');
      startedAt.current = Date.now();
    } else if (status === 'gameover' || status === 'won') {
      reset(true);
      setStatus('idle');
    } else if (status === 'paused') {
      setStatus('playing');
    }
  };

  const overlayMsg =
    status === 'idle' ? 'Click to play · arrow keys to move' :
    status === 'paused' ? 'Paused · Esc or click to resume' :
    status === 'gameover' ? `Game over · ${score} pts · click to play again` :
    status === 'won' ? `You win! · ${score} pts · click to play again` : null;

  const wallCells = useMemo(() => Array.from(PARSED.walls).map(k => {
    const [x, y] = k.split(',').map(Number);
    return { x, y };
  }), []);

  return (
    <div className="flex flex-col items-center">
      {/* HUD */}
      <div className="flex items-center justify-between w-full max-w-[400px] mb-2 font-mono text-[11px] uppercase tracking-[0.2em]">
        <span className="text-muted-foreground">
          Score <span className="text-foreground tabular-nums">{score}</span>
        </span>
        <span className="text-muted-foreground">
          {Array.from({ length: lives }).map((_, i) => (
            <span key={i} className="text-primary mx-0.5">●</span>
          ))}
        </span>
      </div>

      {/* Board */}
      <div
        ref={containerRef}
        tabIndex={0}
        onClick={handleBoardClick}
        className="relative outline-none rounded-md overflow-hidden border border-border bg-background/40 backdrop-blur-sm focus:ring-2 focus:ring-primary"
        style={{ width: boardWidth, height: boardHeight }}
      >
        {/* Walls */}
        {wallCells.map(({ x, y }) => (
          <span
            key={`w-${x}-${y}`}
            className="absolute bg-primary/20 border border-primary/40"
            style={{
              left: x * cellSize, top: y * cellSize,
              width: cellSize, height: cellSize,
            }}
          />
        ))}

        {/* Dots */}
        {Array.from(dots).map((k) => {
          const [x, y] = k.split(',').map(Number);
          return (
            <span
              key={`d-${k}`}
              className="absolute bg-foreground/80 rounded-full"
              style={{
                left: x * cellSize + cellSize / 2 - 1.5,
                top: y * cellSize + cellSize / 2 - 1.5,
                width: 3, height: 3,
              }}
            />
          );
        })}

        {/* Power pellets */}
        {Array.from(power).map((k) => {
          const [x, y] = k.split(',').map(Number);
          return (
            <span
              key={`p-${k}`}
              className="absolute bg-primary rounded-full animate-pulse"
              style={{
                left: x * cellSize + cellSize / 2 - 4,
                top: y * cellSize + cellSize / 2 - 4,
                width: 8, height: 8,
                boxShadow: '0 0 8px 2px hsl(var(--primary) / 0.6)',
              }}
            />
          );
        })}

        {/* Pacman */}
        <span
          className="absolute transition-transform duration-100 ease-linear"
          style={{
            left: pac.x * cellSize,
            top: pac.y * cellSize,
            width: cellSize,
            height: cellSize,
            transform: `rotate(${pac.dir === 'right' ? 0 : pac.dir === 'down' ? 90 : pac.dir === 'left' ? 180 : 270}deg)`,
          }}
        >
          <svg viewBox="0 0 24 24" width="100%" height="100%">
            <path
              d={mouthOpen.current
                ? 'M 12 12 L 24 4 A 12 12 0 1 1 24 20 Z'
                : 'M 12 12 L 24 11 A 12 12 0 1 1 24 13 Z'
              }
              fill="hsl(var(--primary))"
            />
          </svg>
        </span>

        {/* Ghosts */}
        {ghosts.map((g) => (
          <span
            key={g.name}
            className="absolute transition-transform duration-100 ease-linear"
            style={{
              left: g.x * cellSize,
              top: g.y * cellSize,
              width: cellSize,
              height: cellSize,
              opacity: g.eaten ? 0.35 : 1,
            }}
          >
            <svg viewBox="0 0 24 24" width="100%" height="100%">
              <path
                d="M 2 22 L 2 12 A 10 10 0 0 1 22 12 L 22 22 L 18 19 L 14 22 L 12 19 L 10 22 L 6 19 Z"
                fill={isFrightened && !g.eaten ? '#3b46ff' : g.color}
              />
              {/* eyes */}
              <circle cx="8" cy="11" r="2.4" fill="white" />
              <circle cx="16" cy="11" r="2.4" fill="white" />
              <circle cx={8 + DIR_VEC[g.dir][0] * 0.9} cy={11 + DIR_VEC[g.dir][1] * 0.9} r="1.2" fill="black" />
              <circle cx={16 + DIR_VEC[g.dir][0] * 0.9} cy={11 + DIR_VEC[g.dir][1] * 0.9} r="1.2" fill="black" />
            </svg>
          </span>
        ))}

        {/* Overlay */}
        {overlayMsg && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm">
            <p className="text-center px-4 text-[11px] font-mono uppercase tracking-[0.22em] text-foreground">
              {overlayMsg}
            </p>
          </div>
        )}
      </div>

      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground text-center">
        Arrow keys · esc to pause
      </p>
    </div>
  );
}
