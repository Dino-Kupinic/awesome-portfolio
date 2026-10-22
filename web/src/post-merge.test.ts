import { test } from 'node:test';
import assert from 'node:assert/strict';
import { stampAdded, writeTable } from './post-merge.ts';

test('stamps added onto a Portfolio missing it, keeping its text', () => {
  assert.equal(
    stampAdded('# hi\nauthor: Jane Doe\nurl: https://jane.dev/\ntechStack: [Astro]\n', '2026-10-22'),
    '# hi\nauthor: Jane Doe\nurl: https://jane.dev/\ntechStack: [Astro]\nadded: 2026-10-22\n',
  );
});

test('stamps a file with no trailing newline', () => {
  assert.equal(stampAdded('author: Jane Doe', '2026-10-22'), 'author: Jane Doe\nadded: 2026-10-22\n');
});

test('leaves an already stamped Portfolio alone', () => {
  const text = 'author: Jane Doe\nadded: 2025-01-01\n';
  assert.equal(stampAdded(text, '2026-10-22'), text);
});

const jane = { author: 'Jane Doe', url: 'https://www.jane.dev/', techStack: ['Astro', 'Tailwind CSS'], added: new Date('2025-01-01') };
const john = { author: 'John Roe', url: 'https://john.io/work', techStack: ['Hugo'], added: new Date('2026-05-05') };

test('writes the Portfolio table newest first between the markers', () => {
  const readme = 'intro\n<!-- portfolios:start -->\nstale\n<!-- portfolios:end -->\noutro\n';
  assert.equal(
    writeTable(readme, [jane, john]),
    'intro\n<!-- portfolios:start -->\n' +
      '| Author | URL | Tech Stack |\n| --- | --- | --- |\n' +
      '| John Roe | [john.io/work](https://john.io/work) | Hugo |\n' +
      '| Jane Doe | [jane.dev](https://www.jane.dev/) | Astro, Tailwind CSS |\n' +
      '<!-- portfolios:end -->\noutro\n',
  );
});

test('escapes pipes so an Author cannot break the table', () => {
  const readme = '<!-- portfolios:start -->\n<!-- portfolios:end -->\n';
  assert.match(writeTable(readme, [{ ...jane, author: 'Jane | Doe' }]), /\| Jane \\\| Doe \|/);
});

test('throws when the README lacks the markers', () => {
  assert.throws(() => writeTable('no markers', [jane]), /portfolios:start/);
});
