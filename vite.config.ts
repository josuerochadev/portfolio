import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { visualizer } from "rollup-plugin-visualizer";
import path from "node:path";

export default defineConfig({
  plugins: [
    react(), 
    svgr(),
    visualizer({
      filename: "dist/stats.html",
      open: true,
      gzipSize: true,
      brotliSize: true,
    }) as any,
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  base: "/",
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          react: ["react", "react-dom"],
          router: ["react-router-dom"],
          animation: ["framer-motion"],
          icons: ["react-icons"],
          utils: ["@studio-freight/lenis", "react-scroll-parallax"],
        },
      },
    },
    // Enable source map for better debugging
    sourcemap: true,
    // Set chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },
});