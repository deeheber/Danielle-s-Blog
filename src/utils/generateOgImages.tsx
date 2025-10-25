import satori, { type SatoriOptions } from "satori"
import { Resvg } from "@resvg/resvg-js"
import { type CollectionEntry } from "astro:content"
import postOgImage from "./og-templates/post"
import siteOgImage from "./og-templates/site"
import { readFileSync } from "fs"
import { resolve } from "path"

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
    fontMerriweatherRegular: loadFont("merriweather-regular.ttf"),
    fontMerriweatherBold: loadFont("merriweather-bold.ttf"),
    fontLatoRegular: loadFont("lato-regular.ttf"),
    fontLatoBold: loadFont("lato-bold.ttf"),
  }
}

const {
  fontMerriweatherRegular,
  fontMerriweatherBold,
  fontLatoRegular,
  fontLatoBold,
} = loadFonts()

const options: SatoriOptions = {
  width: 1200,
  height: 630,
  embedFont: true,
  fonts: [
    {
      name: "Merriweather",
      data: fontMerriweatherRegular,
      weight: 400,
      style: "normal",
    },
    {
      name: "Merriweather",
      data: fontMerriweatherBold,
      weight: 700,
      style: "normal",
    },
    {
      name: "Lato",
      data: fontLatoRegular,
      weight: 400,
      style: "normal",
    },
    {
      name: "Lato",
      data: fontLatoBold,
      weight: 700,
      style: "normal",
    },
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
