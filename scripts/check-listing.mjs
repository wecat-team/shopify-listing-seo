#!/usr/bin/env node
// Check one listing, or a whole catalog, against the rules in references/field-rules.md.
//
//   node scripts/check-listing.mjs listing.json  --suffix " | Brand"
//   node scripts/check-listing.mjs catalog.json  --suffix " | Brand" --catalog
//   cat listing.json | node scripts/check-listing.mjs - --suffix " | Brand"
//
// Exits 1 when any rule fails, so it drops straight into a pre-publish hook.
// Counting characters by hand is where the off-by-a-few errors come from; this
// exists so nobody has to.
import {readFileSync} from 'node:fs';

const argv = process.argv.slice(2);
const file = argv.find((a) => !a.startsWith('--')) ?? '-';
const flag = (name, fallback) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : fallback;
};
const CATALOG = argv.includes('--catalog');
const JSON_OUT = argv.includes('--json');
const SUFFIX = flag('suffix', '');
const TITLE_TAG_MAX = Number(flag('title-tag-max', '60'));
const SEO_TITLE_MAX = TITLE_TAG_MAX - SUFFIX.length;

const FILLER = /-(for|the|and|with|your|of|to|a|an)-/;
const STOP_EXT = /\.(jpe?g|png|webp|gif|avif)$/i;

const text = (v) => (v ?? '').toString().replace(/\s+/g, ' ').trim();
const plain = (html) => text((html ?? '').replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' '));
const words = (html) => plain(html).split(' ').filter(Boolean).length;

/** One finding. `level` is 'error' (blocks publish) or 'warn' (worth a look). */
const F = (level, rule, message) => ({level, rule, message});

function checkOne(p) {
  const out = [];
  const title = text(p.title);
  const seoTitle = text(p.seoTitle ?? p.seo?.title);
  const meta = text(p.metaDescription ?? p.seo?.description);
  const handle = text(p.handle);
  const body = p.bodyHtml ?? p.descriptionHtml ?? p.body ?? '';
  const images = p.images ?? [];

  // --- 2. Product title ---
  if (!title) out.push(F('error', 'title', 'missing'));
  else {
    if (title.length < 45 || title.length > 70) {
      out.push(F('error', 'title', `${title.length} chars, want 45-70`));
    }
    const ws = title.split(' ');
    const rep = ws.find((w, i) =>
      i > 0 && w.length > 3 && w.toLowerCase().replace(/[,|]/g, '') === ws[i - 1].toLowerCase().replace(/[,|]/g, ''));
    if (rep) out.push(F('error', 'title', `word "${rep}" repeated back to back`));
    if ((title.match(/,/g) || []).length >= 3) {
      out.push(F('warn', 'title', 'three or more commas reads as a marketplace keyword tail'));
    }
  }

  // --- 3. SEO title ---
  // Shopify stores null when it equals the product title, so the product title
  // is what renders. Check whichever one actually reaches the <title> tag.
  const effective = seoTitle || title;
  if (effective) {
    const rendered = effective.length + SUFFIX.length;
    if (rendered > TITLE_TAG_MAX) {
      out.push(F('error', 'seoTitle',
        `<title> renders ${rendered} chars (${effective.length} + "${SUFFIX}"), want <= ${TITLE_TAG_MAX}` +
        (seoTitle ? '' : ` — set an SEO title of at most ${SEO_TITLE_MAX} chars`)));
    }
  }

  // --- 4. Meta description ---
  if (!meta) out.push(F('error', 'metaDescription', 'missing'));
  else if (meta.length < 120 || meta.length > 155) {
    out.push(F('error', 'metaDescription', `${meta.length} chars, want 120-155`));
  }

  // --- 5. Handle ---
  if (!handle) out.push(F('error', 'handle', 'missing'));
  else {
    const parts = handle.split('-').filter(Boolean);
    if (parts.length > 5) out.push(F('warn', 'handle', `${parts.length} words, want 3-5 (do not change a handle that already ranks)`));
    if (FILLER.test(`-${handle}-`)) out.push(F('warn', 'handle', 'contains a filler word'));
    if (handle !== handle.toLowerCase() || /[^a-z0-9-]/.test(handle)) {
      out.push(F('error', 'handle', 'must be lowercase letters, digits and hyphens'));
    }
  }

  // --- 6. Body copy ---
  const w = words(body);
  if (w < 250) out.push(F('error', 'body', `${w} words, want 250+`));
  const lower = plain(body).toLowerCase();
  const hasDimensions = /\b\d+\s*(x|×|by)\s*\d+\b/.test(lower) || /\b\d+(\.\d+)?\s?(inch|inches|in\b|cm|mm)\b/.test(lower);
  if (!hasDimensions) out.push(F('error', 'body', 'no concrete dimensions — long-tail size queries cannot match'));
  if (!/\b(business day|business days|working days|ships|delivery|production)\b/.test(lower)) {
    out.push(F('error', 'body', 'no production or delivery timing'));
  }

  // --- 7. Images ---
  images.forEach((img, i) => {
    const src = text(img.src ?? img.filename ?? img.url);
    const alt = text(img.alt);
    const name = src.split('?')[0].split('/').pop() ?? '';
    if (!alt) out.push(F('error', 'images', `image ${i + 1} has no alt text`));
    if (name && (/^(img|dsc|image|photo|untitled)[-_ ]?\d+/i.test(name) || /^\d+\.(jpe?g|png|webp)$/i.test(name))) {
      out.push(F('warn', 'images', `image ${i + 1} filename "${name}" is not descriptive`));
    }
    if (name && STOP_EXT.test(name) && name.includes('_') && !name.includes('-')) {
      out.push(F('warn', 'images', `image ${i + 1} filename uses underscores, prefer hyphens`));
    }
    const wpx = img.width, hpx = img.height;
    if (wpx && hpx && (wpx < 1000 || hpx < 1000)) {
      out.push(F('warn', 'images', `image ${i + 1} is ${wpx}x${hpx}, shoot at least 1000x1000`));
    }
  });
  if (!images.length) out.push(F('warn', 'images', 'no images supplied to check'));

  // --- 8. Collections ---
  if (Array.isArray(p.collections) && p.collections.length === 0) {
    out.push(F('error', 'collections', 'not in any collection'));
  }

  return out;
}

/** Cross-listing rules a single-listing check cannot see. */
function checkCatalog(items) {
  const out = [];
  const group = (key, label, rule) => {
    const m = new Map();
    for (const p of items) {
      const k = key(p);
      if (!k) continue;
      if (!m.has(k)) m.set(k, []);
      m.get(k).push(text(p.handle) || '(no handle)');
    }
    for (const [, hs] of m) {
      if (hs.length > 1) out.push(F('error', rule, `${label} shared by ${hs.length}: ${hs.slice(0, 4).join(', ')}${hs.length > 4 ? ' …' : ''}`));
    }
  };
  group((p) => text(p.metaDescription ?? p.seo?.description).toLowerCase(), 'meta description', 'duplicate-meta');
  group((p) => text(p.seoTitle ?? p.seo?.title).toLowerCase(), 'SEO title', 'duplicate-seo-title');
  group((p) => plain(p.bodyHtml ?? p.descriptionHtml ?? p.body ?? '').slice(0, 250).toLowerCase(), 'body copy opening', 'duplicate-body');
  group((p) => text(p.primaryKeyword).toLowerCase(), 'primary keyword', 'keyword-cannibalization');
  return out;
}

// --- run ---
const raw = file === '-' ? readFileSync(0, 'utf8') : readFileSync(file, 'utf8');
let data;
try {
  data = JSON.parse(raw);
} catch (e) {
  process.stderr.write(`Could not parse ${file === '-' ? 'stdin' : file} as JSON: ${e.message}\n`);
  process.exit(2);
}
const items = Array.isArray(data) ? data : [data];
if (Array.isArray(data) && !CATALOG) {
  process.stderr.write('Input is an array — pass --catalog to also check cross-listing duplicates.\n');
}

const results = items.map((p) => ({handle: text(p.handle) || text(p.title).slice(0, 40) || '(unnamed)', findings: checkOne(p)}));
const catalogFindings = CATALOG ? checkCatalog(items) : [];

const errors = results.reduce((n, r) => n + r.findings.filter((f) => f.level === 'error').length, 0)
  + catalogFindings.filter((f) => f.level === 'error').length;
const warns = results.reduce((n, r) => n + r.findings.filter((f) => f.level === 'warn').length, 0)
  + catalogFindings.filter((f) => f.level === 'warn').length;

if (JSON_OUT) {
  process.stdout.write(`${JSON.stringify({suffix: SUFFIX, seoTitleMax: SEO_TITLE_MAX, errors, warns, listings: results, catalog: catalogFindings}, null, 2)}\n`);
} else {
  process.stdout.write(`Brand suffix "${SUFFIX}" → SEO title budget ${SEO_TITLE_MAX} chars\n\n`);
  for (const r of results) {
    if (!r.findings.length) { process.stdout.write(`  PASS  ${r.handle}\n`); continue; }
    process.stdout.write(`  FAIL  ${r.handle}\n`);
    for (const f of r.findings) {
      process.stdout.write(`        ${f.level === 'error' ? 'x' : '!'} ${f.rule}: ${f.message}\n`);
    }
  }
  if (catalogFindings.length) {
    process.stdout.write('\n  across the catalog\n');
    for (const f of catalogFindings) {
      process.stdout.write(`        ${f.level === 'error' ? 'x' : '!'} ${f.rule}: ${f.message}\n`);
    }
  }
  process.stdout.write(`\n${items.length} listing(s): ${errors} error(s), ${warns} warning(s)\n`);
}
process.exit(errors ? 1 : 0);
