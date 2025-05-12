// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Add this if your components are in a root components folder
    "./**/*.{js,ts,jsx,tsx,mdx}", // Consider adding this for broader scanning during development
  ],
  theme: {
    extend: {
      colors: {
        primary: '#043CAA',    // A blue from your BSDOC project's "Our Services"
        secondary: '#62B6B8',  // A teal from BSDOC
        accent: '#FFD580',     // An orange/yellow from BSDOC
        lightBg: '#F8F9FA',
        darkText: '#070B0C',
        lightText: '#575454',
      },
      fontFamily: {
        sans: ['var(--font-rubik)', 'sans-serif'], // Assuming Rubik from your layout
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
} satisfies Config;