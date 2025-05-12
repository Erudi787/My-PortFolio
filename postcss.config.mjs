// postcss.config.mjs
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // Use the specific plugin Tailwind CSS v4 is asking for:
    '@tailwindcss/postcss': {}, // Add options here if needed, e.g., { config: './tailwind.config.ts' }
    'autoprefixer': {},
    // Other PostCSS plugins if you use them
  },
};
export default config;