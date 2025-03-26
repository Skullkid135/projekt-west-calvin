import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom", // Stellt sicher, dass Vitest den DOM simuliert
    globals: true,
    setupFiles: "./setupTests.ts", // Hier setupTests.ts hinzufügen
    coverage: {
      provider: "v8", // Alternativ "istanbul" möglich
      reporter: ["text", "lcov", "json"], // Wähle die gewünschten Formate
    },
  },
});
