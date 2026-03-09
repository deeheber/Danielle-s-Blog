import { test, expect } from "@playwright/test"

test("main page loads with recent posts and talks", async ({ page }) => {
  await page.goto("/")
  await expect(page).toHaveTitle(/Danielle/)

  const recentBlog = page.locator("#recent-blog")
  await expect(recentBlog.locator("h2")).toHaveText("Recent Blog Posts")
  await expect(recentBlog.locator("li").first()).toBeVisible()

  const recentTalks = page.locator("#recent-talks")
  await expect(recentTalks.locator("h2")).toHaveText("Recent Talks")
  await expect(recentTalks.locator("li#talk-list").first()).toBeVisible()
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
  await expect(page.getByText("Found")).toBeVisible()
})

test("blog post renders content", async ({ page }) => {
  await page.goto("/blog/Building-My-Own-Jamstack/")
  await expect(page).toHaveTitle(/Building My Own Jamstack/)

  const article = page.locator("article#article")
  await expect(article).toBeVisible()
  await expect(page.locator("h1.post-title")).toContainText(
    "Building My Own Jamstack",
  )
  await expect(article.locator("img").first()).toBeVisible()
  await expect(article.locator("pre code").first()).toBeVisible()
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
