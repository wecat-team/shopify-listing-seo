# Shop profile — LunaVows

The shop this skill instance is installed for. **Read it before Step 1 of the
interview and do not ask for anything it already answers** — production time,
delivery time, shipping region, the shop name and the guarantee are the same on
every listing, and asking again for each product is how a five-minute listing
becomes a fifteen-minute one.

Everything here is a shop-wide default. A single listing may contradict it
(a made-to-order piece with a longer bench time, a digital download with no
shipping at all) — when it does, the listing wins and the seller says so.

Installing this skill for a different shop? Replace this file. Nothing else in
the skill hardcodes a shop.

**Last verified 2026-08-27** against the live storefront page linked in each
row. Re-verify before a bulk catalogue rewrite: these are the numbers the
listings promise, and a stale one publishes a promise the shop no longer keeps.

## Identity

| Fact | Value | Source |
| --- | --- | --- |
| Brand / shop name | LunaVows | storefront |
| SEO title suffix | ` \| LunaVows` — budget the SEO title against it | storefront `<title>` |
| Storefront | https://lunavows.com | — |
| Selling language | English | storefront |
| Buyers | United States | shipping policy |
| Support email | support@lunavows.com | [/pages/shipping-policy](https://lunavows.com/pages/shipping-policy) |
| Support phone | +1 386-516-0033, Mon–Fri 9:00–17:00 ET | [/pages/faq](https://lunavows.com/pages/faq) |
| Legal entity | Vega Harbor LLC | policy pages |

The legal entity is a disclosure, never a store name — it belongs in policy
prose, not in a product title or description.

## Making and delivery

| Fact | Value | Source |
| --- | --- | --- |
| Production | **1–3 business days**, made to order | [/pages/shipping-policy](https://lunavows.com/pages/shipping-policy) |
| Production starts | when the buyer's personalization details are confirmed | same |
| Transit | **5–12 business days**, tracked | same |
| Carrier | USPS | same |
| Ships to | U.S. addresses; elsewhere by email first | same |
| Free shipping | orders over **$50** | same |
| Flat rate under that | **$2.99**, confirmed at checkout | same |
| Tracking | emailed at dispatch; first carrier scan can take 48 hours | [/pages/faq](https://lunavows.com/pages/faq) |

Production time is counted from confirmed details, not from checkout — worth
saying in a listing whose personalization needs a proof or a photo upload.

## The wedding-date guarantee

| Fact | Value |
| --- | --- |
| Applies when | the wedding is **at least 24 calendar days** away at the time of order, the address is in the U.S., and the personalization details ride with the order |
| Remedy if it misses | refund of the full amount paid for the order |
| Inside 24 days | not guaranteed — email support@lunavows.com to check rush availability |
| Under 10 days | especially urgent, same email |

This is the strongest thing the shop can say in a timing section, and it is the
one buyers of dated wedding pieces are actually shopping for. Use it in the
timing paragraph of any product tied to an event date.

## Personalization

Free on every order — names, dates and lettering are included in the price
shown, and there is no engraving or customization fee at checkout
([/pages/faq](https://lunavows.com/pages/faq)). Say it plainly in the
personalization section: buyers of engraved gifts expect a surcharge and are
looking for it.

## After the order, and returns

| Fact | Value | Source |
| --- | --- | --- |
| Change or cancel personalization | email within **24 hours** of ordering; after production starts it may not be possible | [/policies/refund-policy](https://lunavows.com/policies/refund-policy) |
| Personalized pieces | **not returnable or exchangeable** — replacement or refund only if damaged, defective or wrong through the shop's error | same |
| Damaged, defective or wrong | email within **7 days** of delivery with photos; free replacement or full refund, usually with no return shipping | same |
| Pieces with no personalization | returnable within **30 days** of delivery, unused and in original condition | same |
| Refund settles on a statement | 5–10 business days after approval | same |

The non-returnable rule is a fact about the product, not fine print to bury: a
listing that states it up front sees fewer "can I send it back?" tickets, and
it is what `hasMerchantReturnPolicy` has to reflect.

## Copy that is ready to paste

Written in the shop's own voice and already inside the six-section description
structure. Change the numbers here only by changing the rows above.

Timing section, the common case:

```html
<h3>Making and delivery</h3>
<p>Made to order. Production takes 1 to 3 business days, then tracked USPS
delivery takes 5 to 12 business days within the United States.</p>
```

Timing section for a piece tied to a wedding date — add the order-by line:

```html
<h3>Making and delivery</h3>
<p>Made to order. Production takes 1 to 3 business days, then tracked USPS
delivery takes 5 to 12 business days within the United States. Order at least
24 days before your wedding and your date is covered by our arrival
guarantee.</p>
```

One-line version for a meta description or a short field, where the whole
window has to fit in a clause: `ships in 1 to 3 business days`. Do not compress
it to "ships in 2 days" — production and transit are two different numbers and
merging them promises the shorter one.

## Structured data

`shippingDetails` may be declared from the rows above — the rate is a live,
stable value ($0 over $50, $2.99 under, U.S. only). Re-read it from the live
delivery profile before a bulk emit; a hardcoded rate that contradicts checkout
is worse than an absent node.

`hasMerchantReturnPolicy` follows the returns rows above, and the two cases are
genuinely different: a personalized piece is not returnable at all, while an
unpersonalized one carries a 30-day window. Emitting one policy for the whole
catalogue misstates one half of it.
