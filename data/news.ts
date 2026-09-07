// =============================================================================
// MANASSAS UNITED ACADEMY — NEWS ARTICLES
// =============================================================================
// Every article below is DEMO / PLACEHOLDER content so the News page has a
// realistic layout to review. Replace the array with real club articles when
// ready — each item just needs a unique slug.
// =============================================================================

export type NewsCategory =
  | "Club News"
  | "Team News"
  | "Player Spotlight"
  | "College Commitments"
  | "International"
  | "Tryouts";

export type NewsArticle = {
  slug: string;
  title: string;
  category: NewsCategory;
  date: string;
  excerpt: string;
  body: string[];
  isDemo: boolean;
  image: string; // expected path under /public/images/news/
};

const newsArticles: NewsArticle[] = [
  {
    slug: "welcome-to-the-new-site",
    title: "Manassas United Academy Launches New Website",
    category: "Club News",
    date: "2026-08-01",
    excerpt:
      "Manassas United Academy is proud to launch a new home online for players, families, and everyone following the club.",
    body: [
      "This is a demo article included to show how the News page will look once real club updates are published.",
      "Replace the contents of data/news.ts with real articles from Manassas United Academy at any time — the layout will update automatically.",
    ],
    isDemo: true,
    image: "/images/news/welcome-to-the-new-site.jpg",
  },
  {
    slug: "2026-27-tryout-window-announced",
    title: "2026–27 Tryout Window Announced",
    category: "Tryouts",
    date: "2026-07-15",
    excerpt:
      "Manassas United is preparing to open tryouts for the 2026–27 competitive season across multiple age groups.",
    body: [
      "This is placeholder demo content. Replace with the official tryout announcement, dates, and locations once confirmed by the club.",
    ],
    isDemo: true,
    image: "/images/news/tryout-window-announced.jpg",
  },
  {
    slug: "path-to-pros-partnership",
    title: "Manassas United Recognized as D.C. United Academy Path to Pros Partner",
    category: "Club News",
    date: "2026-03-10",
    excerpt:
      "Manassas United Academy has been recognized by D.C. United Academy as a Path to Pros partner club for 2026.",
    body: [
      "This demo article summarizes a real, factual club achievement. Replace this body copy with the full official announcement text when available.",
    ],
    isDemo: true,
    image: "/images/news/path-to-pros-partnership.jpg",
  },
  {
    slug: "copa-amistad-finalist",
    title: "Boys 2011 Finish as U15 Finalists at Copa Amistad in Lima, Peru",
    category: "International",
    date: "2026-02-20",
    excerpt:
      "The Manassas United Boys 2011 team competed internationally, reaching the U15 final at Copa Amistad in Lima, Peru.",
    body: [
      "This demo article summarizes a real, factual club achievement. Replace this body copy with the full recap once provided by the club.",
    ],
    isDemo: true,
    image: "/images/news/copa-amistad-finalist.jpg",
  },
  {
    slug: "usys-national-league-champions",
    title: "Boys 2007 Crowned USYS National League Division 1 Champions",
    category: "Team News",
    date: "2024-06-01",
    excerpt:
      "The Boys 2007 team capped off the 2023–24 season as US Youth Soccer National League Division 1 Champions.",
    body: [
      "This demo article summarizes a real, factual club achievement. Replace this body copy with the full recap once provided by the club.",
    ],
    isDemo: true,
    image: "/images/news/usys-national-league-champions.jpg",
  },
  {
    slug: "player-spotlight-template",
    title: "Player Spotlight: Template Article",
    category: "Player Spotlight",
    date: "2026-01-05",
    excerpt:
      "This is a placeholder Player Spotlight article showing how individual player features will be presented.",
    body: [
      "Do not publish this article as-is. It exists only to demonstrate the Player Spotlight category layout — replace it with a real feature once the club provides player information.",
    ],
    isDemo: true,
    image: "/images/news/player-spotlight-template.jpg",
  },
];

export default newsArticles;
