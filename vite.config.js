// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
  },
  build: {
    rollupOptions: {
      external: ["react-use"],
    },
  },
});
