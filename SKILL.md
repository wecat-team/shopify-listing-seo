---
name: shopify-listing-seo
description: Write a complete Shopify product listing from a product photo or a few facts - product title, SEO title, meta description, URL handle, description HTML, tags - and audit existing listings. Listing fields are always written in the shop selling language, English by default, whatever language the chat is in. Every threshold is labelled hard rule, documented recommendation, or unsourced convention. Use whenever someone writes, rewrites or audits a Shopify listing or product description, sends a product photo and asks for a listing, mentions product SEO, listing SEO, meta title, meta description, product tags or storefront search, or is about to write product fields through the Shopify Admin API - even if they never say "SEO". Same requests in Vietnamese also trigger it: "viết listing", "viết mô tả sản phẩm", "đăng sản phẩm Shopify", "viết tiêu đề sản phẩm", "sửa listing", "tối ưu SEO sản phẩm". Listing fields only - not technical SEO, site speed or theme code.
metadata:
  version: 1.6.0
---

# Shopify listing SEO

Most listing advice repeats numbers that no Google or Shopify document contains.
This skill separates the three registers and never enforces the third as if it
were the first:

| Register | Meaning |
| --- | --- |
| **HARD RULE** | Published by Google or Shopify, with an enforcement mechanism |
| **RECOMMENDATION** | Published as advice, no enforcement |
| **CONVENTION** | A house style choice. Useful, but not a rule from anyone |

## Two languages, and they are not the same one

Talk to the person in whatever language they write to you in. **Write every
listing field in the shop's selling language — English unless they tell you
otherwise.** The conversation language says nothing about who the listing is for.

This matters because the common case is a seller in one country selling to
another: a Vietnamese seller answering in Vietnamese about a product whose buyers
read English. Mirroring their language into the listing would publish Vietnamese
copy to an English-language storefront and an English-language Shopping feed.

So a normal session looks like this: they write Vietnamese, you ask your
questions in Vietnamese, you explain your choices in Vietnamese — and `title`,
`seo.title`, `metaDescription`, `handle`, the description HTML and the tags all
come back in English.

Translate the facts, do not transliterate them. "khăn trải bàn vải lanh" becomes
"linen table runner", not a romanised Vietnamese phrase. If a product name is a
proper noun the shop uses in Vietnamese, keep it and say why.

Ask which language the storefront sells in only when there is real doubt — an
answer mentioning đồng, a Vietnamese domain, or Vietnamese buyers. Otherwise
assume English and say so in one line, so they can correct you cheaply.

When the selling language really is not English, say so once and tell them the
checker needs `--selling-language vi` (or the relevant code). Without it the
checker reads correct Vietnamese copy as the mirrored-language failure and
errors on every field.

## Default path: interview, then write the whole listing

Most people asking for help do not want a lecture on thresholds — they want a
finished listing they can paste into Shopify. So unless they have explicitly
asked for an audit, work like this:

**Step 1 — ask for the facts.** If they gave you a photo, read it first (see
[Starting from a product photo](#starting-from-a-product-photo)) and skip
anything it already answered. Ask in the language the person is writing in — the
answer language does not change the listing language — in one message, and keep
it to what you genuinely cannot infer:

1. **What do you call this product?** The name already in use — in the Shopify
   admin, on Etsy, on a wholesale sheet. Flag any part of it that is a brand name.
2. What is the product, and what is it made of?
3. What can the buyer personalize? (names, date, photo, custom wording…)
4. What sizes, colours or other options exist? Give exact numbers and units.
5. How long does production take, and how long does delivery take?
6. What occasion or style is it for?
7. What is the shop name? (needed to size the SEO title — see below)

If they have already given some of this, do not ask again. If they answer only
some, write the listing and mark the gaps rather than inventing facts.

### What the product name is for

Ask for it first because it is the one input that changes the title, and the one
you would otherwise invent. Three things it settles:

- **Brand and proper nouns.** If the shop sells a "Lumière Runner", that word
  survives translation and stays in the title. You cannot guess this from a photo,
  and getting it wrong renames someone's product.
- **The primary keyword.** The name the shop already uses is usually the phrase
  its buyers and repeat customers type. Start the keyword from there rather than
  from your own description of the picture.
- **Consistency across channels.** The same product under two names on Shopify
  and Etsy splits its own search history.

**Do not paste it in blindly.** Internal names are often codes — `Runner #4`,
`Mẫu 12`, `TR-LIN-3040`. A SKU is not a title. When the name they give is a code
or a bare category word, say so in one line, write a real title, and show them
both so they can overrule you.

**A missing name does not block the listing.** Unlike a dimension, a name is not
a fact you can get wrong by omission — it is a choice. If they never answer, name
the product yourself, and label it as your proposal rather than presenting it as
theirs.

**Step 2 — write every field in English**, in this order, and hand them back as
a block they can copy field by field. Never invent a size, a material or a lead time; if
a fact is missing, leave the sentence out and say what is missing.

**Step 3 — self-check** against [the checklist](#self-check-before-handing-it-over)
and say which items you could not verify.

## Starting from a product photo

The most common real input is a photo plus a line or two of specs — someone has
the mockup they are about to upload and wants the listing written around it.
Read the image first, then ask only for what an image cannot tell you.

**Read from the image:**

| What | Notes |
| --- | --- |
| Product type and form | a runner, a hanging banner, an ornament, a sash |
| Material appearance | linen weave, acrylic, ceramic, wood grain, satin |
| Artwork and style | florals, gothic, coastal, disco, gingerbread |
| Colours actually shown | name the ones you can see, not a guessed palette |
| Personalization fields | listing mockups often label them — "CUSTOM NAME", "CUSTOM DATE", arrows pointing at the editable text |
| Sample text on the mockup | the names and dates printed on it are placeholders; use them to understand the layout, never copy them into the listing |
| Where it is used | a photo staged on a door, a mantel, a sweetheart table tells you the occasion |

**Never read from the image — always ask:**

| What | Why |
| --- | --- |
| Exact dimensions | a photo has no scale; "looks about 30 inches" is a guess that becomes a returns problem |
| Full option lists | one photo shows one colourway. It cannot tell you the other eleven exist |
| Material composition | linen and a linen-look polyester are indistinguishable in a render |
| Production and delivery time | not a visual property |
| Price | not a visual property |
| The name the shop already uses | a photo shows a runner; it cannot show that the shop sells it as the "Lumière Runner" |

If the image *is* a size chart or a colour grid, that changes things — those
carry real numbers, and you should read them. Say which numbers you took from
which image so the person can correct you.

### Decide: write now, or ask first

Write the full listing immediately when you have the product type, what is
personalizable, at least one exact dimension, and the timings. Everything else
can be inferred from the image or safely left out.

The product name sits outside this test. Ask for it in the same message as the
specs, but do not hold the listing for it — propose a name, say it is your
proposal, and let them replace it.

Ask first when a **spec** is missing — dimensions, materials, options, timings.
Ask in one message, list only the genuinely missing items, and say what you
already got from the photo so they are not re-typing it. Never fill the gap with
a plausible number.

The half-way case is common and worth handling well: enough to write most of it,
one thing missing. Write the listing, mark the gap inline in square brackets
(`[cần điền: thời gian sản xuất]`), and list the gaps under the output. That
gets them 90% of the way while making the hole impossible to miss.

## Sizing the SEO title: measure the brand suffix first

Storefronts append the shop name to the page title — `Product name | Shop`. That
suffix eats the display budget, and no guide mentions it.

Google publishes **no character limit** for `<title>`; it truncates "typically to
fit the device width", so truncation is a **pixel** problem, not a character one.
Third-party measurement puts desktop truncation around 580-600px. Arial 20px
character widths vary more than four-fold: `i` is 4.4px, `W` is 18.9px.

Practical method:

1. Measure the suffix. ` | LunaVows` is 11 characters and about **110px** — a
   fifth of the whole budget.
2. Budget ≈ 600px total. Average English sentence-case text runs ~9.9px per
   character, so `600px − suffix` divided by 9.9 gives a character target.
3. That lands near **49 characters** for an 11-character suffix. Treat it as a
   rule of thumb, and tighten it when the title is full of caps or wide letters
   (`M W G O Q`), which is exactly when a character count lies.

CONVENTION, derived from third-party pixel measurement — not a Google rule.

## Product title: two jobs, two different pressures

The product title does two jobs that pull in opposite directions, and most
advice collapses them into one number. Keep them apart.

**On the storefront** it is the `<h1>` and the label on every product card. Long
titles wrap, bury the price and read badly. Shorter is genuinely better here.

**In the Google Shopping feed** it is match text. Merchant Center's spec says:

| Google's wording | Register |
| --- | --- |
| "Title [title]: 1–150 characters" | **HARD RULE** — truncated + a feed warning past 150, not disapproval |
| "Users will usually notice only the first 70 or fewer characters" | Display observation |
| "Use all 150 characters" | **RECOMMENDATION** — for the *feed* attribute |
| "Put the most important details first" | **RECOMMENDATION** |

**These are not necessarily the same field.** Shopify's Google & YouTube channel
lets the merchant choose the feed source: *Settings → Product feed → Additional
settings → Product titles and descriptions*, where the options are the product
title or the **search engine product title**. Check which one the shop uses
before assuming the product title is the feed title, then tell the checker with
`--feed-title product` or `--feed-title seo` so the Merchant Center rules land on
the field that is actually submitted.

So the guidance splits:

- **Write the product title for the storefront.** Readable, front-loaded, no
  repetition. There is no sourced character range — "45-70 characters" appears
  in no Google or Shopify document — but a title that wraps to five lines on a
  product card is a real problem regardless of what any spec says.
- **If the feed uses the product title** and you want the extra match coverage
  Google recommends, you can extend to 150 — but you are trading storefront
  readability for it. Setting the channel to feed the SEO title instead avoids
  the trade entirely.

Keyword stuffing is defined qualitatively by Google — unnatural repetition,
list-like or out-of-context keyword blocks, text that reads for machines rather
than people — with no character threshold. Repetition is the clearest case, not
the only one.

## Description: content, not word count

**Google** has no preferred word count and says so in writing: *"Are you writing
to a particular word count because you've heard or read that Google has a
preferred word count? (No, we don't.)"*

**Shopify does publish a number**, and this skill used to call it folklore, which
was wrong. Its Help Center says: *"Make sure that every page has at least 250
words of descriptive text."* That is a RECOMMENDATION from the platform you are
publishing on — no enforcement, no ranking effect claimed, but not invented
either. Treat it as a floor worth hitting, not a rule worth padding to.

Both things are true at once: writing to hit 250 words teaches you nothing about
Google, and a 60-word product page is thin by Shopify's own standard.

Cover these six things, in this order, and the length takes care of itself:

1. What it is — one or two sentences, primary keyword used naturally
2. What the buyer personalizes — every field, and what it accepts
3. Specifications — exact dimensions **with units**, material, mounting
4. Timing — production time, delivery time, order-by guidance
5. Care — see the rule below; part of it you may write, part of it you may not
6. Occasions

Sections 3 and 4 are the ones most often missing and the ones buyers search for.
A listing with no dimensions can never match `30x40 table runner`.

### Care: material-derived yes, process-derived no

Care is the one section where "never invent" needs a sharper edge, because half
of it is public knowledge about a fabric and half of it is a fact only the maker
holds.

**You may write care that follows from a confirmed material.** Cotton linen
washes cold and hangs to dry; ceramic is not dishwasher safe; acrylic scratches
under abrasive cloths. This is general knowledge about the material, not a claim
about this shop's product, and a listing that leaves it blank is worse for the
buyer than one that states it. Write it, and say in one line that it is standard
guidance for the material rather than something they told you.

**You may not write care that depends on how the piece was made.** Whether the
printed area can be ironed depends on whether the print is DTG, sublimation or
vinyl. Whether embroidery can go in a machine depends on the stabiliser and the
thread. Whether a coating survives a damp cloth depends on the coating. None of
that is inferable from the material name, and getting it wrong destroys the
product the buyer already paid for. Those lines get `[to fill: ...]`.

Two consequences worth stating out loud:

- **If the material itself is unconfirmed, the whole section is a marker.** You
  cannot derive care from a material you are guessing at.
- **The moment personalization is printed, embroidered or engraved onto the
  piece, the care line stops being about the fabric.** Most listings this skill
  writes are personalized, so process-derived care is the common case, not the
  exception.
- **On a personalized piece that means washing and drying too, not just
  ironing.** Whether the printed area survives a damp cloth, a machine cycle or a
  tumble dryer depends on the same print method. So on a printed, embroidered or
  engraved item the whole care section is a marker — do not publish the fabric
  line on its own and mark only the iron. State the material's general behaviour
  as background if it helps ("cotton linen creases by nature"), but every
  imperative — wash, dry, iron, spot clean — waits for the shop to confirm it.

On near-identical products: scaled content abuse turns on **primary purpose and
lack of user value** — "no matter how it's created" — not on duplication, not on
length, and not on whether AI wrote it. Reused paragraphs are a differentiation
problem first. In a family of near-clones the real differentiator is usually the
**artwork**, so lead with it.

## Description HTML

Write the description as HTML. A safe vocabulary that renders well nearly
everywhere:

`<p>` `<h3>` `<h4>` `<ul>/<li>` `<ol>/<li>` `<strong>` `<em>` `<a href>`

Avoid `style="…"`, `<table>`, `<font>`, `<script>`, `<iframe>`. Tables break on
phones and hand-set colours fight the theme. Do not write `<h1>` or `<h2>` — the
page already supplies those.

```html
<p>One or two sentences: what it is, what is printed on it, where it goes.</p>

<h3>What you personalize</h3>
<p>Add your names, wedding date and venue in the fields on this page.</p>

<h3>Sizes and options</h3>
<ul>
  <li><strong>Sizes:</strong> 20x60, 24x72 and 35x100 inches</li>
  <li><strong>Material:</strong> cotton linen or polyester</li>
</ul>

<h3>Making and delivery</h3>
<p>Made to order. Production takes 1 to 3 business days, then tracked delivery
takes 5 to 12 business days.</p>
```

## Handle: strip the accents, then set it once

**A handle carries only `a-z`, `0-9` and hyphens.** Anything else is a Shopify
error or a percent-encoded URL nobody can read or share. So transliterate before
you write it: `Lumière Runner` becomes `lumiere-runner`, `khăn trải bàn` becomes
`khan-trai-ban`. The accent stays in the product title and the SEO title — those
are display text — and drops only in the handle. Say that you did it, because a
seller seeing their brand name spelled differently in the URL will otherwise
assume you made a typo.

## Handle: set it once; length does not matter

| Fact | Source | Register |
| --- | --- | --- |
| Maximum 255 characters | Shopify: "Handle is too long (maximum is 255 characters)" | **HARD RULE** |
| Hyphens, not underscores | Google URL structure guidance | **RECOMMENDATION** |
| Readable words, not ID numbers | Google URL structure guidance | **RECOMMENDATION** |
| An optimal length | **Nothing published anywhere** | — |

Google publishes no URL length or word-count guidance, and the handle is not one
of the fields Shopify's storefront search reads, so handle length affects neither
ranking nor on-site findability.

The rule that matters is **set it once** — but be accurate about why. Google
documents a 301 as a canonicalisation signal and does **not** say permanent
redirects lose PageRank. The real costs of a handle change are operational:

- the redirect has to actually exist (see
  [references/shopify-api-traps.md](references/shopify-api-traps.md) for
  `redirectNewHandle`)
- internal links, sitemaps, ad destinations and any printed/QR material still
  point at the old URL
- Google has to recrawl before the new URL settles, which takes time
- redirect chains accumulate if the handle changes more than once

None of that is a ranking penalty. It is work, and it is avoidable by getting
the handle right the first time.

## The fields Shopify's own search reads

A listing is indexed by two systems that read different fields. Shopify's
storefront search reads exactly eight:

`title`, `body`, `product_type`, `vendor`, `tag`, `variants.title`,
`variants.sku`, `variants.barcode`

It does **not** read `seo.title`, `seo.description`, `handle`, `category` or
metafields. Two consequences:

- The SEO title and meta description do nothing for Shopify's own search. They
  are page metadata — used by Google and other engines, and selectable as the
  Google Shopping feed source. The product title carries on both surfaces, which
  is why it earns the most attention.
- Tags, product type, vendor and variant titles are query matches. Favour words
  a shopper types — materials, occasions, recipients, colours. On one live shop
  an internal `dept:` tag matched 246 of 273 products, which is noise rather
  than a filter.

  Before moving any tag, check what depends on it: Shopify also drives
  **automated collections, storefront filters, menus, bulk operations and apps**
  off tags. A tag that looks internal may be load-bearing. Move flags to
  metafields only after confirming nothing consumes them.

Shopify does not publish ranking weights, only the field list. Claims that
"titles outrank descriptions" are not sourced to Shopify.

## Meta description

Aim for **120-160 characters, unique per product**.

The upper bound is Shopify's: *"It's recommended that 160 characters is used in
the description"* — a **RECOMMENDATION**. The 120 floor is this skill's own
**CONVENTION**. Google publishes no limit at all and is not obliged to use the
text ("snippets are primarily created from the page content itself").

So length is advice, and the checker reports it as a warning. The part that is a
documented recommendation — **a distinct description per page** — is the part
worth enforcing, and catalog mode does.

Lead with what the product is and what is personalizable — the opening survives
truncation on the narrowest screens.

## Images

| Fact | Register |
| --- | --- |
| Google Merchant Center will require feed images ≥ **500x500 px from 31 January 2027** | **HARD RULE**, feed images only |
| Descriptive, hyphenated filenames | **RECOMMENDATION** |
| Descriptive alt text on images that carry information | **RECOMMENDATION** |

Shoot larger than the minimum. Alt text describes the picture to someone who
cannot see it — it is not a second keyword field. Charts and swatch grids need
alt saying what they are, not the product name.

**Purely decorative images take empty alt (`alt=""`), not a description.** A
screen reader should skip them. Writing alt on *every* image regardless is bad
accessibility advice; the test is whether the image carries information the
surrounding text does not.

## Output format

Hand the listing back as labelled blocks in Shopify admin order, so each one maps
to one field the person has to fill. Never bury a field inside prose.

```
Product title      <text>                      (n chars)
SEO title          <text>                      (n px incl. suffix)
Meta description   <text>                      (n chars)
Handle             <text>
Tags               <comma separated>
Product type       <text>
Description        <HTML block — paste with the <> button, not the rich text editor>
```

Then, underneath and in the person's own language:

1. **What is still missing** — every `[cần điền: ...]` gap, listed once more so it
   cannot be skimmed past.
2. **What you assumed** — the selling language, the feed source, anything you read
   off a photo rather than being told.
3. **What you checked** — the checklist items that pass, and the ones you could
   not verify. Say which, do not imply a clean sweep.

## Self-check before handing it over

```
[ ] Product title: first ~70 characters identify the product, primary keyword inside them
[ ] Product title: 150 characters or fewer if it is the feed title
[ ] Product title: no content word appearing three times, adjacent or not
[ ] Product title: no price, sale, shipping or delivery wording (Merchant Center)
[ ] Product title: no word capitalised for emphasis, no gimmicky punctuation
[ ] Product title: not one template with a single word swapped across the catalog
[ ] SEO title: fits the pixel budget once the brand suffix is added
[ ] Meta description: 120-160 characters, not reused from another product
[ ] Handle: lowercase, hyphens, readable, under 255 characters
[ ] Description: covers all six content sections, ideally past 250 words (Shopify)
[ ] Description: exact dimensions with units
[ ] Description: production and delivery time
[ ] Description HTML uses only the safe tag vocabulary
[ ] Tags: 3-6 words a shopper would type, no internal flags
[ ] Every listing field is in the selling language (English by default), even
    if the conversation was in another language
[ ] No `[to fill: ...]` or `[to confirm: ...]` marker left anywhere in the fields
[ ] Nothing invented — every spec came from the person, not from you
```

Run the checker when the listing exists as JSON:

```bash
node scripts/check-listing.mjs listing.json --suffix " | Shop" --feed-title product
```

```bash
node scripts/check-listing.mjs catalog.json --suffix " | Shop" --catalog
```

A shop that sells in Vietnamese passes `--selling-language vi`; without it the
checker treats Vietnamese copy as the mirrored-language failure and errors.

Catalog mode is where the value is: duplicate meta descriptions, duplicate body
openings and two listings fighting over one keyword are invisible one at a time.

## Further reading

- [references/field-rules.md](references/field-rules.md) — every threshold with
  its source and register, plus worked good/bad examples per field
- [references/sources.md](references/sources.md) — the register table: which
  publisher states each number, and which numbers nobody states
- [references/chuan-seo-content.md](references/chuan-seo-content.md) — the wider
  content standard: the Google/Shopify split on every threshold, what Google
  says does **not** work for AI Overviews (`llms.txt`, chunking, AI-only content
  variants), the spam-policy boundaries, and structured-data requirements
- [references/shopify-api-traps.md](references/shopify-api-traps.md) — writing
  fields through the Admin API without destroying the ones you are not touching

## What this skill will not do

- **Invent specifications.** A confident wrong "ships in 2 days" costs more than
  a missing sentence.
- **Enforce unsourced numbers.** If a threshold has no source, it is labelled
  CONVENTION and can be overridden.
- **Promise rankings from field edits.** Google generates title links
  automatically from several sources and creates snippets primarily from page
  content, so what you write is a proposal. Measure in Search Console over
  weeks. (Google publishes no rewrite percentage — treat any specific figure you
  read elsewhere as unsourced.)
