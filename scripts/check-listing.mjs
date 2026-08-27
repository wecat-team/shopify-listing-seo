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
const SEO_TITLE_MAX = TITLE_TAG_MAX - SUFFIX.length; // rule-of-thumb only; px is what counts

// Vietnamese-specific letters. Detects a listing written in the conversation
// language instead of the selling language — the common failure when a seller
// answers in Vietnamese and the model mirrors it back. Deliberately narrow:
// English copy legitimately carries é, ü, ’ and – so those are not flagged.
const VI_LETTERS = /[ăâđêôơưĂÂĐÊÔƠƯ]|[àáảãạằắẳẵặầấẩẫậèéẻẽẹềếểễệìíỉĩịòóỏõọồốổỗộờớởỡợùúủũụừứửữựỳýỷỹỵ]/i;
const looksVietnamese = (s) => VI_LETTERS.test(s ?? '');
const HANDLE_MAX = 255; // Shopify: "Handle is too long (maximum is 255 characters)"
// Google Merchant Center product data spec, `title` attribute.
// Arial 20px advance widths, measured with canvas measureText. Google truncates
// the title link by pixel width, not character count — "i" is 4.4px and "W" is
// 18.9px, so a character budget mis-sizes wide titles by 100px or more.
const ARIAL20 = {' ':5.557,'!':5.557,'"':7.1,'#':11.123,'$':11.123,'%':17.783,'&':13.34,"'":3.818,
  '(':6.66,')':6.66,'*':7.783,'+':11.68,',':5.557,'-':6.66,'.':5.557,'/':5.557,':':5.557,';':5.557,
  '?':11.123,'@':20.303,'[':5.556,']':5.556,'|':5.195,'—':20,'–':11.123,'’':4.443,
  '0':11.123,'1':11.123,'2':11.123,'3':11.123,'4':11.123,'5':11.123,'6':11.123,'7':11.123,'8':11.123,'9':11.123,
  A:13.34,B:13.34,C:14.443,D:14.443,E:13.34,F:12.217,G:15.557,H:14.443,I:5.557,J:10,K:13.34,L:11.123,
  M:16.66,N:14.443,O:15.557,P:13.34,Q:15.557,R:14.443,S:13.34,T:12.217,U:14.443,V:13.34,W:18.877,
  X:13.34,Y:13.34,Z:12.217,
  a:11.123,b:11.123,c:10,d:11.123,e:11.123,f:5.557,g:11.123,h:11.123,i:4.443,j:4.443,k:10,l:4.443,
  m:16.66,n:11.123,o:11.123,p:11.123,q:11.123,r:6.66,s:10,t:5.557,u:11.123,v:10,w:14.443,x:10,y:10,z:10};
const titlePx = (s) => [...s].reduce((n, ch) => n + (ARIAL20[ch] ?? 11.1), 0);
// Third-party measurement puts desktop truncation near 580-600px. Google
// publishes no number at all, so this is convention, not a rule.
const TITLE_PX_BUDGET = 600;
const TITLE_PX_SAFE = 580;
const TITLE_MAX = 150;      // hard limit: truncated + feed warning past this
const TITLE_VISIBLE = 70;   // "users will usually notice only the first 70 or fewer"
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
  // Length rules come from Google Merchant Center's feed `title` spec, the only
  // primary source that states any number: 1-150 hard, "users will usually
  // notice only the first 70 or fewer characters", "use all 150 characters",
  // "put the most important details first". There is no sourced 45-70 rule, so
  // this does not enforce one - it checks the front-loading Google does document.
  if (!title) out.push(F('error', 'title', 'missing'));
  else {
    // 150 is the Merchant Center *feed* title limit. Whether it binds depends on
    // whether the shop feeds the product title or the SEO title to the Google
    // channel, so this warns rather than fails.
    if (title.length > TITLE_MAX) {
      out.push(F('warn', 'title', `${title.length} chars — past the ${TITLE_MAX}-char Merchant Center feed limit, and long for an <h1>`));
    }
    if (title.length < 25) {
      out.push(F('warn', 'title', `${title.length} chars — too short to identify the product or match many queries`));
    }
    // The first ~70 characters are what a shopper actually reads, so the
    // product's core name has to fit there. Checking that the leading segment
    // (up to the first comma) fits is the useful test; demanding that char 70
    // land exactly on a space would fire on most titles for no reason.
    if (title.length > TITLE_VISIBLE) {
      const lead = title.split(/\s*[,|]\s*/)[0];
      if (lead.length > TITLE_VISIBLE) {
        out.push(F('warn', 'title', `the leading phrase runs ${lead.length} chars — a shopper sees about ${TITLE_VISIBLE}, so put the distinguishing words earlier`));
      }
    }
    const ws = title.split(' ');
    const rep = ws.find((w, i) =>
      i > 0 && w.length > 3 && w.toLowerCase().replace(/[,|]/g, '') === ws[i - 1].toLowerCase().replace(/[,|]/g, ''));
    // Keyword stuffing is defined qualitatively by Google - unnatural
    // repetition - so repetition is the thing worth flagging, not length.
    if (rep) out.push(F('error', 'title', `word "${rep}" repeated back to back`));
    if (/\b(SALE|BEST|CHEAP|FREE SHIPPING)\b/.test(title)) {
      out.push(F('warn', 'title', 'promotional text is disallowed in Merchant Center feed titles'));
    }
    if (title === title.toUpperCase() && /[A-Z]{4,}/.test(title)) {
      out.push(F('warn', 'title', 'all capitals — disallowed in Merchant Center feed titles and hard to read as an <h1>'));
    }
  }

  // --- 3. SEO title ---
  // Shopify stores null when it equals the product title, so the product title
  // is what renders. Check whichever one actually reaches the <title> tag.
  const effective = seoTitle || title;
  if (effective) {
    const px = titlePx(effective + SUFFIX);
    const chars = effective.length + SUFFIX.length;
    if (px > TITLE_PX_BUDGET) {
      out.push(F('error', 'seoTitle',
        `<title> renders ${Math.round(px)}px (${chars} chars incl. "${SUFFIX}") — over the ~${TITLE_PX_BUDGET}px desktop cut` +
        (seoTitle ? '' : ' — set a separate SEO title')));
    } else if (px > TITLE_PX_SAFE) {
      out.push(F('warn', 'seoTitle',
        `<title> renders ${Math.round(px)}px — within ${TITLE_PX_BUDGET}px but past the ${TITLE_PX_SAFE}px safe mark, trim if it has many capitals`));
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
    // Shopify's own limit. Nobody publishes an optimal handle length, and the
    // handle is not one of the fields storefront search reads, so length is not
    // checked beyond the hard maximum.
    if (handle.length > HANDLE_MAX) {
      out.push(F('error', 'handle', `${handle.length} chars, over Shopify's ${HANDLE_MAX}-character maximum`));
    }
    if (handle.includes('_')) {
      out.push(F('warn', 'handle', 'uses underscores — Google recommends hyphens'));
    }
    if (/^\d+$|-\d{4,}$/.test(handle)) {
      out.push(F('warn', 'handle', 'looks like an ID — Google recommends readable words'));
    }
    if (handle !== handle.toLowerCase() || /[^a-z0-9-]/.test(handle)) {
      out.push(F('error', 'handle', 'must be lowercase letters, digits and hyphens'));
    }
  }

  // --- 6. Body copy ---
  // No word-count floor: Google states it has no preferred word count. What is
  // checkable is whether the copy carries the facts buyers search for.
  const w = words(body);
  if (w < 40) out.push(F('warn', 'body', `${w} words — too thin to answer a buyer's questions`));
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
    // Empty alt is correct for a purely decorative image, so this is a warning
    // and it names the position rather than demanding text everywhere.
    if (!alt && img.decorative !== true) {
      out.push(F('warn', 'images', `image ${i + 1} has no alt text — add one, or set "decorative": true if it carries no information`));
    }
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

  // --- Shopify search surface: tags are query matches, not filing metadata ---
  const tags = (p.tags ?? []).map(text).filter(Boolean);
  const INTERNAL = /^(dept[:_-]|custom[A-Z]|internal[:_-]|do-not-|needs-|supplier[:_-]|tmp[:_-])/;
  for (const t of tags.filter((t) => INTERNAL.test(t))) {
    out.push(F('warn', 'tags', `"${t}" looks like an internal flag — tags are a storefront search field, put flags in metafields`));
  }
  if (p.tags && !tags.filter((t) => !INTERNAL.test(t)).length) {
    out.push(F('warn', 'tags', 'no shopper-facing tags — nothing here matches a material, occasion or colour query'));
  }
  if (p.productType !== undefined && !text(p.productType)) {
    out.push(F('warn', 'productType', 'empty — product type is a storefront search field'));
  }
  if (p.category !== undefined && (!text(p.category) || /^uncategorized$/i.test(text(p.category)))) {
    out.push(F('warn', 'category', 'not set to a real taxonomy category'));
  }

  // --- selling language ---
  // The listing must be in the shop's selling language regardless of what
  // language the seller used to describe the product.
  const langFields = [
    ['title', title], ['seoTitle', seoTitle], ['metaDescription', meta],
    ['handle', handle], ['body', plain(body)],
    ['tags', (p.tags ?? []).join(', ')],
  ];
  for (const [field, value] of langFields) {
    if (looksVietnamese(value)) {
      const hit = (value.match(VI_LETTERS) || [''])[0];
      out.push(F('error', 'language',
        `${field} contains Vietnamese text ("${hit}") — listing fields must be written in the selling language, not the language of the conversation`));
    }
  }

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
