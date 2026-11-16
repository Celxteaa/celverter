# Celverter
Static site generator + tiny Node server. No runtime dependencies (Node 18+).

    SITE=https://celverter.com CONTACT_EMAIL=you@celverter.com node build.js
    node server.js            # or upload dist/ to any static host (Netlify/Cloudflare read dist/_headers)

## AdSense
Ads are off until you set `ADSENSE_CLIENT=ca-pub-XXXX` and `ADSENSE_SLOT=<slot id>` and rebuild. This adds the AdSense script, ads.txt and a relaxed CSP.
Before enabling ads for visitors in the EEA/UK/Switzerland, add a Google-certified consent banner (CMP). Not included.
Approval depends on Google's review of the live site; nothing here can guarantee it.

## Search Console
Verify the domain, submit https://celverter.com/sitemap.xml, then request indexing for the home page.

## Structure
- `data/i18n.js` – language list and shared UI strings (six values per key: en|es|pt|id|hi|ar; the loader checks the count).
- `data/tools.js` – every tool's name and About text in all six languages.
- `data/content-a.js`, `data/content-b.js` (merged by `data/content.js`) – the "How to use" steps (3 per tool, shared by tool family) and FAQ (tool-specific questions plus one shared privacy question) in all six languages. They also produce FAQPage structured data.
- `data/legal.js` – About, Privacy, Terms and Contact pages in all six languages.
- `src/app.js` – tool logic (runs in the browser, no dependencies); `build.js` – static generator.

The build stops with an error if a tool is missing text, steps or FAQ for any language, or if a string does not have exactly six values.

## Extend
- New tool: add it to `data/tools.js` and `data/content-a.js`/`content-b.js` (all six languages) and add an entry with the same id in `T` (src/app.js). UI labels go in `data/i18n.js`.
- Tool-specific UI labels (used by one tool only) can go in a `ui` object on its entry in `data/tools.js` (six values per key); they are added to that tool's pages only. A tool with its own layout sets `custom` in `T` (see the APA 7 reference generator, `apa-reference-generator`).
- New language: add its code to `L`, `LN`, `OG` and one value per key in `data/i18n.js`, a block in `data/legal.js`, and its text for each tool in `data/tools.js`. The AI cleaner's chatbot phrases (OPEN/CLOSE in src/app.js) can be extended too.
- Contact email is only a mailto link: use a real mailbox.
- Favicon is SVG; add PNG/ICO (48px+) if you want maximum compatibility in search results.
