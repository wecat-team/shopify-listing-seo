#!/usr/bin/env node
// Check one listing, or a whole catalog, against the rules in references/field-rules.md.
//
//   node scripts/check-listing.mjs listing.json  --suffix " | Brand"
//   node scripts/check-listing.mjs catalog.json  --suffix " | Brand" --catalog
//   cat listing.json | node scripts/check-listing.mjs - --suffix " | Brand"
//
// Options:
//   --suffix "<text>"          brand suffix the storefront appends to <title>
//   --feed-title product|seo   which field Shopify sends to the Google channel
//   --selling-language <code>  the shop's selling language (default en)
//   --meta-min / --meta-max    meta description advisory range (default 120-160)
//   --catalog                  also run cross-listing checks
//   --json                     machine-readable output
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
// Shopify's Google & YouTube channel feeds either the product title or the
// search engine title: Settings -> Product feed -> Additional settings.
// Merchant Center title rules apply to whichever one is selected, so ask.
const FEED_TITLE = flag('feed-title', 'product') === 'seo' ? 'seo' : 'product';
// The listing must be in the shop's SELLING language, which is not necessarily
// the language of the conversation. A shop selling to Vietnamese buyers writes
// Vietnamese listings, and that must not be reported as an error.
const SELLING_LANGUAGE = flag('selling-language', 'en').toLowerCase();
// Google publishes no meta description limit and is not obliged to use the text
// at all. Shopify Help Center recommends 160 characters. Advisory, not a gate.
const META_MIN = Number(flag('meta-min', '120'));
const META_MAX = Number(flag('meta-max', '160'));

// Vietnamese-specific letters. Detects a listing written in the conversation
// language instead of the selling language — the common failure when a seller
// answers in Vietnamese and the model mirrors it back.
//
// Only letters Vietnamese does not share with western European languages: the
// modified vowels (ă â ê ô ơ ư), đ, and the hook/tilde/dot-below tones. The bare
// grave and acute vowels (à á è é ì í ò ó ù ú ý) are deliberately absent — an
// earlier version included them and would have flagged "Lumière" or "Café" as
// Vietnamese, renaming a real product over a French loanword. Any genuine
// Vietnamese sentence carries at least one letter from this narrower set.
const VI_LETTERS = /[ăâđêôơưĂÂĐÊÔƠƯ]|[ảãạằắẳẵặầấẩẫậẻẽẹềếểễệỉĩịỏõọồốổỗộờớởỡợủũụừứửữựỷỹỵ]/i;
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
// Merchant Center image_link: 500x500 minimum enforced from 2027-01-31
// (warnings since 2026-04-14). Google recommends 1500x1500 or above.
const IMG_FEED_MIN = 500;
const IMG_RECOMMENDED = 1500;
// Merchant Center warns on sub-500px images from 2026-04-14 and enforces from
// 2027-01-31. Before that date an undersized image is a warning, not a blocker —
// failing a pre-publish hook today for a rule that does not bite yet is wrong.
const IMG_ENFORCED_FROM = Date.parse('2027-01-31');
const imgSeverity = () => (Date.now() >= IMG_ENFORCED_FROM ? 'error' : 'warn');

// Merchant Center forbids promotional text in the feed title: "Don't add
// information such as price, sale price, sale dates, shipping, delivery date".
// Case-insensitive: "Free shipping" is as disallowed as "FREE SHIPPING".
const PROMO = new RegExp([
  '\\b(sale|on sale|best sellers?|bestsellers?|cheap|discount(ed)?|clearance)\\b',
  '\\b(limited time|buy now|order now|shop now|hot deal|special offer|bundle deal)\\b',
  '\\bfree (shipping|delivery|returns)\\b',
  '\\b(shipping|delivery|dispatch) (available|included|guaranteed)\\b',
  '\\b(ships?|shipping|delivery|delivered|arrives) (in|within|by|on) ',
  '\\b\\d+\\s?% ?off\\b',
  '\\bprice\\b\\s*[:=]',
  '[$£€¥₫]\\s?\\d',                       // currency symbol followed by a number
  '\\b\\d+([.,]\\d+)?\\s?(usd|eur|gbp|aud|cad|vnd|jpy)\\b',
].join('|'), 'i');
// Hyphens, underscores and slashes are separators, not letters — "free-shipping"
// must read the same as "free shipping" before PROMO is applied.
const promoNormalise = (t) => t.replace(/[-_/]+/g, ' ').replace(/\s+/g, ' ');
// Capitals are reserved for acronyms and proper nouns, so a shouty word is a
// violation even when the rest of the title is sentence case.
const CAPS_OK = new Set(['USA','USD','EUR','GBP','UK','EU','XL','XXL','XXXL','LED','USB','PDF','DIY','UV','HD','PVC','ABS','MDF','CM','MM','SVG','PNG','JPG','A4','A3','A5']);
// Function words repeat legitimately; content words repeating is the signal.
const FUNCTION_WORDS = new Set(['the','and','for','with','your','our','from','into','onto',
  'this','that','plus','over','under','a','an','of','in','on','to','by','or','at','as']);

const text = (v) => (v ?? '').toString().replace(/\s+/g, ' ').trim();
const plain = (html) => text((html ?? '').replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' '));
const words = (html) => plain(html).split(' ').filter(Boolean).length;
const normWords = (s) => s.toLowerCase().replace(/[^a-z0-9\s'-]/g, ' ').split(/\s+/).filter(Boolean);
// Tags may arrive as an array, a comma-separated string, or nothing at all.
// Mapping a string used to throw, which read as a crash rather than a finding.
const asList = (v) => Array.isArray(v) ? v.map(text).filter(Boolean)
  : typeof v === 'string' ? v.split(',').map(text).filter(Boolean) : [];

/** One finding. `level` is 'error' (blocks publish) or 'warn' (worth a look). */
const F = (level, rule, message) => ({level, rule, message});

/**
 * Merchant Center feed title rules. These apply to whichever field the Google
 * channel is configured to send, which is why the field is passed in.
 */
function checkFeedTitle(t, rule, where) {
  const out = [];
  if (!t) return out;
  if (t.length > TITLE_MAX) {
    out.push(F('warn', rule, `${where}: ${t.length} chars — past the ${TITLE_MAX}-char Merchant Center feed limit`));
  }
  const promo = promoNormalise(t).match(PROMO);
  if (promo) {
    out.push(F('error', rule, `${where}: "${promo[0].trim()}" is promotional text — Merchant Center disallows price, sale, shipping and delivery wording in feed titles`));
  }
  // Google's own stuffing example — "Foobar, foo bar, foobars, foo bars" —
  // repeats each token only twice, so a count threshold alone misses it. What
  // gives it away is how little of the title is distinct.
  const toks = normWords(t).filter((w) => w.length > 2 && !FUNCTION_WORDS.has(w))
    .map((w) => (w.length > 3 && w.endsWith('s') ? w.slice(0, -1) : w));
  if (toks.length >= 4) {
    const uniq = new Set(toks).size;
    const redundancy = 1 - uniq / toks.length;
    if (redundancy >= 0.4) {
      out.push(F('error', rule, `${where}: only ${uniq} distinct words across ${toks.length} — reads as a keyword list rather than a product name`));
    }
  }
  const shouty = t.split(/\s+/)
    .map((w) => w.replace(/[^A-Za-z0-9]/g, ''))
    .filter((w) => w.length >= 4 && w === w.toUpperCase() && /[A-Z]{4,}/.test(w) && !CAPS_OK.has(w));
  if (shouty.length) {
    // A wholly shouty title is emphasis and blocks; a single caps token inside a
    // sentence-case title is more often a brand (UNIQLO, IKEA) than emphasis, and
    // this heuristic cannot tell identity from shouting. Warn, do not block.
    const allCaps = t === t.toUpperCase();
    out.push(F(allCaps ? 'error' : 'warn', rule,
      `${where}: "${shouty[0]}" is in capitals — Merchant Center reserves capitals for acronyms and proper nouns${allCaps ? '' : '; ignore this if it is the brand name'}`));
  }
  if (/[!]{2,}|[*]{2,}|[?]{2,}|<[a-z/][^>]*>/i.test(t)) {
    out.push(F('error', rule, `${where}: gimmicky punctuation or HTML is disallowed in feed titles`));
  }
  return out;
}

function checkOne(p) {
  const out = [];
  const title = text(p.title);
  const seoTitle = text(p.seoTitle ?? p.seo?.title);
  const meta = text(p.metaDescription ?? p.seo?.description);
  const handle = text(p.handle);
  const body = p.bodyHtml ?? p.descriptionHtml ?? p.body ?? '';
  const images = p.images ?? [];
  const primaryKeyword = text(p.primaryKeyword).toLowerCase();

  // --- 2. Product title ---
  // Length rules come from Google Merchant Center's feed `title` spec, the only
  // primary source that states any number: 1-150 hard, "users will usually
  // notice only the first 70 or fewer characters", "use all 150 characters",
  // "put the most important details first". There is no sourced 45-70 rule, so
  // this does not enforce one - it checks the front-loading Google does document.
  if (!title) out.push(F('error', 'title', 'missing'));
  else {
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
    // Keyword stuffing is defined qualitatively by Google - "repeating the same
    // words or phrases so often that it sounds unnatural" - with no numeric
    // threshold. Adjacent repetition is the bulk-edit artefact; non-adjacent
    // repetition is the Etsy-style keyword tail, and it is the commoner spam.
    if (rep) out.push(F('error', 'title', `word "${rep}" repeated back to back`));
    const freq = new Map();
    for (const w of normWords(title)) {
      if (w.length < 3 || FUNCTION_WORDS.has(w)) continue;
      freq.set(w, (freq.get(w) ?? 0) + 1);
    }
    for (const [w, n] of [...freq].sort((a, b) => b[1] - a[1])) {
      if (n >= 3) {
        out.push(F('error', 'title', `"${w}" appears ${n} times — Google calls repeating words "so often that it sounds unnatural" keyword stuffing, with no character threshold`));
        break;
      }
      if (n === 2 && w.length >= 6 && title.split(',').length >= 4) {
        out.push(F('warn', 'title', `"${w}" appears twice across ${title.split(',').length} comma-separated phrases — reads like a keyword tail rather than a product name`));
        break;
      }
    }
    // The primary keyword is the whole point of the title, so check it lands
    // somewhere a shopper or a crawler will see it. It may sit in the product
    // title or in the SEO title — carrying it verbatim in both is not required,
    // and a title that reads naturally often breaks the phrase up. So: exact
    // phrase anywhere passes, all the words present is a nudge, and words
    // missing altogether is the real failure.
    if (primaryKeyword) {
      const lower = title.toLowerCase();
      const seoLower = seoTitle.toLowerCase();
      const kwWords = normWords(primaryKeyword);
      const titleWords = new Set([...normWords(title), ...normWords(seoTitle)]);
      const missing = kwWords.filter((w) => !titleWords.has(w));
      if (missing.length) {
        out.push(F('error', 'title', `primary keyword "${primaryKeyword}" is missing "${missing.join('", "')}" from both the product title and the SEO title`));
      } else if (!lower.includes(primaryKeyword) && !seoLower.includes(primaryKeyword)) {
        out.push(F('warn', 'title', `primary keyword "${primaryKeyword}" appears only as scattered words, not as the phrase — fine if it reads better, worth a look if not`));
      } else if (lower.includes(primaryKeyword) && lower.indexOf(primaryKeyword) + primaryKeyword.length > TITLE_VISIBLE) {
        out.push(F('warn', 'title', `primary keyword "${primaryKeyword}" ends past character ${TITLE_VISIBLE} — Google says users notice the first 70 or fewer`));
      }
    }
  }

  // Merchant Center rules run against whichever title the Google channel feeds.
  const feedTitle = FEED_TITLE === 'seo' ? (seoTitle || title) : title;
  const feedLabel = FEED_TITLE === 'seo' ? 'feed title (SEO title)' : 'feed title (product title)';
  out.push(...checkFeedTitle(feedTitle, 'title', feedLabel));

  // --- 3. SEO title ---
  // Shopify stores null when it equals the product title, so the product title
  // is what renders. Check whichever one actually reaches the <title> tag.
  const effective = seoTitle || title;
  if (effective) {
    const px = titlePx(effective + SUFFIX);
    if (px > TITLE_PX_BUDGET) {
      out.push(F('error', 'seoTitle',
        `<title> renders ${Math.round(px)}px incl. "${SUFFIX}" — over the ~${TITLE_PX_BUDGET}px desktop cut` +
        (seoTitle ? '' : ' — set a separate SEO title')));
    } else if (px > TITLE_PX_SAFE) {
      out.push(F('warn', 'seoTitle',
        `<title> renders ${Math.round(px)}px — within ${TITLE_PX_BUDGET}px but past the ${TITLE_PX_SAFE}px safe mark, trim if it has many capitals`));
    }
  }

  // --- 4. Meta description ---
  // Google publishes no limit and creates snippets primarily from page content.
  // Shopify Help Center recommends 160 characters. Both are advice, so length is
  // a warning; only a missing description is an error. What Google does
  // recommend, and what catalog mode enforces, is one distinct description per page.
  if (!meta) out.push(F('error', 'metaDescription', 'missing'));
  else if (meta.length < META_MIN || meta.length > META_MAX) {
    out.push(F('warn', 'metaDescription', `${meta.length} chars — outside the ${META_MIN}-${META_MAX} working range (Shopify recommends 160; Google publishes no limit)`));
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
    // A trailing 4-digit run is usually an ID, but a year is a legitimate word
    // in a product handle, so only flag runs that cannot be a plausible year.
    if (/^\d+$/.test(handle) || (/-(\d{4,})$/.test(handle) && !/-(19|20)\d{2}$/.test(handle))) {
      out.push(F('warn', 'handle', 'looks like an ID — Google recommends readable words'));
    }
    if (handle !== handle.toLowerCase() || /[^a-z0-9-]/.test(handle)) {
      out.push(F('error', 'handle', 'must be lowercase letters, digits and hyphens'));
    }
  }

  // --- 6. Body copy ---
  // No word-count floor from Google, which states it has no preferred word
  // count. Shopify separately recommends at least 250 words of descriptive text
  // per page — advice, not enforcement, so it is a warning with its source named.
  const w = words(body);
  if (w < 40) out.push(F('warn', 'body', `${w} words — too thin to answer a buyer's questions`));
  else if (w < 250) out.push(F('warn', 'body', `${w} words — Shopify recommends at least 250 words of descriptive text per page (Google states no preferred word count)`));
  const lower = plain(body).toLowerCase();
  const hasDimensions = /\b\d+\s*(x|×|by)\s*\d+\b/.test(lower) || /\b\d+(\.\d+)?\s?(inch|inches|in\b|cm|mm)\b/.test(lower);
  if (!hasDimensions) out.push(F('error', 'body', 'no concrete dimensions — long-tail size queries cannot match'));
  // Lexical checks have to speak the selling language, otherwise a correct
  // Vietnamese body fails a rule written in English.
  const TIMING = {
    en: /\b(business day|business days|working days|ships|shipping|delivery|delivered|production|made to order)\b/,
    vi: /(ngày làm việc|thời gian (sản xuất|giao)|sản xuất|giao hàng|vận chuyển|ship)/i,
  };
  const timingRe = TIMING[SELLING_LANGUAGE] ?? TIMING.en;
  if (!timingRe.test(SELLING_LANGUAGE === 'vi' ? plain(body) : lower)) {
    out.push(F('error', 'body', `no production or delivery timing (checked in "${SELLING_LANGUAGE}")`));
  }
  // Safe tag vocabulary: tables break on phones and hand-set colours fight the
  // theme, and the page already supplies h1/h2.
  const ALLOWED = new Set(['p','h3','h4','ul','ol','li','strong','em','a','br']);
  const usedTags = [...String(body).matchAll(/<\s*\/?\s*([a-z0-9]+)/gi)].map((m) => m[1].toLowerCase());
  const badTags = [...new Set(usedTags)].filter((t) => !ALLOWED.has(t));
  if (badTags.length) {
    out.push(F('error', 'body', `description HTML uses <${badTags.join('>, <')}> — outside the safe vocabulary (p, h3, h4, ul, ol, li, strong, em, a)`));
  }
  if (/style\s*=/i.test(String(body))) {
    out.push(F('warn', 'body', 'inline style attributes fight the theme and break dark mode'));
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
    if (!wpx || !hpx) {
      out.push(F('warn', 'images', `image ${i + 1} has no width/height — cannot check it against the feed minimum`));
    } else if (wpx < IMG_FEED_MIN || hpx < IMG_FEED_MIN) {
      out.push(F(imgSeverity(), 'images', `image ${i + 1} is ${wpx}x${hpx} — under the ${IMG_FEED_MIN}x${IMG_FEED_MIN} Merchant Center minimum${imgSeverity() === 'warn' ? ', which starts being enforced 2027-01-31' : ' enforced since 2027-01-31'}`));
    } else if (wpx < IMG_RECOMMENDED || hpx < IMG_RECOMMENDED) {
      out.push(F('warn', 'images', `image ${i + 1} is ${wpx}x${hpx} — Google recommends ${IMG_RECOMMENDED}x${IMG_RECOMMENDED} or above`));
    }
  });
  if (!images.length) out.push(F('warn', 'images', 'no images supplied to check'));

  // --- Shopify search surface: tags are query matches, not filing metadata ---
  const tags = asList(p.tags);
  const INTERNAL = /^(dept[:_-]|custom[A-Z]|internal[:_-]|do-not-|needs-|supplier[:_-]|tmp[:_-])/;
  for (const t of tags.filter((t) => INTERNAL.test(t))) {
    out.push(F('warn', 'tags', `"${t}" looks like an internal flag — tags are a storefront search field, put flags in metafields`));
  }
  if (p.tags !== undefined && !tags.filter((t) => !INTERNAL.test(t)).length) {
    out.push(F('warn', 'tags', 'no shopper-facing tags — nothing here matches a material, occasion or colour query'));
  }
  if (p.productType !== undefined && !text(p.productType)) {
    out.push(F('warn', 'productType', 'empty — product type is a storefront search field'));
  }
  if (p.category !== undefined && (!text(p.category) || /^uncategorized$/i.test(text(p.category)))) {
    out.push(F('warn', 'category', 'not set to a real taxonomy category'));
  }

  const PLACEHOLDER = /\[(to fill|to confirm|cần điền|tbd|todo)\b[^\]]*\]/gi;
  // Markers are written in the seller's language, so a Vietnamese "[cần điền:
  // ...]" inside otherwise-English copy would otherwise trip the language rule
  // and report the wrong problem. Strip them before that check runs; the
  // placeholder rule below already blocks publishing while they are present.
  const stripMarkers = (v) => String(v ?? '').replace(PLACEHOLDER, ' ');

  // --- selling language ---
  // The listing must be in the shop's selling language regardless of what
  // language the seller used to describe the product. A shop that sells in
  // Vietnamese passes --selling-language vi and this check stands down.
  if (SELLING_LANGUAGE !== 'vi') {
    const langFields = [
      ['title', title], ['seoTitle', seoTitle], ['metaDescription', meta],
      ['handle', handle], ['body', plain(body)], ['tags', tags.join(', ')],
    ].map(([f, v]) => [f, stripMarkers(v)]);
    for (const [field, value] of langFields) {
      if (looksVietnamese(value)) {
        const hit = (value.match(VI_LETTERS) || [''])[0];
        out.push(F('error', 'language',
          `${field} contains Vietnamese text ("${hit}") but the selling language is "${SELLING_LANGUAGE}" — pass --selling-language vi if the shop really sells in Vietnamese`));
      }
    }
  }

  // --- unresolved placeholders ---
  // The skill deliberately writes "[to fill: production time]" rather than
  // inventing a number, so a listing can be complete in shape and still be
  // missing a fact. Without this check the timing and dimension rules above
  // pass on the placeholder itself, which is the worst possible outcome: a
  // listing that looks validated and ships with "[to fill: number]" in the copy.
  // Every field that reaches the storefront, not just the six headline ones.
  // A marker left in productType or an image alt ships just as visibly.
  const publishable = [['title', title], ['seoTitle', seoTitle],
    ['metaDescription', meta], ['handle', handle], ['body', String(body)],
    ['tags', tags.join(', ')], ['productType', text(p.productType)],
    ['vendor', text(p.vendor)], ['category', text(p.category)],
    ...images.map((img, i) => [`images[${i}].alt`, text(img.alt)]),
    ...images.map((img, i) => [`images[${i}].src`, text(img.src ?? img.filename ?? img.url)]),
  ];
  for (const [field, value] of publishable) {
    const hits = [...String(value).matchAll(PLACEHOLDER)].map((m) => m[0]);
    if (hits.length) {
      out.push(F('error', 'placeholder', `${field} still contains ${hits.length} unfilled marker${hits.length > 1 ? 's' : ''}: ${hits.slice(0, 2).join(', ')}${hits.length > 2 ? ' …' : ''}`));
    }
  }

  // --- 8. Collections ---
  // Collection membership is merchandising, not an SEO requirement, but an
  // orphan product is unreachable by browsing, so it is worth a look.
  if (Array.isArray(p.collections) && p.collections.length === 0) {
    out.push(F('warn', 'collections', 'not in any collection — unreachable by browsing'));
  }

  // Feed and storefront checks overlap when both read the product title.
  const seen = new Set();
  return out.filter((f) => {
    const k = `${f.level}|${f.rule}|${f.message.replace(/^feed title \([^)]*\): /, '')}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

/** Cross-listing rules a single-listing check cannot see. */
function checkCatalog(items) {
  const out = [];
  const group = (key, label, rule, level = 'error') => {
    const m = new Map();
    for (const p of items) {
      const k = key(p);
      if (!k) continue;
      if (!m.has(k)) m.set(k, []);
      m.get(k).push(text(p.handle) || '(no handle)');
    }
    for (const [, hs] of m) {
      if (hs.length > 1) out.push(F(level, rule, `${label} shared by ${hs.length}: ${hs.slice(0, 4).join(', ')}${hs.length > 4 ? ' …' : ''}`));
    }
  };
  group((p) => text(p.metaDescription ?? p.seo?.description).toLowerCase(), 'meta description', 'duplicate-meta');
  // Compare the title that actually reaches <title>, not the stored field.
  group((p) => (text(p.seoTitle ?? p.seo?.title) || text(p.title)).toLowerCase(), 'effective <title>', 'duplicate-seo-title');
  group((p) => text(p.title).toLowerCase(), 'product title', 'duplicate-title');
  group((p) => plain(p.bodyHtml ?? p.descriptionHtml ?? p.body ?? '').slice(0, 250).toLowerCase(), 'body copy opening', 'duplicate-body');
  // Two listings aiming at one keyword is a review flag, not proof of harm.
  group((p) => text(p.primaryKeyword).toLowerCase(), 'primary keyword', 'keyword-cannibalization', 'warn');

  // Titles built from one template with a single word swapped are exactly the
  // "boilerplate" Google names as a reason it rewrites title links.
  const skeletons = new Map();
  for (const p of items) {
    const t = normWords(text(p.title));
    if (t.length < 4) continue;
    const k = `${t.length}|${t.filter((_, i) => i % 2 === 0).join(' ')}`;
    if (!skeletons.has(k)) skeletons.set(k, []);
    skeletons.get(k).push(text(p.handle) || '(no handle)');
  }
  for (const [, hs] of skeletons) {
    if (hs.length > 2) {
      out.push(F('warn', 'boilerplate-title', `${hs.length} titles share one template varying by a single word: ${hs.slice(0, 4).join(', ')}${hs.length > 4 ? ' …' : ''} — Google names this as a reason it rewrites title links`));
    }
  }
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
  process.stdout.write(`${JSON.stringify({suffix: SUFFIX, suffixPx: Math.round(titlePx(SUFFIX)), titlePxBudget: TITLE_PX_BUDGET, feedTitle: FEED_TITLE, sellingLanguage: SELLING_LANGUAGE, errors, warns, listings: results, catalog: catalogFindings}, null, 2)}\n`);
} else {
  // The budget that matters is pixels. Printing a character budget alongside it
  // invited people to count characters, which is the mistake this tool exists to
  // stop, so it is gone.
  process.stdout.write(`Suffix "${SUFFIX}" = ${Math.round(titlePx(SUFFIX))}px of the ~${TITLE_PX_BUDGET}px <title> budget`);
  process.stdout.write(` | feed reads the ${FEED_TITLE === 'seo' ? 'SEO title' : 'product title'} | selling language ${SELLING_LANGUAGE}\n\n`);
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
