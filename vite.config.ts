import { defineConfig, loadEnv } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

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
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "prompt",
      injectRegister: false,
      pwaAssets: {
        disabled: false,
        config: true,
      },
      manifest: {
        name: "Ollaix - AI Assistant",
        short_name: "Ollaix",
        description:
          "Ollaix is a modern app that lets you chat with multiple AI models—both local and cloud-based—through a single, streamlined interface. Fast, lightweight, and multilingual, it delivers an optimized chat experience for AI enthusiasts and developers alike.",
        theme_color: "#ffffff",
      },
      workbox: {
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        globPatterns: ["**/*.{js,css,html,png,jpg,svg,ico}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/macktireh\.dev\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "macktireh-dev-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: false,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
