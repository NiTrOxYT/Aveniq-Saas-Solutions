import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { visualizer } from "rollup-plugin-visualizer";

const port = Number(process.env.PORT || 3000);
const basePath = process.env.BASE_PATH || "/";

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    visualizer({
      filename: "stats.html",
      open: false,
      gzipSize: true,
    }),
    visualizer({
      filename: "stats.json",
      json: true,
      gzipSize: true,
    }),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(
        import.meta.dirname,
        "..",
        "..",
        "attached_assets",
      ),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  modulePreload: {
    polyfill: false
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            const parts = id.split("node_modules/");
            const packagePath = parts[parts.length - 1];

            if (
              packagePath.startsWith("react/") ||
              packagePath.startsWith("react-dom/") ||
              packagePath.startsWith("scheduler/") ||
              packagePath.startsWith("use-sync-external-store/")
            ) {
              return "vendor-react";
            }
            if (packagePath.startsWith("wouter/")) {
              return "vendor-react";
            }
            if (packagePath.startsWith("@tanstack/")) {
              return "vendor-react";
            }
            if (packagePath.startsWith("gsap/")) {
              return "vendor-gsap";
            }
            if (
              packagePath.startsWith("framer-motion/") ||
              packagePath.startsWith("motion-dom/") ||
              packagePath.startsWith("motion-utils/")
            ) {
              return "vendor-framer-motion";
            }
            if (packagePath.startsWith("lucide-react/") || packagePath.startsWith("lucide/")) {
              return "vendor-lucide";
            }
            if (packagePath.startsWith("@supabase/") || packagePath.startsWith("supabase/")) {
              return "vendor-supabase";
            }
            if (packagePath.startsWith("tailwind-merge/")) {
              return "vendor-tailwind-merge";
            }
            if (
              packagePath.startsWith("@radix-ui/") ||
              packagePath.startsWith("@floating-ui/") ||
              packagePath.startsWith("class-variance-authority/") ||
              packagePath.startsWith("clsx/")
            ) {
              return "vendor-ui";
            }
          }
        }
      }
    }
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
