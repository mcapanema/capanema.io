import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    environmentMatchGlobs: [
      ["src/lib/__tests__/**", "happy-dom"],
    ],
    exclude: ["node_modules", "dist", "eslint.config.test.mjs"],
  },
});
