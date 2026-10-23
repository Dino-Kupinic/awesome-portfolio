import { test } from "node:test"
import assert from "node:assert/strict"
import { portfolioSchema, technologies } from "./portfolio.ts"
import { techSlug } from "./tech.ts"

const valid = {
  author: "Jane Doe",
  url: "https://jane.dev/",
  techStack: ["Astro", "Tailwind CSS"],
}

test("accepts a Portfolio without added", () => {
  assert.ok(portfolioSchema.safeParse(valid).success)
})

test("parses added into a Date", () => {
  const { added } = portfolioSchema.parse({ ...valid, added: "2025-02-24" })
  assert.equal(added?.toISOString(), "2025-02-24T00:00:00.000Z")
})

test("rejects an unknown Technology", () => {
  assert.ok(
    !portfolioSchema.safeParse({ ...valid, techStack: ["Tailwind"] }).success
  )
})

test("rejects a missing field", () => {
  const { url, ...noUrl } = valid
  assert.ok(!portfolioSchema.safeParse(noUrl).success)
})

test("rejects an extra field", () => {
  assert.ok(
    !portfolioSchema.safeParse({ ...valid, source: "https://github.com/x" })
      .success
  )
})

test("techSlug makes URL-safe slugs", () => {
  assert.equal(techSlug("Tailwind CSS"), "tailwind-css")
  assert.equal(techSlug("Next.js"), "next-js")
})

test("every Technology has a unique slug", () => {
  assert.equal(new Set(technologies.map(techSlug)).size, technologies.length)
})
