(root => {
'use strict';
/* Builds reference-list entries and in-text citations for websites, books and journal articles.
   Nothing is looked up or invented: output comes only from the fields the user typed.
   Result segments are { t: text, i: italic } so the page can render italics without innerHTML. */

const bad = () => { const e = new Error('err'); e.k = 'err'; throw e; };

/* ---------- words per citation language ---------- */
const W = {
  en: { and: 'and', amp: '&', nd: 'n.d.', etal: 'et al.', ed: 'ed.', edn: 'edn.', vol: 'vol.', no: 'no.', pp: 'pp.', p: 'p.', acc: 'Accessed', retr: 'Retrieved', from: ', from ', accP: 'Accessed: ', online: '[Online]. Available: ', avail: 'Available at: ', accI: 'Accessed: ' },
  es: { and: 'y', amp: 'y', nd: 's. f.', etal: 'et al.', ed: 'ed.', edn: 'ed.', vol: 'vol.', no: 'n.º', pp: 'pp.', p: 'p.', acc: 'Consultado el', retr: 'Recuperado el', from: ' de ', accP: 'Consultado el ', online: '[En línea]. Disponible en: ', avail: 'Disponible en: ', accI: 'Consultado: ' },
  pt: { and: 'e', amp: 'e', nd: 's.d.', etal: 'et al.', ed: 'ed.', edn: 'ed.', vol: 'v.', no: 'n.', pp: 'p.', p: 'p.', acc: 'Acesso em', retr: 'Recuperado em', from: ', de ', accP: 'Acesso em: ', online: '[Online]. Disponível em: ', avail: 'Disponível em: ', accI: 'Acesso em: ' },
  id: { and: 'dan', amp: 'dan', nd: 't.t.', etal: 'dkk.', ed: 'ed.', edn: 'ed.', vol: 'vol.', no: 'no.', pp: 'hlm.', p: 'hlm.', acc: 'Diakses', retr: 'Diakses', from: ', dari ', accP: 'Diakses: ', online: '[Daring]. Tersedia di: ', avail: 'Tersedia di: ', accI: 'Diakses: ' }
};
const LOC = { en: 'en-US', es: 'es', pt: 'pt-BR', id: 'id' };
const ABBR = {
  mla: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],
  ieee: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.']
};

/* ---------- parsing and normalising the input ---------- */
const parseDate = (s, needDay) => {
  s = (s || '').trim();
  if (!s) return null;
  const m = /^(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?$/.exec(s);
  if (!m) return bad();
  const y = +m[1], mo = m[2] ? +m[2] : 0, d = m[3] ? +m[3] : 0;
  if (mo && (mo < 1 || mo > 12)) bad();
  if (d) { const t = new Date(Date.UTC(y, mo - 1, d)); if (t.getUTCMonth() !== mo - 1 || t.getUTCDate() !== d) bad(); }
  if (needDay && !d) bad();
  return { y, m: mo, d };
};
const parseAuthors = s => (s || '').split(/\r?\n/).map(x => x.trim()).filter(Boolean).map(x => {
  const i = x.search(/[,،]/);
  if (i < 0) return { org: x };               /* no comma: organisation or single name, kept as typed */
  const fam = x.slice(0, i).trim(), giv = x.slice(i + 1).trim();
  return giv && fam ? { fam, giv } : { org: fam || giv };
});
const parseUrl = s => {
  s = (s || '').trim();
  if (!s) return '';
  if (/\s/.test(s)) bad();
  if (!/^https?:\/\//i.test(s)) { if (!/^[\w-]+(\.[\w-]+)+/.test(s)) bad(); s = 'https://' + s; }
  return s;
};
const parseDoi = s => {
  s = (s || '').trim().replace(/^(?:doi:\s*|https?:\/\/(?:dx\.)?doi\.org\/)/i, '');
  if (!s) return '';
  if (!/^10\.\d{4,9}\/\S+$/.test(s)) bad();
  return s;
};
const parsePages = s => {
  s = (s || '').trim();
  if (!s) return null;
  const m = /^([A-Za-z]?\d+)\s*[-–—]\s*([A-Za-z]?\d+)$/.exec(s);
  if (m) return { a: m[1], b: m[2], range: true };
  if (/^[A-Za-z]?\d+$/.test(s)) return { a: s, range: false };
  return bad();
};

/* ---------- names ---------- */
const isPart = t => /^\p{Ll}/u.test(t);        /* van, de, der... are kept as typed */
const initials = g => g.split(/\s+/).filter(Boolean).map(t => isPart(t) ? t : t.split('-').filter(Boolean).map(p => Array.from(p)[0].toLocaleUpperCase() + '.').join('-'));
const iniJoin = (g, sep) => initials(g).reduce((o, t, i, a) => o + (i ? (isPart(t) || isPart(a[i - 1]) ? ' ' : sep) : '') + t, '');
const sur = a => a.org || a.fam;

/* ---------- dates and pages ---------- */
const monthName = (cl, m, style) => ABBR[style] && cl === 'en' ? ABBR[style][m - 1] : new Date(2000, m - 1, 1).toLocaleString(LOC[cl], { month: 'long' });
const fmtDate = (cl, style, form, dt) => {
  if (!dt) return '';
  const { y, m, d } = dt;
  if (!m) return String(y);
  const mo = monthName(cl, m, style);
  if (cl === 'en') return form === 'dmy' ? (d ? `${d} ${mo} ${y}` : `${mo} ${y}`) : form === 'mdy' ? (d ? `${mo} ${d}, ${y}` : `${mo} ${y}`) : (d ? `${y}, ${mo} ${d}` : `${y}, ${mo}`);
  if (cl === 'id') return form === 'apa' ? (d ? `${y}, ${d} ${mo}` : `${y}, ${mo}`) : (d ? `${d} ${mo} ${y}` : `${mo} ${y}`);
  return form === 'apa' ? (d ? `${y}, ${d} de ${mo}` : `${y}, ${mo}`) : (d ? `${d} de ${mo} de ${y}` : `${mo} de ${y}`);
};
const common = (a, b) => { let i = 0; while (i < a.length && i < b.length && a[i] === b[i]) i++; return i; };
/* second number of a range: 'mla' keeps at least two digits; 'chi' follows the Chicago concise rules */
const condense = (a, b, how) => {
  if (!/^\d+$/.test(a) || !/^\d+$/.test(b) || b.length !== a.length || +b <= +a || a.length <= 2) return b;
  const c = common(a, b);
  if (how === 'chi') {
    if (+a % 100 === 0) return b;
    if (+a % 100 < 10) return b.slice(Math.min(c, b.length - 1));
  }
  return b.slice(Math.min(c, b.length - 2));
};
const EN = '–';
const pagesFull = p => p.range ? `${p.a}${EN}${p.b}` : p.a;

/* ---------- text helpers ---------- */
const S = (...xs) => {
  const out = [];
  for (const x of xs.flat(Infinity)) {
    if (!x) continue;
    const p = typeof x === 'string' ? { t: x, i: false } : x;
    if (!p.t) continue;
    const l = out[out.length - 1];
    if (l && l.i === p.i) l.t += p.t; else out.push({ t: p.t, i: p.i });
  }
  return out;
};
const It = t => ({ t, i: true });
const stop = t => /[.?!]$/.test(t) ? '' : '.';      /* period to add after a title */
const endp = s => /[.?!]$/.test(s) ? s : s + '.';
/* sp: joins the non-empty parts with a single space, so optional fields never leave gaps */
const sp = (...xs) => { const parts = xs.map(x => S(x)).filter(x => x.length); return S(parts.flatMap((x, i) => i ? [' ', x] : [x])); };
const cj = (...xs) => { const parts = xs.map(x => S(x)).filter(x => x.length); return S(parts.flatMap((x, i) => i ? [', ', x] : [x])); };
const same = (a, b) => !!a && !!b && a.trim().toLowerCase() === b.trim().toLowerCase();
const shortTitle = t => t.trim().split(/\s+/).slice(0, 6).join(' ').replace(/[,.;:]+$/, '');
const has = s => s.length > 0;

/* ---------- the five styles ---------- */
const STYLES = {
  apa(d, w, cl) {
    const au = d.au, n = au.length, AMP = cl === 'en' ? ', ' + w.amp + ' ' : ' ' + w.and + ' ';
    const names = au.map(a => a.org || `${a.fam}, ${iniJoin(a.giv, ' ')}`);
    const auth = n === 1 ? names[0] : n === 2 ? names[0] + AMP + names[1] : n <= 20 ? names.slice(0, -1).join(', ') + AMP + names[n - 1] : names.slice(0, 19).join(', ') + ', . . . ' + names[n - 1];
    const dt = d.date ? (d.type === 'web' ? fmtDate(cl, 'apa', 'apa', d.date) : String(d.date.y)) : w.nd;
    const dateP = `(${dt}).`, t = d.title, link = d.doi ? 'https://doi.org/' + d.doi : d.url;
    let ref;
    if (d.type === 'book') {
      const ed = d.edn ? ` (${d.edTxt}).` : stop(t);
      ref = n ? sp(endp(auth), dateP, S(It(t), ed), d.pub ? endp(d.pub) : '', link)
        : sp(S(It(t), ed), dateP, d.pub ? endp(d.pub) : '', link);
    } else if (d.type === 'journal') {
      const jp = d.cont || d.vol || d.iss || d.pages
        ? S(d.cont ? It(d.cont + (d.vol ? ', ' + d.vol : '')) : d.vol ? It(d.vol) : '', d.iss ? `(${d.iss})` : '', d.pages ? `, ${pagesFull(d.pages)}` : '', '.') : '';
      ref = n ? sp(endp(auth), dateP, t + stop(t), jp, link) : sp(t + stop(t), dateP, jp, link);
    } else {
      const site = d.cont && !(n === 1 && au[0].org && same(au[0].org, d.cont)) ? endp(d.cont) : '';
      const tail = d.acc && d.url ? `${w.retr} ${fmtDate(cl, 'apa', 'mdy', d.acc)}${w.from}${d.url}` : link;
      ref = n ? sp(endp(auth), dateP, S(It(t), stop(t)), site, tail) : sp(S(It(t), stop(t)), dateP, site, tail);
    }
    const sn = au.map(sur), y = d.date ? d.date.y : w.nd;
    const inName = n === 0 ? (d.type === 'journal' ? S(`"${shortTitle(t)}"`) : S(It(shortTitle(t)))) : S(n === 1 ? sn[0] : n === 2 ? `${sn[0]} ${cl === 'en' ? w.amp : w.and} ${sn[1]}` : `${sn[0]} ${w.etal}`);
    const narName = n === 0 ? inName : S(n === 1 ? sn[0] : n === 2 ? `${sn[0]} ${w.and} ${sn[1]}` : `${sn[0]} ${w.etal}`);
    return { ref, intext: S('(', inName, `, ${y})`), narr: S(narName, ` (${y})`) };
  },

  mla(d, w, cl) {
    const au = d.au, n = au.length;
    const first = au[0] ? (au[0].org || `${au[0].fam}, ${au[0].giv}`) : '';
    const next = a => a.org || `${a.giv} ${a.fam}`;
    const auth = n === 1 ? first : n === 2 ? first + (cl === 'en' ? ', ' : ' ') + w.and + ' ' + next(au[1]) : n >= 3 ? `${first}, ${w.etal}` : '';
    const authP = auth ? endp(auth) : '';
    const t = d.title, qt = `"${endp(t)}"`;
    const url = d.url.replace(/^https?:\/\//i, '');
    const link = d.doi ? 'https://doi.org/' + d.doi : url;
    const linkP = link ? link + '.' : '';
    const yr = d.date ? String(d.date.y) : '';
    let ref;
    if (d.type === 'book') {
      const parts = [d.edn ? d.edTxt : '', d.pub, yr].filter(Boolean);
      ref = sp(authP, S(It(t), stop(t)), parts.length ? parts.join(', ') + '.' : '', linkP);
    } else if (d.type === 'journal') {
      const pg = d.pages ? (d.pages.range ? `${w.pp} ${d.pages.a}-${condense(d.pages.a, d.pages.b, 'mla')}` : `${w.p} ${d.pages.a}`) : '';
      const rest = [d.vol ? `${w.vol} ${d.vol}` : '', d.iss ? `${w.no} ${d.iss}` : '', yr, pg].filter(Boolean);
      const jp = d.cont ? S(It(d.cont), rest.length ? ', ' + rest.join(', ') : '', '.') : rest.length ? rest.join(', ') + '.' : '';
      ref = sp(authP, qt, jp, linkP);
    } else {
      const bits = cj(d.cont ? It(d.cont) : '', d.pub && !same(d.pub, d.cont) ? d.pub : '', d.date ? fmtDate(cl, 'mla', 'dmy', d.date) : '', url);
      ref = sp(authP, qt, has(bits) ? S(bits, '.') : '', d.acc ? `${w.acc} ${fmtDate(cl, 'mla', 'dmy', d.acc)}.` : '');
    }
    const sn = au.map(sur);
    const inName = n === 0 ? (d.type === 'book' ? S(It(shortTitle(t))) : S(`"${shortTitle(t)}"`)) : S(n === 1 ? sn[0] : n === 2 ? `${sn[0]} ${w.and} ${sn[1]}` : `${sn[0]} ${w.etal}`);
    return { ref, intext: S('(', inName, ')') };
  },

  chicago(d, w, cl) {
    const au = d.au, n = au.length;
    const f0 = au[0] ? (au[0].org || `${au[0].fam}, ${au[0].giv}`) : '';
    const nm = a => a.org || `${a.giv} ${a.fam}`;
    let auth = '';
    if (n === 1) auth = f0;
    else if (n === 2) auth = f0 + (cl === 'en' ? ', ' : ' ') + w.and + ' ' + nm(au[1]);
    else if (n >= 3 && n <= 10) auth = [f0, ...au.slice(1, -1).map(nm)].join(', ') + ', ' + w.and + ' ' + nm(au[n - 1]);
    else if (n > 10) auth = [f0, ...au.slice(1, 7).map(nm)].join(', ') + ', ' + w.etal;
    const yr = d.date ? String(d.date.y) : w.nd, yP = yr + '.', t = d.title;
    const link = d.doi ? 'https://doi.org/' + d.doi : d.url, linkP = link ? link + '.' : '';
    const authP = auth ? endp(auth) : '';
    let ref;
    if (d.type === 'book') {
      const tail = sp(d.edn ? d.edTxt : '', d.place && d.pub ? d.place + ':' : '', d.pub ? d.pub + '.' : '', linkP);
      ref = n ? sp(authP, yP, S(It(t), stop(t)), tail) : sp(S(It(t), stop(t)), yP, tail);
    } else if (d.type === 'journal') {
      const pg = d.pages ? (d.pages.range ? `${d.pages.a}${EN}${condense(d.pages.a, d.pages.b, 'chi')}` : d.pages.a) : '';
      const nums = (d.vol ? d.vol : '') + (d.iss ? (d.vol ? ' ' : '') + `(${d.iss})` : '') + (pg ? `: ${pg}` : '');
      const qt = `"${endp(t)}"`;
      const jp = d.cont || nums ? S(d.cont ? It(d.cont) : '', d.cont && nums ? ' ' : '', nums, '.') : '';
      ref = n ? sp(authP, yP, qt, jp, linkP) : sp(qt, yP, jp, linkP);
    } else {
      const qt = `"${endp(t)}"`;
      const rest = sp(d.cont ? endp(d.cont) : '', d.date && d.date.m ? fmtDate(cl, 'chi', 'mdy', d.date) + '.' : '', d.acc ? `${w.acc} ${fmtDate(cl, 'chi', 'mdy', d.acc)}.` : '', linkP);
      ref = n ? sp(authP, yP, qt, rest) : sp(qt, yP, rest);
    }
    const sn = au.map(sur), AND = w.and;
    const names = n === 0 ? null : n === 1 ? sn[0] : n === 2 ? `${sn[0]} ${AND} ${sn[1]}` : n === 3 ? `${sn[0]}, ${sn[1]}, ${AND} ${sn[2]}` : `${sn[0]} ${w.etal}`;
    const inName = names ? S(names) : (d.type === 'book' ? S(It(shortTitle(t))) : S(`"${shortTitle(t)}"`));
    return { ref, intext: S('(', inName, ` ${yr})`) };
  },

  harvard(d, w, cl) {
    const au = d.au, n = au.length;
    const names = au.map(a => a.org || `${a.fam}, ${iniJoin(a.giv, '')}`);
    const auth = n === 1 ? names[0] : n >= 2 ? names.slice(0, -1).join(', ') + ' ' + w.and + ' ' + names[n - 1] : '';
    const yr = d.date ? String(d.date.y) : w.nd, t = d.title, yP = `(${yr})`;
    const link = d.doi ? 'https://doi.org/' + d.doi : d.url;
    const accP = d.acc ? ` (${w.accP}${fmtDate(cl, 'harv', 'dmy', d.acc)})` : '';
    const avail = link ? S(w.avail, link, accP, '.') : '';
    let ref;
    if (d.type === 'book') {
      const tail = sp(d.edn ? d.edTxt : '', d.place && d.pub ? d.place + ':' : '', d.pub ? d.pub + '.' : '', avail);
      ref = n ? sp(auth, yP, S(It(t), stop(t)), tail) : sp(It(t), yP, tail);
    } else if (d.type === 'journal') {
      const pg = d.pages ? (d.pages.range ? `${w.pp} ${d.pages.a}${EN}${d.pages.b}` : `${w.p} ${d.pages.a}`) : '';
      const vi = (d.vol || '') + (d.iss ? `(${d.iss})` : '');
      const jt = cj(d.cont ? It(d.cont) : '', vi, pg);
      const q = `'${t}'` + (has(jt) ? ',' : '.');
      ref = n ? sp(auth, yP, q, has(jt) ? S(jt, '.') : '', avail) : sp(`'${t}'`, yP + (has(jt) ? ',' : '.'), has(jt) ? S(jt, '.') : '', avail);
    } else {
      ref = n ? sp(auth, yP, S(It(t), stop(t)), avail) : sp(It(t), yP + '.', avail);
    }
    const sn = au.map(sur), AND = w.and;
    const inN = n === 0 ? null : n === 1 ? sn[0] : n === 2 ? `${sn[0]} ${AND} ${sn[1]}` : n === 3 ? `${sn[0]}, ${sn[1]} ${AND} ${sn[2]}` : `${sn[0]} ${w.etal}`;
    const inName = inN ? S(inN) : (d.type === 'journal' ? S(`'${shortTitle(t)}'`) : S(It(shortTitle(t))));
    return { ref, intext: S('(', inName, `, ${yr})`) };
  },

  ieee(d, w, cl) {
    const au = d.au, n = au.length;
    const nm = au.map(a => a.org || `${iniJoin(a.giv, ' ')} ${a.fam}`);
    const auth = n === 0 ? '' : n > 6 ? `${nm[0]} ${w.etal}` : n === 1 ? nm[0] : n === 2 ? `${nm[0]} ${w.and} ${nm[1]}` : nm.slice(0, -1).join(', ') + ', ' + w.and + ' ' + nm[n - 1];
    const t = d.title, yr = d.date ? String(d.date.y) : '';
    const comma = x => /[.?!]$/.test(x) ? x : x + ',';
    const pre = auth ? auth + ', ' : '';
    let ref;
    if (d.type === 'book') {
      const pubTail = [d.place ? d.place + ': ' : '', d.pub || '', yr ? (d.pub ? ', ' : '') + yr : ''].join('');
      ref = S('[1] ', pre, It(t), d.edn ? `, ${d.edTxt}` : stop(t), pubTail ? ' ' + pubTail + '.' : '');
    } else if (d.type === 'journal') {
      const pg = d.pages ? (d.pages.range ? `${w.pp} ${d.pages.a}${EN}${d.pages.b}` : `${w.p} ${d.pages.a}`) : '';
      const dateTxt = d.date ? (d.date.m ? `${monthName(cl, d.date.m, 'ieee')} ${d.date.y}` : yr) : '';
      const parts = [d.vol ? `${w.vol} ${d.vol}` : '', d.iss ? `${w.no} ${d.iss}` : '', pg, dateTxt, d.doi ? `doi: ${d.doi}` : ''].filter(Boolean);
      ref = S('[1] ', pre, `"${comma(t)}" `, d.cont ? It(d.cont) : '', d.cont && parts.length ? ', ' : '', parts.join(', '), d.cont || parts.length ? '.' : '', !d.doi && d.url ? ` ${w.online}${d.url}` : '');
    } else {
      const pieces = [`"${comma(t)}"`, d.cont ? endp(d.cont) : '', d.acc ? `${w.accI}${fmtDate(cl, 'ieee', 'mdy', d.acc)}.` : '', d.url ? w.online + d.url : ''].filter(Boolean);
      ref = S('[1] ', pre, pieces.join(' '));
    }
    return { ref, intext: S('[1]') };
  }
};

/* ---------- entry point ---------- */
const run = v => {
  const cl = W[v.cl] ? v.cl : 'en', w = W[cl];
  const title = (v.title || '').trim();
  if (!title || !STYLES[v.style] || !['web', 'book', 'journal'].includes(v.type)) bad();
  const d = {
    type: v.type, title, au: parseAuthors(v.auth), date: parseDate(v.date), acc: parseDate(v.acc, true),
    cont: (v.cont || '').trim(), pub: (v.pub || '').trim(), place: (v.place || '').trim(), edn: (v.edn || '').trim(),
    vol: (v.vol || '').trim(), iss: (v.iss || '').trim(), pages: parsePages(v.pages), url: parseUrl(v.url), doi: parseDoi(v.doi)
  };
  d.edTxt = d.edn ? (cl === 'id' ? `${w.ed} ${d.edn}` : `${d.edn} ${v.style === 'harvard' ? w.edn : w.ed}`) : '';
  const r = STYLES[v.style](d, w, cl);
  const rows = [{ k: 'ct_ref', segs: r.ref }, { k: 'ct_in', segs: r.intext }];
  if (r.narr) rows.push({ k: 'ct_nar', segs: r.narr });
  return { rich: rows };
};

const api = { run, W };
if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.CelverterCite = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
