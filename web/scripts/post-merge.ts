// `npm run post-merge`: stamps today's date as `added` into new Portfolios and regenerates the README table.
import { readFileSync, writeFileSync } from 'node:fs';
import { parse } from 'yaml';
import { portfolioFiles, portfolioSchema, portfoliosDir } from '../src/portfolio.ts';
import { stampAdded, writeTable } from '../src/post-merge.ts';

const today = new Date().toISOString().slice(0, 10);
const portfolios = portfolioFiles().map((name) => {
  const file = new URL(name, portfoliosDir);
  const text = readFileSync(file, 'utf8');
  const stamped = stampAdded(text, today);
  if (stamped !== text) {
    writeFileSync(file, stamped);
    console.log(`stamped ${name} added: ${today}`);
  }
  return portfolioSchema.parse(parse(stamped));
});

const readme = new URL('../README.md', portfoliosDir);
writeFileSync(readme, writeTable(readFileSync(readme, 'utf8'), portfolios));
