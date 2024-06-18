import satori, { type SatoriOptions } from "satori";
import { Resvg } from "@resvg/resvg-js";
import { type CollectionEntry } from "astro:content";
import postOgImage from "./og-templates/post";
import siteOgImage from "./og-templates/site";

const fetchFonts = async () => {
  const fetchFont = async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch font: ${response.statusText}`);
      }
      const buffer = await response.arrayBuffer();
      console.log(
        `Fetched font from ${url}:`,
        new Uint8Array(buffer).slice(0, 100)
      ); // Log the first 100 bytes for verification
      return buffer;
    } catch (error) {
      console.error(`Error fetching font from URL: ${url}`, error);
      throw error;
    }
  };

  return {
    fontMerriweatherRegular: await fetchFont(
      "https://www.1001fonts.com/download/font/merriweather.regular.ttf"
    ),
    fontMerriweatherBold: await fetchFont(
      "https://www.1001fonts.com/download/font/merriweather.bold.ttf"
    ),
    fontLatoRegular: await fetchFont(
      "https://www.1001fonts.com/download/font/lato.regular.ttf"
    ),
    fontLatoBold: await fetchFont(
      "https://www.1001fonts.com/download/font/lato.bold.ttf"
    ),
  };
};

const {
  fontMerriweatherRegular,
  fontMerriweatherBold,
  fontLatoRegular,
  fontLatoBold,
} = await fetchFonts();

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
};
function svgBufferToPngBuffer(svg: string) {
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return pngData.asPng();
}

export async function generateOgImageForPost(post: CollectionEntry<"blog">) {
  const svg = await satori(postOgImage(post), options);
  return svgBufferToPngBuffer(svg);
}

export async function generateOgImageForSite() {
  const svg = await satori(siteOgImage(), options);
  return svgBufferToPngBuffer(svg);
}
