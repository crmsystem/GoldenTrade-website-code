// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { SITE_URL } from "./src/lib/seo";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // Still needed at build time — prerendering runs this to produce each page's static HTML —
    // but nothing server-side ships or runs at deploy/runtime.
    server: { entry: "server" },
    // Deploying as static files to Firebase Hosting (Spark/free plan, no server). Prerender every
    // reachable route to its own real HTML file at build time instead of running SSR at runtime.
    prerender: {
      enabled: true,
      crawlLinks: true,
    },
    sitemap: {
      enabled: true,
      host: SITE_URL,
    },
  },
  vite: {
    server: {
      allowedHosts: true,
    },
  },
});
