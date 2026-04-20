# Task 3 - Recently Viewed Snippet

## How to include the snippet

Include it on the product template or inside the main product section:

```liquid
{% render 'recently-viewed' %}
```

If a parent render path is passing handles into the snippet, it could render it like this:

```liquid
{% render 'recently-viewed', recently_viewed_handles: handles_csv %}
```

## Chosen approach

I kept this mostly Liquid-first, with a small AJAX fallback:

- Liquid renders the recently viewed markup.
- Liquid loops through `recently_viewed_handles` with `{% for %}` and uses `all_products[handle]`.
- JavaScript stores and retrieves product handles from `localStorage`.
- If Liquid has no valid products to show yet, JavaScript fetches `/products/{handle}.js` for the last 4 viewed handles and renders the cards in the browser.

I chose this because Liquid cannot access `localStorage` directly. The snippet therefore has two coherent paths:

1. a Liquid-rendered path when `recently_viewed_handles` is already available
2. a client-rendered AJAX fallback when it is not

## Limitations and edge cases

- The Liquid path still assumes a comma-separated `recently_viewed_handles` value is available when Liquid renders.
- The AJAX fallback makes one product request per displayed card.
- The fallback is client-rendered, so those cards are not part of the initial HTML response.
- Invalid or stale handles are skipped.
- If `localStorage` is blocked or cleared, the list starts fresh.

## What I would do differently with more time or real Shopify access

- Wire the `localStorage` handles into a real section refresh so the Liquid path stays in sync automatically.
- Reuse the theme's existing product-card markup if available.
- Add theme styling and a small loading state.
