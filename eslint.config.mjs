import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import tailwind from "eslint-plugin-tailwindcss";
import security from "eslint-plugin-security";
import jsxA11y from "eslint-plugin-jsx-a11y";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  ...tailwind.configs["flat/recommended"],
  // jsx-a11y plugin is already registered by eslint-config-next; enable its
  // full recommended rule set (Next only turns on a handful by default).
  { rules: { ...jsxA11y.flatConfigs.recommended.rules } },
  {
    plugins: {
      security: security,
    },
    rules: {
      ...security.configs.recommended.rules,
      "security/detect-object-injection": "off",
      "security/detect-non-literal-fs-filename": "off",
      "security/detect-unsafe-regex": "warn",
    },
  },
  {
    settings: {
      tailwindcss: {
        callees: ["cn"],
        config: new URL("src/app/globals.css", import.meta.url).pathname,
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
      ],
      "tailwindcss/no-custom-classname": "off",
      "tailwindcss/classnames-order": "off",
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
