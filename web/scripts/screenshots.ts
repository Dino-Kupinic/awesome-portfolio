// `npm run screenshots`: captures missing Screenshots; `-- --all` retakes every one, `-- <slug>` retakes one.
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { parse } from 'yaml';
import { portfolioFiles, portfoliosDir } from '../src/portfolio.ts';

const screenshotsDir = new URL('../public/screenshots/', import.meta.url);
const shot = (slug: string) => new URL(`${slug}.png`, screenshotsDir);

const slugs = portfolioFiles().map((name) => name.slice(0, -'.yaml'.length));
// pnpm passes the `--` separator through; npm strips it.
const arg = process.argv.slice(2).find((a) => a !== '--');
if (arg && arg !== '--all' && !slugs.includes(arg)) throw new Error(`No Portfolio at portfolios/${arg}.yaml`);
const targets = arg === '--all' ? slugs : arg ? [arg] : slugs.filter((slug) => !existsSync(shot(slug)));

const browser = await chromium.launch();
try {
  // 1280x720 matches the grid's aspect-video cards.
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  for (const slug of targets) {
    const { url } = parse(readFileSync(new URL(`${slug}.yaml`, portfoliosDir), 'utf8'));
    try {
      await page.goto(url, { waitUntil: 'load', timeout: 30_000 });
      // Let intro animations settle.
      await page.waitForTimeout(2_000);
      await page.screenshot({ path: fileURLToPath(shot(slug)) });
      console.log(`captured ${slug}`);
    } catch (e) {
      // A down site only warns, so the bot still commits the rest; its Screenshot stays missing and is retried next run.
      console.warn(`warning: ${slug}: ${url} could not be captured (${(e as Error).message})`);
    }
  }
} finally {
  await browser.close();
}
console.log(`${targets.length} Screenshots attempted.`);
