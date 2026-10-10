import { test, expect } from "@playwright/test"
import speakingData from "../src/data/speakingData.json" with { type: "json" }

test("main page loads with selected writing and speaking", async ({ page }) => {
  await page.goto("/")
  await expect(page).toHaveTitle(/Danielle/)

  const selectedWriting = page.locator("#selected-writing")
  await expect(selectedWriting.locator(":scope > h2")).toHaveText(
    "Selected Writing",
  )
  await expect(selectedWriting.locator("li")).toHaveCount(5)
  await expect(selectedWriting.locator("li").first()).toBeVisible()

  const selectedSpeaking = page.locator("#selected-speaking")
  await expect(selectedSpeaking.locator(":scope > h2")).toHaveText(
    "Selected Speaking",
  )
  await expect(selectedSpeaking.locator("li a")).toHaveText([
    "Rethinking Serverless - AWS Community Day Bay Area (2024)",
    "CI/CD with the AWS CDK and GitHub Actions at a Startup (2025)",
    "AWS Anti-Patterns That Will Cost You Later (2025)",
    "Serverless Chats Ep. 25 (2019)",
  ])
  await expect(
    page.getByRole("link", { name: "All speaking" }),
  ).toHaveAttribute("href", "/talks/")
})

test("about page", async ({ page }) => {
  await page.goto("/about/")
  await expect(page).toHaveTitle(/About/)

  await expect(page.locator("#about h1")).toHaveText("About")
  await expect(page.locator("body")).toContainText("Danielle")
})

test("dark/light mode toggle round-trip", async ({ page }) => {
  await page.goto("/")

  const html = page.locator("html")
  const themeBtn = page.locator("#theme-btn")

  const original = await html.getAttribute("data-theme")
  await themeBtn.click()

  const toggled = await html.getAttribute("data-theme")
  expect(toggled).not.toBe(original)
  await expect(themeBtn).not.toHaveAttribute("aria-label", `${original}`)

  await themeBtn.click()
  await expect(html).toHaveAttribute("data-theme", original!)
})

test("search hydrates and returns results", async ({ page }) => {
  await page.goto("/search/")

  const input = page.locator('input[name="search"]')
  await expect(input).toBeVisible()

  await input.fill("serverless")
  await expect(page.getByText(/Found \d+ result/)).toBeVisible()
})

test("blog post renders content", async ({ page }) => {
  await page.goto("/blog/")

  const firstLink = page.locator("#main-content ul li a").first()
  const href = await firstLink.getAttribute("href")
  expect(href).toBeTruthy()

  await page.goto(href!)

  const article = page.locator("article#article")
  await expect(article).toBeVisible()
  await expect(page.locator("h1.post-title")).toBeVisible()
})

test("RSS feed is valid XML", async ({ request }) => {
  const response = await request.get("/rss.xml")
  expect(response.status()).toBe(200)
  expect(response.headers()["content-type"]).toContain("xml")

  const body = await response.text()
  expect(body).toContain("<rss")
  expect(body).toContain("<channel>")
})

test("blog pagination shows different posts per page", async ({ page }) => {
  await page.goto("/blog/")

  const getPostHrefs = () =>
    page
      .locator("#main-content ul li a")
      .evaluateAll((links: HTMLAnchorElement[]) =>
        links
          .map((a) => a.getAttribute("href"))
          .filter((h): h is string => h !== null),
      )

  const page1Hrefs = await getPostHrefs()
  expect(page1Hrefs.length).toBeGreaterThan(0)

  await page.getByRole("link", { name: /next/i }).click()
  await expect(page).toHaveURL(/\/blog\/2\/?/)

  const page2Hrefs = await getPostHrefs()
  expect(page2Hrefs.length).toBeGreaterThan(0)

  const overlap = page1Hrefs.filter((h) => page2Hrefs.includes(h))
  expect(overlap).toHaveLength(0)

  await page.getByRole("link", { name: /prev/i }).click()
  await expect(page).toHaveURL(/\/blog\/?$/)

  const page1Again = await getPostHrefs()
  expect(page1Again).toEqual(page1Hrefs)
})

test("speaking archive opens the newest populated year and toggles older years", async ({
  page,
}) => {
  await page.goto("/talks/")
  await expect(page).toHaveTitle(/Speaking/)

  const populatedYears = speakingData.filter(
    ({ content }) => content.length > 0,
  )
  const newestYear = populatedYears
    .map(({ year }) => year)
    .sort((a, b) => Number(b) - Number(a))[0]
  if (!newestYear) throw new Error("Speaking archive has no appearances")
  const years = page.locator("details")
  await expect(years.locator("summary")).toHaveText(
    populatedYears.map(({ year }) => year),
  )
  await expect(page.locator("details[open] summary")).toHaveText([newestYear])
  await expect(page.locator("details[open] li a").first()).toBeVisible()

  const olderYear = page.locator("details:not([open])").first()
  const olderYearLabel = await olderYear.locator("summary").innerText()
  const disclosure = years.filter({
    has: page.getByText(olderYearLabel, { exact: true }),
  })
  await expect(disclosure.locator("li a").first()).toBeHidden()
  await disclosure.locator("summary").click()
  await expect(disclosure.locator("li a").first()).toBeVisible()
  await disclosure.locator("summary").click()
  await expect(disclosure.locator("li a").first()).toBeHidden()
})

test("404 page", async ({ page }) => {
  await page.goto("/this-page-does-not-exist/")
  await expect(page.locator('[aria-label="404 Not Found"]')).toBeVisible()
  await expect(page.getByText("Page Not Found")).toBeVisible()
})

test("tags index page lists tags", async ({ page }) => {
  await page.goto("/tags/")
  await expect(page).toHaveTitle(/Tags/)
  await expect(
    page.locator('#main-content a[href*="/tags/"]').first(),
  ).toBeVisible()
})

test("tag detail page lists posts", async ({ page }) => {
  await page.goto("/tags/")

  const firstTag = page.locator('#main-content a[href*="/tags/"]').first()
  await firstTag.click()

  await expect(page).toHaveURL(/\/tags\/[^/]+\/?$/)
  await expect(page.locator("#main-content ul li").first()).toBeVisible()
})

test("blog post shows tags", async ({ page }) => {
  await page.goto("/blog/")

  const firstLink = page.locator("#main-content ul li a").first()
  const href = await firstLink.getAttribute("href")
  expect(href).toBeTruthy()

  await page.goto(href!)
  await expect(page.locator('a[href^="/tags/"]').first()).toBeVisible()
})

test("navigation links", async ({ page }) => {
  await page.goto("/")

  await expect(
    page.locator("#menu-items").getByRole("link", { name: "Tags" }),
  ).toHaveCount(0)

  const navLinks = [
    { name: "Writing", url: /\/blog\/?$/ },
    { name: "Speaking", url: /\/talks\/?$/ },
    { name: "About", url: /\/about\/?$/ },
    { name: "Search writing", url: /\/search\/?$/ },
  ]

  for (const { name, url } of navLinks) {
    await page.goto("/")
    await page
      .locator("#menu-items")
      .getByRole("link", { name, exact: true })
      .click()
    await expect(page).toHaveURL(url)
  }
})
