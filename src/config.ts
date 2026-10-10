import type { Site, SocialObjects } from "./types"

export const SITE: Site = {
  website: "https://danielleheberling.xyz/",
  author: "Danielle Heberling",
  desc: "I help teams spend less time fighting their tools and more time shipping software. Platform and cloud engineering, mostly AWS.",
  title: "Danielle Heberling",
  ogImage: "og.png",
  lightAndDarkMode: true,
  postPerPage: 10,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
}

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const

export const LOGO_IMAGE = {
  width: 500,
  height: 500,
}

// Split so the full address never appears in the HTML; Socials.astro joins it client-side.
export const EMAIL = {
  user: "danielle",
  domain: "danielleheberling.com",
}

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/deeheber",
    linkTitle: `${SITE.author} on GitHub`,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/deeheber",
    linkTitle: `${SITE.author} on LinkedIn`,
  },
  {
    name: "Bluesky",
    href: "https://bsky.app/profile/danielleheberling.xyz",
    linkTitle: `${SITE.author} on Bluesky`,
  },
  {
    name: "Discord",
    href: "https://www.believeinserverless.com/community",
    linkTitle: `Believe in Serverless on Discord`,
  },
]
