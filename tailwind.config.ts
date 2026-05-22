// tailwind.config.ts
// Tailwind v4 uses CSS-first config (see `@theme` in src/app/globals.css).
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
} satisfies Config;
