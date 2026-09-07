// =============================================================================
// MANASSAS UNITED ACADEMY — CENTRAL CLUB DATA FILE
// =============================================================================
// This file is the single source of truth for editable club content.
// Update team names, coaches, facilities, achievements, and contact info here
// — most pages read directly from this file instead of hardcoding content.
//
// News articles live separately in /data/news.ts since they change on their
// own schedule and grow over time.
// =============================================================================

export type Team = {
  ageGroup: string; // e.g. "U13"
  slug: string; // used in /teams/[slug]
  birthYear: string; // e.g. "2013"
  teamName: string;
  headCoach: string | null; // null renders "Coach TBD"
  competitionLevel: string;
  program: string; // e.g. "Competitive Boys Program"
};

export type Facility = {
  slug: string;
  name: string;
  address: string;
  city: string;
  fieldType: string;
  purpose: string;
  suitableFor: string;
  mapsUrl: string;
  image: string; // expected path under /public/images/facilities/
};

export type Coach = {
  slug: string;
  name: string;
  team: string;
  role: string;
  licenses: string;
  bio: string;
  photo: string; // expected path under /public/images/coaches/
  isPlaceholder: boolean;
};

export type Achievement = {
  year: string;
  title: string;
  description: string;
};

const club = {
  // ---------------------------------------------------------------------
  // CORE IDENTITY
  // ---------------------------------------------------------------------
  clubName: "Manassas United Academy",
  shortName: "Manassas United",
  tagline: "Developing Players. Building Character. Creating Opportunities.",
  location: {
    city: "Manassas",
    state: "Virginia",
    region: "Prince William County / Northern Virginia",
    display: "Manassas, Virginia",
    servingArea: "Serving Prince William County and Northern Virginia",
  },
  nonprofitStatus: "501(c)(3) Nonprofit Organization",

  // Replace with official founding year once confirmed by Manassas United.
  established: "Serving Northern Virginia's soccer community",

  colors: {
    navy: "#001A42",
    gold: "#FDBD10",
    white: "#FFFFFF",
  },

  logo: {
    path: "/images/manassas-united-logo.png",
    alt: "Manassas United Academy shield logo",
  },

  // ---------------------------------------------------------------------
  // SOCIAL MEDIA — add real URLs here once accounts are live
  // ---------------------------------------------------------------------
  socialMedia: {
    instagram: "",
    facebook: "",
    twitter: "",
    youtube: "",
  },

  // ---------------------------------------------------------------------
  // MISSION & VALUES
  // ---------------------------------------------------------------------
  mission:
    "To provide a competitive and inclusive soccer environment where players can develop technically, tactically, physically and mentally while creating opportunities to compete at higher levels of the game.",

  missionShort:
    "Provide high-quality, competitive soccer training while keeping opportunities accessible and affordable for players from different backgrounds.",

  focusAreas: [
    "Player development",
    "Competitive soccer",
    "Technical development",
    "Tactical development",
    "Character",
    "Confidence",
    "Teamwork",
    "College opportunities",
    "Professional development pathways",
    "International opportunities",
  ],

  values: [
    {
      name: "Development",
      description:
        "Every player follows a development plan built around technical, tactical, physical and mental growth.",
    },
    {
      name: "Discipline",
      description:
        "Consistency in training, preparation and habits is what turns potential into performance.",
    },
    {
      name: "Respect",
      description:
        "For the game, for teammates, for opponents, and for everyone who contributes to a player's journey.",
    },
    {
      name: "Community",
      description:
        "Manassas United is rooted in Prince William County and built to serve the families of Northern Virginia.",
    },
    {
      name: "Opportunity",
      description:
        "Keeping competitive soccer accessible so talent — not circumstance — determines a player's path.",
    },
    {
      name: "Excellence",
      description:
        "A relentless standard in how players train, compete and carry themselves on and off the field.",
    },
  ],

  philosophy: [
    {
      key: "technical",
      title: "Technical",
      description: "Develop confident players with the ball.",
    },
    {
      key: "tactical",
      title: "Tactical",
      description: "Teach players to understand and read the game.",
    },
    {
      key: "physical",
      title: "Physical",
      description: "Prepare athletes for the demands of competitive soccer.",
    },
    {
      key: "mental",
      title: "Mental",
      description: "Develop discipline, confidence and leadership.",
    },
  ],

  whyUs: [
    {
      title: "Competitive Environment",
      description:
        "Players train and compete in a high-standard environment built to push development every session.",
    },
    {
      title: "Experienced Coaching",
      description:
        "A coaching staff focused on technical, tactical, physical and mental growth at every age group.",
    },
    {
      title: "Player Development",
      description:
        "Individual development plans that grow with each player, from foundational years through elite competition.",
    },
    {
      title: "Affordable Opportunities",
      description:
        "As a nonprofit organization, Manassas United works to keep competitive soccer accessible to families across Northern Virginia.",
    },
    {
      title: "College Pathways",
      description:
        "Exposure and guidance to help players pursue NCAA college soccer opportunities.",
    },
    {
      title: "International Exposure",
      description:
        "Participation in national and international competition that connects players to a bigger stage.",
    },
  ],

  // ---------------------------------------------------------------------
  // COMPETITION / LEAGUES
  // ---------------------------------------------------------------------
  competition: {
    heading: "Competing at the Next Level",
    intro:
      "Manassas United teams compete in high-level regional and national competition. League placement may vary by team, age group and season — not every team competes in every league.",
    seasonNote:
      "For the 2026–27 season, Manassas United teams appear in National Academy League and NCSL competition.",
    leagues: [
      {
        name: "National Academy League (NAL)",
        description:
          "A national platform for competitive youth clubs, connecting Manassas United teams to elite competition beyond the region.",
      },
      {
        name: "NCSL / National Capital Soccer League",
        description:
          "Regional league competition against top clubs across the National Capital Area.",
      },
      {
        name: "US Youth Soccer / National League",
        description:
          "National League competition through US Youth Soccer where applicable by age group and season.",
      },
      {
        name: "Virginia State Cup",
        description:
          "Statewide cup competition open to Manassas United teams each season.",
      },
      {
        name: "Regional & National Showcases",
        description:
          "Showcase events and tournaments that put players in front of college coaches and national scouts.",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // AGE GROUPS / TEAMS
  // Team name / head coach are placeholders until provided by the club.
  // ---------------------------------------------------------------------
  teamsNote: "Specific team availability may vary by season.",
  teams: [
    {
      ageGroup: "U13",
      slug: "u13",
      birthYear: "2013",
      teamName: "Manassas United U13",
      headCoach: null,
      competitionLevel: "NCSL / Regional Competitive",
      program: "Competitive Boys Program",
    },
    {
      ageGroup: "U14",
      slug: "u14",
      birthYear: "2012",
      teamName: "Manassas United U14",
      headCoach: null,
      competitionLevel: "NCSL / Regional Competitive",
      program: "Competitive Boys Program",
    },
    {
      ageGroup: "U15",
      slug: "u15",
      birthYear: "2011",
      teamName: "Manassas United U15",
      headCoach: null,
      competitionLevel: "National Academy League / NCSL",
      program: "Competitive Boys Program",
    },
    {
      ageGroup: "U16",
      slug: "u16",
      birthYear: "2010",
      teamName: "Manassas United U16",
      headCoach: null,
      competitionLevel: "National Academy League / NCSL",
      program: "Competitive Boys Program",
    },
    {
      ageGroup: "U17",
      slug: "u17",
      birthYear: "2009",
      teamName: "Manassas United U17",
      headCoach: null,
      competitionLevel: "National Academy League / NCSL",
      program: "Competitive Boys Program",
    },
    {
      ageGroup: "U18",
      slug: "u18",
      birthYear: "2008",
      teamName: "Manassas United U18",
      headCoach: null,
      competitionLevel: "NCSL / Regional Competitive",
      program: "Competitive Boys Program",
    },
    {
      ageGroup: "U19",
      slug: "u19",
      birthYear: "2007",
      teamName: "Manassas United U19",
      headCoach: null,
      competitionLevel: "NCSL / Regional Competitive",
      program: "Competitive Boys Program",
    },
  ] as Team[],

  // ---------------------------------------------------------------------
  // COACHES — clearly-labeled placeholders until real staff info is provided
  // ---------------------------------------------------------------------
  coachesNote:
    "Coaching staff information below is placeholder content until official coach profiles are provided by Manassas United.",
  coaches: [
    {
      slug: "placeholder-1",
      name: "Coach Name TBD",
      team: "U15",
      role: "Head Coach",
      licenses: "Licenses/experience to be confirmed",
      bio: "Coach biography to be provided by Manassas United Academy.",
      photo: "/images/coaches/placeholder-1.jpg",
      isPlaceholder: true,
    },
    {
      slug: "placeholder-2",
      name: "Coach Name TBD",
      team: "U17",
      role: "Head Coach",
      licenses: "Licenses/experience to be confirmed",
      bio: "Coach biography to be provided by Manassas United Academy.",
      photo: "/images/coaches/placeholder-2.jpg",
      isPlaceholder: true,
    },
    {
      slug: "placeholder-3",
      name: "Coach Name TBD",
      team: "Academy-Wide",
      role: "Director of Coaching",
      licenses: "Licenses/experience to be confirmed",
      bio: "Coach biography to be provided by Manassas United Academy.",
      photo: "/images/coaches/placeholder-3.jpg",
      isPlaceholder: true,
    },
  ] as Coach[],

  // ---------------------------------------------------------------------
  // FACILITIES
  // ---------------------------------------------------------------------
  facilities: [
    {
      slug: "sinclair-elementary",
      name: "Sinclair Elementary School",
      address: "7801 Garner Dr",
      city: "Manassas, VA 20109",
      fieldType: "Natural Grass",
      purpose: "Training and matches",
      suitableFor: "Suitable for 9v9, 7v7 and 5v5",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=7801+Garner+Dr+Manassas+VA+20109",
      image: "/images/facilities/sinclair-elementary.jpg",
    },
    {
      slug: "louise-benton-middle",
      name: "Louise A. Benton Middle School",
      address: "7411 Hoadly Rd",
      city: "Manassas, VA 20112",
      fieldType: "Artificial Turf + Grass",
      purpose: "Used for technical training and matches",
      suitableFor: "Suitable for 11v11 / U13-U15",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=7411+Hoadly+Rd+Manassas+VA+20112",
      image: "/images/facilities/louise-benton-middle.jpg",
    },
    {
      slug: "nova-sportsplex",
      name: "Nova Sportsplex",
      address: "6966 Wellington Rd",
      city: "Manassas, VA 20109",
      fieldType: "Artificial Turf",
      purpose: "Indoor/winter training",
      suitableFor: "Indoor training facility",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=6966+Wellington+Rd+Manassas+VA+20109",
      image: "/images/facilities/nova-sportsplex.jpg",
    },
    {
      slug: "george-hampton-middle",
      name: "George M. Hampton Middle School",
      address: "14800 Darbydale Ave",
      city: "Woodbridge, VA 22193",
      fieldType: "Artificial Turf",
      purpose: "Used for tactical training and matches",
      suitableFor: "Suitable for U16-U19",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=14800+Darbydale+Ave+Woodbridge+VA+22193",
      image: "/images/facilities/george-hampton-middle.jpg",
    },
    {
      slug: "dean-park",
      name: "Dean Park",
      address: "9501 Dean Park Ln",
      city: "Manassas, VA 20110",
      fieldType: "Bermuda Grass",
      purpose: "Backup/training facility",
      suitableFor: "Training and overflow matches",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=9501+Dean+Park+Ln+Manassas+VA+20110",
      image: "/images/facilities/dean-park.jpg",
    },
  ] as Facility[],

  // ---------------------------------------------------------------------
  // PATHWAY & ACHIEVEMENTS — factual only, do not add unverified items
  // ---------------------------------------------------------------------
  pathway: {
    steps: [
      "Manassas United",
      "Competitive Leagues",
      "National Showcases",
      "College Soccer",
      "Pro / National Team Opportunities",
    ],
    partnerBadge: {
      title: "D.C. United Academy Path to Pros Partner",
      description:
        "In 2026, Manassas United was recognized by D.C. United Academy as a Path to Pros partner club.",
    },
    outcomes: [
      "NCAA college soccer",
      "Professional contracts",
      "International youth national team opportunities",
    ],
  },

  achievements: [
    {
      year: "2026",
      title: "D.C. United Academy Path to Pros Partner",
      description:
        "Manassas United was recognized by D.C. United Academy as a Path to Pros partner club.",
    },
    {
      year: "2026",
      title: "Copa Amistad U15 Finalist — Lima, Peru",
      description:
        "Boys 2011 team reached the final in the U15 category at Copa Amistad in Lima, Peru.",
    },
    {
      year: "2023–24",
      title: "USYS National League Division 1 Champions",
      description:
        "Boys 2007 team won the US Youth Soccer National League Division 1 championship.",
    },
  ] as Achievement[],

  eventsCompeted: [
    "Virginia State Cup",
    "East Coast Premier Cup",
    "adidas National Cup",
    "VDA College Showcase",
    "OBGC Capital Cup",
    "Arlington ASIST",
  ],

  // ---------------------------------------------------------------------
  // HISTORY TIMELINE (About page)
  // Only factual, confirmed milestones belong here. The founding entry is
  // intentionally left as a placeholder — do not guess a founding year.
  // ---------------------------------------------------------------------
  history: [
    {
      year: "Est.",
      title: "Manassas United Academy Founded",
      // Replace with official founding year once confirmed by Manassas United.
      description:
        "Serving Northern Virginia's soccer community. Official founding year to be confirmed by the club.",
    },
    {
      year: "2023–24",
      title: "USYS National League Division 1 Champions",
      description: "Boys 2007 team won the US Youth Soccer National League Division 1 championship.",
    },
    {
      year: "2026",
      title: "Copa Amistad U15 Finalist — Lima, Peru",
      description: "Boys 2011 team reached the final in the U15 category at Copa Amistad in Lima, Peru.",
    },
    {
      year: "2026",
      title: "D.C. United Academy Path to Pros Partner",
      description: "Manassas United was recognized by D.C. United Academy as a Path to Pros partner club.",
    },
  ],

  // ---------------------------------------------------------------------
  // CONTACT
  // ---------------------------------------------------------------------
  contact: {
    orgName: "Manassas United Academy",
    // Placeholder address — replace with the club's real contact email.
    email: "info@manassasunited.org",
    phone: "",
    address: "Manassas, Virginia",
    servingArea: "Serving Prince William County and Northern Virginia",
    departments: [
      {
        name: "General Questions",
        description: "Anything about the club, programs or how to get involved.",
      },
      {
        name: "Tryouts",
        description: "Questions about tryout dates, age groups or the evaluation process.",
      },
      {
        name: "Coaching",
        description: "Coaching opportunities and staff inquiries.",
      },
      {
        name: "Sponsorships",
        description: "Support Manassas United as a sponsor or community partner.",
      },
      {
        name: "Partnerships",
        description: "Club, school and organizational partnership inquiries.",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // SEO
  // ---------------------------------------------------------------------
  seo: {
    defaultTitle:
      "Manassas United Academy | Competitive Youth Soccer in Manassas, VA",
    defaultDescription:
      "Manassas United Academy provides competitive youth soccer development, elite training, and player pathways for athletes throughout Manassas, Prince William County, and Northern Virginia.",
  },

  // ---------------------------------------------------------------------
  // NAVIGATION
  // ---------------------------------------------------------------------
  navigation: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Teams", href: "/teams" },
    { label: "Pathway", href: "/pathway" },
    { label: "Facilities", href: "/facilities" },
    { label: "Tryouts", href: "/tryouts" },
    { label: "Coaches", href: "/coaches" },
    { label: "News", href: "/news" },
    { label: "Contact", href: "/contact" },
  ],
};

export default club;
