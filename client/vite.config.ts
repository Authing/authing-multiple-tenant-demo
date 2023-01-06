import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src/",
    },
  },
  envPrefix: "Authing_",
  server: {
    port: 3009,
    open: true,
    proxy: {
      "^/authing-tenant/.*": {
        target: "http://localhost:3010",
        changeOrigin: true,
      },
    },
  },
});
