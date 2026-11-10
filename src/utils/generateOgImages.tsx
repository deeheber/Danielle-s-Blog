import { readFileSync } from "fs"
import { resolve } from "path"

import { Resvg } from "@resvg/resvg-js"
import { type CollectionEntry } from "astro:content"
import satori, { type SatoriOptions } from "satori"

import postOgImage from "./og-templates/post"
import siteOgImage from "./og-templates/site"

const loadFonts = () => {
  const loadFont = (path: string) => {
    try {
      const fontPath = resolve(`public/fonts/${path}`)
      return readFileSync(fontPath)
    } catch (error) {
      console.error(`Error loading font from ${path}:`, error)
      throw error
    }
  }

  return {
    fontInterRegular: loadFont("inter-400.woff"),
    fontInterBold: loadFont("inter-700.woff"),
  }
}

const { fontInterRegular, fontInterBold } = loadFonts()

const options: SatoriOptions = {
  width: 1200,
  height: 630,
  embedFont: true,
  fonts: [
    { name: "Inter", data: fontInterRegular, weight: 400, style: "normal" },
    { name: "Inter", data: fontInterBold, weight: 700, style: "normal" },
  ],
}
function svgBufferToPngBuffer(svg: string) {
  const resvg = new Resvg(svg)
  const pngData = resvg.render()
  return pngData.asPng()
}

export async function generateOgImageForPost(post: CollectionEntry<"blog">) {
  const svg = await satori(postOgImage(post), options)
  return svgBufferToPngBuffer(svg)
}

export async function generateOgImageForSite() {
  const svg = await satori(siteOgImage(), options)
  return svgBufferToPngBuffer(svg)
}
