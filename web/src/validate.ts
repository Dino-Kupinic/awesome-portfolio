// The PR check: every Portfolio file must pass the site's schema, be named after its Author, and have a unique URL.
import { parse } from "yaml"
import { portfolioSchema } from "./portfolio.ts"
import { techSlug } from "./tech.ts"

export const findProblems = (files: { name: string; text: string }[]) => {
  const problems: string[] = []
  const urls = new Map<string, string>()
  for (const { name, text } of files) {
    let data: unknown
    try {
      data = parse(text)
    } catch (e) {
      problems.push(`${name}: invalid YAML: ${(e as Error).message}`)
      continue
    }
    const result = portfolioSchema.safeParse(data)
    if (!result.success) {
      problems.push(
        `${name}: ${result.error.issues.map((i) => `${i.path.join(".") || "(file)"}: ${i.message}`).join("; ")}`
      )
      continue
    }
    const { author, url } = result.data
    const expected = `${techSlug(author)}.yaml`
    if (name !== expected)
      problems.push(`${name}: should be named ${expected} after its Author`)
    // URL normalizes scheme and host case; paths stay case-sensitive.
    const key = new URL(url).href.replace(/\/+$/, "")
    const other = urls.get(key)
    if (other)
      problems.push(`${name}: URL ${url} is already listed in ${other}`)
    else urls.set(key, name)
  }
  return problems
}
