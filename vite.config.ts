import { defineConfig, loadEnv } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const { NODE_ENV } = loadEnv(process.env.NODE_ENV as string, process.cwd(), "");

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    allowedHosts: NODE_ENV === "development" ? true : [],
  },
  preview: {
    port: 3000,
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
