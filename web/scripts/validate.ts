// `pnpm run validate`: the PR check over every file in portfolios/. Unreachable URLs only warn.
import { readdirSync, readFileSync } from "node:fs"
import { parse } from "yaml"
import { portfoliosDir } from "../src/portfolio.ts"
import { findProblems } from "../src/validate.ts"

// Every non-`_` file, so a stray `.yml` or other file is flagged instead of silently ignored by the site.
const files = readdirSync(portfoliosDir, { withFileTypes: true })
  .filter((entry) => entry.isFile() && !entry.name.startsWith("_"))
  .map(({ name }) => ({
    name,
    text: readFileSync(new URL(name, portfoliosDir), "utf8"),
  }))

const problems = findProblems(files)
for (const problem of problems) console.error(`error: ${problem}`)

await Promise.all(
  files.map(async ({ name, text }) => {
    let url: unknown
    try {
      url = parse(text)?.url
    } catch {}
    if (typeof url !== "string" || !URL.canParse(url)) return
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(15_000) })
      if (!res.ok)
        console.warn(`warning: ${name}: ${url} responded ${res.status}`)
    } catch (e) {
      console.warn(
        `warning: ${name}: ${url} is unreachable (${(e as Error).message})`
      )
    }
  })
)

console.log(`${files.length} Portfolios checked, ${problems.length} problems.`)
if (problems.length) process.exitCode = 1
