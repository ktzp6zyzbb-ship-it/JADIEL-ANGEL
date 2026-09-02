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

- **Hours** and **services** (Barbering, Hair & Styling, Beard Trim, Head
  Shave, Hot Towel Shave) are sourced from the shop's Booksy listing:
  https://booksy.com/en-us/790092_vip-barbershop_barber-shop_134575_richmond
  — update `#services` / `#hours-list` in `index.html` if either changes.
- **Pricing** isn't listed anywhere yet — add it to the service cards once
  known.
- **Photos**: the gallery currently uses icon placeholders. Swap in real
  photos of the shop and cuts when available.
- **Reviews**: no review section yet — add one once real customer reviews
  are available (never fabricate reviews).
