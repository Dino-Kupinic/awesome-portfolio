# Contributing to Awesome Portfolio

Thanks for adding to the list! Each Portfolio is one small YAML file in the [`portfolios/`](https://github.com/odhyp/awesome-portfolios/tree/main/portfolios) folder. Add yours in a pull request and the rest is automatic.

## Guidelines

- The Portfolio must be **publicly accessible** and **functional**.
- Only **personal** portfolio websites: no client work or agencies.
- You may add someone else's Portfolio; the file describes its Author, not you.

## The template

```yaml
author: Jane Doe
url: https://jane.dev/
techStack: [Astro, Tailwind CSS, TypeScript]
```

- `author`: the Author's name, as it should appear on the site.
- `url`: the Portfolio's public address, starting with `https://` (or `http://`).
- `techStack`: the Tech Stack, i.e. what the Portfolio is built with: at least one Technology. Each must be spelled exactly as in [`portfolios/_technologies.yaml`](https://github.com/odhyp/awesome-portfolios/blob/main/portfolios/_technologies.yaml).

Name the file after the Author in kebab-case: `Jane Doe` becomes `jane-doe.yaml`.

## Option 1: in the browser

1. Open the [`portfolios/`](https://github.com/odhyp/awesome-portfolios/tree/main/portfolios) folder on GitHub.
2. Click **Add file → Create new file**. GitHub will offer to fork the repository for you.
3. Name the file (e.g. `jane-doe.yaml`) and paste the template with your details.
4. Click **Commit changes…**, then **Propose changes**, then **Create pull request**.

## Option 2: from a clone

1. Fork the repository and clone your fork.
2. Create `portfolios/jane-doe.yaml` from the template.
3. Optionally check it locally: `cd web && pnpm install && pnpm run validate`.
4. Commit, push to your fork, and open a pull request.

## Adding a new Technology

If a Technology you need isn't in the list, add it to [`portfolios/_technologies.yaml`](https://github.com/odhyp/awesome-portfolios/blob/main/portfolios/_technologies.yaml) in the same pull request, keeping the list alphabetical. Use its official spelling (e.g. `Next.js`, not `nextjs`).

## What the PR check catches

Every pull request touching `portfolios/` is checked automatically. It fails, with the file and the reason, when:

- the YAML doesn't parse;
- a field is missing, misspelled, or unknown;
- the URL isn't a valid `http(s)` address;
- a Technology isn't in the fixed list;
- the file name doesn't match the Author (`jane-doe.yaml` for `Jane Doe`);
- the URL is already listed in another file.

## What happens after merge

Only add your file: never edit the README table or `added` yourself. Once merged, a bot:

- stamps the date it was `added` into your file;
- captures a Screenshot of the URL for the site;
- regenerates the Portfolio table in the README.

Happy contributing! 🎨
