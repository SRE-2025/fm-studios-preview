# FM Studios owner review preview

A static, responsive website concept for FM Studios Music School. This is a proposed redesign; the live Squarespace site is unchanged.

## Preview locally

Serve `docs/` with a static HTTP server and open `index.html`. The site needs no package installation or build service. `build_preview.py` rebuilds the HTML; `docs/assets/style.css` and `docs/assets/site.js` are maintained directly.

## GitHub Pages

Publish from branch `main`, folder `/docs`. No custom domain is configured. Every page carries noindex/nofollow/noarchive; robots.txt disallows crawling. These are search directives, not access controls.

## Owner approval

Open `review.html` for the feedback page. Feedback is copied locally; it is not sent or stored on a server. Booking and inquiry links point to the school’s existing live Opus system. No analytics, advertising tags or payment integration are installed in this preview.

## Before production migration

Confirm current teachers, instruments per location, lesson fees, trial terms, group program availability, travel policies and photo permissions. Preserve existing URLs or implement reviewed redirects. Validate Opus successful-lead and trial tracking in the actual accounts. Replace preview metadata and crawling rules only on the approved production deployment. Do not upload agency reports, credentials, customer data or internal audit notes into this repository.
