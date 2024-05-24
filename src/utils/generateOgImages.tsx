import satori, { type SatoriOptions } from "satori";
import { Resvg } from "@resvg/resvg-js";
import { type CollectionEntry } from "astro:content";
import postOgImage from "./og-templates/post";
import siteOgImage from "./og-templates/site";

const fetchFonts = async () => {
  // IBM Plex Mono Regular Font
  const fontFileIBMRegular = await fetch(
    "https://www.1001fonts.com/download/font/ibm-plex-mono.regular.ttf"
  );
  const fontIBMRegular: ArrayBuffer = await fontFileIBMRegular.arrayBuffer();

  // IBM Plex Mono Bold Font
  const fontFileIBMBold = await fetch(
    "https://www.1001fonts.com/download/font/ibm-plex-mono.bold.ttf"
  );
  const fontIBMBold: ArrayBuffer = await fontFileIBMBold.arrayBuffer();

  // Merriweather Regular Font
  const fontFileMerriweatherRegular = await fetch(
    "https://fonts.gstatic.com/s/merriweather/v21/u-4n0qyriQwlOrhSvowK_l52xwNZWMfF.ttf"
  );
  const fontMerriweatherRegular: ArrayBuffer =
    await fontFileMerriweatherRegular.arrayBuffer();

  // Merriweather Bold Font
  const fontFileMerriweatherBold = await fetch(
    "https://fonts.gstatic.com/s/merriweather/v21/u-4l0qyriQwlOrhSvowK_l52xwNZWMfF7wM.ttf"
  );
  const fontMerriweatherBold: ArrayBuffer =
    await fontFileMerriweatherBold.arrayBuffer();

  // Lato Regular Font
  const fontFileLatoRegular = await fetch(
    "https://fonts.gstatic.com/s/lato/v17/S6uyw4BMUTPHjxAwWw.ttf"
  );
  const fontLatoRegular: ArrayBuffer = await fontFileLatoRegular.arrayBuffer();

  // Lato Bold Font
  const fontFileLatoBold = await fetch(
    "https://fonts.gstatic.com/s/lato/v17/S6u9w4BMUTPHh6UVSwaPGR_p.ttf"
  );
  const fontLatoBold: ArrayBuffer = await fontFileLatoBold.arrayBuffer();

  return {
    fontIBMRegular,
    fontIBMBold,
    fontMerriweatherRegular,
    fontMerriweatherBold,
    fontLatoRegular,
    fontLatoBold,
  };
};

const {
  fontIBMRegular,
  fontIBMBold,
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
