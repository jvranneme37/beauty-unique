# Beauty Unique Outdoor Day Spa

The website for Beauty Unique Outdoor Day Spa — an outdoor spa on the banks of the
Mooirivier at 1 Nardus Conradie Street, Mooivallei Park, Potchefstroom.

Four pages, all live:

| Page | Path | What's on it |
| --- | --- | --- |
| Home | `/` | Hero, the Paradys story, grounds gallery, healing partners, legacy, expert team |
| Treatments | `/treatments` | Full service menu with prices, tabbed by category |
| Packages | `/packages` | Half Day, Full Day, Couples and Group Gatherings collections |
| Etiquette | `/etiquette` | Arrival, booking policies, environment, health & safety, visit details |

Every **Book Now** / **Book Experience** button opens the spa's
[Fresha booking page](https://www.fresha.com/a/beauty-unique-outdoor-day-spa-potchefstroom-potchefstroom-1-nardus-conradie-street-y1aoauuz)
in a new tab. `/book` and `/booking` redirect there too, so those short links can be
used in print, WhatsApp or Instagram bios.

## Technologies

- **Static HTML** — no build step, no framework. Each page is a single self-contained file.
- **Tailwind CSS** via CDN, configured inline with the brand palette
  (sage `#2D4739`, sand `#FAF8F5`, gold `#C19A6B`) and type pairing
  (Cormorant Garamond for display, Inter for interface text).
- **Netlify Image CDN** — photographs are stored once at full resolution in
  `public/img/` and requested through `/.netlify/images?...` so visitors receive
  resized WebP versions instead of multi-megabyte originals.
- **Netlify redirects and headers** — configured in `netlify.toml`.

## Running it locally

```bash
netlify dev --port 8889
```

Then open http://localhost:8889. The dev server emulates the Image CDN and the
redirects, so booking links and photo transforms behave exactly as in production.

Because there is no build step, editing any file in `public/` and refreshing the
browser is the whole development loop.

## Adding the custom domain

The site's canonical URLs and social tags already point at
`https://beautyuniqueoutdoorspa.com`. To make that live, add the domain in the
Netlify project under **Domain management → Add a domain**, then point the
registrar at Netlify DNS (or add the `A` / `CNAME` records Netlify shows).
HTTPS is provisioned automatically once DNS resolves.

## Updating content

- **Prices or treatments** — edit `public/treatments.html`. Categories are the
  `#sec-massages`, `#sec-facials`, `#sec-manis`, `#sec-nails`, `#sec-waxing` blocks.
- **Packages** — edit `public/packages.html`. Collections are `#sec-halfday`,
  `#sec-fullday`, `#sec-couples`, `#sec-groups`, and `/packages#couples`-style links
  open a collection directly.
- **Policies** — edit `public/etiquette.html`.
- **New photographs** — drop the file into `public/img/` and reference it as
  `/.netlify/images?url=/img/<file>&w=<width>&fm=webp`.

See `AGENTS.md` for architecture notes and conventions.
