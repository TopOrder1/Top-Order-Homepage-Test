/**
 * Single source of truth for site-wide content.
 * Edit copy, pricing and the service area here — pages read from this file.
 */

export const business = {
  name: "Top Order Digital",
  owner: "Simon Heyting",
  tagline: "Websites for local trades and services in Perth's northern suburbs.",
  email: "simon@toporderdigital.com.au",
  phone: "0439 928 896",
  phoneHref: "tel:+61439928896",
  abn: "31 266 270 929",
  suburb: "Duncraig, WA",
  domain: "toporderdigital.com.au",
};

export const nav = [
  { label: "Work", href: "/work" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

export const suburbs = [
  "Duncraig",
  "Carine",
  "Sorrento",
  "Watermans Bay",
  "Hillarys",
  "Padbury",
  "North Beach",
  "Karrinyup",
  "Hamersley",
  "Balcatta",
  "Warwick",
  "Greenwood",
];

/** mailto helper — keeps the primary CTA consistent everywhere */
export function mailto(subject: string, body?: string) {
  const params = new URLSearchParams({ subject });
  if (body) params.set("body", body);
  return `mailto:${business.email}?${params.toString()}`;
}

export const heroTags = [
  "Built in two weeks",
  "Price on the page",
  "Domain and hosting included",
  "You own it outright",
];

/** The one package. Edit the price, the bullets and the payment steps here. */
export const offer = {
  name: "The Openers",
  price: "$500–800",
  unit: "one-off build",
  summary:
    "One package, built properly for your trade. Up to five pages, live in two weeks, with your domain and the first year of hosting already in the price.",
  features: [
    "Full custom build, up to five pages — Home, Services, Why Us, Service Area, Contact",
    "Mobile-responsive, with click-to-call and click-to-text front and centre",
    "Your real business details and positioning built in from the start, not a generic template",
    "Domain registered for two years, included in the build price",
    "Hosting included for twelve months, fully managed — nothing for you to set up",
    "Unlimited revisions before go-live",
    "You own the site and the domain outright — no lock-in, no reseller platform",
  ],
};

/** How paying works — replaces the old three-tier comparison table. */
export const paymentSteps = [
  {
    when: "To start",
    amount: "$250–400",
    body: "A deposit gets the build underway and your domain registered in your name.",
  },
  {
    when: "On go-live",
    amount: "The remainder",
    body: "The rest of the build price, due once the site is live and you're happy with it.",
  },
  {
    when: "After twelve months",
    amount: "$49 / month",
    body: "Hosting rolls over to a monthly fee. I email you before it kicks in, and the site is yours to move if you'd rather.",
  },
];

export const faqs = [
  {
    q: "Why is the price a range?",
    a: "A five-page site with a page for each suburb takes longer than a tidy one-pager. After one phone call I'll tell you which end of $500–800 you're at, before you commit anything.",
  },
  {
    q: "Do I have to pay it all up front?",
    a: "No. A $250–400 deposit gets it started, and the rest is due when the site is live and you're happy with it.",
  },
  {
    q: "Who owns the site?",
    a: "You do — the site and the domain, outright. It's not on a reseller platform and there's nothing to buy back off me if you leave.",
  },
  {
    q: "What happens after the first twelve months?",
    a: "Hosting is included for the first year. After that it's $49 a month, and I'll email you before it starts. If you'd rather host it somewhere else, I'll help you move it.",
  },
  {
    q: "What do you need from me?",
    a: "One phone call, photos of your own work, and your ABN and licence details. I write the rest and send it to you to check.",
  },
  {
    q: "What if I already have a website?",
    a: "Send me the link. Sometimes a rebuild is the answer and sometimes it just needs the phone number moved. I'll tell you which.",
  },
  {
    q: "Do you do SEO?",
    a: "Not as a monthly service. I build the site so it turns up for your trade and your suburbs, which is what most local businesses actually need.",
  },
];

export interface Project {
  name: string;
  trade: string;
  tradeShort: string;
  suburb: string;
  year: string;
  domain: string;
  /** screenshot path, or null while the demo is still being built */
  shot: string | null;
  status: "live" | "planned";
  blurb: string;
  tags: string[];
  pages: string;
  built: string;
}

/** Portfolio — demo builds. `status: "planned"` renders a branded placeholder. */
export const projects: Project[] = [
  {
    name: "SolarCon Cleaning",
    trade: "Solar & split-system cleaning",
    tradeShort: "Solar cleaning",
    suburb: "Perth northern suburbs",
    year: "2026",
    domain: "solarconcleaningmobile.netlify.app",
    shot: "/assets/work-solarcon.png",
    status: "live",
    blurb:
      "Two local apprentice electricians cleaning solar panels and split systems. The site leads with the reason to bother — dusty panels lose output — and puts a free quote and a call button side by side on every screen.",
    tags: ["Free quote CTA", "Service area pages", "FAQ"],
    pages: "One",
    built: "Two weeks",
  },
  {
    name: "Northside Electrical",
    trade: "Electrician",
    tradeShort: "Electrician",
    suburb: "Duncraig",
    year: "2026",
    domain: "northsideelectrical.com.au",
    shot: null,
    status: "planned",
    blurb:
      "A demo build for an emergency electrician: a 24-hour call-out band up top and a suburb list underneath, so the after-hours searches land somewhere.",
    tags: ["Suburb pages", "Call-out band", "Google Business"],
    pages: "Five",
    built: "Two weeks",
  },
  {
    name: "Carine Power & Data",
    trade: "Data & comms",
    tradeShort: "Data & comms",
    suburb: "Carine",
    year: "2026",
    domain: "carinepowerdata.com.au",
    shot: null,
    status: "planned",
    blurb:
      "A demo build showing fixed prices for the common jobs on the home page, to cut the “what would this cost” back-and-forth right down.",
    tags: ["Fixed-price list", "Enquiry form", "Photo gallery"],
    pages: "Five",
    built: "Two weeks",
  },
  {
    name: "Watermans Plumbing",
    trade: "Plumber",
    tradeShort: "Plumber",
    suburb: "Watermans Bay",
    year: "2025",
    domain: "watermansplumbing.com.au",
    shot: null,
    status: "planned",
    blurb:
      "A demo one-pager that does the job of five. Trade, service area and phone number visible before you scroll, and the whole thing built to load in under a second.",
    tags: ["Single page", "Click-to-call", "Under 1s load"],
    pages: "One",
    built: "Nine days",
  },
  {
    name: "Sorrento Landscapes",
    trade: "Landscaper",
    tradeShort: "Landscaper",
    suburb: "Sorrento",
    year: "2025",
    domain: "sorrentolandscapes.com.au",
    shot: null,
    status: "planned",
    blurb:
      "A demo gallery-first build. Before-and-afters run full width, with a quote form that asks the four things worth asking.",
    tags: ["Before & after", "Quote form", "Full-width gallery"],
    pages: "Four",
    built: "Two weeks",
  },
  {
    name: "Padbury Roof & Gutter",
    trade: "Roofing",
    tradeShort: "Roofing",
    suburb: "Padbury",
    year: "2025",
    domain: "padburyroofing.com.au",
    shot: null,
    status: "planned",
    blurb:
      "A demo build for a trade where storm season is the whole year — seasonal messaging kept current, with the hero swapped over when the weather turns.",
    tags: ["Seasonal hero", "Hosting handled", "Unlimited revisions"],
    pages: "Five",
    built: "Two weeks",
  },
];

export const alwaysIncluded = [
  {
    title: "Built for phones first",
    body: "Most of your customers will never see it on a desktop.",
  },
  {
    title: "Suburb pages",
    body: "So you turn up for the searches that name where you work.",
  },
  {
    title: "Google Business set up",
    body: "Hours, photos, service area and reviews, done properly.",
  },
  {
    title: "One obvious next step",
    body: "Call or enquire, on every screen, without scrolling.",
  },
];

export const processSteps = [
  {
    num: "01",
    title: "You email me",
    body: "Your trade, your suburbs, and what you want the site to do. No form to fill in.",
    when: "Reply within a day",
  },
  {
    num: "02",
    title: "One phone call",
    body: "Half an hour. I ask what your customers ring you about and what jobs you actually want more of.",
    when: "About 30 minutes",
  },
  {
    num: "03",
    title: "I build it",
    body: "I write the copy, lay it out and send you a link to look at. You mark up anything you want changed.",
    when: "Week one to two",
  },
  {
    num: "04",
    title: "It goes live",
    body: "Domain pointed, Google Business Profile set up, and I check it on a real phone before I call it done.",
    when: "Two weeks from start",
  },
];
