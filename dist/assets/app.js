(() => {
'use strict';
const d = document, $ = (s, r = d) => r.querySelector(s), $$ = (s, r = d) => [...r.querySelectorAll(s)];
let I = {};
try { I = JSON.parse($('#i').textContent); } catch (e) { /* UI strings missing: fall back to keys */ }
const lang = d.documentElement.lang;
/* Latin digits everywhere, so results match what people type (Arabic would otherwise show ٠١٢) */
const loc = lang === 'ar' ? 'ar-u-nu-latn' : lang;
const nf = (x, m = 2) => Number.isFinite(x) ? x.toLocaleString(loc, { maximumFractionDigits: m }) : '—';
/* up to 10 significant digits; scientific notation for extreme magnitudes */
const sig = x => {
  if (!Number.isFinite(x)) return '—';
  if (x === 0) return '0';
  const a = Math.abs(x);
  return x.toLocaleString(loc, a >= 1e15 || a < 1e-6 ? { notation: 'scientific', maximumSignificantDigits: 10 } : { maximumSignificantDigits: 10 });
};
const num = parseFloat;
const h = (tag, a = {}, ...k) => { const e = d.createElement(tag); for (const x in a) x in e ? e[x] = a[x] : e.setAttribute(x, a[x]); e.append(...k); return e; };

/* ---------- navigation ---------- */
const bg = $('.burger'), nav = $('#nav');
const closeAll = () => { $$('.dd ul').forEach(u => u.hidden = true); $$('.dd button').forEach(b => b.setAttribute('aria-expanded', 'false')); };
bg && bg.addEventListener('click', () => bg.setAttribute('aria-expanded', nav.classList.toggle('open')));
$$('.dd button').forEach(b => b.addEventListener('click', e => {
  e.stopPropagation();
  const u = d.getElementById(b.getAttribute('aria-controls')), o = u.hidden;
  closeAll(); u.hidden = !o; b.setAttribute('aria-expanded', String(o));
}));
d.addEventListener('keydown', e => { if (e.key === 'Escape') closeAll(); });
d.addEventListener('click', e => {
  if (!e.target.closest('.dd')) closeAll();
  const a = e.target.closest('.lang a');
  if (a) try { localStorage.setItem('lg', a.getAttribute('hreflang')); } catch (_) { /* storage blocked */ }
});
const q = $('#q');
q && q.addEventListener('input', () => {
  const v = q.value.trim().toLowerCase();
  $$('.tile').forEach(x => { x.parentElement.hidden = !!v && !x.dataset.n.includes(v); });
});

/* ---------- shared helpers ---------- */
const bad = (k = 'err') => { const e = new Error(k); e.k = k; throw e; };
const pos = (...a) => a.every(x => Number.isFinite(x) && x > 0) || bad();
const seg = typeof Intl !== 'undefined' && Intl.Segmenter ? new Intl.Segmenter(lang, { granularity: 'grapheme' }) : null;
const countChars = s => seg ? [...seg.segment(s)].length : [...s].length;
const enc = new TextEncoder();
const dec8 = b => { try { return new TextDecoder('utf-8', { fatal: true }).decode(b); } catch (e) { return bad(); } };
const toB64 = u => { let s = ''; for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode.apply(null, u.subarray(i, i + 0x8000)); return btoa(s); };
const fromB64 = s => {
  const c = s.replace(/\s+/g, '').replace(/-/g, '+').replace(/_/g, '/').replace(/=+$/, '');
  if (!/^[A-Za-z0-9+/]*$/.test(c) || c.length % 4 === 1) bad();
  try { return Uint8Array.from(atob(c + '='.repeat((4 - c.length % 4) % 4)), ch => ch.charCodeAt(0)); } catch (e) { return bad(); }
};
const secure = () => (globalThis.crypto && crypto.subtle) || bad('errc');
const file = (name, type, text) => ({ t: text, b: new Blob([text], { type }), n: name });

/* CSV: separator (comma, semicolon or tab) is detected from the header line */
const csv = s => {
  const head = s.split(/\r?\n/, 1)[0];
  let sep = ',', best = 0;
  for (const c of [',', ';', '\t']) { const n = head.split(c).length; if (n > best) { best = n; sep = c; } }
  const r = []; let w = [], f = '', o = false;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (o) { if (c === '"') { if (s[i + 1] === '"') { f += '"'; i++; } else o = false; } else f += c; }
    else if (c === '"') o = true;
    else if (c === sep) { w.push(f); f = ''; }
    else if (c === '\n' || c === '\r') { if (c === '\r' && s[i + 1] === '\n') i++; w.push(f); r.push(w); w = []; f = ''; }
    else f += c;
  }
  w.push(f); r.push(w);
  return r.filter(x => x.length > 1 || x[0] !== '');
};

const img = async (f, w, hh, type, qu) => {
  const bm = await createImageBitmap(f), W = w || bm.width, H = hh || bm.height;
  if (!(W > 0 && H > 0 && W <= 8000 && H <= 8000)) bad();
  const c = d.createElement('canvas'); c.width = W; c.height = H;
  const x = c.getContext('2d');
  if (type === 'image/jpeg') { x.fillStyle = '#fff'; x.fillRect(0, 0, W, H); }
  x.drawImage(bm, 0, 0, W, H);
  const b = await new Promise(r => c.toBlob(r, type, qu));
  if (!b) bad();
  return { t: `${W}×${H} · ${nf(b.size / 1024, 1)} KB`, b, n: 'celverter.' + ({ 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp' }[type]) };
};

/* ---------- field constructors ---------- */
const A = k => ({ k, ty: 'area' });
const X = (k, dv = '', opt) => ({ k, ty: 'txt', d: dv, opt });
const PW = k => ({ k, ty: 'pwd' });
const N = (k, dv, o = {}) => ({ k, ty: 'num', d: dv, ...o });
const S = (k, opts, di = 0) => ({ k, ty: 'sel', o: opts, d: di });
const CK = (k, dv) => ({ k, ty: 'chk', d: dv });
const FL = k => ({ k, ty: 'file' });
const DT = k => ({ k, ty: 'date' });
const RG = (k, dv) => ({ k, ty: 'range', d: dv });
const pair = x => Array.isArray(x) ? x : [x, I[x] || x];
const modes = (...k) => k.map(x => [x, I[x] || x]);
const ModeSel = (...k) => S('mode', modes(...k));

/* ---------- classical ciphers (Latin A–Z only; everything else passes through) ---------- */
const rot = (s, k) => s.replace(/[a-z]/gi, c => { const b = c < 'a' ? 65 : 97; return String.fromCharCode((c.charCodeAt(0) - b + k + 26) % 26 + b); });
const vig = (s, key, sign) => {
  const ks = [...key.normalize('NFD').replace(/\p{M}/gu, '').toUpperCase().replace(/[^A-Z]/g, '')].map(c => c.charCodeAt(0) - 65);
  ks.length || bad();
  let i = 0;
  return s.replace(/[a-z]/gi, c => { const b = c < 'a' ? 65 : 97, k = ks[i++ % ks.length] * sign; return String.fromCharCode(((c.charCodeAt(0) - b + k) % 26 + 26) % 26 + b); });
};
const atbash = s => s.replace(/[a-z]/gi, c => { const b = c < 'a' ? 65 : 97; return String.fromCharCode(b + 25 - (c.charCodeAt(0) - b)); });

/* ---------- Morse (ITU letters, digits, punctuation; common accented Latin letters; Arabic table) ---------- */
const MORSE_SYM = { 0: '-----', 1: '.----', 2: '..---', 3: '...--', 4: '....-', 5: '.....', 6: '-....', 7: '--...', 8: '---..', 9: '----.', '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', _: '..--.-', '"': '.-..-.', $: '...-..-', '@': '.--.-.' };
const MORSE_LAT = { ...{ A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.', H: '....', I: '..', J: '.---', K: '-.-', L: '.-..', M: '--', N: '-.', O: '---', P: '.--.', Q: '--.-', R: '.-.', S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-', Y: '-.--', Z: '--..' }, Á: '.--.-', Ä: '.-.-', Ç: '-.-..', É: '..-..', È: '.-..-', Ñ: '--.--', Ö: '---.', Ü: '..--', ...MORSE_SYM };
const MORSE_ARA = { ا: '.-', ب: '-...', ت: '-', ث: '-.-.', ج: '.---', ح: '....', خ: '---', د: '-..', ذ: '--..', ر: '.-.', ز: '---.', س: '...', ش: '----', ص: '-..-', ض: '...-', ط: '..-', ظ: '-.--', ع: '.-.-', غ: '--.', ف: '..-.', ق: '--.-', ك: '-.-', ل: '.-..', م: '--', ن: '-.', ه: '..-..', و: '.--', ي: '..', ...MORSE_SYM };
const invert = o => Object.fromEntries(Object.entries(o).map(([k, v]) => [v, k]));
const ARA_FIX = { أ: 'ا', إ: 'ا', آ: 'ا', ٱ: 'ا', ة: 'ه', ى: 'ي', ؤ: 'و', ئ: 'ي', '،': ',', '؟': '?', '؛': ';' };
const arDigit = c => c >= '٠' && c <= '٩' ? String(c.charCodeAt(0) - 0x660) : c >= '۰' && c <= '۹' ? String(c.charCodeAt(0) - 0x6f0) : c;
const morseChar = (ch, ara) => {
  if (ara) { const c = arDigit(ARA_FIX[ch] || ch); return MORSE_ARA[c] || ''; }
  const u = ch.toLocaleUpperCase('en-US');
  return MORSE_LAT[u] || MORSE_LAT[u.normalize('NFD').replace(/\p{M}/gu, '')] || '';
};
const morseEnc = (s, ara) => {
  const out = s.split(/\r?\n/).map(line => line.trim().split(/\s+/).map(w => [...w.replace(/[\u064B-\u065F\u0670\u0640]/g, '')].map(c => morseChar(c, ara)).filter(Boolean).join(' ')).filter(Boolean).join(' / ')).join('\n');
  return out.replace(/[\s/]/g, '') ? out : bad();
};
const morseDec = (s, ara) => {
  const n = s.replace(/[−–—]/g, '-').replace(/[•·]/g, '.');
  if (/[^.\-/\s]/.test(n) || !/[.-]/.test(n)) bad();
  const r = invert(ara ? MORSE_ARA : MORSE_LAT);
  return n.split(/\r?\n/).map(line => line.trim().split(/\s*\/\s*|\s{3,}/).map(w => w.trim().split(/\s+/).filter(Boolean).map(c => r[c] || '?').join('')).join(' ')).join('\n');
};

/* ---------- text <-> numbers ---------- */
const RADIX = { bin: 2, oct: 8, dec: 10, hex: 16 }, PAD = { bin: 8, oct: 3, dec: 0, hex: 2 };
const DIGITS = { 2: '[01]', 8: '[0-7]', 10: '\\d', 16: '[\\da-f]' };
const textToNum = (s, f) => [...enc.encode(s)].map(b => b.toString(RADIX[f]).padStart(PAD[f], '0')).join(' ');
const numToText = (s, f) => {
  const r = RADIX[f], t = s.trim();
  let parts = t.split(/[\s,]+/).filter(Boolean);
  if (f === 'bin' && parts.length === 1 && t.length % 8 === 0) parts = t.match(/.{8}/g);
  if (f === 'hex' && parts.length === 1 && t.length % 2 === 0 && t.length > 2) parts = t.match(/../g);
  parts.length || bad();
  const re = new RegExp('^' + DIGITS[r] + '+$', 'i');
  return dec8(Uint8Array.from(parts.map(p => { p = f === 'hex' ? p.replace(/^0x/i, '') : p; re.test(p) || bad(); const v = parseInt(p, r); v <= 255 || bad(); return v; })));
};

/* ---------- cryptography (Web Crypto) ---------- */
const sha = async s => {
  const c = secure(), b = enc.encode(s);
  const rows = [];
  for (const a of ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512']) {
    rows.push(a + ': ' + [...new Uint8Array(await c.digest(a, b))].map(x => x.toString(16).padStart(2, '0')).join(''));
  }
  return rows.join('\n');
};
const AES_VER = 1, SALT = 16, IV = 12, ITER = 600000;
const aesKey = async (pw, salt) => {
  const c = secure(), km = await c.importKey('raw', enc.encode(pw), 'PBKDF2', false, ['deriveKey']);
  return c.deriveKey({ name: 'PBKDF2', salt, iterations: ITER, hash: 'SHA-256' }, km, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
};
const aesEnc = async (text, pw) => {
  const c = secure(), salt = crypto.getRandomValues(new Uint8Array(SALT)), iv = crypto.getRandomValues(new Uint8Array(IV));
  const ct = new Uint8Array(await c.encrypt({ name: 'AES-GCM', iv }, await aesKey(pw, salt), enc.encode(text)));
  const out = new Uint8Array(1 + SALT + IV + ct.length);
  out[0] = AES_VER; out.set(salt, 1); out.set(iv, 1 + SALT); out.set(ct, 1 + SALT + IV);
  return toB64(out);
};
const aesDec = async (b64, pw) => {
  const c = secure();
  let b; try { b = fromB64(b64); } catch (e) { return bad('errdec'); }
  if (b.length < 1 + SALT + IV + 16 || b[0] !== AES_VER) bad('errdec');
  try {
    const pt = await c.decrypt({ name: 'AES-GCM', iv: b.slice(1 + SALT, 1 + SALT + IV) }, await aesKey(pw, b.slice(1, 1 + SALT)), b.slice(1 + SALT + IV));
    return dec8(new Uint8Array(pt));
  } catch (e) { return bad('errdec'); }
};
const rnd = n => { const lim = Math.floor(0x100000000 / n) * n, a = new Uint32Array(1); do crypto.getRandomValues(a); while (a[0] >= lim); return a[0] % n; };
const SETS = { up: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', low: 'abcdefghijklmnopqrstuvwxyz', num: '0123456789', sym: '!@#$%^&*()-_=+[]{};:,.?/' };
const makePassword = (len, on) => {
  secure();
  const sets = Object.keys(SETS).filter(k => on[k]).map(k => SETS[k]);
  (sets.length && Number.isInteger(len) && len >= Math.max(4, sets.length) && len <= 128) || bad();
  const all = sets.join(''), out = sets.map(s => s[rnd(s.length)]);
  while (out.length < len) out.push(all[rnd(all.length)]);
  for (let i = out.length - 1; i > 0; i--) { const j = rnd(i + 1); [out[i], out[j]] = [out[j], out[i]]; }
  return out.join('');
};

/* ---------- AI text cleaner ---------- */
/* Chat-style opening / closing lines, per language. Only the first / last non-empty line is ever removed. */
const OPEN = [
  /^(certainly|sure|of course|absolutely|great question)[!,.:]/i, /^here(?:'s| is| are)\b[^\n]{0,140}:$/i, /^as an ai\b/i,
  /^¡?(claro|por supuesto|desde luego)[!,.:]/i, /^(aquí (tienes|está|están|va)|a continuación)\b[^\n]{0,140}:$/i, /^como (un )?modelo de lenguaje\b/i,
  /^(claro|com certeza|certamente|é claro)[!,.:]/i, /^(aqui (está|estão|vai)|segue)\b[^\n]{0,140}:$/i, /^como (um )?modelo de linguagem\b/i,
  /^(tentu|tentu saja|baik|pasti)[!,.:]/i, /^berikut\b[^\n]{0,140}:$/i, /^sebagai (sebuah )?model bahasa\b/i,
  /^(ज़रूर|जरूर|बिल्कुल|ठीक है)[!,।.:]/, /^(यह रहा|ये रहे|यहाँ|यहां)[^\n]{0,140}:$/, /^(एक )?(एआई|AI) (भाषा )?मॉडल के रूप में/,
  /^(بالتأكيد|بكل تأكيد|بالطبع|طبعًا|طبعاً|حسنًا|حسناً)[!،,.:]/, /^(إليك|فيما يلي|هذا هو|هذه هي)[^\n]{0,140}:$/, /^(بصفتي|كنموذج لغوي)/
];
const CLOSE = [
  /^(i hope this helps|hope this helps|let me know if (you|there)|feel free to (ask|reach)|is there anything else|i(?:'m| am) happy to help)/i,
  /^(espero que (esto )?(te )?(sea|haya|ayude)|espero haberte|si necesitas (algo )?más|no dudes en|¿(necesitas|quieres) (algo más|que))/i,
  /^(espero que (isso )?(ajude|tenha ajudado)|se precisar de mais|fique à vontade|não hesite|posso ajudar em mais)/i,
  /^(semoga (ini )?(membantu|bermanfaat)|jika (anda|kamu|kau) (membutuhkan|butuh|ingin)|jangan ragu|apakah ada yang lain)/i,
  /^(मुझे उम्मीद है|उम्मीद है कि|अगर आपको (और )?(कुछ|मदद)|बेझिझक)/,
  /^(آمل أن|أتمنى أن|إذا كنت بحاجة|لا تتردد|هل تحتاج)/
];
const trimEnds = (s, pats, last) => {
  const a = s.split('\n'), idx = last ? a.map((x, i) => x.trim() ? i : -1).filter(i => i >= 0).pop() : a.findIndex(x => x.trim());
  if (idx === undefined || idx < 0) return s;
  const l = a[idx].trim();
  if (l.length <= 200 && pats.some(p => p.test(l))) a.splice(idx, 1);
  return a.join('\n');
};
const clean = (src, o) => {
  let s = src.replace(/\r\n?/g, '\n');
  if (o.c_ref) s = s.replace(/\uE200[^\uE201]*\uE201/g, '').replace(/[\uE000-\uF8FF]/g, '').replace(/【[^】]*】/g, '')
    .replace(/:contentReference\[oaicite:\d+\]\{index=\d+\}/g, '').replace(/\[oaicite:\d+\]/g, '')
    .replace(/(?<=[\p{L}\p{N}.,;:!?)"”'’])\[\d{1,3}(?:\s*[-–,]\s*\d{1,3})*\](?=[\s.,;:!?)"”'’]|$)/gu, '');
  if (o.c_md) {
    s = s.replace(/^```[^\n]*$/gm, '')
      .replace(/^[ \t]*([-*_])([ \t]*\1){2,}[ \t]*$/gm, '')
      .replace(/^[ \t]*\|?[ \t]*:?-{2,}:?[ \t]*(\|[ \t]*:?-{2,}:?[ \t]*)*\|?[ \t]*$/gm, '')
      .replace(/^[ \t]*\|(.*)\|[ \t]*$/gm, (m, c) => c.split('|').map(x => x.trim()).join('\t'))
      .replace(/^[ \t]{0,3}#{1,6}[ \t]+/gm, '').replace(/^[ \t]{0,3}>[ \t]?/gm, '').replace(/^[ \t]*[-*+•][ \t]+/gm, '')
      .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/(\*\*|__)(?=\S)([\s\S]+?)(?<=\S)\1/g, '$2')
      .replace(/(^|[\s(])\*(?!\s)([^*\n]+?)\*(?=[\s).,;:!?]|$)/gm, '$1$2')
      .replace(/(^|[\s(])_(?!\s)([^_\n]+?)_(?=[\s).,;:!?]|$)/gm, '$1$2')
      .replace(/`([^`\n]+)`/g, '$1');
  }
  if (o.c_emo) s = s.replace(/[\p{Extended_Pictographic}\u{1F3FB}-\u{1F3FF}\uFE0F\u20E3]/gu, '');
  if (o.c_inv) {
    s = s.replace(/[\u200B\u2060-\u2064\uFEFF\u00AD]/g, '').replace(/[\u00A0\u202F\u2007]/g, ' ')
      /* ZWJ/ZWNJ carry meaning in Hindi, Arabic and emoji sequences: keep them between letters/marks or pictographs */
      .replace(/(.?)([\u200C\u200D])(.?)/gsu, (m, p, z, n) => (/[\p{L}\p{M}]/u.test(p) && /[\p{L}\p{M}]/u.test(n)) || (/\p{Extended_Pictographic}/u.test(p) && /\p{Extended_Pictographic}/u.test(n)) ? m : p + n);
  }
  if (o.c_dash) s = s.replace(/(?<=[^\s—])[ \t]*—[ \t]*(?=[^\s—])/g, ', ').replace(/(?<=\S)[ \t]+–[ \t]+(?=\S)/g, ', ');
  if (o.c_quo) s = s.replace(/[“”„‟]/g, '"').replace(/[‘’‚‛]/g, "'");
  if (o.c_bp) s = trimEnds(trimEnds(s, OPEN, false), CLOSE, true);
  if (o.c_sp) s = s.replace(/[ \t]+/g, ' ').replace(/^ | $/gm, '').replace(/\n{3,}/g, '\n\n');
  return s.trim();
};

/* ---------- converters ---------- */
const UNITS = {
  'length-converter': [[['mm', 1e-3], ['cm', 1e-2], ['m', 1], ['km', 1e3], ['in', .0254], ['ft', .3048], ['yd', .9144], ['mi', 1609.344], ['nmi', 1852]], 2, 5],
  'weight-converter': [[['mg', 1e-6], ['g', 1e-3], ['kg', 1], ['t', 1e3], ['oz', .028349523125], ['lb', .45359237], ['st', 6.35029318]], 2, 5],
  'volume-converter': [[['mL', 1e-3], ['L', 1], ['m³', 1e3], ['tsp', .00492892159375], ['tbsp', .01478676478125], ['fl oz', .0295735295625], ['cup', .2365882365], ['pt', .473176473], ['qt', .946352946], ['gal', 3.785411784]], 1, 6],
  'speed-converter': [[['m/s', 1], ['km/h', 1 / 3.6], ['mph', .44704], ['kn', 1852 / 3600], ['ft/s', .3048]], 1, 2],
  'area-converter': [[['mm²', 1e-6], ['cm²', 1e-4], ['m²', 1], ['ha', 1e4], ['km²', 1e6], ['in²', .00064516], ['ft²', .09290304], ['yd²', .83612736], ['ac', 4046.8564224], ['mi²', 2589988.110336]], 2, 6],
  'data-size-converter': [[['bit', .125], ['B', 1], ['kB', 1e3], ['MB', 1e6], ['GB', 1e9], ['TB', 1e12], ['KiB', 1024], ['MiB', 1048576], ['GiB', 1073741824], ['TiB', 1099511627776]], 5, 8],
  'time-converter': [[['ms', 1e-3], ['s', 1], ['min', 60], ['h', 3600], ['d', 86400], ['wk', 604800]], 3, 2]
};
const TEMPS = ['°C', '°F', 'K'];
const toC = (v, u) => u === '°C' ? v : u === '°F' ? (v - 32) * 5 / 9 : v - 273.15;
const fromC = (c, u) => u === '°C' ? c : u === '°F' ? c * 9 / 5 + 32 : c + 273.15;
const unitTool = (key) => {
  const [list, a, b] = UNITS[key], opts = list.map(([s]) => [s, s]), f = Object.fromEntries(list);
  return { live: 1, f: [N('x'), S('from', opts, a), S('to', opts, b)], run: v => {
    const x = num(v.x); Number.isFinite(x) || bad();
    return `${sig(x)} ${v.from} = ${sig(x * f[v.from] / f[v.to])} ${v.to}`;
  } };
};
const bigParse = (s, base) => {
  let t = s.trim().replace(/[\s_]/g, ''), neg = false;
  if (/^[+-]/.test(t)) { neg = t[0] === '-'; t = t.slice(1); }
  t = t.replace({ 2: /^0b/i, 8: /^0o/i, 10: /^$/, 16: /^0x/i }[base], '');
  (t.length && t.length <= 400 && new RegExp('^' + DIGITS[base] + '+$', 'i').test(t)) || bad();
  let n = 0n; const B = BigInt(base);
  for (const c of t.toLowerCase()) n = n * B + BigInt(parseInt(c, 16));
  return neg ? -n : n;
};
const ROMAN = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
const RX = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
const toRoman = n => ROMAN.reduce((s, [v, r]) => { while (n >= v) { s += r; n -= v; } return s; }, '');
const fromRoman = r => ROMAN.reduce((acc, [v, sym]) => { while (acc.s.startsWith(sym)) { acc.n += v; acc.s = acc.s.slice(sym.length); } return acc; }, { n: 0, s: r }).n;
const hex2 = n => Math.round(n).toString(16).padStart(2, '0').toUpperCase();
const hsl2rgb = (H, S2, L2) => { H = ((H % 360) + 360) % 360; S2 /= 100; L2 /= 100; const k = n => (n + H / 30) % 12, a = S2 * Math.min(L2, 1 - L2), f = n => L2 - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1))); return [f(0) * 255, f(8) * 255, f(4) * 255]; };
const rgb2hsl = (r, g, b) => { r /= 255; g /= 255; b /= 255; const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, dl = mx - mn; let H = 0, S2 = 0; if (dl) { S2 = dl / (1 - Math.abs(2 * l - 1)); H = mx === r ? ((g - b) / dl) % 6 : mx === g ? (b - r) / dl + 2 : (r - g) / dl + 4; H *= 60; if (H < 0) H += 360; } return [H, S2 * 100, l * 100]; };
const parseColour = s => {
  const t = s.trim(); let m;
  if ((m = /^#?([\da-f]{3}|[\da-f]{6})$/i.exec(t))) { let x = m[1]; if (x.length === 3) x = [...x].map(c => c + c).join(''); return [0, 2, 4].map(i => parseInt(x.slice(i, i + 2), 16)); }
  if ((m = /^(?:rgb\()?\s*(\d{1,3})[\s,]+(\d{1,3})[\s,]+(\d{1,3})\s*\)?$/i.exec(t))) { const c = m.slice(1).map(Number); c.every(x => x <= 255) || bad(); return c; }
  if ((m = /^hsl\(?\s*(-?\d+(?:\.\d+)?)[\s,]+(\d+(?:\.\d+)?)%?[\s,]+(\d+(?:\.\d+)?)%?\s*\)?$/i.exec(t))) { const [H, S2, L2] = m.slice(1).map(Number); (S2 <= 100 && L2 <= 100) || bad(); return hsl2rgb(H, S2, L2).map(Math.round); }
  return bad();
};
const parseDate = s => {
  const t = s.trim();
  if (/^-?\d+(\.\d+)?$/.test(t)) { const n = num(t); return new Date(Math.abs(n) >= 1e11 ? n : n * 1000); }
  const m = /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2}))?)?\s*(Z|[+-]\d{2}:?\d{2})?$/i.exec(t);
  if (!m) return bad();
  const [Y, Mo, D, H = 0, Mi = 0, Se = 0] = m.slice(1, 7).map(Number);
  if (m[7]) { const z = m[7].toUpperCase() === 'Z' ? 'Z' : m[7].replace(/^([+-]\d{2})(\d{2})$/, '$1:$2'); return new Date(`${m[1]}-${m[2]}-${m[3]}T${String(H).padStart(2, '0')}:${String(Mi).padStart(2, '0')}:${String(Se).padStart(2, '0')}${z}`); }
  const dt = new Date(Y, Mo - 1, D, H, Mi, Se);
  return dt.getMonth() === Mo - 1 && dt.getDate() === D ? dt : bad();
};

/* ---------- tool registry: id -> { live, f: fields, run } ---------- */
const T = {
  'word-counter': { live: 1, f: [A('input')], run: v => `${I.words}: ${nf((v.input.match(/\S+/g) || []).length, 0)}\n${I.chars}: ${nf(countChars(v.input), 0)}\n${I.lines}: ${nf(v.input.split('\n').length, 0)}` },
  'case-converter': { live: 1, f: [A('input'), S('mode', modes('upper', 'lower', 'title', 'sentence'))], run: v => {
    const s = v.input, U = x => x.toLocaleUpperCase(lang), Lw = x => x.toLocaleLowerCase(lang);
    return v.mode === 'upper' ? U(s) : v.mode === 'lower' ? Lw(s) : v.mode === 'title'
      ? Lw(s).replace(/(^|[\s\-_(])(\p{L})/gu, (m, a, b) => a + U(b))
      : Lw(s).replace(/(^|[.!?]\s+)(\p{L})/gu, (m, a, b) => a + U(b));
  } },
  'ai-text-cleaner': { live: 1, f: [A('input'), CK('c_md', true), CK('c_ref', true), CK('c_inv', true), CK('c_sp', true), CK('c_bp', false), CK('c_emo', false), CK('c_dash', false), CK('c_quo', false)], run: v => clean(v.input, v) },
  'remove-duplicate-lines': { live: 1, f: [A('input')], run: v => { const s = new Set(); return v.input.split('\n').filter(x => !s.has(x) && s.add(x)).join('\n'); } },
  'remove-line-breaks': { live: 1, f: [A('input')], run: v => v.input.replace(/\s*\r?\n\s*/g, ' ').trim() },
  'sort-lines': { live: 1, f: [A('input'), S('mode', [['asc', 'A → Z'], ['desc', 'Z → A']])], run: v => { const a = v.input.split('\n').sort((x, y) => x.localeCompare(y, lang, { numeric: true })); return (v.mode === 'desc' ? a.reverse() : a).join('\n'); } },

  'morse-code': { live: 1, f: [A('input'), ModeSel('t2m', 'm2t'), S('alpha', [['lat', I.lat || 'Latin'], ['ara', I.ara || 'Arabic']])], run: v => v.mode === 't2m' ? morseEnc(v.input, v.alpha === 'ara') : morseDec(v.input, v.alpha === 'ara') },
  'caesar-cipher': { live: 1, f: [A('input'), ModeSel('encr', 'decr'), N('shift', 3, { min: 1, max: 25, step: 1 })], run: v => { const k = num(v.shift); (Number.isInteger(k) && k >= 1 && k <= 25) || bad(); return rot(v.input, v.mode === 'encr' ? k : -k); } },
  'vigenere-cipher': { live: 1, f: [A('input'), X('kw'), ModeSel('encr', 'decr')], run: v => vig(v.input, v.kw, v.mode === 'encr' ? 1 : -1) },
  'atbash-cipher': { live: 1, f: [A('input')], run: v => atbash(v.input) },
  'text-to-binary': { live: 1, f: [A('input'), ModeSel('t2c', 'c2t'), S('fmt', [['bin', 'BIN (2)'], ['oct', 'OCT (8)'], ['dec', 'DEC (10)'], ['hex', 'HEX (16)']])], run: v => v.mode === 't2c' ? textToNum(v.input, v.fmt) : numToText(v.input, v.fmt) },
  'base64-text': { live: 1, f: [A('input'), ModeSel('enc', 'dec')], run: v => v.mode === 'enc' ? toB64(enc.encode(v.input)) : dec8(fromB64(v.input)) },
  'url-encoder': { live: 1, f: [A('input'), ModeSel('enc', 'dec')], run: v => { try { return v.mode === 'enc' ? encodeURIComponent(v.input) : decodeURIComponent(v.input.trim()); } catch (e) { return bad(); } } },
  'hash-generator': { live: 1, f: [A('input')], run: v => sha(v.input) },
  'aes-encryption': { f: [A('input'), ModeSel('encr', 'decr'), PW('pwd')], run: v => v.mode === 'encr' ? aesEnc(v.input, v.pwd) : aesDec(v.input, v.pwd) },
  'password-generator': { btn: 'gen', f: [N('len', 16, { min: 4, max: 128, step: 1 }), CK('o_up', true), CK('o_low', true), CK('o_num', true), CK('o_sym', true)], run: v => makePassword(Number(v.len), { up: v.o_up, low: v.o_low, num: v.o_num, sym: v.o_sym }) },

  'temperature-converter': { live: 1, f: [N('x'), S('from', TEMPS.map(x => [x, x]), 0), S('to', TEMPS.map(x => [x, x]), 1)], run: v => {
    const x = num(v.x); Number.isFinite(x) || bad();
    const c = toC(x, v.from); c >= -273.15 - 1e-9 || bad();
    return `${sig(x)} ${v.from} = ${sig(fromC(c, v.to))} ${v.to}`;
  } },
  'number-base-converter': { live: 1, f: [X('input'), S('bs', [[2, '2 · BIN'], [8, '8 · OCT'], [10, '10 · DEC'], [16, '16 · HEX']], 2)], run: v => {
    const n = bigParse(v.input, Number(v.bs));
    return `BIN: ${n.toString(2)}\nOCT: ${n.toString(8)}\nDEC: ${n.toString(10)}\nHEX: ${n.toString(16).toUpperCase()}`;
  } },
  'roman-numeral-converter': { live: 1, f: [X('rm')], run: v => {
    const s = v.rm.trim();
    if (/^\d+$/.test(s)) { const n = Number(s); (n >= 1 && n <= 3999) || bad(); return `${n} = ${toRoman(n)}`; }
    const r = s.toUpperCase(); (r && RX.test(r)) || bad(); return `${r} = ${fromRoman(r)}`;
  } },
  'colour-converter': { live: 1, f: [X('clr')], run: v => {
    const [r, g, b] = parseColour(v.clr), [H, S2, L2] = rgb2hsl(r, g, b);
    const hex = '#' + hex2(r) + hex2(g) + hex2(b);
    return { t: `HEX: ${hex}\nRGB: rgb(${r}, ${g}, ${b})\nHSL: hsl(${Math.round(H)}, ${Math.round(S2)}%, ${Math.round(L2)}%)`, sw: hex };
  } },
  'timestamp-converter': { live: 1, f: [X('ts')], run: v => {
    const dt = parseDate(v.ts); Number.isFinite(dt.getTime()) || bad();
    return `Unix (s): ${Math.floor(dt.getTime() / 1000)}\nUnix (ms): ${dt.getTime()}\nUTC: ${dt.toISOString()}\n${I.loc}: ${dt.toLocaleString(loc, { dateStyle: 'full', timeStyle: 'long' })}`;
  } },

  'percentage-calculator': { live: 1, f: [N('p'), N('x')], run: v => { const p = num(v.p), x = num(v.x); Number.isFinite(p + x) || bad(); return `${I.pof}: ${nf(p * x / 100)}\n${I.plus}: ${nf(x * (1 + p / 100))}\n${I.minus}: ${nf(x * (1 - p / 100))}`; } },
  'bmi-calculator': { live: 1, f: [N('w'), N('h')], run: v => { const w = num(v.w), m = num(v.h) / 100; pos(w, m); const b = w / (m * m), c = I.bmic.split('/'); return `${I.bmi}: ${nf(b, 1)}\n${b < 18.5 ? c[0] : b < 25 ? c[1] : b < 30 ? c[2] : c[3]}`; } },
  'loan-calculator': { live: 1, f: [N('amt'), N('r'), N('y')], run: v => { const P = num(v.amt), r = num(v.r) / 1200, n = num(v.y) * 12; pos(P, n); (r >= 0) || bad(); const m = r ? P * r / (1 - Math.pow(1 + r, -n)) : P / n; return `${I.mo}: ${nf(m)}\n${I.tot}: ${nf(m * n)}\n${I.int}: ${nf(m * n - P)}`; } },
  'age-calculator': { live: 1, f: [DT('dt')], run: v => {
    const b = new Date(v.dt + 'T00:00:00'), n = new Date(); (b <= n) || bad();
    let y = n.getFullYear() - b.getFullYear(), m = n.getMonth() - b.getMonth(), dd = n.getDate() - b.getDate();
    if (dd < 0) { m--; dd += new Date(n.getFullYear(), n.getMonth(), 0).getDate(); }
    if (m < 0) { y--; m += 12; }
    const tt = Math.floor((Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()) - Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())) / 864e5);
    return `${y} ${I.yrs}, ${m} ${I.mon}, ${dd} ${I.days}\n${I.totd}: ${nf(tt, 0)}`;
  } },
  'discount-calculator': { live: 1, f: [N('pr'), N('p')], run: v => { const a = num(v.pr), p = num(v.p); (a >= 0 && p >= 0 && p <= 100) || bad(); return `${I.fin}: ${nf(a * (1 - p / 100))}\n${I.sv}: ${nf(a * p / 100)}`; } },

  'image-converter': { acc: 'image/*', f: [FL('file'), S('mode', [['png', 'PNG'], ['jpeg', 'JPG'], ['webp', 'WEBP']]), RG('quality', 90)], run: v => { if (v.file.size > 30e6) bad(); return img(v.file, 0, 0, 'image/' + v.mode, num(v.quality) / 100); } },
  'image-resizer': { acc: 'image/*', f: [FL('file'), N('wd'), N('ht', undefined, { opt: 1 })], run: async v => { if (v.file.size > 30e6) bad(); const bm = await createImageBitmap(v.file), w = Math.round(num(v.wd)), hh = v.ht ? Math.round(num(v.ht)) : Math.round(bm.height * w / bm.width); return img(v.file, w, hh, v.file.type === 'image/png' ? 'image/png' : v.file.type === 'image/webp' ? 'image/webp' : 'image/jpeg', .92); } },
  'file-to-base64': { f: [FL('file')], run: v => new Promise((ok, no) => { if (v.file.size > 10e6) return no(new Error('size')); const r = new FileReader; r.onload = () => ok(r.result); r.onerror = no; r.readAsDataURL(v.file); }) },
  'json-to-csv': { f: [A('input')], run: v => {
    const a = JSON.parse(v.input); (Array.isArray(a) && a.length) || bad();
    const k = [...new Set(a.flatMap(o => Object.keys(o)))], e = x => { x = x == null ? '' : typeof x === 'object' ? JSON.stringify(x) : String(x); return /[",\r\n]/.test(x) ? '"' + x.replace(/"/g, '""') + '"' : x; };
    return file('celverter.csv', 'text/csv', [k.map(e).join(','), ...a.map(o => k.map(c => e(o[c])).join(','))].join('\n'));
  } },
  'csv-to-json': { f: [A('input')], run: v => { const r = csv(v.input); (r.length > 1) || bad(); return file('celverter.json', 'application/json', JSON.stringify(r.slice(1).map(w => Object.fromEntries(r[0].map((k, i) => [k, w[i] ?? '']))), null, 2)); } }
};
for (const key in UNITS) T[key] = unitTool(key);

/* ---------- build the tool UI ---------- */
const box = $('.tool');
if (!box || !T[box.dataset.tool]) return;
const tool = T[box.dataset.tool], root = $('#ui'), el = {}, fl = h('div', { className: 'flds' }), form = h('form', { noValidate: true, autocomplete: 'off' });
const dflt = f => f.ty === 'sel' ? pair(f.o[f.d || 0])[0] : f.ty === 'chk' ? !!f.d : f.ty === 'range' ? (f.d || 90) : (f.d ?? '');
const setDef = f => { const c = el[f.k]; if (f.ty === 'file') c.value = ''; else if (f.ty === 'chk') c.checked = dflt(f); else c.value = dflt(f); };
let grp = null;
for (const f of tool.f) {
  const id = 'f-' + f.k; let c;
  if (f.ty === 'area') c = h('textarea', { id, spellcheck: false, dir: 'auto' });
  else if (f.ty === 'sel') c = h('select', { id }, ...f.o.map(x => { const [v, l] = pair(x); return h('option', { value: v }, l); }));
  else if (f.ty === 'file') c = h('input', { id, type: 'file', accept: tool.acc || '' });
  else if (f.ty === 'range') c = h('input', { id, type: 'range', min: 1, max: 100 });
  else if (f.ty === 'chk') c = h('input', { id, type: 'checkbox' });
  else if (f.ty === 'pwd') c = h('input', { id, type: 'password', autocomplete: 'off', spellcheck: false });
  else if (f.ty === 'txt') c = h('input', { id, type: 'text', spellcheck: false, autocomplete: 'off', dir: 'auto' });
  else if (f.ty === 'date') c = h('input', { id, type: 'date' });
  else { c = h('input', { id, type: 'number', step: f.step || 'any', inputMode: 'decimal' }); if (f.min != null) c.min = f.min; if (f.max != null) c.max = f.max; }
  el[f.k] = c; setDef(f);
  if (f.ty === 'chk') {
    if (!grp) { grp = h('fieldset', { className: 'fld full opts' }, h('legend', {}, I.opts)); fl.append(grp); }
    grp.append(h('label', { className: 'chk', htmlFor: id }, c, h('span', {}, I[f.k] || f.k)));
  } else {
    fl.append(h('div', { className: 'fld' + (f.ty === 'area' ? ' full' : '') }, h('label', { htmlFor: id }, I[f.k] || f.k), c));
  }
}
const res = h('pre', { className: 'res', tabIndex: 0, role: 'status', dir: 'auto' });
const sw = h('div', { className: 'sw', hidden: true });
const dl = h('a', { className: 'btn alt', hidden: true }), cp = h('button', { className: 'btn alt', type: 'button', hidden: true }, I.copy), acts = h('div', { className: 'acts' });
if (!tool.live) acts.append(h('button', { className: 'btn', type: 'submit' }, I[tool.btn || 'run']));
acts.append(h('button', { className: 'btn alt', type: 'button', id: 'clr-btn' }, I.clear), cp, dl);
root.replaceChildren(fl, acts, h('h2', { id: 'rt' }, I.result), sw, res);
res.setAttribute('aria-labelledby', 'rt');

let blobUrl = '', seq = 0;
const show = r => {
  const o = typeof r === 'string' ? { t: r } : r;
  res.textContent = o.t || ''; cp.hidden = !o.t;
  sw.hidden = !o.sw; if (o.sw) sw.style.background = o.sw;
  if (blobUrl) URL.revokeObjectURL(blobUrl);
  blobUrl = ''; dl.hidden = !o.b;
  if (o.b) { blobUrl = URL.createObjectURL(o.b); dl.href = blobUrl; dl.download = o.n; dl.textContent = I.download; }
};
const go = async manual => {
  const my = ++seq, v = {}; let ok = true;
  for (const f of tool.f) {
    const e = el[f.k];
    v[f.k] = f.ty === 'file' ? e.files[0] : f.ty === 'chk' ? e.checked : e.value;
    if (!['sel', 'range', 'chk'].includes(f.ty) && !f.opt && !v[f.k]) ok = false;
  }
  if (!ok) { show(manual ? I.err : ''); return; }
  try { const out = await tool.run(v); if (my === seq) show(out); }
  catch (e) { if (my === seq) show(I[e && e.k] || I.err); }
};
form.addEventListener('submit', e => { e.preventDefault(); go(true); });
tool.live && form.addEventListener('input', () => go(false));
$('#clr-btn').addEventListener('click', () => { seq++; tool.f.forEach(setDef); show(''); });
cp.addEventListener('click', async () => { try { await navigator.clipboard.writeText(res.textContent); cp.textContent = I.copied; setTimeout(() => cp.textContent = I.copy, 1500); } catch (e) { /* clipboard blocked */ } });
root.parentNode.insertBefore(form, root); form.append(root);
})();
