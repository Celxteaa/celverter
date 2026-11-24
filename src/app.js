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
  const bm = await createImageBitmap(f);
  try {
    const W = w || bm.width, H = hh || bm.height;
    /* 16.7 MP is the canvas area limit of iOS Safari; bigger canvases come back blank there */
    if (!(W > 0 && H > 0 && W <= 8000 && H <= 8000 && W * H <= 16777216 && bm.width * bm.height <= 1e8)) bad();
    var c = d.createElement('canvas'); c.width = W; c.height = H;
    const x = c.getContext('2d');
    if (type === 'image/jpeg') { x.fillStyle = '#fff'; x.fillRect(0, 0, W, H); }
    x.drawImage(bm, 0, 0, W, H);
  } finally { bm.close(); }
  const W = c.width, H = c.height;
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
  if (o.c_ref) s = s.replace(/\uE200[^\uE201]{0,500}\uE201/g, '').replace(/[\uE000-\uF8FF]/g, '').replace(/【[^】]*】/g, '')
    .replace(/:contentReference\[oaicite:\d+\]\{index=\d+\}/g, '').replace(/\[oaicite:\d+\]/g, '')
    .replace(/(?<=[\p{L}\p{N}.,;:!?)"”'’])\[\d{1,3}(?:\s*[-–,]\s*\d{1,3})*\](?=[\s.,;:!?)"”'’]|$)/gu, '');
  if (o.c_md) {
    s = s.replace(/^```[^\n]*$/gm, '')
      .replace(/^[ \t]*([-*_])([ \t]*\1){2,}[ \t]*$/gm, '')
      .replace(/^[ \t]*(?:\|[ \t]*)?:?-{2,}:?[ \t]*(\|[ \t]*:?-{2,}:?[ \t]*)*\|?[ \t]*$/gm, '')
      .replace(/^[ \t]*\|(.*)\|[ \t]*$/gm, (m, c) => c.split('|').map(x => x.trim()).join('\t'))
      .replace(/^[ \t]{0,3}#{1,6}[ \t]+/gm, '').replace(/^[ \t]{0,3}>[ \t]?/gm, '').replace(/^[ \t]*[-*+•][ \t]+/gm, '')
      .replace(/!?\[([^\]]{0,1000})\]\([^)]{0,2000}\)/g, '$1')
      .replace(/(\*\*|__)(?=\S)([\s\S]{1,1000}?)(?<=\S)\1/g, '$2')
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
/* ---------- number to words (pure functions, no DOM; used by the Number to Words tool) ---------- */
/* N2W-START */
const N2W = (() => {
  const groups = n => { const g = []; for (let m = n; m > 0; m = Math.floor(m / 1000)) g.push(m % 1000); return g; };
  const join = a => a.filter(Boolean).join(' ');
  /* English (short scale; optional British "and") */
  const EN1 = 'zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen'.split(' ');
  const EN10 = 'x x twenty thirty forty fifty sixty seventy eighty ninety'.split(' ');
  const en100 = r => r < 20 ? EN1[r] : EN10[Math.floor(r / 10)] + (r % 10 ? '-' + EN1[r % 10] : '');
  const en1000 = (g, brit) => { const h = Math.floor(g / 100), r = g % 100; return join([h ? EN1[h] + ' hundred' : '', r ? (h && brit ? 'and ' : '') + en100(r) : '']); };
  const enWords = (n, o) => {
    if (n === 0) return 'zero';
    const gs = groups(n), SC = ['', ' thousand', ' million', ' billion', ' trillion'], out = [];
    for (let i = gs.length - 1; i >= 0; i--) if (gs[i]) out.push((i === 0 && o.brit && gs.length > 1 && gs[0] < 100 ? 'and ' : '') + en1000(gs[i], o.brit) + SC[i]);
    return out.join(' ');
  };
  /* Indonesian */
  const ID1 = 'nol satu dua tiga empat lima enam tujuh delapan sembilan'.split(' ');
  const id100 = r => r < 10 ? ID1[r] : r === 10 ? 'sepuluh' : r === 11 ? 'sebelas' : r < 20 ? ID1[r - 10] + ' belas' : ID1[Math.floor(r / 10)] + ' puluh' + (r % 10 ? ' ' + ID1[r % 10] : '');
  const id1000 = g => { const h = Math.floor(g / 100), r = g % 100; return join([h === 1 ? 'seratus' : h ? ID1[h] + ' ratus' : '', r ? id100(r) : '']); };
  const idWords = n => {
    if (n === 0) return 'nol';
    const gs = groups(n), SC = ['', 'ribu', 'juta', 'miliar', 'triliun'], out = [];
    for (let i = gs.length - 1; i >= 0; i--) if (gs[i]) out.push(i === 1 && gs[i] === 1 ? 'seribu' : join([id1000(gs[i]), SC[i]]));
    return out.join(' ');
  };
  /* Spanish (long scale: mil millones, billón) */
  const ES1 = 'cero uno dos tres cuatro cinco seis siete ocho nueve diez once doce trece catorce quince dieciséis diecisiete dieciocho diecinueve veinte veintiuno veintidós veintitrés veinticuatro veinticinco veintiséis veintisiete veintiocho veintinueve'.split(' ');
  const ES10 = 'x x x treinta cuarenta cincuenta sesenta setenta ochenta noventa'.split(' ');
  const ES100 = 'x x doscientos trescientos cuatrocientos quinientos seiscientos setecientos ochocientos novecientos'.split(' ');
  const es100 = r => r < 30 ? ES1[r] : ES10[Math.floor(r / 10)] + (r % 10 ? ' y ' + ES1[r % 10] : '');
  const es1000 = g => { const h = Math.floor(g / 100), r = g % 100; return join([h === 1 ? (r ? 'ciento' : 'cien') : h ? ES100[h] : '', r ? es100(r) : '']); };
  const esApoc = s => s.replace(/veintiuno$/, 'veintiún').replace(/uno$/, 'un');
  const es6 = c => { const th = Math.floor(c / 1000), r = c % 1000; return join([th ? (th === 1 ? 'mil' : esApoc(es1000(th)) + ' mil') : '', r ? es1000(r) : '']); };
  const esWords = n => {
    if (n === 0) return 'cero';
    const c = [n % 1e6, Math.floor(n / 1e6) % 1e6, Math.floor(n / 1e12)], out = [];
    if (c[2]) out.push(c[2] === 1 ? 'un billón' : esApoc(es6(c[2])) + ' billones');
    if (c[1]) out.push(c[1] === 1 ? 'un millón' : esApoc(es6(c[1])) + ' millones');
    if (c[0]) out.push(es6(c[0]));
    return out.join(' ');
  };
  /* Portuguese (Brazilian usage: bilhão = 1 000 000 000); "e" joins the last group when it is under 100 or a round hundred */
  const PT1 = 'zero um dois três quatro cinco seis sete oito nove dez onze doze treze quatorze quinze dezesseis dezessete dezoito dezenove'.split(' ');
  const PT10 = 'x x vinte trinta quarenta cinquenta sessenta setenta oitenta noventa'.split(' ');
  const PT100 = 'x x duzentos trezentos quatrocentos quinhentos seiscentos setecentos oitocentos novecentos'.split(' ');
  const pt100 = r => r < 20 ? PT1[r] : PT10[Math.floor(r / 10)] + (r % 10 ? ' e ' + PT1[r % 10] : '');
  const pt1000 = g => { const h = Math.floor(g / 100), r = g % 100; return [h === 1 ? (r ? 'cento' : 'cem') : h ? PT100[h] : '', r ? pt100(r) : ''].filter(Boolean).join(' e '); };
  const ptWords = n => {
    if (n === 0) return 'zero';
    const gs = groups(n), SC = [['', ''], ['mil', 'mil'], ['milhão', 'milhões'], ['bilhão', 'bilhões'], ['trilhão', 'trilhões']], idx = [];
    for (let i = gs.length - 1; i >= 0; i--) if (gs[i]) idx.push(i);
    const parts = idx.map(i => i === 1 && gs[i] === 1 ? 'mil' : join([pt1000(gs[i]), SC[i][gs[i] === 1 ? 0 : 1]]));
    let out = parts[0];
    for (let k = 1; k < parts.length; k++) { const g = gs[idx[k]]; out += (k === parts.length - 1 && (g < 100 || g % 100 === 0) ? ' e ' : ' ') + parts[k]; }
    return out;
  };
  /* Hindi (Indian system: हज़ार, लाख, करोड़, अरब, खरब, नील) */
  const HI100 = 'शून्य एक दो तीन चार पाँच छह सात आठ नौ दस ग्यारह बारह तेरह चौदह पंद्रह सोलह सत्रह अठारह उन्नीस बीस इक्कीस बाईस तेईस चौबीस पच्चीस छब्बीस सत्ताईस अट्ठाईस उनतीस तीस इकतीस बत्तीस तैंतीस चौंतीस पैंतीस छत्तीस सैंतीस अड़तीस उनतालीस चालीस इकतालीस बयालीस तैंतालीस चौवालीस पैंतालीस छियालीस सैंतालीस अड़तालीस उनचास पचास इक्यावन बावन तिरपन चौवन पचपन छप्पन सत्तावन अट्ठावन उनसठ साठ इकसठ बासठ तिरसठ चौंसठ पैंसठ छियासठ सड़सठ अड़सठ उनहत्तर सत्तर इकहत्तर बहत्तर तिहत्तर चौहत्तर पचहत्तर छिहत्तर सतहत्तर अठहत्तर उन्यासी अस्सी इक्यासी बयासी तिरासी चौरासी पचासी छियासी सत्तासी अट्ठासी नवासी नब्बे इक्यानवे बानवे तिरानवे चौरानवे पचानवे छियानवे सत्तानवे अट्ठानवे निन्यानवे'.split(' ');
  const hiWords = n => {
    if (n === 0) return 'शून्य';
    const SC = ['हज़ार', 'लाख', 'करोड़', 'अरब', 'खरब', 'नील'], u = n % 1000, pairs = [], out = [];
    for (let m = Math.floor(n / 1000); m > 0; m = Math.floor(m / 100)) pairs.push(m % 100);
    for (let i = pairs.length - 1; i >= 0; i--) if (pairs[i]) out.push(HI100[pairs[i]] + ' ' + SC[i]);
    if (u) out.push(u >= 100 ? HI100[Math.floor(u / 100)] + ' सौ' + (u % 100 ? ' ' + HI100[u % 100] : '') : HI100[u]);
    return out.join(' ');
  };
  /* Arabic (Modern Standard; scale nouns take dual, plural or accusative forms as the grammar requires) */
  const AR1 = ['صفر', 'واحد', 'اثنان', 'ثلاثة', 'أربعة', 'خمسة', 'ستة', 'سبعة', 'ثمانية', 'تسعة', 'عشرة', 'أحد عشر', 'اثنا عشر', 'ثلاثة عشر', 'أربعة عشر', 'خمسة عشر', 'ستة عشر', 'سبعة عشر', 'ثمانية عشر', 'تسعة عشر'];
  const AR10 = ['', '', 'عشرون', 'ثلاثون', 'أربعون', 'خمسون', 'ستون', 'سبعون', 'ثمانون', 'تسعون'];
  const AR100 = ['', 'مائة', 'مائتان', 'ثلاثمائة', 'أربعمائة', 'خمسمائة', 'ستمائة', 'سبعمائة', 'ثمانمائة', 'تسعمائة'];
  const AR_SC = [null, ['ألف', 'ألفان', 'آلاف', 'ألفًا'], ['مليون', 'مليونان', 'ملايين', 'مليونًا'], ['مليار', 'ملياران', 'مليارات', 'مليارًا'], ['تريليون', 'تريليونان', 'تريليونات', 'تريليونًا']];
  const ar100 = r => r < 20 ? AR1[r] : (r % 10 ? AR1[r % 10] + ' و' : '') + AR10[Math.floor(r / 10)];
  const ar1000 = g => { const h = Math.floor(g / 100), r = g % 100; return [h ? AR100[h] : '', r ? ar100(r) : ''].filter(Boolean).join(' و'); };
  const arScale = (g, S) => {
    const h = Math.floor(g / 100), r = g % 100, H = h === 2 && r < 3 ? 'مائتا' : AR100[h];
    if (!h) return r === 1 ? S[0] : r === 2 ? S[1] : r <= 10 ? AR1[r] + ' ' + S[2] : ar100(r) + ' ' + S[3];
    if (r === 0) return H + ' ' + S[0];
    if (r === 1) return H + ' ' + S[0] + ' و' + S[0];
    if (r === 2) return H + ' ' + S[0] + ' و' + S[1];
    return H + ' و' + (r <= 10 ? AR1[r] + ' ' + S[2] : ar100(r) + ' ' + S[3]);
  };
  const arWords = n => {
    if (n === 0) return 'صفر';
    const gs = groups(n), out = [];
    for (let i = gs.length - 1; i >= 0; i--) if (gs[i]) out.push(i ? arScale(gs[i], AR_SC[i]) : ar1000(gs[i]));
    return out.join(' و');
  };
  const LANGS = {
    en: { words: enWords, minus: 'minus', dec: 'point', dig: EN1.slice(0, 10) },
    es: { words: esWords, minus: 'menos', dec: 'coma', dig: ES1.slice(0, 10) },
    pt: { words: ptWords, minus: 'menos', dec: 'vírgula', dig: PT1.slice(0, 10) },
    id: { words: idWords, minus: 'minus', dec: 'koma', dig: ID1 },
    hi: { words: hiWords, minus: 'ऋण', dec: 'दशमलव', dig: HI100.slice(0, 10) },
    ar: { words: arWords, minus: 'سالب', dec: 'فاصلة', dig: AR1.slice(0, 10) }
  };
  /* Input: Latin, Arabic-Indic, Persian and Devanagari digits; spaces, _ and ' ignored; "1.500" / "1,500" follow the page language's convention; Indian grouping 1,23,456 is accepted */
  const parse = (raw, pl) => {
    let s = String(raw).replace(/[\u0660-\u0669]/g, c => c.charCodeAt(0) - 0x660).replace(/[\u06f0-\u06f9]/g, c => c.charCodeAt(0) - 0x6f0).replace(/[\u0966-\u096f]/g, c => c.charCodeAt(0) - 0x966)
      .replace(/\u066b/g, '.').replace(/[\u066c\u060c]/g, ',').replace(/[\s\u00a0\u202f_'\u2019]/g, ''), neg = false;
    if (/^[-\u2212+]/.test(s)) { neg = s[0] !== '+'; s = s.slice(1); }
    (/^[\d.,]+$/.test(s) && /\d/.test(s)) || bad();
    const gx = c => c === '.' ? /^\d{1,3}(?:\.\d{3})+$/ : /^(?:\d{1,3}(?:,\d{3})+|\d{1,2}(?:,\d{2})+,\d{3})$/, cnt = c => s.split(c).length - 1, dots = cnt('.'), com = cnt(',');
    let ip = s, fp = '';
    if (dots && com) {
      const d = s.lastIndexOf('.') > s.lastIndexOf(',') ? '.' : ',', g = d === '.' ? ',' : '.', pr = s.split(d);
      (pr.length === 2 && gx(g).test(pr[0]) && /^\d*$/.test(pr[1])) || bad();
      ip = pr[0].split(g).join(''); fp = pr[1];
    } else if (dots + com) {
      const c = dots ? '.' : ',', pr = s.split(c);
      if (pr.length > 2) { gx(c).test(s) || bad(); ip = pr.join(''); }
      else if (c === (['id', 'es', 'pt'].includes(pl) ? '.' : ',') && /^[1-9]\d{0,2}$/.test(pr[0]) && /^\d{3}$/.test(pr[1])) ip = pr[0] + pr[1];
      else { ip = pr[0]; fp = pr[1]; }
    }
    ip = ip.replace(/^0+(?=\d)/, '') || '0';
    (ip.length <= 15 && fp.length <= 30) || bad('n2w_range');
    const n = Number(ip);
    return { neg: neg && (n > 0 || /[1-9]/.test(fp)), int: n, frac: fp };
  };
  const style = (s, m) => m === 'upper' ? s.toUpperCase() : m === 'title' ? s.replace(/(^|[\s-])(\p{L})/gu, (a, b, c) => b + c.toUpperCase()) : m === 'sentence' ? s.replace(/\p{L}/u, c => c.toUpperCase()) : s;
  /* raw input, page language (input convention), output language, { brit, unit, cs } */
  const text = (raw, pl, ol, o = {}) => {
    const L = LANGS[ol] || bad(), p = parse(raw, pl), u = String(o.unit || '').replace(/\s+/g, ' ').trim().slice(0, 60);
    return style(join([p.neg ? L.minus : '', L.words(p.int, o), p.frac ? join([L.dec, [...p.frac].map(c => L.dig[+c]).join(' ')]) : '', u]), o.cs);
  };
  return { text };
})();
/* N2W-END */
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

/* ---------- APA 7 reference generator: formatting core (pure functions, no DOM) ---------- */
/* APA-CORE-START */
/* Terms per reference language. th = thesis levels (doctoral, master's, bachelor's), ct = presentation types, unp = "unpublished" template. */
const APA_X = {
  en: { nd: 'n.d.', inw: 'In', ed: 'Ed.', eds: 'Eds.', p: 'p.', pp: 'pp.', art: 'Article', ret: 'Retrieved {d}, from {u}', rep: 'Report No.', and: 'and', etal: 'et al.', refs: 'References', vid: 'Video', cm: ', ', unp: 'unpublished {t}', th: ['doctoral dissertation', 'master’s thesis', 'bachelor’s thesis'], ct: ['Paper presentation', 'Poster presentation', 'Keynote address', 'Symposium'] },
  es: { nd: 's. f.', inw: 'En', ed: 'Ed.', eds: 'Eds.', p: 'p.', pp: 'pp.', art: 'Artículo', ret: 'Recuperado el {d} de {u}', rep: 'Informe n.º', and: 'y', etal: 'et al.', refs: 'Referencias', vid: 'Video', cm: ', ', unp: '{t} inédita', th: ['tesis doctoral', 'tesis de maestría', 'tesis de licenciatura'], ct: ['Presentación de ponencia', 'Presentación de póster', 'Conferencia magistral', 'Simposio'] },
  pt: { nd: 's.d.', inw: 'Em', ed: 'Org.', eds: 'Orgs.', p: 'p.', pp: 'p.', art: 'Artigo', ret: 'Recuperado em {d}, de {u}', rep: 'Relatório n.º', and: 'e', etal: 'et al.', refs: 'Referências', vid: 'Vídeo', cm: ', ', unp: '{t} não publicada', th: ['tese de doutorado', 'dissertação de mestrado', 'monografia de graduação'], ct: ['Apresentação de trabalho', 'Apresentação de pôster', 'Palestra de abertura', 'Simpósio'] },
  id: { nd: 't.t.', inw: 'Dalam', ed: 'Ed.', eds: 'Eds.', p: 'hlm.', pp: 'hlm.', art: 'Artikel', ret: 'Diakses pada {d}, dari {u}', rep: 'Laporan No.', and: 'dan', etal: 'dkk.', refs: 'Daftar Pustaka', vid: 'Video', cm: ', ', unp: '{t} tidak dipublikasikan', th: ['disertasi doktoral', 'tesis magister', 'skripsi'], ct: ['Presentasi makalah', 'Presentasi poster', 'Pidato kunci', 'Simposium'] },
  hi: { nd: 'n.d.', inw: 'In', ed: 'सं.', eds: 'सं.', p: 'पृ.', pp: 'पृ.', art: 'लेख', ret: 'पुनर्प्राप्त {d}, {u} से', rep: 'रिपोर्ट सं.', and: 'और', etal: 'et al.', refs: 'संदर्भ', vid: 'वीडियो', cm: ', ', unp: 'अप्रकाशित {t}', th: ['डॉक्टरेट शोध-प्रबंध', 'मास्टर्स शोध-प्रबंध', 'स्नातक शोध-प्रबंध'], ct: ['पेपर प्रस्तुति', 'पोस्टर प्रस्तुति', 'मुख्य भाषण', 'संगोष्ठी'] },
  ar: { nd: 'د.ت.', inw: 'في', ed: 'محرر', eds: 'محررون', p: 'ص', pp: 'ص', art: 'مقالة', ret: 'تاريخ الاسترجاع {d}، من {u}', rep: 'تقرير رقم', and: 'و', etal: 'وآخرون', refs: 'المراجع', vid: 'فيديو', cm: '، ', unp: '{t} غير منشورة', th: ['أطروحة دكتوراه', 'رسالة ماجستير', 'رسالة بكالوريوس'], ct: ['عرض ورقة بحثية', 'عرض ملصق علمي', 'كلمة رئيسية', 'ندوة'] }
};
const APA_FULL = ['magazine', 'newspaper', 'webpage', 'conference', 'video'];
const apaSeg = typeof Intl !== 'undefined' && Intl.Segmenter ? new Intl.Segmenter(undefined, { granularity: 'grapheme' }) : null;
const apaCh1 = s => { const a = apaSeg ? [...apaSeg.segment(s)].map(x => x.segment) : [...s]; return a.length ? a[0] : ''; };
const apaCap = s => s ? apaCh1(s).toUpperCase() + s.slice(apaCh1(s).length) : s;
/* "Jean-Paul Marie" -> "J.-P. M." (also accepts "J.K." or "J. K.") */
const APA_PART = /^(de|da|do|dos|das|del|della|di|van|von|der|den|la|le|bin|binti|ibn|al|el)$/;
const apaInit = g => g.split(/[\s.]+/).filter(x => x && !APA_PART.test(x)).map(t => t.split('-').filter(Boolean).map(p => apaCh1(p).toUpperCase() + '.').join('-')).join(' ');
const apaNames = (txt, org) => String(txt || '').split(/\r?\n|;/).map(x => x.trim()).filter(Boolean).map(l => {
  if (org) return { org: l };
  const c = l.split(',').map(x => x.trim());
  if (c.length > 1 && c[0]) return { fam: c[0], giv: c[1], suf: c.slice(2).filter(Boolean).join(', ') };
  const t = l.replace(/,/g, ' ').split(/\s+/).filter(Boolean);
  if (t.length === 1) return { fam: t[0], giv: '', suf: '' };
  /* "Smith J" / "Smith JK": a last word made only of initials means the family name comes first */
  if (/^[\p{Lu}.]{1,4}$/u.test(t[t.length - 1]) && !/^[\p{Lu}.]{1,4}$/u.test(t[0])) return { fam: t[0], giv: t.slice(1).join(' ').replace(/\./g, '').replace(/(\p{Lu})(?=\p{Lu})/gu, '$1 '), suf: '' };
  /* "Simone de Beauvoir": lower-case particles before the last word belong to the family name */
  let k = t.length - 1; while (k > 1 && APA_PART.test(t[k - 1])) k--;
  return { fam: t.slice(k).join(' '), giv: t.slice(0, k).join(' '), suf: '' };
});
const apaRef = n => n.org || n.fam + (n.giv ? ', ' + apaInit(n.giv) : '') + (n.suf ? ', ' + n.suf : '');
const apaEd = n => n.org || (n.giv ? apaInit(n.giv) + ' ' : '') + n.fam;
const apaJoin = a => a.length === 1 ? a[0] : a.length === 2 ? a[0] + ', & ' + a[1]
  : a.length <= 20 ? a.slice(0, -1).join(', ') + ', & ' + a[a.length - 1]
  : a.slice(0, 19).join(', ') + ', … ' + a[a.length - 1];
const apaJoinEd = a => a.length === 1 ? a[0] : a.length === 2 ? a[0] + ' & ' + a[1] : a.slice(0, -1).join(', ') + ', & ' + a[a.length - 1];
const apaMonth = (m, rl) => new Intl.DateTimeFormat(rl === 'ar' ? 'ar-u-nu-latn-ca-gregory' : rl + '-u-nu-latn', { month: 'long', timeZone: 'UTC' }).format(new Date(Date.UTC(2020, m - 1, 15)));
const apaDate = (y, m, d, rl) => {
  const X = APA_X[rl]; y = String(y || '').trim();
  let s = !y || /^n\.?\s?d\.?$/i.test(y) ? X.nd : y;
  m = Number(m);
  if (m >= 1 && m <= 12) {
    const mn = apaMonth(m, rl), dd = String(d || '').trim().replace(/\s*[-–—]\s*/g, '–');
    const ok = /^\d{1,2}(–\d{1,2})?$/.test(dd);
    s += ', ' + (!ok ? mn : rl === 'en' ? mn + ' ' + dd : rl === 'es' || rl === 'pt' ? dd + ' de ' + mn : dd + ' ' + mn);
  }
  return s;
};
const apaLong = (ymd, rl) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd || ''); if (!m) return '';
  const mn = apaMonth(+m[2], rl), d = +m[3], y = m[1];
  return rl === 'en' ? `${mn} ${d}, ${y}` : rl === 'es' || rl === 'pt' ? `${d} de ${mn} de ${y}` : `${d} ${mn} ${y}`;
};
const apaEdition = (v, rl) => {
  v = String(v || '').trim(); if (!v) return '';
  if (!/^\d+$/.test(v)) return v;
  const n = Number(v); if (n < 2) return '';
  return rl === 'en' ? n + (n % 100 >= 11 && n % 100 <= 13 ? 'th' : ['th', 'st', 'nd', 'rd'][n % 10 > 3 ? 0 : n % 10]) + ' ed.'
    : rl === 'es' || rl === 'pt' ? n + '.ª ed.' : rl === 'id' ? 'ed. ke-' + n : rl === 'hi' ? 'संस्करण ' + n : 'الطبعة ' + n;
};
const apaRange = p => p.replace(/\s*[-–—]\s*/g, '–');
const apaIsRange = p => /[–,]/.test(p);
const apaLink = s => {
  s = String(s || '').trim(); if (!s) return '';
  const m = /^(?:https?:\/\/(?:dx\.)?doi\.org\/|doi:\s*)?(10\.\d{4,9}\/\S+)$/i.exec(s);
  if (m) return 'https://doi.org/' + m[1];
  return /^www\./i.test(s) ? 'https://' + s : s;
};
/* sentence case: lower-case words except the first word, words after a colon or sentence end, and acronyms / CamelCase */
const apaSentence = s => {
  let start = true;
  return s.replace(/\S+/g, w => {
    const m = /^([("'“‘\[]*)([\s\S]*)$/.exec(w), pre = m[1], rest = m[2];
    const keep = /\p{Lu}/u.test(rest.slice(apaCh1(rest).length)) || rest === 'I';
    const out = keep ? rest : start ? apaCap(rest.toLowerCase()) : rest.toLowerCase();
    start = /[:?!.]["'”’)\]]*$/.test(w);
    return pre + out;
  });
};
/* segments: [[text, italic?], ...] */
const apaSegT = s => s === '' || s == null ? [] : [[String(s), 0]];
const apaSegI = s => s === '' || s == null ? [] : [[String(s), 1]];
const apaSegEnd = a => a.length && !/[.?!]$/.test(a[a.length - 1][0]) ? [...a, ['.', 0]] : a;
const apaSegJoin = els => {
  const out = [];
  els.filter(e => e && e.length).forEach((e, i) => { if (i) out.push([' ', 0]); out.push(...e); });
  return out.reduce((acc, s) => { const l = acc[acc.length - 1]; if (l && l[1] === s[1]) l[0] += s[0]; else acc.push([s[0], s[1]]); return acc; }, []);
};
const apaText = segs => segs.map(s => s[0]).join('');
const apaBuild = (d, rl) => {
  const X = APA_X[rl], ty = d.type, full = APA_FULL.includes(ty);
  const au = apaNames(d.authors, d.org), cap = s => { s = String(s || '').trim(); return d.sc ? apaSentence(s) : s; };
  const title = cap(d.title), cont = String(d.cont || '').trim();
  if (!title) return null;
  const orgAu = au.length === 1 && au[0].org ? au[0].org.toLowerCase() : '';
  const same = s => !!orgAu && String(s || '').trim().toLowerCase() === orgAu;
  const vol = String(d.vol || '').trim(), iss = String(d.iss || '').trim(), pgRaw = String(d.pages || '').trim();
  const pub = String(d.pub || '').trim(), site = String(d.site || '').trim(), edn = apaEdition(d.ed, rl);
  const link = apaLink(d.link), acc = apaLong(d.acc, rl);
  let aEl = [];
  if (au.length) {
    aEl = apaSegT(apaJoin(au.map(apaRef)));
    aEl = d.aseds && ty === 'book' ? [...aEl, [' (' + (au.length > 1 ? X.eds : X.ed) + ').', 0]] : apaSegEnd(aEl);
  }
  const dEl = apaSegT('(' + apaDate(d.year, full ? d.month : '', full ? d.day : '', rl) + ').');
  const linkEl = !link ? [] : acc && ['webpage', 'report', 'video'].includes(ty) ? apaSegT(X.ret.replace('{d}', acc).replace('{u}', link)) : apaSegT(link);
  const pubEl = pub && !same(pub) ? apaSegEnd(apaSegT(pub)) : [];
  const siteEl = site && !same(site) ? apaSegEnd(apaSegT(site)) : [];
  let tEl, rest = [], plainTitle = false;
  if (ty === 'journal' || ty === 'magazine') {
    plainTitle = true; tEl = apaSegEnd(apaSegT(title));
    let pg = pgRaw ? (/^[A-Za-z]?\d+$/.test(pgRaw) ? X.art + ' ' + pgRaw : apaRange(pgRaw)) : '';
    rest = [apaSegEnd([...(cont ? apaSegI(cont + (vol ? ', ' + vol : '')) : []), ...(iss ? apaSegT('(' + iss + ')') : []), ...(pg ? apaSegT((cont ? ', ' : '') + pg) : [])]), linkEl];
  } else if (ty === 'newspaper') {
    plainTitle = true; tEl = apaSegEnd(apaSegT(title));
    const pg = pgRaw ? apaRange(pgRaw) : '';
    rest = [apaSegEnd([...apaSegI(cont), ...(pg ? apaSegT(', ' + (apaIsRange(pg) ? X.pp : X.p) + ' ' + pg) : [])]), linkEl];
  } else if (ty === 'book') {
    tEl = apaSegEnd([...apaSegI(title), ...(edn ? apaSegT(' (' + edn + ')') : [])]); rest = [pubEl, linkEl];
  } else if (ty === 'chapter') {
    plainTitle = true; tEl = apaSegEnd(apaSegT(title));
    const eds = apaNames(d.editors, false), n = eds.length;
    const edTxt = n ? apaJoinEd(eds.map(apaEd)) + ' (' + (n > 1 ? X.eds : X.ed) + '), ' : '';
    const pg = pgRaw ? apaRange(pgRaw) : '', par = [edn, pg ? (apaIsRange(pg) ? X.pp : X.p) + ' ' + pg : ''].filter(Boolean).join(', ');
    rest = [apaSegEnd([...apaSegT(X.inw + ' ' + edTxt), ...apaSegI(cont), ...(par ? apaSegT(' (' + par + ')') : [])]), pubEl, linkEl];
  } else if (ty === 'webpage') {
    tEl = apaSegEnd(apaSegI(title)); rest = [siteEl, linkEl];
  } else if (ty === 'report') {
    const rno = String(d.rno || '').trim();
    tEl = apaSegEnd([...apaSegI(title), ...(rno ? apaSegT(' (' + X.rep + ' ' + rno + ')') : [])]); rest = [pubEl, linkEl];
  } else if (ty === 'thesis') {
    const lv = Math.min(2, Math.max(0, Number(d.tlevel) || 0)), inst = String(d.inst || '').trim();
    const base = d.unp ? X.unp.replace('{t}', X.th[lv]) : X.th[lv];
    tEl = apaSegEnd([...apaSegI(title), ...apaSegT(' [' + apaCap(base) + (inst ? X.cm + inst : '') + ']')]);
    rest = d.unp ? [] : [siteEl, linkEl];
  } else if (ty === 'conference') {
    const place = String(d.place || '').trim(), ci = Math.min(3, Math.max(0, Number(d.ctype) || 0));
    tEl = apaSegEnd([...apaSegI(title), ...apaSegT(' [' + X.ct[ci] + ']')]);
    rest = [cont || place ? apaSegEnd(apaSegT(cont + (cont && place ? X.cm : '') + place)) : [], linkEl];
  } else if (ty === 'video') {
    tEl = apaSegEnd([...apaSegI(title), ...apaSegT(' [' + X.vid + ']')]); rest = [siteEl, linkEl];
  } else return null;
  const segs = au.length ? apaSegJoin([aEl, dEl, tEl, ...rest]) : apaSegJoin([tEl, dEl, ...rest]);
  /* in-text citations */
  const yr = /^n\.?\s?d\.?$/i.test(String(d.year || '').trim()) || !String(d.year || '').trim() ? X.nd : String(d.year).trim();
  const fam = n => n.org || n.fam;
  let par, nar;
  if (au.length) {
    const who = au.length === 1 ? [fam(au[0]), fam(au[0])] : au.length === 2 ? [fam(au[0]) + ' & ' + fam(au[1]), fam(au[0]) + ' ' + X.and + ' ' + fam(au[1])] : [fam(au[0]) + ' ' + X.etal, fam(au[0]) + ' ' + X.etal];
    par = apaSegT('(' + who[0] + ', ' + yr + ')'); nar = apaSegT(who[1] + ' (' + yr + ')');
  } else {
    const w = title.replace(/[.:,;]+$/, '').split(/\s+/), sh = w.length > 5 ? w.slice(0, 4).join(' ') + '…' : w.join(' ');
    if (plainTitle) { par = apaSegT('(“' + sh + ',” ' + yr + ')'); nar = apaSegT('“' + sh + '” (' + yr + ')'); }
    else { par = [['(', 0], [sh, 1], [', ' + yr + ')', 0]]; nar = [[sh, 1], [' (' + yr + ')', 0]]; }
  }
  const key = (au.length ? au.map(n => n.org || n.fam + ' ' + (n.giv || '')).join(' ') : title.replace(rl === 'en' ? /^(a|an|the)\s+/i : /^$/, ''));
  const yn = parseInt(String(d.year || ''), 10);
  return { segs, par, nar, key, y: Number.isFinite(yn) ? yn : -1 };
};
const apaSort = (rows, rl) => rows.slice().sort((a, b) => a.r.key.localeCompare(b.r.key, rl, { sensitivity: 'base', ignorePunctuation: true }) || a.r.y - b.r.y);
/* APA-CORE-END */

/* ---------- APA 7 reference generator: interface (own layout: form, preview, sorted list) ---------- */
const apaUI = root => {
  const ui = k => I[k] || k, NAMES = { en: 'English', es: 'Español', pt: 'Português', id: 'Bahasa Indonesia', hi: 'हिन्दी', ar: 'العربية' };
  const XL = APA_X[lang] || APA_X.en, TYPES = ['journal', 'magazine', 'newspaper', 'book', 'chapter', 'webpage', 'report', 'thesis', 'conference', 'video'];
  /* which fields each source type uses */
  const VIS = {
    month: APA_FULL, day: APA_FULL, cont: ['journal', 'magazine', 'newspaper', 'chapter', 'conference'], vol: ['journal', 'magazine'], iss: ['journal', 'magazine'],
    pages: ['journal', 'magazine', 'newspaper', 'chapter'], ed: ['book', 'chapter'], editors: ['chapter'], pub: ['book', 'chapter', 'report'], site: ['webpage', 'video', 'thesis'],
    inst: ['thesis'], tlevel: ['thesis'], rno: ['report'], ctype: ['conference'], place: ['conference'], acc: ['webpage', 'report', 'video']
  };
  const DYN = { cont: { journal: 'a_cj', magazine: 'a_cm', newspaper: 'a_cm', chapter: 'a_cb', conference: 'a_cc' }, site: { webpage: 'a_sw', video: 'a_sv', thesis: 'a_st' } };
  const LAB = { type: 'a_type', rl: 'a_rl', authors: 'a_au', editors: 'a_ed', year: 'a_yr', month: 'a_mo', day: 'a_dy', title: 'a_ti', cont: 'a_cj', vol: 'a_vo', iss: 'a_is', pages: 'a_pg', ed: 'a_edn', pub: 'a_pub', site: 'a_sw', inst: 'a_in', tlevel: 'a_lv', rno: 'a_rn', ctype: 'a_ct', place: 'a_pl', link: 'a_lk', acc: 'a_ac' };
  const KINDS = [['type', 'sel'], ['rl', 'sel'], ['authors', 'area'], ['editors', 'area'], ['year', 'txt'], ['month', 'sel'], ['day', 'txt'], ['title', 'txt'], ['cont', 'txt'], ['vol', 'txt'], ['iss', 'txt'], ['pages', 'txt'], ['ed', 'txt'], ['pub', 'txt'], ['site', 'txt'], ['inst', 'txt'], ['tlevel', 'sel'], ['rno', 'txt'], ['ctype', 'sel'], ['place', 'txt'], ['link', 'txt'], ['acc', 'date']];
  const CHK = [['org', 'a_org'], ['aseds', 'a_aed'], ['unp', 'a_unp'], ['sc', 'a_sc']];
  const opts = {
    type: TYPES.map(x => [x, ui('a_t_' + x)]), rl: Object.keys(NAMES).map(x => [x, NAMES[x]]),
    tlevel: XL.th.map((x, i) => [String(i), apaCap(x)]), ctype: XL.ct.map((x, i) => [String(i), x]), month: []
  };
  const el = {}, wrap = {}, lab = {}, chkWrap = {};
  const fl = h('div', { className: 'flds' });
  for (const [k, kind] of KINDS) {
    const id = 'a-' + k; let c;
    if (kind === 'area') c = h('textarea', { id, spellcheck: false, dir: 'auto' });
    else if (kind === 'sel') c = h('select', { id }, ...opts[k].map(([v, l]) => h('option', { value: v }, l)));
    else if (kind === 'date') c = h('input', { id, type: 'date' });
    else c = h('input', { id, type: 'text', spellcheck: false, autocomplete: 'off', dir: 'auto' });
    el[k] = c; lab[k] = h('label', { htmlFor: id }, ui(LAB[k]));
    wrap[k] = h('div', { className: 'fld' + (kind === 'area' || k === 'title' || k === 'link' ? ' full' : '') }, lab[k], c);
    fl.append(wrap[k]);
  }
  el.rl.value = NAMES[lang] ? lang : 'en';
  const grp = h('fieldset', { className: 'fld full opts' }, h('legend', {}, I.opts));
  for (const [k, key] of CHK) {
    const id = 'a-' + k; el[k] = h('input', { id, type: 'checkbox' });
    chkWrap[k] = h('label', { className: 'chk', htmlFor: id }, el[k], h('span', {}, ui(key)));
    grp.append(chkWrap[k]);
  }
  fl.append(grp);
  const fillMonths = () => {
    const cur = el.month.value;
    el.month.replaceChildren(h('option', { value: '' }, '—'), ...Array.from({ length: 12 }, (_, i) => h('option', { value: String(i + 1) }, apaMonth(i + 1, el.rl.value))));
    el.month.value = cur;
  };
  fillMonths();
  const keepKeys = ['type', 'rl', 'sc'];
  const reset = () => { for (const k in el) { if (keepKeys.includes(k)) continue; if (el[k].type === 'checkbox') el[k].checked = false; else if (el[k].tagName === 'SELECT') el[k].selectedIndex = 0; else el[k].value = ''; } };
  const val = () => { const v = {}; for (const k in el) v[k] = el[k].type === 'checkbox' ? el[k].checked : el[k].value; return v; };
  const rlv = () => el.rl.value, dirOf = () => rlv() === 'ar' ? 'rtl' : 'ltr';
  const segDom = segs => segs.map(([t, i]) => i ? h('i', {}, t) : t);
  const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const segHtml = segs => segs.map(([t, i]) => i ? '<i>' + esc(t) + '</i>' : esc(t)).join('');
  const pStyle = () => `margin:${dirOf() === 'rtl' ? '0 .5in 0 0' : '0 0 0 .5in'};text-indent:-.5in;line-height:2;font-family:'Times New Roman',Times,serif;font-size:12pt`;
  const pHtml = segs => `<p dir="${dirOf()}" style="${pStyle()}">${segHtml(segs)}</p>`;
  let list = [], blobUrl = '';
  const rows = () => apaSort(list.map(d => ({ d, r: apaBuild(d, rlv()) })).filter(x => x.r), rlv());

  /* preview */
  const pv = h('div', { className: 'apa-res', role: 'status', tabIndex: 0 }), ct = h('p', { className: 'cite' });
  const cpOne = h('button', { className: 'btn alt', type: 'button', hidden: true }, I.copy);
  const flash = (b, label) => { b.textContent = I.copied; setTimeout(() => { b.textContent = label; }, 1500); };
  const copyRich = async (html, text, b, label) => {
    try {
      if (navigator.clipboard && window.ClipboardItem) await navigator.clipboard.write([new ClipboardItem({ 'text/html': new Blob([html], { type: 'text/html' }), 'text/plain': new Blob([text], { type: 'text/plain' }) })]);
      else await navigator.clipboard.writeText(text);
      flash(b, label);
    } catch (e) { try { await navigator.clipboard.writeText(text); flash(b, label); } catch (_) { /* clipboard blocked */ } }
  };
  let cur = null;
  const refresh = () => {
    const ty = el.type.value;
    for (const k in VIS) wrap[k].hidden = !VIS[k].includes(ty);
    chkWrap.aseds.hidden = ty !== 'book'; chkWrap.unp.hidden = ty !== 'thesis';
    for (const k in DYN) lab[k].textContent = ui(DYN[k][ty] || LAB[k]);
    pv.dir = dirOf(); cur = apaBuild(val(), rlv());
    pv.replaceChildren(...(cur ? [h('p', { className: 'ref' }, ...segDom(cur.segs))] : []));
    ct.replaceChildren(...(cur ? [`${ui('a_cite')}: `, ...segDom(cur.par), ' · ', ...segDom(cur.nar)] : []));
    ct.dir = dirOf(); ct.hidden = cpOne.hidden = !cur;
  };

  /* list */
  const ul = h('ul', { className: 'reflist' }), empty = h('p', { className: 'note' }, ui('a_empty')), lh = h('h2', { id: 'apa-lt' });
  const cpAll = h('button', { className: 'btn alt', type: 'button' }, ui('a_cpl')), dl = h('a', { className: 'btn alt', download: 'celverter-apa-references.html' }, I.download);
  const clAll = h('button', { className: 'btn alt', type: 'button' }, ui('a_cll')), lact = h('div', { className: 'acts' }, cpAll, dl, clAll);
  const addBtn = h('button', { className: 'btn', type: 'submit' }, ui('a_add')), clrBtn = h('button', { className: 'btn alt', type: 'button' }, I.clear);
  const edit = d => {
    list.splice(list.indexOf(d), 1);
    for (const k in el) { if (k === 'rl') continue; if (el[k].type === 'checkbox') el[k].checked = !!d[k]; else el[k].value = d[k]; }
    renderList(); refresh(); el.title.focus();
  };
  const renderList = () => {
    const rs = rows(), rl = rlv();
    lh.textContent = ui('a_list') + (rs.length ? ' (' + nf(rs.length, 0) + ')' : '');
    ul.dir = dirOf(); empty.hidden = rs.length > 0; lact.hidden = ul.hidden = !rs.length;
    ul.replaceChildren(...rs.map(({ d, r }) => h('li', {}, h('p', { className: 'ref' }, ...segDom(r.segs)),
      h('div', { className: 'acts sm' }, h('button', { className: 'btn alt', type: 'button', onclick: () => edit(d) }, ui('a_edit')),
        h('button', { className: 'btn alt', type: 'button', onclick: () => { list.splice(list.indexOf(d), 1); renderList(); } }, ui('a_rm'))))));
    if (blobUrl) URL.revokeObjectURL(blobUrl);
    blobUrl = '';
    if (rs.length) {
      const doc = `<!doctype html><html lang="${rl}" dir="${dirOf()}"><head><meta charset="utf-8"><title>${esc(APA_X[rl].refs)}</title></head><body style="font-family:'Times New Roman',Times,serif;font-size:12pt"><p style="text-align:center;font-weight:bold;line-height:2;margin:0">${esc(APA_X[rl].refs)}</p>${rs.map(x => pHtml(x.r.segs)).join('')}</body></html>`;
      blobUrl = URL.createObjectURL(new Blob([doc], { type: 'text/html' })); dl.href = blobUrl;
    }
  };
  const add = () => {
    const d = val();
    if (!apaBuild(d, rlv())) { el.title.focus(); return; }
    list.push(d); reset(); renderList(); refresh();
  };

  const form = h('form', { noValidate: true, autocomplete: 'off' }, fl, h('div', { className: 'acts' }, addBtn, clrBtn));
  form.addEventListener('submit', e => { e.preventDefault(); add(); });
  form.addEventListener('input', e => { if (e.target === el.rl) { fillMonths(); renderList(); } refresh(); });
  clrBtn.addEventListener('click', () => { reset(); refresh(); });
  cpOne.addEventListener('click', () => { if (cur) copyRich(pHtml(cur.segs), apaText(cur.segs), cpOne, I.copy); });
  cpAll.addEventListener('click', () => { const rs = rows(); if (rs.length) copyRich(rs.map(x => pHtml(x.r.segs)).join(''), rs.map(x => apaText(x.r.segs)).join('\n\n'), cpAll, ui('a_cpl')); });
  clAll.addEventListener('click', () => { list = []; renderList(); });
  const kofi = h('p', { className: 'donate' }, h('a', { href: 'https://ko-fi.com/celverter', target: '_blank', rel: 'noopener noreferrer' }, '☕ ' + (I.donate || 'Support Celverter on Ko-fi')));
  root.replaceChildren(form, h('h2', { id: 'apa-pt' }, ui('a_prev')), pv, ct, h('div', { className: 'acts' }, cpOne), lh, empty, ul, lact, h('p', { className: 'note' }, ui('a_note')), kofi);
  pv.setAttribute('aria-labelledby', 'apa-pt');
  root.classList.add('apa');
  renderList(); refresh();
};

const N2W_OPTS = [['en', 'English'], ['es', 'Español'], ['pt', 'Português'], ['id', 'Bahasa Indonesia'], ['hi', 'हिन्दी'], ['ar', 'العربية']];
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
  'remove-line-breaks': { live: 1, f: [A('input')], run: v => v.input.split('\n').map(x => x.trim()).filter(Boolean).join(' ') },
  'sort-lines': { live: 1, f: [A('input'), S('mode', [['asc', 'A → Z'], ['desc', 'Z → A']])], run: v => { const a = v.input.split('\n').sort((x, y) => x.localeCompare(y, lang, { numeric: true })); return (v.mode === 'desc' ? a.reverse() : a).join('\n'); } },
  'apa-reference-generator': { custom: apaUI },
  'excel-to-statistics': { custom: () => {} }, /* UI lives in stats.js, loaded only on this page (see build.js) */

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
  'number-to-words': { live: 1, f: [X('n2w_in'), S('n2w_lang', N2W_OPTS, Math.max(0, N2W_OPTS.findIndex(x => x[0] === lang))), S('n2w_case', modes('lower', 'sentence', 'title', 'upper')), X('n2w_unit', '', 1), CK('n2w_brit', false)], run: v => N2W.text(v.n2w_in, lang, v.n2w_lang, { brit: v.n2w_brit, unit: v.n2w_unit, cs: v.n2w_case }) },
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
  'image-resizer': { acc: 'image/*', f: [FL('file'), N('wd'), N('ht', undefined, { opt: 1 })], run: async v => { if (v.file.size > 30e6) bad(); const bm = await createImageBitmap(v.file), w = Math.round(num(v.wd)), hh = v.ht ? Math.round(num(v.ht)) : Math.round(bm.height * w / bm.width); bm.close(); return img(v.file, w, hh, v.file.type === 'image/png' ? 'image/png' : v.file.type === 'image/webp' ? 'image/webp' : 'image/jpeg', .92); } },
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
if (T[box.dataset.tool].custom) { T[box.dataset.tool].custom($('#ui')); return; }
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
const kofi = h('p', { className: 'donate' }, h('a', { href: 'https://ko-fi.com/celverter', target: '_blank', rel: 'noopener noreferrer' }, '☕ ' + (I.donate || 'Support Celverter on Ko-fi')));
root.replaceChildren(fl, acts, h('h2', { id: 'rt' }, I.result), sw, res, kofi);
res.setAttribute('aria-labelledby', 'rt');

let blobUrl = '', seq = 0, tm = 0;
const MAXLEN = 500000;
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
    if (typeof v[f.k] === 'string' && v[f.k].length > MAXLEN) { show(I.big || I.err); return; }
    if (!['sel', 'range', 'chk'].includes(f.ty) && !f.opt && !v[f.k]) ok = false;
  }
  if (!ok) { show(manual ? I.err : ''); return; }
  try { const out = await tool.run(v); if (my === seq) show(out); }
  catch (e) { if (my === seq) show(I[e && e.k] || I.err); }
};
form.addEventListener('submit', e => { e.preventDefault(); clearTimeout(tm); go(true); });
/* live tools wait for a short pause in typing instead of re-running on every keystroke */
tool.live && form.addEventListener('input', () => { clearTimeout(tm); tm = setTimeout(() => go(false), 150); });
$('#clr-btn').addEventListener('click', () => { clearTimeout(tm); seq++; tool.f.forEach(setDef); show(''); });
cp.addEventListener('click', async () => { try { await navigator.clipboard.writeText(res.textContent); cp.textContent = I.copied; setTimeout(() => cp.textContent = I.copy, 1500); } catch (e) { /* clipboard blocked */ } });
root.parentNode.insertBefore(form, root); form.append(root);
})();
