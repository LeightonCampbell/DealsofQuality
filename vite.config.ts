import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { ssg } from "./vite-plugin-ssg-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "production" && ssg({
      routes: [
        '/',
        '/join-as-pro',
        '/contact',
        '/services',
        '/blog',
        '/services/tv-mounting',
        '/blog/7-reasons-why-your-local-business-needs-modern-website-2026',
        '/blog/signs-your-computer-needs-professional-support',
        '/blog/tv-mounting-done-right-why-professional-installation-matters',
        '/blog/top-5-mistakes-to-avoid-when-mounting-your-tv',
        '/blog/tv-mounting-services-los-angeles',
        '/blog/handyman-services-los-angeles',
        '/plumbing',
        '/electrical',
        '/hvac',
        '/handyman-services',
        '/services/smart-home',
        '/house-cleaning',
        '/booking-confirmed',
        '/quote-received',
      ],
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-select', '@radix-ui/react-accordion'],
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    minify: 'esbuild',
    target: 'es2015',
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
}));
