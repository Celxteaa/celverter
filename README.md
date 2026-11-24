# Celverter
Static site generator + tiny Node server. No runtime dependencies (Node 18+).

    SITE=https://celverter.com CONTACT_EMAIL=you@celverter.com node build.js
    node server.js            # or upload dist/ to any static host (Netlify/Cloudflare read dist/_headers)

## Monetag
Ads are on by default. The build adds four Monetag tags to the `<head>` of every page (zones 12337826, 12337820, 12337799, 314779; the middle two come from `assets/mt.js`), writes `sw.js` to the site root (source: `src/sw.js`) and relaxes the CSP so Monetag can load its scripts and frames. Build with `ADS=off node build.js` to leave the tags out.
Optional env: `MONETAG_META` (verification meta content), `MONETAG_ADS_TXT` (ads.txt line; use `\n` for line breaks).

## Search Console
Verify the domain, submit https://celverter.com/sitemap.xml, then request indexing for the home page.

## Structure
- `data/i18n.js` – language list and shared UI strings (six values per key: en|es|pt|id|hi|ar; the loader checks the count).
- `data/tools.js` – every tool's name and About text in all six languages.
- `data/content-a.js`, `data/content-b.js` (merged by `data/content.js`) – the "How to use" steps (3 per tool, shared by tool family) and FAQ (tool-specific questions plus one shared privacy question) in all six languages. They also produce FAQPage structured data.
- `data/legal.js` – About, Privacy, Terms and Contact pages in all six languages.
- `src/app.js` – tool logic (runs in the browser, no dependencies); `build.js` – static generator.
- `src/stats.js` – the Excel to Statistics tool (`excel-to-statistics`, file converters). It is large, so it is a separate file loaded only on that tool's pages: its entry in `data/tools.js` has `script: 'stats.js'` and `build.js` adds the `<script>` tag. `app.js` only holds an empty `custom` entry for it.

The build stops with an error if a tool is missing text, steps or FAQ for any language, or if a string does not have exactly six values.

## Extend
- New tool: add it to `data/tools.js` and `data/content-a.js`/`content-b.js` (all six languages) and add an entry with the same id in `T` (src/app.js). UI labels go in `data/i18n.js`.
- Tool-specific UI labels (used by one tool only) can go in a `ui` object on its entry in `data/tools.js` (six values per key); they are added to that tool's pages only. A tool with its own layout sets `custom` in `T` (see the APA 7 reference generator, `apa-reference-generator`).
- New language: add its code to `L`, `LN`, `OG` and one value per key in `data/i18n.js`, a block in `data/legal.js`, and its text for each tool in `data/tools.js`. The AI cleaner's chatbot phrases (OPEN/CLOSE in src/app.js) can be extended too.
- Contact email is only a mailto link: use a real mailbox.
- Favicon is SVG; add PNG/ICO (48px+) if you want maximum compatibility in search results.

## Excel to Statistics
Reads `.xlsx`/`.xlsm` (own zip + XML reader with a built-in inflate fallback), `.csv`/`.tsv`/`.txt` and pasted or typed cells. No library is used and nothing is uploaded.
- Analyses: descriptive statistics (user picks the statistics, optional split by group and custom percentiles), frequency tables, normality tests (Shapiro–Wilk, Anderson–Darling, Lilliefors, Jarque–Bera), homogeneity of variances (Levene, Bartlett), Pearson/Spearman correlation, one-sample / independent (Student, Welch) / paired t-tests, one-way ANOVA (Welch, Tukey HSD), two-way ANOVA (type III), Mann–Whitney, Wilcoxon signed-rank, Kruskal–Wallis, Friedman, chi-square (independence with Yates and Fisher for 2×2, goodness of fit), binomial test, multiple linear regression, binary logistic regression and Cronbach's alpha.
- Charts (plain SVG, saved as SVG or PNG): bar chart (counts, percent, mean/median/sum with error bars, clustered or stacked), histogram with normal curve, box plot, scatter plot with trend line, line chart, pie chart, normal Q–Q plot and correlation heat map.
- Tables can be copied or downloaded as `.xlsx` or CSV. Definitions follow Excel where a function exists (inclusive quartiles, n − 1 variance, SKEW/KURT); exact Wilcoxon/Mann–Whitney p-values are used below 50 values without ties. Spearman p-values use the t approximation and Lilliefors p-values are approximate.
- The code is the separate file `src/stats.js`, loaded only on this tool's pages (`script: 'stats.js'` in `data/tools.js`, handled by `build.js`); `app.js` only holds an empty `custom` entry for it. Its labels are the `ui` object of the tool in `data/tools.js` (keys start with `s_`, six values each). Limits (`LIM` in `src/stats.js`): 100000 rows, 200 columns, 2 million cells, 15 MB.
- Old `.xls` and `.ods` files are not read (a message asks for `.xlsx`, CSV or pasted cells).

## Security and performance notes
- `server.js`: redirects use the still-encoded path (a decoded `%0d%0a` used to crash the process through the `Location` header), errors are caught instead of killing the server, gzip output is cached per file content, and assets requested with `?v=` get `Cache-Control: immutable`. `dist/_headers` has the same rule for static hosts (`/assets/*`).
- Asset URLs carry `?v=<hash of the files>` instead of the build date, so browsers keep cached files until they really change.
- Live tools wait 150 ms after the last keystroke and refuse input above 500000 characters (message key `big`).
- The regular expressions in the AI cleaner and "remove line breaks" no longer backtrack quadratically; output for normal text is identical.
- Image tools: canvas area is limited to 16.7 MP (iOS Safari limit) and the decoded bitmap is released after use.
