# Manassas United Academy — Official Website

A modern, professional website for Manassas United Academy, a nonprofit youth
soccer club serving Prince William County and Northern Virginia. Built with
Next.js (App Router), TypeScript, Tailwind CSS, and Framer Motion.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** — navy (`#001A42`) + gold (`#FDBD10`) + white brand theme
- **Framer Motion** — scroll reveals, entrance animations, hover effects
- **Lucide React** — icon set

## Getting Started

Requires Node.js 18.17+ and npm.

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # lint the project
```

> **Note on this build:** this project was assembled in a sandboxed session
> without access to the npm registry, so `npm install` / `npm run build`
> could not be executed here to verify the build. The full source is written
> and syntax-checked, but please run `npm install && npm run build` as your
> first step and report any issues.

## Project Structure

```
app/                     Pages (Next.js App Router)
  page.tsx                 Home
  about/                    About
  teams/                    Teams (grid) + teams/[slug] (team detail)
  pathway/                  Pathway & Achievements
  facilities/               Facilities
  tryouts/                  Tryouts + registration form
  coaches/                  Coaches
  news/                     News (grid) + news/[slug] (article detail)
  contact/                  Contact + contact form
  api/tryout/route.ts       Tryout form submission endpoint
  api/contact/route.ts      Contact form submission endpoint
  layout.tsx                Root layout (fonts, navbar, footer, SEO defaults)
  globals.css               Global styles

components/              Reusable UI components (Navbar, Hero, cards, forms, etc.)
data/
  club.ts                  ⭐ Central club data — see below
  news.ts                  News articles (demo/placeholder content)
lib/
  utils.ts                 Small helpers (className merge)
  submissions.ts           Local-dev form submission logging

public/images/            All site imagery — see public/images/README.md
```

## Editing Club Content — `/data/club.ts`

Almost everything on the site — club name, location, mission, values, teams,
coaches, facilities, achievements, leagues, contact info, social links, and
navigation — is defined in **`/data/club.ts`**. Edit values there and the
site updates everywhere that data is used, without touching page components.

### Teams / Age Groups

Edit the `teams` array in `data/club.ts`:

```ts
{
  ageGroup: "U15",
  slug: "u15",              // used for the /teams/u15 URL
  birthYear: "2011",
  teamName: "Manassas United U15",
  headCoach: null,          // set to a name string once confirmed, or leave null for "Coach TBD"
  competitionLevel: "National Academy League / NCSL",
  program: "Competitive Boys Program",
}
```

Adding a new team to this array automatically creates its `/teams/[slug]`
detail page — no new files needed.

### Coaches

Edit the `coaches` array in `data/club.ts`. Set `isPlaceholder: false` once
a coach's real name, bio, licenses, and photo are available — this removes
the "Placeholder" badge on their card.

### Facilities

Edit the `facilities` array in `data/club.ts` — address, field type,
purpose, Google Maps link, and expected photo path.

### Achievements & History

Edit the `achievements` array (shown on Home and the Pathway page) and the
`history` array (About page timeline) in `data/club.ts`. **Only add
achievements that are confirmed and factual** — the codebase intentionally
avoids invented statistics, player names, or a founding year.

### News Articles

Edit `/data/news.ts`. Every article currently in that file is demo content
(`isDemo: true`) — set `isDemo: false` once you replace it with a real,
club-approved article.

## Replacing the Logo

The site expects the official shield logo at:

```
/public/images/manassas-united-logo.png
```

Every place the logo appears (navbar, hero, footer) uses `components/Logo.tsx`,
which automatically renders the real PNG once it exists at that exact path.
**Until then**, a styled navy/gold shield placeholder that reads "Manassas
United Logo" is shown instead — so the site never shows a broken image icon.

To go live with the real logo: **just add the PNG file at that path.** No
code changes are required.

A generated placeholder favicon (`app/icon.tsx`) is also included so the
browser tab never shows a broken icon; once the real logo PNG is in place,
you can delete `app/icon.tsx` and the favicon defined in `app/layout.tsx`
metadata (which already points at the logo path) will take over.

## Replacing Photos

All non-logo images work the same way via `components/SmartImage.tsx`: point
`src` at a file under `/public/images/...`, and if that file doesn't exist
yet (or fails to load), a branded placeholder renders instead of a broken
image icon. See **`/public/images/README.md`** for the full list of expected
image paths (hero, teams, coaches, facilities, news, about).

In short: **drop a photo in at the exact path listed, and it appears on the
site automatically** — no code edits needed.

## Connecting the Forms to a Backend

The Tryout Registration form (`/tryouts`) and Contact form (`/contact`)
currently POST to:

- `app/api/tryout/route.ts`
- `app/api/contact/route.ts`

Right now, both routes validate required fields, log the submission to the
server console, and append it to a local JSON file under
`/data/submissions/` (for local development only — most hosts run
serverless functions with a read-only filesystem, so this step silently
no-ops in production).

To connect a real backend, open either route file and replace the handler
body with one of the documented options (each is written out in comments at
the top of `app/api/tryout/route.ts`):

1. **Formspree** — fastest, no backend code. Create a form at
   [formspree.io](https://formspree.io), then `fetch()` your form endpoint
   with the submitted data.
2. **Supabase** — `npm install @supabase/supabase-js`, then insert each
   submission into a table via the Supabase client.
3. **Firebase (Firestore)** — `npm install firebase`, then `addDoc()` each
   submission into a collection.

The client-side form components (`components/TryoutForm.tsx`,
`components/ContactForm.tsx`) don't need to change — they already POST JSON
to these two routes and handle loading/success/error states.

## Design System

- **Colors:** navy `#001A42`, gold `#FDBD10`, white, with a light-gray
  (`navy-50`) background tint — defined in `tailwind.config.ts`.
- **Fonts:** Oswald (condensed, bold headings) + Inter (body text), loaded
  via `next/font/google` in `app/layout.tsx`.
- **Motion:** Framer Motion scroll-reveal (`components/ScrollReveal.tsx`),
  hover states, and an expanding gold underline on section headings.

## Known Placeholders (intentional — see task requirements)

- Founding year — not invented; shows "Serving Northern Virginia's soccer
  community" with a code comment marking where to add it once confirmed.
- Coach names/bios/photos — clearly labeled placeholders.
- Team head coaches — `null` until provided (renders "Coach TBD").
- Social media links — empty strings in `data/club.ts` until accounts exist.
- News articles — demo content, clearly labeled.
- Contact email/phone — placeholder values in `data/club.ts` to replace with
  the club's real contact details.

## SEO

Default site title/description are set in `data/club.ts` (`seo` field) and
applied in `app/layout.tsx`. Every page sets its own `title` (via Next.js
`metadata` export), which is templated as `<Page> | Manassas United Academy`.
