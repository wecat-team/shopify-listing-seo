#!/usr/bin/env node
// Check SKILL.md against the limits the ChatGPT and Claude skill loaders enforce,
// so a bundle is never published that the uploader will reject.
//
//   node scripts/validate-skill.mjs
//
// Exists because a description grew past 1024 characters and shipped: the length
// was printed during editing but never compared against anything.
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';

const path = fileURLToPath(new URL('../SKILL.md', import.meta.url));
const text = readFileSync(path, 'utf8');

const fm = /^---\n([\s\S]*?)\n---/.exec(text);
if (!fm) {
  process.stderr.write('SKILL.md has no YAML front matter\n');
  process.exit(1);
}

/** Front matter is flat `key: value`, with values that may wrap onto later lines. */
function parse(block) {
  const out = {};
  let key = null;
  for (const line of block.split('\n')) {
    const m = /^([A-Za-z][A-Za-z0-9_-]*):\s?([\s\S]*)$/.exec(line);
    if (m) {
      key = m[1];
      out[key] = m[2];
    } else if (key && line.trim()) {
      out[key] += ` ${line.trim()}`;
    }
  }
  return out;
}

const meta = parse(fm[1]);
const problems = [];

const name = (meta.name ?? '').trim();
if (!name) problems.push('name is missing');
else if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name)) {
  problems.push(`name "${name}" should be lowercase words joined by hyphens`);
}

const description = (meta.description ?? '').trim();
if (!description) problems.push('description is missing');
else if (description.length > 1024) {
  problems.push(`description is ${description.length} characters, over the 1024 limit`);
}

const report = [
  `name        ${name || '(missing)'}`,
  `description ${description.length} / 1024 characters`,
].join('\n');

if (problems.length) {
  process.stderr.write(`${report}\n\n`);
  for (const p of problems) process.stderr.write(`  ✗ ${p}\n`);
  process.exit(1);
}
process.stdout.write(`${report}\n\nSKILL.md front matter is valid.\n`);
