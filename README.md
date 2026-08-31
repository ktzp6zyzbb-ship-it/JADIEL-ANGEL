# Quiubo Parce — Colombian Restaurant & Bakery

A static one-page website for Quiubo Parce, a Colombian restaurant and bakery
at 11045 Hull Street Rd, Midlothian, VA.

## Structure

- `index.html` — page content (hero, about, menu highlights, bakery, tap-to-pay, reviews, visit/contact)
- `css/style.css` — styling
- `js/script.js` — mobile nav toggle + footer year
- `js/apple-pay.js` — tap-to-pay reader demo (see below)

## Running locally

No build step required. Open `index.html` directly in a browser, or serve the
folder with any static server, e.g.:

```
python3 -m http.server 8000
```

then visit `http://localhost:8000`.

## To update

- **Hours**: listed in the "Visit" section's `#hours-list` in `index.html`.
  Today's row is auto-highlighted client-side by `js/script.js`.
- **Photos**: the site currently uses icon-based visuals instead of real
  photography. Swap in real photos of the food/storefront when available.

## Tap to Pay (Apple Pay) section

The "Pay" section (`#pay` in `index.html`) is a front-end-only demo of a
tap-to-pay card reader. It detects Apple Pay support via
`window.ApplePaySession` to tailor its message, and lets a visitor click
"Pay" to see a tap → processing → paid animation. It does **not** move any
money — there's no backend here to do real merchant validation.

To turn this into a real Apple Pay checkout you'll need:
1. A payment processor with Apple Pay support (Stripe, Square, Braintree, etc.)
   and an Apple merchant ID.
2. A server endpoint that performs Apple's merchant validation and processes
   the resulting payment token — this can't be done from static HTML/JS alone.
3. Replace the demo click handler in `js/apple-pay.js` with a real
   `ApplePaySession`, wiring `onvalidatemerchant` and `onpaymentauthorized`
   to that backend (most processors publish a ready-made snippet for this).
