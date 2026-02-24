import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Security rules
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-new-func": "error",

      // Code quality rules
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "error",
      "no-var": "error",
      "eqeqeq": ["error", "always"],
      "curly": ["error", "multi-line"],

      // React/Next.js best practices
      "react/jsx-no-target-blank": "error",
      "react/self-closing-comp": "warn",

      // TypeScript rules
      "@typescript-eslint/no-unused-vars": ["warn", {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      }],
      "@typescript-eslint/no-explicit-any": "warn",

      // Import organization
      "import/order": ["warn", {
        groups: [
          "builtin",
          "external",
          "internal",
          ["parent", "sibling"],
          "index",
        ],
        "newlines-between": "never",
      }],
    },
  },
  {
    // Ignore patterns
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "public/**",
    ],
  },
];

export default eslintConfig;
