# Top Order Digital — website

Marketing site for Top Order Digital: websites for local trades and services in
Perth's northern suburbs. Built with [Astro](https://astro.build) as a static
site, deployed to Cloudflare via Workers Builds.

Converted from the Claude Design wireframe in `../wireframe/`.

---

## Quick start

```bash
cd site
npm install
npm run dev        # http://localhost:4321
```

```bash
npm run build      # static output → dist/
npm run preview    # serve the built site locally
```

Requires Node 18.20+ / 20.3+ / 22+.

---

## Project structure

```
site/
├── astro.config.mjs      site URL and build options
├── wrangler.jsonc        Cloudflare Worker: serves dist/ as static assets
├── src/
│   ├── data/site.ts      ← ALL content: copy, pricing, suburbs, portfolio, FAQs
│   ├── styles/global.css  design system (brand tokens, buttons, cards…)
│   ├── layouts/
│   │   └── BaseLayout.astro   <head>, SEO/Open Graph, JSON-LD, header + footer
│   ├── components/        Header, Footer, StickyCta, PricingPanel,
│   │                      WorkCarousel, Faq, CtaBand
│   └── pages/             index, work, pricing, about, contact, privacy, terms, 404
└── public/
    ├── assets/            logos, hero video, portfolio screenshots
    ├── fonts/             Argentum Sans SemiBold (headings)
    ├── favicon.svg/png, apple-touch-icon.png, site.webmanifest
    ├── og-image.png       social share image (1200×630, a plain file)
    ├── robots.txt
    ├── _redirects         common old-URL guesses → new paths
    └── _headers           security headers, the CSP, cache rules
```

**To change wording, prices, the service-area list or the portfolio, edit
`src/data/site.ts` only** — every page reads from it.

The offer is a single package (`offer`) plus the three payment steps
(`paymentSteps`). Change the price or the bullet list there and it updates on
both the homepage and the pricing page. The same figures are also written out in
prose on `src/pages/terms.astro` — update that too if the price changes.

---

## Contact form (Web3Forms)

The enquiry form posts to [Web3Forms](https://web3forms.com) (free, no account,
delivers straight to the inbox). Until a key is set it falls back to opening the
visitor's email client with the details pre-filled.

The address the site uses is `business.email` in `src/data/site.ts` — currently
`simon@toporderdigital.com.au`. Every `mailto:` link, the footer, the JSON-LD and
the form fallback read from that one value. Make sure the mailbox actually exists
and receives mail before go-live.

1. Go to web3forms.com, enter `simon@toporderdigital.com.au`, and copy the access key
   from the confirmation email.
2. Local: `cp .env.example .env` and paste the key into `PUBLIC_WEB3FORMS_KEY`.
3. Cloudflare: Worker → **Settings → Build → Build variables and secrets** → add
   `PUBLIC_WEB3FORMS_KEY` as Text. Not the runtime **Variables and Secrets**
   section: Astro bakes the key into the HTML at build time, so it must be a
   build variable, and a change only takes effect on the next build (retry the
   latest deployment after saving).

The key is a public submit token — safe to expose in the built HTML. It can only
send a message to the inbox it's registered to.

Spam protection: a hidden honeypot field is already wired up. Web3Forms' captcha
needs their script and an hCaptcha widget on the page, so turning it on also
means adding those domains to the Content-Security-Policy (see below).

---

## Deploying

This deploys through **Cloudflare Workers Builds**, not Cloudflare Pages. The
difference matters: Workers has no "framework preset" or "build output
directory" setting in the dashboard. The output folder is declared in
`wrangler.jsonc` instead.

Dashboard (**Settings → Build configuration**):

| Field | Value |
|---|---|
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Version command | `npx wrangler versions upload` |
| Root directory | `/` |

`wrangler.jsonc` declares `assets.directory: "./dist"`, serves `dist/404.html`
for unknown paths, and sets `html_handling: "drop-trailing-slash"` so pages
answer at `/work` instead of redirecting to `/work/` — every internal link,
canonical and sitemap URL is written without the slash. Don't swap this for
Astro's `build.format: "file"`: that changes `Astro.url` to `/work.html` during
the build, which breaks the canonical tags and the nav's current-page highlight.
**Its `name` must match the Worker's real name**, or `wrangler deploy` silently
creates a second Worker and the custom domain keeps serving the old one.

The one environment variable, `PUBLIC_WEB3FORMS_KEY`, is a **build** variable:
**Settings → Build → Build variables and secrets** (see above).

`_redirects` and `_headers` in `public/` are honoured by Workers static assets.

### Content-Security-Policy

`public/_headers` sends a Content-Security-Policy, so the browser only loads
scripts, styles, fonts and connections from an allow-list: this site, Google
Fonts, Web3Forms (the form) and Cloudflare's visitor analytics, which Cloudflare
injects into every page. Anything else is blocked **silently** — the page just
doesn't show it. Before adding a third-party embed (a Google Map, YouTube video,
booking or chat widget, Web3Forms' captcha), add its domains to the policy, then
check the browser console for "Content Security Policy" errors.

### Dependency versions are pinned

`package.json` uses exact versions, not carets, and there's no lockfile
committed. That's deliberate: the first CI build failed because a caret let
`@astrojs/sitemap` resolve to a version built for the next major of Astro. If
you bump a version, watch the build.

### Redirects from the old site

The site this replaced was a single page at `/`, so there's nothing to migrate —
`/` still exists, and its `#top`, `#about`, `#work` and `#pricing` anchors are
preserved on the new homepage. `public/_redirects` only covers common guesses
(`/services`, `/portfolio`). Add any real old URLs that show up in Search
Console once it's connected.

---

## Social share image

`public/og-image.png` is the picture that appears when someone shares a link to
the site (Facebook, LinkedIn, iMessage, Slack). It's a plain 1200×630 PNG: to
change it, replace the file with another 1200×630 PNG and keep the logo and text
clear of the edges. Networks cache these, so a new image can take a while to show
on links that were already shared.

Don't go back to generating it during the build. Cloudflare's build machine has
none of the brand fonts, so a rendered image comes out in a stand-in font.

---

## SEO notes

- Per-page `<title>` and meta descriptions, Open Graph + Twitter tags, canonical
  URLs — all in `BaseLayout.astro`.
- `ProfessionalService` structured data with the full service-area suburb list.
- `src/pages/sitemap.xml.ts` builds `/sitemap.xml` at compile time; `robots.txt` points to it. Add new routes to the list in that file.
- Target terms (from the brief): "website for tradies Perth", "web designer for
  trades Perth", plus per-suburb long-tail. As the trade demo sites get built,
  give each trade/suburb its own page and link them from `/work`.

---

## Design system

Brand tokens live at the top of `src/styles/global.css`:

| Token | Value | Use |
|---|---|---|
| `--cobalt` | `#3B54C4` | primary — buttons, links |
| `--navy` | `#1E2559` | text, dark sections, footer |
| `--apricot` | `#F0A868` | accent only, one per screen |
| `--warm-white` | `#F7F5F2` | page background |
| `--cobalt-tint` / `--apricot-tint` | `#E7EAF8` / `#FCE9D8` | cards, tags, badges |

Headings: **Argentum Sans SemiBold** (self-hosted). Body: **Hanken Grotesk**
(Google Fonts). Pill buttons, 20px card corners, 28px section corners, soft low
shadows, no hard borders on dark backgrounds.

---

## Still to add

- **Photo of Simon** on the About page — the card shows the brand icon until
  then. Put the photo in `public/assets/` and swap it into the `<img>` at the
  top of the about card in `src/pages/about.astro`, with real `alt` text.
- **Portfolio demo sites** — as each trade demo is built, set its `status` to
  `"live"` and add a `shot` screenshot path in `src/data/site.ts`.
- **Google Business Profile + Search Console** (per the brief).
