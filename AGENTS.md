# AGENTS.md

Notes for future sessions working on the Beauty Unique Outdoor Day Spa site.

## What this is

A four-page static marketing site for an outdoor day spa in Potchefstroom, South
Africa. The layout and copy were supplied by the owner as finished HTML
(home + treatments menu) and as page designs for packages and etiquette; the work
was to reproduce them faithfully, place the owner's own photography, and wire
every booking action to Fresha.

## Architecture

No framework and no build step. Netlify serves `public/` directly
(`netlify.toml` → `[build] publish = "public"`). Each page is one self-contained
HTML file; Netlify's implicit `.html` resolution gives the clean URLs
(`/treatments`, `/packages`, `/etiquette`).

```
netlify.toml          publish dir, cache headers, /book + /booking → Fresha
public/
  index.html          Home
  treatments.html     Service menu, 5 category tabs
  packages.html       4 package collections, 12 packages
  etiquette.html      Guidelines + visit details
  styles.css          Shared CSS: brand type, .luxury-card, .nav-link,
                      .photo-frame, marquee, tab helpers
  site.js             Mobile drawer + setActiveTab() + hash deep-links
  img/                The owner's photographs, full resolution, served once
.netlify/assets/…     Original design inputs (supplied HTML + page screenshots)
```

## Conventions

- **Tailwind via CDN**, configured inline in each page's `<head>` with the brand
  tokens: `sage #2D4739`, `sand #FAF8F5`, `gold #C19A6B`, `charcoal #2C2C2C`,
  and the Cormorant Garamond / Inter pairing. Keep that config block identical
  across pages — it is the design system.
- **Anything reused across pages lives in `styles.css` or `site.js`**, never
  duplicated into a page's inline `<style>`.
- **The header and footer are duplicated per page by design** (static site, no
  templating). When you change one, change all four. The header marks the current
  page by giving its nav link `text-gold font-bold` instead of
  `text-gray-500 hover:text-sage`.
- **Images are never referenced directly.** Always go through the Netlify Image
  CDN: `/.netlify/images?url=/img/<file>&w=<w>&h=<h>&fit=cover&fm=webp&q=78`.
  The originals are 150 KB–2.6 MB phone photos; shipping them raw would be the
  single worst thing you could do to this site's load time. Wrap photos in
  `.photo-frame` for the consistent crop and hover behaviour, and always write
  real alt text describing the garden.
- **Every booking action points at the full Fresha URL** with
  `target="_blank" rel="noopener"`. There is no booking page and no booking form
  on this site — Fresha owns that flow. `/book` and `/booking` redirect there so
  short links work in print and social bios.

## Non-obvious decisions

- **The tab switcher is page-agnostic.** `setActiveTab()` in `site.js` reads the
  category list from `data-categories` on the `.sticky-category-nav` element
  rather than hardcoding it, so treatments
  (`massages,facials,manis,nails,waxing`) and packages
  (`halfday,fullday,couples,groups`) share one implementation. A page that adds
  tabs must extend that attribute.
- **Contact details were reconciled deliberately.** The etiquette page design
  showed placeholder details (`Plot 124, Vyfhoek`, `+27 (0) 18 297 1234`,
  `bookings@beautyunique.co.za`, Mon–Sat 08:00–18:00). The real details from the
  supplied home page — and matching the Fresha listing — are used everywhere
  instead: 1 Nardus Conradie Street, Mooivallei Park; 083 451 0586;
  beautyunique.amdb@gmail.com; Mon–Fri 08:00–17:00, Sat 09:00–13:00. Do not
  reintroduce the placeholders.
- **The packages designs were four separate pages** with their own heroes; they
  are consolidated into one `/packages` page with a collection switcher, so the
  nav stays at the four pages the owner asked for. Deep links such as
  `/packages#couples` open a collection directly.
- **`styles.css` was authored, not supplied.** The original home page linked a
  `styles.css` that was never provided, and the treatments page carried those
  same rules inline; the shared file reconstructs them for both.
- `prefers-reduced-motion` disables the marquee, fades and photo zooms.

## Verification

There is nothing to compile. Serve it and look at it:

```bash
netlify dev --port 8889
```

All four routes, both static assets, both redirects and the Image CDN transform
were confirmed returning 200/301/302 and `image/webp` this way.

No `PLAN.md` exists — the site the owner asked for is complete.
