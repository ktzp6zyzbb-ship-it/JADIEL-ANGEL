# /public/images

Drop real photos in at the exact paths below and they'll appear on the site
automatically — no code changes needed. Every image on the site uses
`components/SmartImage.tsx` (or `components/Logo.tsx` for the shield logo),
which shows a branded navy/gold placeholder until the real file exists, then
switches to the real photo the moment it's added.

## Logo

- `manassas-united-logo.png` — the official shield logo. Used in the navbar,
  hero, and footer via `components/Logo.tsx`.

## Hero

- `hero/hero-match.jpg` — full-width background photo for the homepage hero
  (recommended: dramatic match/training photo, at least 1920x1080).

## Teams

- `teams/u13.jpg`, `teams/u14.jpg`, `teams/u15.jpg`, `teams/u16.jpg`,
  `teams/u17.jpg`, `teams/u18.jpg`, `teams/u19.jpg` — one action photo per
  age group, used on team cards and team detail pages.

## Coaches

- `coaches/<slug>.jpg` — one headshot per coach. The expected filename for
  each coach is set by the `photo` field in `/data/club.ts`.

## Facilities

- `facilities/sinclair-elementary.jpg`
- `facilities/louise-benton-middle.jpg`
- `facilities/nova-sportsplex.jpg`
- `facilities/george-hampton-middle.jpg`
- `facilities/dean-park.jpg`

## News

- `news/<slug>.jpg` — one image per article. The expected filename for each
  article is set by the `image` field in `/data/news.ts`.

## About

- `about/club-photo.jpg` — used on the About page's "Our Club" section.
