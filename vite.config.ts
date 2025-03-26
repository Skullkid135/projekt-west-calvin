import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./setupTests.ts",
    exclude: ["node_modules", "dist", "coverage", "src/components/ui/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov", "json"],
      exclude: [
        "src/components/ui/**",
        "src/components/ui/color-mode.tsx",
        "src/components/ui/provider.tsx",
        "src/components/ui/toaster.tsx",
        "src/components/ui/tooltip.tsx",
      ],
    },
  },
});
