# VIP Barbershop

A static one-page website for VIP Barbershop, 9922 Midlothian Tpke,
North Chesterfield, VA 23235.

## Structure

- `index.html` — page content (hero, about, services, gallery, visit/contact)
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

- **Hours**: the "Visit" section currently reads "Please call ahead for
  current hours" — replace with real hours once confirmed.
- **Services & pricing**: the service list is generic (no confirmed pricing).
  Update `#services` in `index.html` with real services/prices once known.
- **Photos**: the gallery currently uses icon placeholders. Swap in real
  photos of the shop and cuts when available.
- **Reviews**: no review section yet — add one once real customer reviews
  are available (never fabricate reviews).
