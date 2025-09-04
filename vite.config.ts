import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // or '0.0.0.0'
    port: 5173,
    origin: "http://192.168.1.164:5173", // <-- important
    hmr: {
      host: "192.168.1.164", // <-- important
      port: 5173,
      protocol: "ws",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
