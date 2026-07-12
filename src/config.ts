import type { Site, SocialObjects } from "./types"

export const SITE: Site = {
  website: "https://danielleheberling.xyz/",
  author: "Danielle Heberling",
  desc: "Danielle's Blog",
  title: "Danielle's Blog",
  ogImage: "Logo1(D).png",
  lightAndDarkMode: true,
  postPerPage: 10,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
}

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const

export const LOGO_IMAGE = {
  width: 300,
  height: 400,
}

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/deeheber",
    linkTitle: ` ${SITE.title} on Github`,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/deeheber",
    linkTitle: `${SITE.title} on LinkedIn`,
  },
  {
    name: "Bluesky",
    href: "https://bsky.app/profile/danielleheberling.xyz",
    linkTitle: `${SITE.title} on Bluesky`,
  },
  {
    name: "Discord",
    href: "https://www.believeinserverless.com/community",
    linkTitle: `Believe in Serverless on Discord`,
  },
]
