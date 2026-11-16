'use strict';
/* Static site generator for Celverter. Usage: node build.js
   Env: SITE, ADSENSE_CLIENT (ca-pub-...), ADSENSE_SLOT, CONTACT_EMAIL */
const fs = require('fs'), path = require('path');
const SITE = (process.env.SITE || 'https://celverter.com').replace(/\/$/, '');
const AD = process.env.ADSENSE_CLIENT || '', SLOT = process.env.ADSENSE_SLOT || '', MAIL = process.env.CONTACT_EMAIL || 'celxtea@proton.me';
const { L, LN, OG, RTL, t } = require('./data/i18n');
const C = require('./data/tools');
const CONTENT = require('./data/content');
const DAY = new Date().toISOString().slice(0, 10), YEAR = new Date().getFullYear(), OUT = 'dist';
const LG = require('./data/legal')({ MAIL, DAY });

/* ---------- validation: fail the build instead of shipping a half-translated page ---------- */
for (const c of C) for (const x of c.tools) for (const l of L) {
  if (!x.n[l] || !x.a[l]) throw new Error(`missing ${l} text for tool ${x.id}`);
}
for (const c of C) for (const x of c.tools) for (const [k, v] of Object.entries(x.ui || {})) if (v.split('|').length !== L.length) throw new Error(`ui string ${k} of tool ${x.id} needs ${L.length} values`);
const ids = new Set(C.flatMap(c => c.tools.map(x => x.id)));
for (const id of ids) if (!CONTENT[id]) throw new Error('missing steps/FAQ for tool ' + id);
for (const id of Object.keys(CONTENT)) if (!ids.has(id)) throw new Error('steps/FAQ for unknown tool ' + id);
for (const l of L) for (const k of ['about', 'privacy', 'terms', 'contact']) if (!LG[l] || !LG[l][k]) throw new Error(`missing legal ${k} for ${l}`);

/* ---------- helpers ---------- */
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const url = (l, p = '') => (l === 'en' ? '' : '/' + l) + '/' + p;
const jld = o => '<script type="application/ld+json">' + JSON.stringify(o).replace(/</g, '\\u003c') + '</script>';
const firstSentence = s => s.split(/(?<=[.!?؟。।])\s/)[0];
const stepsOf = (id, l) => CONTENT[id].steps.map(s => s[L.indexOf(l)]);
const faqOf = (id, l) => CONTENT[id].faq.map(([q, a]) => [q[L.indexOf(l)], a[L.indexOf(l)]]);
const faqLD = (id, l) => ({ '@type': 'FAQPage', mainEntity: faqOf(id, l).map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
const LOGO = '<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><rect width="32" height="32" rx="9" fill="#3b3bdb"/><path d="M20.5 11.2A7.4 7.4 0 1 0 20.5 20.8" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/><rect x="20" y="13.5" width="5" height="5" rx="1" transform="rotate(45 22.5 16)" fill="#f2b134"/></svg>';
const ad = l => AD && SLOT
  ? `<aside class="ad" data-l="${esc(t(l, 'ad'))}"><ins class="adsbygoogle" style="display:block" data-ad-client="${esc(AD)}" data-ad-slot="${esc(SLOT)}" data-ad-format="auto" data-full-width-responsive="true"></ins></aside>`
  : '<aside class="ad"></aside>';
const cats = l => C.map(c => ({ slug: c.slug, k: c.k, name: t(l, c.k), desc: t(l, 'd_' + c.k), tools: c.tools }));
const tile = (l, c, x) => `<li><a class="tile c-${c.k}" data-n="${esc(x.n[l].toLowerCase())}" href="${url(l, c.slug + '/' + x.id + '/')}">${esc(x.n[l])}</a></li>`;

const CSP = [
  "default-src 'self'",
  "script-src 'self'" + (AD ? ' https://pagead2.googlesyndication.com https://partner.googleadservices.com https://tpc.googlesyndication.com https://www.googletagservices.com https://adservice.google.com' : ''),
  "style-src 'self'" + (AD ? " 'unsafe-inline'" : ''),
  "img-src 'self' data: blob:" + (AD ? ' https:' : ''),
  "connect-src 'self'" + (AD ? ' https://pagead2.googlesyndication.com https://*.google.com https://*.doubleclick.net' : ''),
  "font-src 'self'", "object-src 'none'", "base-uri 'none'", "form-action 'none'", "frame-ancestors 'none'"
].concat(AD ? ['frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://*.google.com'] : []).concat(['upgrade-insecure-requests']).join('; ');

/* ---------- page shell ---------- */
function page({ l, path: pth, title, desc, body, ld = '', kw = '', home, ui = null }) {
  const alt = L.map(x => `<link rel="alternate" hreflang="${x}" href="${SITE}${url(x, pth)}">`).join('') + `<link rel="alternate" hreflang="x-default" href="${SITE}${url('en', pth)}">`;
  const cu = SITE + url(l, pth);
  const dd = cats(l).map(c => `<div class="dd"><a href="${url(l, c.slug + '/')}">${esc(c.name)}</a><button type="button" aria-expanded="false" aria-controls="m-${c.slug}" aria-label="${esc(c.name)}">▾</button><ul id="m-${c.slug}" hidden>${c.tools.map(x => `<li><a href="${url(l, c.slug + '/' + x.id + '/')}">${esc(x.n[l])}</a></li>`).join('')}</ul></div>`).join('');
  const lg = `<details class="lang"><summary aria-label="${esc(t(l, 'lang'))}">${l.toUpperCase()} ▾</summary><ul>${L.map(x => `<li><a href="${url(x, pth)}" hreflang="${x}" lang="${x}">${LN[x]}</a></li>`).join('')}</ul></details>`;
  const ft = cats(l).map(c => `<div><h2>${esc(c.name)}</h2><ul>${c.tools.map(x => `<li><a href="${url(l, c.slug + '/' + x.id + '/')}">${esc(x.n[l])}</a></li>`).join('')}</ul></div>`).join('')
    + `<div><h2>Celverter</h2><ul>${['about', 'privacy', 'terms', 'contact'].map(k => `<li><a href="${url(l, k + '/')}">${esc(t(l, k === 'privacy' ? 'priv' : k))}</a></li>`).join('')}</ul></div>`;
  const i18n = JSON.stringify({ ...Object.fromEntries(Object.keys(require('./data/i18n').U).map(k => [k, t(l, k)])), ...Object.fromEntries(Object.entries(ui || {}).map(([k, v]) => [k, v.split('|')[L.indexOf(l)]])) }).replace(/</g, '\\u003c');
  return `<!doctype html><html lang="${l}" dir="${RTL.has(l) ? 'rtl' : 'ltr'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(desc)}">${kw ? `<meta name="keywords" content="${esc(kw)}">` : ''}<meta name="robots" content="index,follow,max-image-preview:large"><link rel="canonical" href="${cu}">${alt}<meta name="theme-color" content="#3b3bdb"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="manifest" href="/manifest.webmanifest"><meta property="og:type" content="website"><meta property="og:site_name" content="Celverter"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${cu}"><meta property="og:locale" content="${OG[l]}"><meta name="twitter:card" content="summary"><link rel="stylesheet" href="/assets/style.css?v=${DAY}">${home && l === 'en' ? `<script src="/assets/lang.js?v=${DAY}"></script>` : ''}${AD ? `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${esc(AD)}" crossorigin="anonymous"></script>` : ''}${ld}</head><body><a class="skip" href="#main">${esc(t(l, 'skip'))}</a><header class="top"><div class="wrap bar"><a class="brand" href="${url(l)}" aria-label="Celverter">${LOGO}<span>celverter</span></a><button class="burger" type="button" aria-expanded="false" aria-controls="nav">${esc(t(l, 'menu'))}</button><nav id="nav" aria-label="${esc(t(l, 'menu'))}">${dd}${lg}</nav></div></header><main id="main" tabindex="-1">${body}</main><footer><div class="wrap"><div class="fgrid">${ft}</div><p class="copy">© ${YEAR} Celverter.</p></div></footer><script type="application/json" id="i">${i18n}</script><script src="/assets/app.js?v=${DAY}" defer></script>${AD && SLOT ? `<script src="/assets/ads.js?v=${DAY}" defer></script>` : ''}</body></html>`;
}
const crumbs = a => `<nav class="crumbs" aria-label="Breadcrumb"><ol>${a.map((x, i) => i < a.length - 1 ? `<li><a href="${x[1]}">${esc(x[0])}</a></li>` : `<li aria-current="page">${esc(x[0])}</li>`).join('')}</ol></nav>`;
const crumbLD = a => ({ '@type': 'BreadcrumbList', itemListElement: a.map((x, i) => ({ '@type': 'ListItem', position: i + 1, name: x[0], item: SITE + x[1] })) });
const W = (f, s) => { const p = path.join(OUT, f); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, s); };

/* ---------- generate ---------- */
fs.rmSync(OUT, { recursive: true, force: true });
const paths = [''];
for (const l of L) {
  const cs = cats(l), all = cs.flatMap(c => c.tools.map(x => x.n[l])), pre = l === 'en' ? '' : l + '/';
  /* home */
  W(pre + 'index.html', page({
    l, path: '', home: 1, title: `Celverter – ${t(l, 'h1')}`.slice(0, 90),
    desc: `${t(l, 'sub')} ${t(l, 'd_text')} ${t(l, 'd_crypto')}`.slice(0, 300), kw: all.join(', '),
    ld: jld({ '@context': 'https://schema.org', '@type': 'WebSite', name: 'Celverter', url: SITE + url(l), inLanguage: l }),
    body: `<section class="hero"><div class="wrap"><h1>${esc(t(l, 'h1'))}</h1><p class="lead">${esc(t(l, 'sub'))}</p><p class="note">${esc(t(l, 'local'))}</p><div class="search"><label class="vh" for="q">${esc(t(l, 'search'))}</label><input id="q" type="search" placeholder="${esc(t(l, 'search'))}" autocomplete="off"></div></div></section><div class="wrap">${cs.map(c => `<section><h2>${esc(c.name)}</h2><p>${esc(c.desc)}</p><ul class="grid">${c.tools.map(x => tile(l, c, x)).join('')}</ul></section>`).join('')}${ad(l)}</div>`
  }));
  /* categories and tools */
  for (const c of cs) {
    const cp = c.slug + '/', cr = [[t(l, 'home'), url(l)], [c.name, url(l, cp)]];
    paths.push(cp);
    W(pre + cp + 'index.html', page({
      l, path: cp, title: `${c.name} – Celverter`, desc: `${c.desc} ${c.tools.slice(0, 3).map(x => x.n[l]).join(', ')}. ${t(l, 'sub')}`.slice(0, 300), kw: c.tools.map(x => x.n[l]).join(', '),
      ld: jld({ '@context': 'https://schema.org', ...crumbLD(cr) }),
      body: `<div class="wrap">${crumbs(cr)}<h1>${esc(c.name)}</h1><p class="lead">${esc(c.desc)}</p><ul class="grid">${c.tools.map(x => tile(l, c, x)).join('')}</ul>${ad(l)}</div>`
    }));
    for (const x of c.tools) {
      const n = x.n[l], tp = cp + x.id + '/', cr2 = [...cr, [n, url(l, tp)]], ab = x.a[l];
      paths.push(tp);
      W(pre + tp + 'index.html', page({
        l, path: tp, ui: x.ui, title: `${n} – Celverter`, desc: firstSentence(ab).slice(0, 300), kw: `${n}, ${c.name}, Celverter`,
        ld: jld({ '@context': 'https://schema.org', '@graph': [{ '@type': 'WebApplication', name: n, url: SITE + url(l, tp), description: firstSentence(ab), applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any', browserRequirements: 'Requires JavaScript', inLanguage: l, offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }, crumbLD(cr2), faqLD(x.id, l)] }),
        body: `<div class="wrap">${crumbs(cr2)}<h1>${esc(n)}</h1><p class="lead">${esc(t(l, 'sub'))}</p><section class="tool" data-tool="${x.id}" aria-label="${esc(n)}"><div id="ui"><noscript>${esc(t(l, 'needjs'))}</noscript></div><p class="note">${esc(t(l, 'local'))}</p></section>${ad(l)}<section class="prose"><h2>${esc(t(l, 'steps'))}</h2><ol class="steps">${stepsOf(x.id, l).map(s => `<li>${esc(s)}</li>`).join('')}</ol><h2>${esc(t(l, 'how'))}</h2><p>${esc(ab)}</p><h2>${esc(t(l, 'faq'))}</h2>${faqOf(x.id, l).map(([q, a]) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join('')}</section><section><h2>${esc(t(l, 'related'))}</h2><ul class="grid">${c.tools.filter(y => y !== x).map(y => tile(l, c, y)).join('')}</ul></section></div>`
      }));
    }
  }
  /* legal */
  for (const k of ['about', 'privacy', 'terms', 'contact']) {
    paths.push(k + '/');
    const ti = t(l, k === 'privacy' ? 'priv' : k);
    W(pre + k + '/index.html', page({ l, path: k + '/', title: `${ti} – Celverter`, desc: `${ti} – Celverter. ${t(l, 'sub')}`, body: `<div class="wrap prose"><h1>${esc(ti)}</h1><div>${LG[l][k]}</div></div>` }));
  }
}

/* ---------- site files ---------- */
const up = [...new Set(paths)];
W('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` + up.flatMap(p => L.map(l => `<url><loc>${SITE}${url(l, p)}</loc><lastmod>${DAY}</lastmod>${L.map(x => `<xhtml:link rel="alternate" hreflang="${x}" href="${SITE}${url(x, p)}"/>`).join('')}<xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${url('en', p)}"/></url>`)).join('\n') + '\n</urlset>\n');
W('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
if (AD) W('ads.txt', `google.com, ${AD.replace(/^ca-/, '')}, DIRECT, f08c47fec0942fa0\n`);
W('favicon.svg', LOGO.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ').replace(' aria-hidden="true" focusable="false"', ''));
W('manifest.webmanifest', JSON.stringify({ name: 'Celverter', short_name: 'Celverter', start_url: '/', display: 'standalone', background_color: '#f6f7fc', theme_color: '#3b3bdb', icons: [{ src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' }] }));
/* 404 is shared by every language, so it says "page not found" in all of them */
const nf = { en: 'Page not found.', es: 'Página no encontrada.', pt: 'Página não encontrada.', id: 'Halaman tidak ditemukan.', hi: 'पेज नहीं मिला।', ar: 'الصفحة غير موجودة.' };
W('404.html', `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>404 – Celverter</title><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/assets/style.css?v=${DAY}"></head><body><main class="wrap"><h1>404</h1>${L.map(l => `<p class="lead" lang="${l}" dir="${RTL.has(l) ? 'rtl' : 'ltr'}"><a href="${url(l)}">${esc(nf[l])}</a></p>`).join('')}</main></body></html>`);
W('_headers', `/*\n  Content-Security-Policy: ${CSP}\n  X-Content-Type-Options: nosniff\n  X-Frame-Options: DENY\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()\n  Cross-Origin-Opener-Policy: same-origin\n  Strict-Transport-Security: max-age=31536000; includeSubDomains\n`);
fs.mkdirSync(OUT + '/assets', { recursive: true });
for (const f of ['style.css', 'app.js', 'lang.js', 'ads.js']) fs.copyFileSync('src/' + f, OUT + '/assets/' + f);
console.log('tools:', C.reduce((a, c) => a + c.tools.length, 0), '| pages:', up.length * L.length, '| sitemap urls:', up.length * L.length);
