# Jadiel Angel — Barber

A static one-page website for Jadiel Angel, a barber with 3 years of
experience serving the VCU area in Richmond, VA (dorm house calls at the same
price).

## Structure

- `index.html` — page content (hero, prices, gallery, house calls + payment, about, booking)
- `css/style.css` — styling
- `js/script.js` — mobile nav, booking form, footer year
- `img/` — haircut photos

## Running locally

No build step. Open `index.html` in a browser, or run
`python3 -m http.server 8000` and visit `http://localhost:8000`.

## To update

- **Phone number**: set `PHONE` at the top of `js/script.js` so the booking
  form opens a pre-filled text message.
- **Prices**: the "Prices" section and the booking form `<select>` in `index.html`.
- **Photos**: drop new images in `img/` and add a `<figure class="g-item">` in the gallery.
