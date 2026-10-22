import { test } from 'node:test';
import assert from 'node:assert/strict';
import { portfolioSchema } from './portfolio.ts';

const valid = { author: 'Jane Doe', url: 'https://jane.dev/', techStack: ['Astro', 'Tailwind CSS'] };

test('accepts a Portfolio without added', () => {
  assert.ok(portfolioSchema.safeParse(valid).success);
});

test('parses added into a Date', () => {
  const { added } = portfolioSchema.parse({ ...valid, added: '2025-02-24' });
  assert.equal(added?.toISOString(), '2025-02-24T00:00:00.000Z');
});

test('rejects an unknown Technology', () => {
  assert.ok(!portfolioSchema.safeParse({ ...valid, techStack: ['Tailwind'] }).success);
});

test('rejects a missing field', () => {
  const { url, ...noUrl } = valid;
  assert.ok(!portfolioSchema.safeParse(noUrl).success);
});

test('rejects an extra field', () => {
  assert.ok(!portfolioSchema.safeParse({ ...valid, source: 'https://github.com/x' }).success);
});
