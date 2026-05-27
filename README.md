# Mexico Jungle Tours

Static bilingual SEO website for Mexico Jungle Tours, an independent tour operator / booking brand for Puerto Morelos jungle routes, Kin-Ha and Blanca Flor cenote access, ATV, ziplines, horseback riding and pickup coordination.

## Stack

- Static HTML
- Shared CSS in `assets/site.css`
- Small vanilla JavaScript in `assets/site.js` for WhatsApp links, package filters, lazy map loading and mobile CTAs
- Optimized WebP photography in `assets/photos/` generated from authentic Kin-Ha / Mexico Jungle Tours source images
- GitHub Pages and Cloudflare static hosting compatible
- No build step required for deployment

## Preview locally

```bash
python -m http.server 8080
```

Open `http://localhost:8080/`.

The site can also be opened directly from `index.html`, but a tiny local server is better for testing asset paths and map behavior.

## URL architecture

- `/` x-default homepage
- `/en/`
- `/es/`
- `/en/atv-zipline-cenote-tour-cancun/`
- `/es/tour-atv-tirolesa-cenotes-cancun/`
- `/en/puerto-morelos-cenote-tour/`
- `/es/cenotes-puerto-morelos/`
- `/en/horseback-riding-cenote-tour-puerto-morelos/`
- `/es/caballos-y-cenotes-puerto-morelos/`
- `/en/ruta-de-los-cenotes-puerto-morelos/`
- `/es/ruta-de-los-cenotes-puerto-morelos/`

## Live wiring before launch

- WhatsApp Business number is wired as `https://wa.me/529982053527`.
- Keep all imagery sourced from real Kin-Ha files in `assets/`.
- Use SEO-safe lowercase WebP derivatives in `assets/photos/` for production pages; keep raw photo filenames as source assets only.
- Add an approved GHL/CRM embed only when the booking form is ready.
- Add Stripe or checkout links only when real payment links are available.
- Add confirmed business address, coordinates and hours to structured data if they should be public.
- Confirm final legal wording for the optional preservation contribution before launch.
- Keep Mexico Jungle Tours positioned as an independent tour operator / booking brand, not the official Cenote Kin-Ha brand.

## Current packages

- Kin-Ha and Blanca Flor Cenotes: Adult MXN $500 / USD $30, child MXN $300 / USD $20
- ATV + Jungle Zipline: Adult MXN $1,200 / USD $70, child MXN $700 / USD $40
- Horseback Riding & Cenotes: Adult MXN $1,200 / USD $70, child MXN $700 / USD $40
- Kin-Ha Signature Experience: Adult MXN $1,400 / USD $85, child MXN $800 / USD $50

## SEO focus

- Cenote tour Puerto Morelos
- ATV cenote tour Cancun
- Ruta de los Cenotes tour
- Cenote tour near Playa del Carmen
- Horseback riding Puerto Morelos
- Zipline and cenote tour Riviera Maya
- Authentic jungle adventure Riviera Maya

## Maintenance

The checked-in HTML files are deployment-ready. `scripts/build-seo-pages.cjs` is a maintenance helper used to regenerate the static pages from shared copy if package details or metadata change.
