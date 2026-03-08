import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import remarkCollapse from "remark-collapse"
import remarkToc from "remark-toc"

import { SITE } from "./src/config"

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [react(), sitemap()],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
  },
  vite: {
    // @ts-expect-error - vite version mismatch between @tailwindcss/vite (v7) and astro (v6)
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  scopedStyleStrategy: "where",
})
