# FM Studios owner review preview

Published preview: https://sre-2025.github.io/fm-studios-preview/

Owner feedback: https://sre-2025.github.io/fm-studios-preview/review.html

A static, responsive website concept for FM Studios Music School. This is a proposed redesign; the live Squarespace site is unchanged.

## Preview locally

Serve `docs/` with a static HTTP server and open `index.html`. The site needs no package installation or build service. `build_preview.py` rebuilds the HTML; `docs/assets/style.css` and `docs/assets/site.js` are maintained directly.

## GitHub Pages

Publish from branch `main`, folder `/docs`. No custom domain is configured. Every page carries noindex/nofollow/noarchive. The project-folder robots.txt is retained, but only host-root robots.txt controls crawling; page metadata provides the preview indexing directive. These are search directives, not access controls.

## Owner approval

Open `review.html` for the feedback page. Feedback notes persist in this browser until cleared. Copy and a prepared email link are available; no feedback is sent automatically or stored on a server. Booking and inquiry links point to the school’s existing live Opus system. No analytics, advertising tags or payment integration are installed in this preview.

## Brand and social displays

The original FM palette is blue #1470af, black, white, and gray #eaeaee, verified from the live school website on October 23, 2026. The homepage uses Instagram's public profile embed and a Facebook profile card, with direct profile links and fallbacks. The public embeds load content from Meta; they do not give this site account access. Elite Foot & Ankle uses the Smash Balloon WordPress Instagram feed plugin; that plugin cannot be installed on a static GitHub Pages site. This preview uses Meta's own embed presentation instead.

## Before production migration

Confirm current teachers, instruments per location, lesson fees, trial terms, group program availability, travel policies and photo permissions. Preserve existing URLs or implement reviewed redirects. Validate Opus successful-lead and trial tracking in the actual accounts. Replace preview metadata and crawling rules only on the approved production deployment. Do not upload agency reports, credentials, customer data or internal audit notes into this repository.
