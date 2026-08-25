# Shopify Admin API traps

Behaviours that cost data when writing listing fields in bulk. Read this before
the first write, not after.

## SEOInput replaces, it does not merge

`productUpdate(input: {seo: {...}})` **replaces the entire `seo` object**.

```graphql
# This sets seo.description to null.
mutation { productUpdate(input: {id: $id, seo: {title: "New title"}}) { product { id } } }
```

Verified on a live shop: a title-only write across a catalog erased a 143-character
meta description on the first product. Every write must carry both fields:

```js
input.seo = {
  title: row.set.title !== undefined ? row.set.title : (live.seo?.title ?? ''),
  description: row.set.description !== undefined
    ? row.set.description
    : (live.seo?.description ?? ''),
};
```

The same replacement semantics show up elsewhere in the Admin API — cart and
product attribute updates behave this way too. When a mutation takes an object,
assume replacement until proven otherwise, and read the field back after the
first write to confirm.

## Image alt goes through fileUpdate, and files are shared

Alt text lives on the file, not on the product:

```graphql
mutation { fileUpdate(files: [{id: $mediaImageId, alt: $alt}]) {
  files { ... on MediaImage { id alt } } userErrors { field message } } }
```

A file used by several products — a size chart, a care guide — has **one**
MediaImage id across all of them. One write covers every product using it, so
count distinct file ids, not image slots, when estimating the work. It also means
the alt on a shared file must not name a single product.

Videos have no alt in this sense. Filter media by type before building the plan
or the run reports failures that are not failures.

## Handle changes: let productUpdate create the redirect

A handle change without a redirect discards every link and ranking the old URL
earned. The fix is a single field on the same mutation:

```graphql
mutation { productUpdate(input: {
  id: $id,
  handle: "short-clean-handle",
  redirectNewHandle: true      # Shopify creates the 301 for you
}) { product { id handle } userErrors { field message } } }
```

`redirectNewHandle: true` creates the `UrlRedirect` from the old path to the new
one as part of the product update. Verified on a live shop: after the rename, a
`urlRedirects(query: "path:/products/<old-handle>")` query returned the redirect
already in place.

Two things to know before trusting it in a batch:

- **Confirm the scope.** Creating redirects needs `write_online_store_pages`.
  Check what the token actually carries rather than assuming — a scope grant may
  be wider or narrower than the notes say:

  ```graphql
  query { currentAppInstallation { accessScopes { handle } } }
  ```

- **Re-authorising replaces the grant** rather than adding to it. Request every
  scope you need in one grant or you will silently lose the ones you had.

Rehearse the whole thing on a **draft** product first: rename it, query the
redirect, rename it back, then delete the redirects the rehearsal created
(`urlRedirectDelete`). Draft products are not published, so nothing a shopper or
a crawler sees is involved.

Even with redirects handled, a handle change spends ranking equity to buy a
tidier URL. On a product that already ranks, that trade is usually not worth
making; on a product with no history, it costs nothing.

## The protocol for a bulk write

This is what turns a catalog-wide edit from a gamble into a routine operation.

1. **Snapshot** the live state of every field you intend to touch.
2. **Build a plan** where each row carries the exact live value it expects to
   replace, as a precondition.
3. **Dry run.** Report rows whose precondition no longer matches — someone else
   edited them — and skip those rather than overwriting.
4. **Probe one product.** Write it, read back **every** field of that product,
   and confirm nothing moved that you did not intend. This is the step that
   catches the `SEOInput` trap, and it costs one product instead of hundreds.
5. **Run the batch**, recording each row's previous value as you go.
6. **Read the catalog back** and verify against the thresholds, rather than
   trusting the write count.

Keep the inverse manifest. Restore a row only while live still equals what your
run wrote — otherwise a rollback erases somebody's later edit.

Expect the catalog to move under you. Merchandisers work in the admin UI while a
script runs; product counts change hourly. Check the product's `events` feed
before assuming a change was yours:

```graphql
events(first: 5, sortKey: CREATED_AT, reverse: true) {
  nodes { message createdAt attributeToApp attributeToUser }
}
```

## Fields that quietly do not filter

`products(query: "handle:foo")` and `inventory_policy:` filters are ignored
rather than erroring — the query returns everything and the caller believes it
filtered. Verify that a filtered query actually narrowed the result before
building logic on it.
