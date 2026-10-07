# Jungle Lords — portable website conversion

## What to upload
Upload the **contents of `site/`** to your host's public web directory. `index.html` must be at its root. There is no build command, package installation, Shopify subscription, Liquid engine, database, or Node server required. To preview, open `site/index.html` or run `python3 -m http.server 8000 --directory site` and visit http://localhost:8000.

Compatible with hosts that serve HTML/CSS/JavaScript: Cloudflare Pages, Netlify, GitHub Pages, Firebase Hosting, traditional Apache/Nginx hosting, and cPanel/Hostinger public directories. Relative links also work in a subdirectory. This is NOT a Squarespace, Wix, WordPress, or Shopify theme installer. Closed site builders require recreating the layout, a supported embed, or platform-specific conversion.

## Before going live
1. Edit `site/assets/site-config.js`. Enter verified hourly rates for Club Room and Suite Room. `null` deliberately displays “Rate on inquiry”; no prices were present in the export.
2. Download the original studio photos/logo/videos from Shopify Files. The theme ZIP contains their references, not their bytes. Convert HEIC photos to JPEG/WebP and MOV videos to browser-compatible MP4 (H.264/AAC) or WebM. Put them under `site/assets/media/`. Set corresponding `media` values to e.g. `assets/media/club-room.jpg`. Missing/unavailable media is hidden instead of showing broken images. `migration/media-manifest.json` lists every media reference and its source location.
3. Add each engineer's actual Google Calendar booking URL in `engineers[].bookingUrl`. Calendar links appear only when configured. The portable site does not authenticate with Google, read live availability, coordinate shared rooms, or automatically write events. Independent engineer calendars do not prevent room double bookings by themselves.
4. Verify the studio contact details. The export supplies bookings@thejunglelords.com, 872-222-1347 and 1719 W. 18th St Chicago IL, 60608. The homepage copy refers to the west side and an earlier Pilsen location, so confirm that the footer address is current.
5. Test a reservation inquiry on your phone and desktop. The form prepares a **mailto email draft**, which the visitor must send. It does not silently submit, deliver email from a server, store requests, charge money, or confirm a reservation. Copy inquiry is provided as a fallback. A hosted form service or server endpoint is needed for direct delivery.

## Editing
- Content is ordinary HTML in `index.html`, `engineers.html`, `about.html`, `contact.html`.
- Colors, layout, typography and responsive styling: `assets/site.css`.
- Rates, media, calendar links and booking-email recipient: `assets/site-config.js`.
- Contact details displayed in footers are also configured by that file when JavaScript runs. Update their HTML fallbacks too if changing them.
- The exported font names are approximated with locally installed Baskerville/Charter/Georgia fallbacks. Shopify-hosted font files were not included.

## What was preserved or replaced
Preserved the studio's copy, room descriptions, nine engineer profiles and their Instagram links, four staff profiles, collaborator lists, two real homepage FAQs, brand colors and social/contact links. Rebuilt the responsive navigation, semantic HTML and inquiry form. Links to Shopify room products now point to reservation inquiries. The original footer phone label and its mismatched telephone link were reconciled to the label's number.

Shopify carts, checkout, customer accounts, product inventory/reviews, Shopify Inbox, Sendvio, newsletter subscriptions, dynamic menus, blog/product data and other Shopify app integrations are not portable and are not included as working features. Unfilled generic theme-demo contact/FAQ sections were omitted from the public site. Products, rates, menus, policies, page bodies and media must be exported separately if they exist in the store.

`original-shopify-theme/` preserves the extracted upload unchanged for reference. Do not deploy this directory or the migration notes; only deploy `site/`. `migration/source-settings.json` preserves the relevant source settings and content. The generated site is a functional reconstruction from that export, not a pixel-identical rendering of the live Shopify site.

## Hosting
- Cloudflare Pages: upload `site/` using its static direct-upload workflow, or use a repository with that directory as the published output. No build needed.
- Netlify: deploy the `site/` directory. No build needed.
- GitHub Pages: copy `site/` contents to the configured publishing directory, such as repository root or `docs/`.
- cPanel/Hostinger: copy `site/` contents into the chosen document root.

Use a host-provided address for no domain registration charge. An owned domain has separate renewal costs. Provider free-plan limits and terms still apply.
