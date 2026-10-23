# web

The site: an [Astro](https://astro.build) build of every Portfolio in `../portfolios/`, deployed to Cloudflare Workers. It also holds the scripts behind the PR check and the post-merge bot.

Use [pnpm](https://pnpm.io). Run every command from `web/`.

| Command                | Action                                                                |
| :--------------------- | :-------------------------------------------------------------------- |
| `pnpm install`         | Installs dependencies                                                 |
| `pnpm dev`             | Starts the dev server at `localhost:4321`                             |
| `pnpm build`           | Builds the site to `./dist/`                                          |
| `pnpm preview`         | Previews the build locally                                            |
| `pnpm run test`        | Runs the unit tests (`src/**/*.test.ts`)                              |
| `pnpm run validate`    | The PR check: validates every file in `../portfolios/`                |
| `pnpm run screenshots` | Captures missing Screenshots; `--all` retakes every one, `<slug>` one |
| `pnpm run post-merge`  | Stamps `added` on new Portfolios and regenerates the README table     |

## Layout

```text
src/
├── pages/          home, /tech, /tech/<slug>, /guide (renders ../CONTRIBUTING.md), 404
├── layouts/        Layout.astro: the shared header and page shell
├── components/     PortfolioGrid.astro: the Screenshot tiles
├── styles/         global.css: Tailwind and the Geist font
└── *.ts            Portfolio loading, validation and post-merge logic, with tests
scripts/            entry points for validate, screenshots and post-merge
public/screenshots/ one 1280x720 PNG per Portfolio
```

## Design

A minimal gallery: stone neutrals with an emerald accent, Geist, Screenshot-dominant tiles with the Author, URL and Technologies below. Light and dark follow the system: Tailwind's media-based `dark:` variant, and `prefers-color-scheme` in the guide's prose CSS.
