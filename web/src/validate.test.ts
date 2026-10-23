import { test } from "node:test"
import { readFileSync } from "node:fs"
import assert from "node:assert/strict"
import { findProblems } from "./validate.ts"

const jane = {
  name: "jane-doe.yaml",
  text: "author: Jane Doe\nurl: https://jane.dev/\ntechStack: [Astro]\n",
}

test("accepts a valid Portfolio without added", () => {
  assert.deepEqual(findProblems([jane]), [])
})

test("reports schema problems with the file name", () => {
  const [problem] = findProblems([
    {
      name: "jane-doe.yaml",
      text: "author: Jane Doe\ntechStack: [Tailwind]\n",
    },
  ])
  assert.match(problem, /^jane-doe\.yaml: /)
  assert.match(problem, /url/)
  assert.match(problem, /Unknown Technology "Tailwind"/)
})

test("reports invalid YAML", () => {
  assert.equal(findProblems([{ name: "x.yaml", text: "author: [" }]).length, 1)
})

test("reports a file name not matching the kebab-case Author", () => {
  const [problem] = findProblems([{ ...jane, name: "jane.yaml" }])
  assert.match(problem, /should be named jane-doe\.yaml/)
})

test("reports a duplicate URL, ignoring a trailing slash", () => {
  const john = {
    name: "john-doe.yaml",
    text: "author: John Doe\nurl: https://jane.dev\ntechStack: [Astro]\n",
  }
  const [problem] = findProblems([jane, john])
  assert.match(problem, /^john-doe\.yaml: .*jane-doe\.yaml/)
})

test("CONTRIBUTING.md's template passes as-is", () => {
  const guide = readFileSync(
    new URL("../../CONTRIBUTING.md", import.meta.url),
    "utf8"
  )
  const text = guide.match(/```yaml\n([\s\S]*?)```/)?.[1]
  assert.ok(text, "CONTRIBUTING.md needs a ```yaml template block")
  assert.deepEqual(findProblems([{ name: "jane-doe.yaml", text }]), [])
})
