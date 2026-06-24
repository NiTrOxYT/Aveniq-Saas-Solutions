import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { visualizer } from "rollup-plugin-visualizer";

const port = Number(process.env.PORT || 3000);
const basePath = process.env.BASE_PATH || "/";

// A Vite plugin to execute serverless API handlers locally in dev mode
function localApiPlugin() {
  return {
    name: "local-api-handler",
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (req.url && req.url.startsWith("/api/")) {
          // Remove query params to get exact path
          const urlPath = req.url.split("?")[0];
          const handlerName = urlPath.slice(5); // e.g. "admin-integrations"
          const handlerFilePath = path.resolve(import.meta.dirname, "api", `${handlerName}.ts`);

          if (fs.existsSync(handlerFilePath)) {
            try {
              // Parse body for POST requests since express/vite middlewares don't parse body automatically
              if (req.method === "POST" && !req.body) {
                const chunks: any[] = [];
                await new Promise((resolve) => {
                  req.on("data", (chunk: any) => chunks.push(chunk));
                  req.on("end", () => {
                    const bodyText = Buffer.concat(chunks).toString();
                    try {
                      req.body = JSON.parse(bodyText);
                    } catch (e) {
                      req.body = bodyText;
                    }
                    resolve(null);
                  });
                });
              }

              // Parse query parameters
              const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
              req.query = Object.fromEntries(url.searchParams.entries());

              // Create Vercel-like res helpers (status, json, setHeader, etc.)
              res.status = (statusCode: number) => {
                res.statusCode = statusCode;
                return res;
              };
              res.json = (data: any) => {
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(data));
                return res;
              };

              // Import and execute the handler
              const module = await server.ssrLoadModule(handlerFilePath);
              const handler = module.default;
              
              if (typeof handler === "function") {
                await handler(req, res);
                return;
              }
            } catch (err: any) {
              console.error(`[Local API Plugin] Error executing ${handlerFilePath}:`, err);
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: err.message || "Internal Dev Server Error" }));
              return;
            }
          }
        }
        next();
      });
    }
  };
}

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    localApiPlugin(),
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
