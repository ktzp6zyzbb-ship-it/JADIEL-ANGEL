# Quiubo Parce — Colombian Restaurant & Bakery

A static one-page website for Quiubo Parce, a Colombian restaurant and bakery
at 11045 Hull Street Rd, Midlothian, VA.

## Structure

- `index.html` — page content (hero, about, menu highlights, bakery, reviews, visit/contact)
- `css/style.css` — styling
- `js/script.js` — mobile nav toggle + footer year

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
