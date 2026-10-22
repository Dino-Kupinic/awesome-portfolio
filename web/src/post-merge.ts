// Pure steps of the post-merge bot (scripts/post-merge.ts).
import { parse } from 'yaml';
import type { Portfolio } from './portfolio.ts';

// Appends `added: <date>` to a Portfolio file's text if missing, leaving the rest as the contributor wrote it.
export const stampAdded = (text: string, date: string) =>
  parse(text)?.added ? text : `${text.replace(/\n*$/, '\n')}added: ${date}\n`;

const start = '<!-- portfolios:start -->';
const end = '<!-- portfolios:end -->';
const cell = (s: string) => s.replaceAll('|', '\\|');

// Replaces whatever sits between the README's markers with the Portfolio table, newest first like the site.
export const writeTable = (readme: string, portfolios: Portfolio[]) => {
  const from = readme.indexOf(start);
  const to = readme.indexOf(end);
  if (from < 0 || to < from) throw new Error(`README needs ${start} followed by ${end}`);
  const rows = portfolios
    .toSorted((a, b) => (b.added?.getTime() ?? 0) - (a.added?.getTime() ?? 0))
    .map(({ author, url, techStack }) => {
      const { host, pathname } = new URL(url);
      const label = (host + pathname).replace(/^www\./, '').replace(/\/+$/, '');
      return `| ${cell(author)} | [${cell(label)}](${url}) | ${cell(techStack.join(', '))} |`;
    });
  const table = ['| Author | URL | Tech Stack |', '| --- | --- | --- |', ...rows].join('\n');
  return `${readme.slice(0, from + start.length)}\n${table}\n${readme.slice(to)}`;
};
