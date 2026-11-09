import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"

import { SITE } from "./src/config"

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  compressHTML: true,
  integrations: [react(), sitemap()],
  markdown: {
    shikiConfig: {
      /* Both pass WCAG AA on the site's backgrounds; base.css picks one per site theme */
      themes: { light: "github-light-default", dark: "github-dark-default" },
      defaultColor: false,
      wrap: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  scopedStyleStrategy: "where",
})
