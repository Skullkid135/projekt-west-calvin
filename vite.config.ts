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
        "projekt-west-calvin", // Ausschließen des gesamten Verzeichnisses
        "eslint.config.js", // Ausschließen der ESLint-Konfigurationsdatei
        "vite.config.ts", // Ausschließen der Vite-Konfigurationsdatei
        "projekt-west-calvin/src/App.tsx", // Ausschließen der App.tsx
        "projekt-west-calvin/src/main.tsx", // Ausschließen der main.tsx
        "src/App.tsx", // Ausschließen der App.tsx-Datei im src-Verzeichnis
        "src/main.tsx",
        "**/vite-env.d.ts",
      ],
    },
  },
});
