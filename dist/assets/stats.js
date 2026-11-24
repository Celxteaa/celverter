(() => {
'use strict';
/* Excel to Statistics. Reads .xlsx / .csv files or typed/pasted data and runs statistical analyses and charts in the browser.
   No dependencies; loaded only on its own tool page (see build.js). Definitions: quartiles by the inclusive method (= Excel QUARTILE.INC),
   sample variance (n-1), Welch t-test, Shapiro-Wilk (Royston 1995), Tukey HSD, exact Wilcoxon tests for small samples without ties. */
const core = {};

/* ================= math ================= */
const LC = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
const lgam = x => {
  if (x < 0.5) return Math.log(Math.PI / Math.abs(Math.sin(Math.PI * x))) - lgam(1 - x);
  x -= 1;
  let a = LC[0]; const t = x + 7.5;
  for (let i = 1; i < 9; i++) a += LC[i] / (x + i);
  return 0.9189385332046727 + (x + 0.5) * Math.log(t) - t + Math.log(a);
};
const FPMIN = 1e-300;
const betacf = (a, b, x) => {
  const qab = a + b, qap = a + 1, qam = a - 1;
  let c = 1, d = 1 - qab * x / qap;
  if (Math.abs(d) < FPMIN) d = FPMIN;
  d = 1 / d; let h = d;
  for (let m = 1; m <= 2000; m++) {
    const m2 = 2 * m;
    let aa = m * (b - m) * x / ((qam + m2) * (a + m2));
    d = 1 + aa * d; if (Math.abs(d) < FPMIN) d = FPMIN;
    c = 1 + aa / c; if (Math.abs(c) < FPMIN) c = FPMIN;
    d = 1 / d; h *= d * c;
    aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
    d = 1 + aa * d; if (Math.abs(d) < FPMIN) d = FPMIN;
    c = 1 + aa / c; if (Math.abs(c) < FPMIN) c = FPMIN;
    d = 1 / d;
    const del = d * c; h *= del;
    if (Math.abs(del - 1) < 3e-16) break;
  }
  return h;
};
/* [I_x(a,b), 1 - I_x(a,b)]; the smaller tail is computed directly, so tiny p-values keep their precision */
const ibeta2 = (x, a, b) => {
  if (!(x > 0)) return [0, 1];
  if (x >= 1) return [1, 0];
  const bt = Math.exp(lgam(a + b) - lgam(a) - lgam(b) + a * Math.log(x) + b * Math.log1p(-x));
  if (x < (a + 1) / (a + b + 2)) { const l = bt * betacf(a, b, x) / a; return [l, 1 - l]; }
  const u = bt * betacf(b, a, 1 - x) / b; return [1 - u, u];
};
const gser = (a, x) => {
  let ap = a, del = 1 / a, sum = del;
  for (let n = 0; n < 5000; n++) { ap++; del *= x / ap; sum += del; if (Math.abs(del) < Math.abs(sum) * 1e-17) break; }
  return sum * Math.exp(-x + a * Math.log(x) - lgam(a));
};
const gcf = (a, x) => {
  let b = x + 1 - a, c = 1 / FPMIN, d = 1 / b, h = d;
  for (let i = 1; i < 5000; i++) {
    const an = -i * (i - a); b += 2;
    d = an * d + b; if (Math.abs(d) < FPMIN) d = FPMIN;
    c = b + an / c; if (Math.abs(c) < FPMIN) c = FPMIN;
    d = 1 / d; const del = d * c; h *= del;
    if (Math.abs(del - 1) < 1e-16) break;
  }
  return Math.exp(-x + a * Math.log(x) - lgam(a)) * h;
};
const gammaQ = (a, x) => x <= 0 ? 1 : x < a + 1 ? 1 - gser(a, x) : gcf(a, x);
const pchiU = (x, k) => x <= 0 ? 1 : gammaQ(k / 2, x / 2);
const pnorm = z => { const q = gammaQ(0.5, z * z / 2) / 2; return z >= 0 ? 1 - q : q; };
const pt2 = (t, df) => Number.isFinite(t) ? ibeta2(df / (df + t * t), df / 2, 0.5)[0] : 0;          /* two-sided p */
const ptUp = (t, df) => t >= 0 ? pt2(t, df) / 2 : 1 - pt2(t, df) / 2;                                 /* P(T > t) */
const ptLo = (t, df) => t <= 0 ? pt2(t, df) / 2 : 1 - pt2(t, df) / 2;                                 /* P(T < t) */
const pfU = (f, d1, d2) => f <= 0 ? 1 : ibeta2(d2 / (d2 + d1 * f), d2 / 2, d1 / 2)[0];
const qnorm = p => {
  if (!(p > 0)) return -Infinity; if (!(p < 1)) return Infinity;
  const a = [-3.969683028665376e+01, 2.209460984245205e+02, -2.759285104469687e+02, 1.383577518672690e+02, -3.066479806614716e+01, 2.506628277459239e+00],
    b = [-5.447609879822406e+01, 1.615858368580409e+02, -1.556989798598866e+02, 6.680131188771972e+01, -1.328068155288572e+01],
    c = [-7.784894002430293e-03, -3.223964580411365e-01, -2.400758277161838e+00, -2.549732539343734e+00, 4.374664141464968e+00, 2.938163982698783e+00],
    d = [7.784695709041462e-03, 3.224671290700398e-01, 2.445134137142996e+00, 3.754408661907416e+00];
  let x;
  if (p < 0.02425) { const q = Math.sqrt(-2 * Math.log(p)); x = (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1); }
  else if (p > 1 - 0.02425) { const q = Math.sqrt(-2 * Math.log(1 - p)); x = -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1); }
  else { const q = p - 0.5, r = q * q; x = (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1); }
  for (let i = 0; i < 2; i++) { const e = pnorm(x) - p, u = e * 2.5066282746310002 * Math.exp(x * x / 2); x -= u / (1 + x * u / 2); }
  return x;
};
/* x >= 0 with f(x) = target, f decreasing: bisection (cheap enough for the few calls needed) */
const solveDec = (f, target) => {
  let lo = 0, hi = 1;
  while (f(hi) > target && hi < 1e15) hi *= 2;
  for (let i = 0; i < 200; i++) { const m = (lo + hi) / 2; if (f(m) > target) lo = m; else hi = m; if (hi - lo <= 1e-14 * Math.max(1, hi)) break; }
  return (lo + hi) / 2;
};
const tCrit = (alpha, df) => solveDec(t => pt2(t, df), alpha);   /* t with P(|T| > t) = alpha */
/* Studentized range distribution (Tukey HSD) by numerical integration */
const GL = (() => {  /* Gauss-Legendre nodes/weights on [-1,1], computed rather than typed in */
  const mk = n => {
    const x = [], w = [];
    for (let i = 0; i < n; i++) {
      let z = Math.cos(Math.PI * (i + 0.75) / (n + 0.5)), pp = 0;
      for (let it = 0; it < 100; it++) {
        let p1 = 1, p2 = 0;
        for (let j = 0; j < n; j++) { const p3 = p2; p2 = p1; p1 = ((2 * j + 1) * z * p2 - j * p3) / (j + 1); }
        pp = n * (z * p1 - p2) / (z * z - 1);
        const z1 = z; z = z1 - p1 / pp; if (Math.abs(z - z1) < 1e-15) break;
      }
      x.push(z); w.push(2 / ((1 - z * z) * pp * pp));
    }
    return [x, w];
  };
  return mk(12);
})();
const integ = (f, a, b, parts) => {
  let s = 0; const h = (b - a) / parts;
  for (let p = 0; p < parts; p++) {
    const m = a + (p + 0.5) * h, r = h / 2;
    for (let i = 0; i < GL[0].length; i++) s += GL[1][i] * f(m + r * GL[0][i]);
  }
  return s * h / 2;
};
const SQ2PI = 2.5066282746310002;
const rangeW = (w, k) => w <= 0 ? 0 : k * integ(z => Math.exp(-z * z / 2) / SQ2PI * Math.pow(Math.max(0, pnorm(z) - pnorm(z - w)), k - 1), -9, 9, 10);
const ptukey = (q, k, df) => {
  if (q <= 0) return 0;
  if (!Number.isFinite(q)) return 1;
  if (df > 25000) return Math.min(1, rangeW(q, k));
  const lc = Math.log(2) + (df / 2) * Math.log(df / 2) - lgam(df / 2);
  const dens = s => s <= 0 ? 0 : Math.exp(lc + (df - 1) * Math.log(s) - df * s * s / 2);
  const hi = 1 + 9 / Math.sqrt(df) + (df < 4 ? 5 : 0);
  return Math.min(1, Math.max(0, integ(s => dens(s) * rangeW(q * s, k), 0, hi, 14)));
};
const qtukey = (conf, k, df) => {
  let lo = 0, hi = 4;
  while (ptukey(hi, k, df) < conf && hi < 1e4) hi *= 2;
  for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2; if (ptukey(m, k, df) < conf) lo = m; else hi = m; if (hi - lo < 1e-9 * hi) break; }
  return (lo + hi) / 2;
};

/* ---- basic helpers ---- */
const sortedCopy = a => Float64Array.from(a).sort();
const quant = (s, p) => { const n = s.length, h = (n - 1) * p, lo = Math.floor(h), f = h - lo; return lo + 1 < n ? s[lo] + f * (s[lo + 1] - s[lo]) : s[lo]; };
const sumOf = a => { let s = 0; for (let i = 0; i < a.length; i++) s += a[i]; return s; };
const meanOf = a => sumOf(a) / a.length;
const varOf = (a, m = meanOf(a)) => { let s = 0; for (let i = 0; i < a.length; i++) { const d = a[i] - m; s += d * d; } return a.length > 1 ? s / (a.length - 1) : NaN; };
const medianOf = a => quant(sortedCopy(a), 0.5);
const rankAvg = a => {
  const n = a.length, idx = Array.from({ length: n }, (_, i) => i).sort((i, j) => a[i] - a[j]), r = new Float64Array(n), ties = [];
  for (let i = 0; i < n;) {
    let j = i; while (j + 1 < n && a[idx[j + 1]] === a[idx[i]]) j++;
    const rk = (i + j) / 2 + 1; for (let k = i; k <= j; k++) r[idx[k]] = rk;
    if (j > i) ties.push(j - i + 1);
    i = j + 1;
  }
  return { r, ties };
};
const tieSum = ties => ties.reduce((s, t) => s + t * t * t - t, 0);

/* ---- descriptive statistics (same definitions as Excel) ---- */
const describe = (x, alpha) => {
  const n = x.length, o = { n };
  if (!n) return o;
  const s = sortedCopy(x);
  o.sum = sumOf(x); o.mean = o.sum / n;
  let m2 = 0, m3 = 0, m4 = 0;
  for (let i = 0; i < n; i++) { const d = x[i] - o.mean, d2 = d * d; m2 += d2; m3 += d2 * d; m4 += d2 * d2; }
  o.var = n > 1 ? m2 / (n - 1) : NaN; o.sd = Math.sqrt(o.var); o.se = o.sd / Math.sqrt(n);
  o.varp = m2 / n; o.sdp = Math.sqrt(o.varp);
  if (n > 1) { const t = tCrit(alpha, n - 1); o.ciLo = o.mean - t * o.se; o.ciHi = o.mean + t * o.se; }
  o.min = s[0]; o.max = s[n - 1]; o.range = o.max - o.min;
  o.q1 = quant(s, 0.25); o.median = quant(s, 0.5); o.q3 = quant(s, 0.75); o.iqr = o.q3 - o.q1;
  o.cv = o.mean !== 0 ? o.sd / Math.abs(o.mean) * 100 : NaN;
  o.skew = n > 2 && m2 > 0 ? n / ((n - 1) * (n - 2)) * m3 / Math.pow(o.sd, 3) : NaN;
  o.kurt = n > 3 && m2 > 0 ? n * (n + 1) / ((n - 1) * (n - 2) * (n - 3)) * m4 / (o.var * o.var) - 3 * (n - 1) * (n - 1) / ((n - 2) * (n - 3)) : NaN;
  let best = 1, modes = [];
  for (let i = 0; i < n;) { let j = i; while (j + 1 < n && s[j + 1] === s[i]) j++; const c = j - i + 1; if (c > best) { best = c; modes = [s[i]]; } else if (c === best && c > 1) modes.push(s[i]); i = j + 1; }
  o.modes = best > 1 ? modes : [];
  return o;
};

/* ---- Shapiro-Wilk (Royston 1995, algorithm AS R94, ) ---- */
const poly = (cc, x) => { let r = cc[0]; if (cc.length > 1) { let p = x * cc[cc.length - 1]; for (let j = cc.length - 2; j > 0; j--) p = (p + cc[j]) * x; r += p; } return r; };
const shapiro = xs => {
  const x = sortedCopy(xs), n = x.length;
  if (n < 3 || n > 5000) return null;
  const nn2 = n >> 1, a = new Float64Array(nn2 + 1);
  if (n === 3) a[1] = Math.SQRT1_2;
  else {
    const an25 = n + 0.25; let summ2 = 0;
    for (let i = 1; i <= nn2; i++) { a[i] = qnorm((i - 0.375) / an25); summ2 += a[i] * a[i]; }
    summ2 *= 2; const ssumm2 = Math.sqrt(summ2), rsn = 1 / Math.sqrt(n);
    const a1 = poly([0, 0.221157, -0.147981, -2.07119, 4.434685, -2.706056], rsn) - a[1] / ssumm2;
    let i1, fac;
    if (n > 5) {
      i1 = 3; const a2 = -a[2] / ssumm2 + poly([0, 0.042981, -0.293762, -1.752461, 5.682633, -3.582633], rsn);
      fac = Math.sqrt((summ2 - 2 * a[1] * a[1] - 2 * a[2] * a[2]) / (1 - 2 * a1 * a1 - 2 * a2 * a2)); a[2] = a2;
    } else { i1 = 2; fac = Math.sqrt((summ2 - 2 * a[1] * a[1]) / (1 - 2 * a1 * a1)); }
    a[1] = a1;
    for (let i = i1; i <= nn2; i++) a[i] /= -fac;
  }
  const range = x[n - 1] - x[0];
  if (!(range > 1e-19)) return null;
  const coef = i => { const j = n - 1 - i; return i === j ? 0 : (i < j ? -1 : 1) * a[1 + Math.min(i, j)]; };
  let sa = 0, sx = 0;
  for (let i = 0; i < n; i++) { sa += coef(i); sx += x[i] / range; }
  sa /= n; sx /= n;
  let ssa = 0, ssx = 0, sax = 0;
  for (let i = 0; i < n; i++) { const asa = coef(i) - sa, xsx = x[i] / range - sx; ssa += asa * asa; ssx += xsx * xsx; sax += asa * xsx; }
  const ssassx = Math.sqrt(ssa * ssx), w1 = (ssassx - sax) * (ssassx + sax) / (ssa * ssx), w = 1 - w1;
  let pw;
  if (n === 3) pw = Math.max(0, 1.90985931710274 * (Math.asin(Math.sqrt(w)) - 1.04719755119660));
  else {
    let y = Math.log(w1), m, s;
    if (n <= 11) {
      const gamma = poly([-2.273, 0.459], n);
      if (y >= gamma) return { w, p: 1e-99, n };
      y = -Math.log(gamma - y); m = poly([0.544, -0.39978, 0.025054, -6.714e-4], n); s = Math.exp(poly([1.3822, -0.77857, 0.062767, -0.0020322], n));
    } else { const xx = Math.log(n); m = poly([-1.5861, -0.31082, -0.083751, 0.0038915], xx); s = Math.exp(poly([-0.4803, -0.082676, 0.0030302], xx)); }
    const z = (y - m) / s, q = gammaQ(0.5, z * z / 2) / 2;
    pw = z >= 0 ? q : 1 - q;  /* upper tail of the normal, kept precise for tiny p */
  }
  return { w, p: pw, n };
};

/* ---- correlation ---- */
const pearson = (x, y) => {
  const n = x.length; if (n < 2) return NaN;
  const mx = meanOf(x), my = meanOf(y); let sxy = 0, sxx = 0, syy = 0;
  for (let i = 0; i < n; i++) { const a = x[i] - mx, b = y[i] - my; sxy += a * b; sxx += a * a; syy += b * b; }
  if (!(sxx > 0) || !(syy > 0)) return NaN;
  return Math.max(-1, Math.min(1, sxy / Math.sqrt(sxx * syy)));
};
const corTest = (x, y, method, alpha) => {
  const n = x.length; let r;
  if (method === 'spearman') r = pearson(rankAvg(x).r, rankAvg(y).r); else r = pearson(x, y);
  const o = { n, r };
  if (n > 2 && Number.isFinite(r)) {
    o.df = n - 2;
    if (Math.abs(r) >= 1) { o.t = r > 0 ? Infinity : -Infinity; o.p = 0; }
    else { o.t = r * Math.sqrt(o.df / (1 - r * r)); o.p = pt2(o.t, o.df); }
    if (method !== 'spearman' && n > 3) { const z = Math.atanh(r), se = 1 / Math.sqrt(n - 3), q = qnorm(1 - alpha / 2); o.lo = Math.tanh(z - q * se); o.hi = Math.tanh(z + q * se); }
  }
  return o;
};

/* ================= tests ================= */
const pAlt = (t, df, alt) => alt === 'greater' ? ptUp(t, df) : alt === 'less' ? ptLo(t, df) : pt2(t, df);
const ciAlt = (est, se, df, alpha, alt) => alt === 'greater' ? [est - tCrit(2 * alpha, df) * se, Infinity] : alt === 'less' ? [-Infinity, est + tCrit(2 * alpha, df) * se] : [est - tCrit(alpha, df) * se, est + tCrit(alpha, df) * se];
const tOne = (x, mu, alt, alpha) => {
  const n = x.length; if (n < 2) return null;
  const m = meanOf(x), sd = Math.sqrt(varOf(x, m)), se = sd / Math.sqrt(n), df = n - 1, t = (m - mu) / se;
  const ci = ciAlt(m, se, df, alpha, alt);
  return { n, mean: m, sd, se, mu, t, df, p: Number.isFinite(t) ? pAlt(t, df, alt) : NaN, diff: m - mu, lo: ci[0], hi: ci[1], d: (m - mu) / sd };
};
const tTwo = (x, y, alt, alpha) => {
  const n1 = x.length, n2 = y.length; if (n1 < 2 || n2 < 2) return null;
  const m1 = meanOf(x), m2 = meanOf(y), v1 = varOf(x, m1), v2 = varOf(y, m2), diff = m1 - m2;
  const df1 = n1 + n2 - 2, sp2 = ((n1 - 1) * v1 + (n2 - 1) * v2) / df1;
  const mk = (se, df) => { const t = diff / se, ci = ciAlt(diff, se, df, alpha, alt); return { t, df, se, p: Number.isFinite(t) ? pAlt(t, df, alt) : NaN, lo: ci[0], hi: ci[1], d: diff / Math.sqrt(sp2) }; };
  const a = v1 / n1, b = v2 / n2, seW = Math.sqrt(a + b);
  return { n1, n2, m1, m2, s1: Math.sqrt(v1), s2: Math.sqrt(v2), diff, student: mk(Math.sqrt(sp2 * (1 / n1 + 1 / n2)), df1), welch: mk(seW, (a + b) * (a + b) / (a * a / (n1 - 1) + b * b / (n2 - 1))) };
};
const tPaired = (x, y, alt, alpha) => {
  const d = new Float64Array(x.length); for (let i = 0; i < d.length; i++) d[i] = x[i] - y[i];
  const r = tOne(d, 0, alt, alpha); if (!r) return null;
  r.m1 = meanOf(x); r.m2 = meanOf(y); r.dz = r.d; return r;
};
const anova1 = (g, wantSS) => {
  const k = g.length; let N = 0, tot = 0; for (const a of g) { N += a.length; tot += sumOf(a); }
  if (k < 2 || N <= k) return null;
  const M = tot / N; let ssb = 0, ssw = 0;
  for (const a of g) { const m = meanOf(a); ssb += a.length * (m - M) * (m - M); for (let i = 0; i < a.length; i++) { const d = a[i] - m; ssw += d * d; } }
  const df1 = k - 1, df2 = N - k, msb = ssb / df1, msw = ssw / df2, F = msw > 0 ? msb / msw : (msb > 0 ? Infinity : NaN);
  return { k, N, ssb, ssw, sst: ssb + ssw, df1, df2, msb, msw, F, p: Number.isFinite(F) ? pfU(F, df1, df2) : (F === Infinity ? 0 : NaN), eta2: ssb / (ssb + ssw) };
};
const levene = g => {
  const z = g.map(a => { const m = medianOf(a); return Float64Array.from(a, v => Math.abs(v - m)); });
  const r = anova1(z); return r && { F: r.F, df1: r.df1, df2: r.df2, p: r.p };
};
const welchAnova = g => {
  const k = g.length; if (k < 2 || g.some(a => a.length < 2)) return null;
  const w = [], m = []; let W = 0;
  for (const a of g) { const v = varOf(a); if (!(v > 0)) return null; const wi = a.length / v; w.push(wi); m.push(meanOf(a)); W += wi; }
  let mt = 0; for (let i = 0; i < k; i++) mt += w[i] * m[i] / W;
  let num = 0, lam = 0;
  for (let i = 0; i < k; i++) { num += w[i] * (m[i] - mt) * (m[i] - mt); lam += (1 - w[i] / W) * (1 - w[i] / W) / (g[i].length - 1); }
  num /= (k - 1);
  const F = num / (1 + 2 * (k - 2) / (k * k - 1) * lam), df1 = k - 1, df2 = (k * k - 1) / (3 * lam);
  return { F, df1, df2, p: pfU(F, df1, df2) };
};
const tukey = (g, alpha) => {
  const a = anova1(g); if (!a || !(a.msw > 0)) return null;
  const k = g.length, ms = g.map(meanOf), qc = qtukey(1 - alpha, k, a.df2), out = [];
  for (let i = 0; i < k; i++) for (let j = i + 1; j < k; j++) {
    const se = Math.sqrt(a.msw / 2 * (1 / g[i].length + 1 / g[j].length)), diff = ms[j] - ms[i];
    out.push({ i, j, diff, lo: diff - qc * se, hi: diff + qc * se, p: Math.max(0, 1 - ptukey(Math.abs(diff) / se, k, a.df2)) });
  }
  return out;
};
/* exact null distribution of the Mann-Whitney statistic W (U of the first sample), by probability recursion */
const mwDist = (m, n) => {
  let prev = []; for (let j = 0; j <= n; j++) prev.push(Float64Array.of(1));
  for (let i = 1; i <= m; i++) {
    const cur = [Float64Array.of(1)];
    for (let j = 1; j <= n; j++) {
      const a = new Float64Array(i * j + 1), pi = i / (i + j), pj = j / (i + j), pv = prev[j], cj = cur[j - 1];
      for (let k = 0; k < pv.length; k++) a[k + j] += pi * pv[k];
      for (let k = 0; k < cj.length; k++) a[k] += pj * cj[k];
      cur.push(a);
    }
    prev = cur;
  }
  return prev[n];
};
const srDist = n => {  /* distribution of the signed-rank statistic V: counts of subset sums of 1..n, as probabilities */
  const c = new Float64Array(n * (n + 1) / 2 + 1); c[0] = 1;
  for (let i = 1; i <= n; i++) for (let k = c.length - 1; k >= i; k--) c[k] += c[k - i];
  const tot = Math.pow(2, n); for (let k = 0; k < c.length; k++) c[k] /= tot; return c;
};
const cumSum = (d, upto) => { let s = 0; for (let k = 0; k <= upto && k < d.length; k++) s += d[k]; return s; };
const pNormTwoP = z => { const q = gammaQ(0.5, z * z / 2); return Math.min(1, q); };   /* = 2 * P(Z > |z|), exact tails */
const mannWhitney = (x, y) => {
  const n1 = x.length, n2 = y.length; if (n1 < 1 || n2 < 1) return null;
  const all = new Float64Array(n1 + n2); all.set(x); all.set(y, n1);
  const { r, ties } = rankAvg(all); let r1 = 0; for (let i = 0; i < n1; i++) r1 += r[i];
  const W = r1 - n1 * (n1 + 1) / 2, N = n1 + n2, o = { n1, n2, W, meanRank1: r1 / n1, meanRank2: (sumOf(r) - r1) / n2, rbc: 2 * W / (n1 * n2) - 1 };
  if (n1 < 50 && n2 < 50 && !ties.length) {
    const d = mwDist(n1, n2); o.method = 'exact';
    const p = W > n1 * n2 / 2 ? 1 - cumSum(d, W - 1) : cumSum(d, W); o.p = Math.min(1, 2 * p);
  } else {
    const z0 = W - n1 * n2 / 2, sigma = Math.sqrt(n1 * n2 / 12 * ((N + 1) - tieSum(ties) / (N * (N - 1))));
    const z = (z0 - Math.sign(z0) * 0.5) / sigma; o.method = 'normal'; o.z = z; o.p = Number.isFinite(z) ? pNormTwoP(z) : NaN;
  }
  return o;
};
const signedRank = d0 => {
  const zeros = d0.filter(v => v === 0).length, d = Float64Array.from(d0.filter(v => v !== 0)), n = d.length; if (n < 1) return null;
  const { r, ties } = rankAvg(Float64Array.from(d, Math.abs)); let V = 0; for (let i = 0; i < n; i++) if (d[i] > 0) V += r[i];
  const o = { n, zeros, V, med: medianOf(d0) };
  if (n < 50 && !ties.length && !zeros) {
    const dist = srDist(n); o.method = 'exact';
    const p = V > n * (n + 1) / 4 ? 1 - cumSum(dist, V - 1) : cumSum(dist, V); o.p = Math.min(1, 2 * p);
  } else {
    const z0 = V - n * (n + 1) / 4, sigma = Math.sqrt(n * (n + 1) * (2 * n + 1) / 24 - tieSum(ties) / 48);
    const z = (z0 - Math.sign(z0) * 0.5) / sigma; o.method = 'normal'; o.z = z; o.p = Number.isFinite(z) ? pNormTwoP(z) : NaN;
  }
  return o;
};
const kruskal = g => {
  const k = g.length; let N = 0; for (const a of g) N += a.length; if (k < 2 || N < 2) return null;
  const all = new Float64Array(N); let o = 0; for (const a of g) { all.set(a, o); o += a.length; }
  const { r, ties } = rankAvg(all); let H = 0; o = 0; const stats = [];
  for (const a of g) { let s = 0; for (let i = 0; i < a.length; i++) s += r[o + i]; o += a.length; H += s * s / a.length; stats.push(s / a.length); }
  H = 12 / (N * (N + 1)) * H - 3 * (N + 1);
  const corr = 1 - tieSum(ties) / (N * N * N - N); H /= corr; const df = k - 1;
  return { H, df, p: Number.isFinite(H) ? pchiU(H, df) : NaN, meanRanks: stats, N };
};
const lchoose = (n, k) => lgam(n + 1) - lgam(k + 1) - lgam(n - k + 1);
const fisher2x2 = (a, b, c, d) => {
  const n1 = a + b, n2 = c + d, m1 = a + c, lo = Math.max(0, m1 - n2), hi = Math.min(m1, n1), tot = lchoose(n1 + n2, m1);
  const pm = k => Math.exp(lchoose(n1, k) + lchoose(n2, m1 - k) - tot), po = pm(a); let p = 0;
  for (let k = lo; k <= hi; k++) { const q = pm(k); if (q <= po * (1 + 1e-7)) p += q; }
  return Math.min(1, p);
};
const chiSq = obs => {
  const R = obs.length, C = obs[0].length, rs = obs.map(r => sumOf(r)), cs = Array.from({ length: C }, (_, j) => obs.reduce((s, r) => s + r[j], 0)), n = sumOf(rs);
  const exp = obs.map((r, i) => r.map((_, j) => rs[i] * cs[j] / n));
  let stat = 0, low = 0; for (let i = 0; i < R; i++) for (let j = 0; j < C; j++) { const e = exp[i][j]; if (e < 5) low++; stat += (obs[i][j] - e) * (obs[i][j] - e) / e; }
  const df = (R - 1) * (C - 1), o = { R, C, rs, cs, n, exp, stat, df, p: pchiU(stat, df), lowShare: low / (R * C), v: Math.sqrt(stat / (n * (Math.min(R, C) - 1))) };
  if (R === 2 && C === 2) {
    let ys = 0; for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) { const dd = Math.abs(obs[i][j] - exp[i][j]), y = Math.min(0.5, dd); ys += (dd - y) * (dd - y) / exp[i][j]; }
    o.yates = ys; o.pYates = pchiU(ys, 1); o.fisher = fisher2x2(obs[0][0], obs[0][1], obs[1][0], obs[1][1]);
  }
  return o;
};
/* ordinary least squares by Householder QR (columns scaled first, so collinearity is detected reliably) */
const ols = (y, xs, alpha) => {
  const n = y.length, m = xs.length + 1;
  if (n <= m) return { few: true };
  const A = [new Float64Array(n).fill(1), ...xs.map(c => Float64Array.from(c))], scale = A.map(c => Math.sqrt(sumOf(Float64Array.from(c, v => v * v))) || 1);
  A.forEach((c, j) => { for (let i = 0; i < n; i++) c[i] /= scale[j]; });
  const b = Float64Array.from(y), v = new Float64Array(n);
  for (let k = 0; k < m; k++) {
    let nrm = 0; for (let i = k; i < n; i++) nrm += A[k][i] * A[k][i]; nrm = Math.sqrt(nrm);
    if (nrm < 1e-8) return { singular: true };
    const al = A[k][k] > 0 ? -nrm : nrm; v.fill(0); for (let i = k; i < n; i++) v[i] = A[k][i]; v[k] -= al;
    let vn = 0; for (let i = k; i < n; i++) vn += v[i] * v[i];
    for (let j = k; j < m; j++) { let dot = 0; for (let i = k; i < n; i++) dot += v[i] * A[j][i]; const f = 2 * dot / vn; for (let i = k; i < n; i++) A[j][i] -= f * v[i]; }
    let dot = 0; for (let i = k; i < n; i++) dot += v[i] * b[i]; const f = 2 * dot / vn; for (let i = k; i < n; i++) b[i] -= f * v[i];
  }
  const Rm = (i, j) => A[j][i];   /* upper triangle: row i, column j (j >= i) */
  const bt = new Float64Array(m);
  for (let i = m - 1; i >= 0; i--) { let s = b[i]; for (let j = i + 1; j < m; j++) s -= Rm(i, j) * bt[j]; bt[i] = s / Rm(i, i); }
  const Ri = Array.from({ length: m }, () => new Float64Array(m));
  for (let c = 0; c < m; c++) for (let i = c; i >= 0; i--) { let s = i === c ? 1 : 0; for (let j = i + 1; j <= c; j++) s -= Rm(i, j) * Ri[j][c]; Ri[i][c] = s / Rm(i, i); }
  let rss = 0; for (let i = m; i < n; i++) rss += b[i] * b[i];
  const df = n - m, s2 = rss / df, ybar = meanOf(y); let tss = 0; for (let i = 0; i < n; i++) tss += (y[i] - ybar) * (y[i] - ybar);
  const sdy = Math.sqrt(varOf(y)), tc = tCrit(alpha, df), coef = [];
  for (let j = 0; j < m; j++) {
    let cv = 0; for (let k = j; k < m; k++) cv += Ri[j][k] * Ri[j][k];
    const est = bt[j] / scale[j], se = Math.sqrt(s2 * cv) / scale[j], t = est / se;
    coef.push({ est, se, t, p: Number.isFinite(t) ? pt2(t, df) : (est === 0 ? NaN : 0), lo: est - tc * se, hi: est + tc * se, beta: j ? est * Math.sqrt(varOf(xs[j - 1])) / sdy : NaN });
  }
  const r2 = 1 - rss / tss, F = ((tss - rss) / (m - 1)) / s2;
  return { n, df, k: m - 1, coef, r2, adj: 1 - (1 - r2) * (n - 1) / df, rse: Math.sqrt(s2), F, p: Number.isFinite(F) ? pfU(F, m - 1, df) : 0 };
};

/* ================= more tests ================= */
const normalGOF = xs => {
  const n = xs.length; if (n < 4) return null;
  const x = sortedCopy(xs), m = meanOf(x), s = Math.sqrt(varOf(x, m)); if (!(s > 0)) return null;
  const z = Array.from(x, v => (v - m) / s), o = { n };
  /* Anderson-Darling with Stephens' small-sample correction */
  let a2 = -n; for (let i = 0; i < n; i++) a2 -= (2 * i + 1) / n * (Math.log(pnorm(z[i])) + Math.log(pnorm(-z[n - 1 - i])));
  const as = a2 * (1 + 0.75 / n + 2.25 / (n * n)); let p;
  if (as >= 0.6) p = Math.exp(1.2937 - 5.709 * as + 0.0186 * as * as);
  else if (as >= 0.34) p = Math.exp(0.9177 - 4.279 * as - 1.38 * as * as);
  else if (as > 0.2) p = 1 - Math.exp(-8.318 + 42.796 * as - 59.938 * as * as);
  else p = 1 - Math.exp(-13.436 + 101.14 * as - 223.73 * as * as);
  o.ad = { a2, p: Math.min(1, Math.max(0, p)) };
  /* Lilliefors (Kolmogorov-Smirnov with estimated mean and SD), Dallal-Wilkinson approximation */
  let d = 0; for (let i = 0; i < n; i++) { const f = pnorm(z[i]); d = Math.max(d, (i + 1) / n - f, f - i / n); }
  let kd = d, nd = n; if (n > 100) { kd = d * Math.pow(n / 100, 0.49); nd = 100; }
  const pl = Math.exp(-7.01256 * kd * kd * (nd + 2.78019) + 2.99587 * kd * Math.sqrt(nd + 2.78019) - 0.122119 + 0.974598 / Math.sqrt(nd) + 1.67997 / nd);
  o.lf = { d, p: pl > 0.1 ? null : pl };
  /* Jarque-Bera */
  let m2 = 0, m3 = 0, m4 = 0; for (let i = 0; i < n; i++) { const dd = x[i] - m; m2 += dd * dd; m3 += dd * dd * dd; m4 += dd * dd * dd * dd; }
  m2 /= n; m3 /= n; m4 /= n; const sk = m3 / Math.pow(m2, 1.5), ku = m4 / (m2 * m2) - 3, jb = n / 6 * (sk * sk + ku * ku / 4);
  o.jb = { jb, p: Math.exp(-jb / 2) };
  return o;
};
const bartlett = g => {
  const k = g.length, ns = g.map(a => a.length), vs = g.map(a => varOf(a)); if (k < 2 || ns.some(n => n < 2) || vs.some(v => !(v > 0))) return null;
  const N = ns.reduce((a, b) => a + b, 0), sp = ns.reduce((s, n, i) => s + (n - 1) * vs[i], 0) / (N - k);
  const num = (N - k) * Math.log(sp) - ns.reduce((s, n, i) => s + (n - 1) * Math.log(vs[i]), 0), den = 1 + (ns.reduce((s, n) => s + 1 / (n - 1), 0) - 1 / (N - k)) / (3 * (k - 1));
  const T = num / den; return { T, df: k - 1, p: pchiU(T, k - 1) };
};
const leveneMean = g => { const z = g.map(a => { const m = meanOf(a); return Float64Array.from(a, v => Math.abs(v - m)); }); const r = anova1(z); return r && { F: r.F, df1: r.df1, df2: r.df2, p: r.p }; };
const friedman = cols => {
  const k = cols.length, n = cols[0].length; if (k < 2 || n < 2) return null;
  const rs = new Float64Array(k); let tie = 0;
  for (let i = 0; i < n; i++) { const { r, ties } = rankAvg(Float64Array.from(cols, c => c[i])); for (let j = 0; j < k; j++) rs[j] += r[j]; tie += tieSum(ties); }
  let q = 0; for (let j = 0; j < k; j++) q += rs[j] * rs[j]; q = 12 / (n * k * (k + 1)) * q - 3 * n * (k + 1);
  const den = 1 - tie / (n * k * (k * k - 1)); q /= den;
  return { chi: q, df: k - 1, p: Number.isFinite(q) ? pchiU(q, k - 1) : NaN, n, meanRanks: Array.from(rs, v => v / n), w: q / (n * (k - 1)) };
};
const binomPmfLog = (n, k, p) => lchoose(n, k) + (k ? k * Math.log(p) : 0) + (n - k ? (n - k) * Math.log1p(-p) : 0);
const binomP = (x, n, p0, alt) => {
  const cdf = (k) => { let s = 0; for (let i = 0; i <= k; i++) s += Math.exp(binomPmfLog(n, i, p0)); return Math.min(1, s); };
  if (alt === 'less') return cdf(x);
  if (alt === 'greater') { let t = 0; for (let i = x; i <= n; i++) t += Math.exp(binomPmfLog(n, i, p0)); return Math.min(1, t); }
  if (p0 === 0) return x === 0 ? 1 : 0; if (p0 === 1) return x === n ? 1 : 0;
  const po = Math.exp(binomPmfLog(n, x, p0)); let s = 0;
  for (let i = 0; i <= n; i++) { const q = Math.exp(binomPmfLog(n, i, p0)); if (q <= po * (1 + 1e-7)) s += q; }
  return Math.min(1, s);
};
const qbetaLo = (p, a, b) => { let lo = 0, hi = 1; for (let i = 0; i < 100; i++) { const m = (lo + hi) / 2; if (ibeta2(m, a, b)[0] < p) lo = m; else hi = m; } return (lo + hi) / 2; };
const binomTest = (x, n, p0, alt, alpha) => {
  const ph = x / n; let lo, hi;
  if (alt === 'greater') { lo = x === 0 ? 0 : qbetaLo(alpha, x, n - x + 1); hi = 1; }
  else if (alt === 'less') { lo = 0; hi = x === n ? 1 : qbetaLo(1 - alpha, x + 1, n - x); }
  else { lo = x === 0 ? 0 : qbetaLo(alpha / 2, x, n - x + 1); hi = x === n ? 1 : qbetaLo(1 - alpha / 2, x + 1, n - x); }
  return { n, x, ph, p: binomP(x, n, p0, alt), lo, hi };
};
const gofTest = (obs, props) => {
  const k = obs.length, n = sumOf(obs), tot = props.reduce((a, b) => a + b, 0), exp = props.map(p => p / tot * n);
  let st = 0; for (let i = 0; i < k; i++) st += (obs[i] - exp[i]) * (obs[i] - exp[i]) / exp[i];
  return { stat: st, df: k - 1, p: pchiU(st, k - 1), exp, n, low: exp.filter(e => e < 5).length / k };
};
const cronbach = cols => {
  const k = cols.length, n = cols[0].length; if (k < 2 || n < 3) return null;
  const tot = new Float64Array(n); for (const c of cols) for (let i = 0; i < n; i++) tot[i] += c[i];
  const vi = cols.map(c => varOf(c)), vt = varOf(tot); if (!(vt > 0)) return null;
  const alpha = k / (k - 1) * (1 - vi.reduce((a, b) => a + b, 0) / vt);
  let rsum = 0, cnt = 0; for (let i = 0; i < k; i++) for (let j = i + 1; j < k; j++) { rsum += pearson(cols[i], cols[j]); cnt++; }
  const rbar = rsum / cnt, items = cols.map((c, i) => {
    const rest = Float64Array.from(tot, (v, r) => v - c[r]), r = pearson(c, rest), df = n - 2;
    const vr = varOf(rest), ad = k > 2 ? (k - 1) / (k - 2) * (1 - (vi.reduce((q, w) => q + w, 0) - vi[i]) / vr) : NaN;
    const t = r * Math.sqrt(df / (1 - r * r));
    return { mean: meanOf(c), sd: Math.sqrt(vi[i]), r, p: Number.isFinite(r) ? (Math.abs(r) >= 1 ? 0 : pt2(t, df)) : NaN, ad };
  });
  return { k, n, alpha, std: k * rbar / (1 + (k - 1) * rbar), rbar, items };
};
/* design columns with sum-to-zero coding, for type III sums of squares */
const effCols = (codes, nl) => Array.from({ length: nl - 1 }, (_, j) => Float64Array.from(codes, c => c === j ? 1 : c === nl - 1 ? -1 : 0));
const rssOf = (y, cols, alpha) => { const r = cols.length ? ols(y, cols, alpha) : null; if (r) return r.few || r.singular ? r : { rss: r.rse * r.rse * r.df, df: r.df, rank: cols.length + 1 }; const m = meanOf(y); let s = 0; for (const v of y) s += (v - m) * (v - m); return { rss: s, df: y.length - 1, rank: 1 }; };
const anova2 = (y, ca, cb, la, lb, inter, alpha) => {
  const A = effCols(ca, la), B = effCols(cb, lb), AB = [];
  if (inter) for (const a of A) for (const b of B) AB.push(Float64Array.from(a, (v, i) => v * b[i]));
  const all = [...A, ...B, ...AB], full = rssOf(y, all, alpha); if (full.few || full.singular) return { bad: true };
  const terms = [['a', A], ['b', B]]; if (inter) terms.push(['ab', AB]); const out = [];
  for (const [id, cols] of terms) {
    const rest = all.filter(c => !cols.includes(c)), r = rssOf(y, rest, alpha); if (r.few || r.singular) return { bad: true };
    const ss = r.rss - full.rss, df = cols.length, ms = ss / df; out.push({ id, ss, df, ms, F: ms / (full.rss / full.df), p: pfU(ms / (full.rss / full.df), df, full.df), eta: ss / (ss + full.rss) });
  }
  const m = meanOf(y); let tss = 0; for (const v of y) tss += (v - m) * (v - m);
  return { terms: out, sse: full.rss, dfe: full.df, mse: full.rss / full.df, tss, n: y.length };
};
/* binary logistic regression by iteratively reweighted least squares */
const logit = (y, xs, alpha) => {
  const n = y.length, m = xs.length + 1; if (n <= m) return { few: true };
  const cols = [new Float64Array(n).fill(1), ...xs.map(c => Float64Array.from(c))], scale = cols.map(c => Math.sqrt(sumOf(Float64Array.from(c, v => v * v))) || 1);
  const X = cols.map((c, j) => Float64Array.from(c, v => v / scale[j]));
  let b = new Float64Array(m), dev = Infinity, cov = null, ok = false;
  const eta = new Float64Array(n), pr = new Float64Array(n);
  for (let it = 0; it < 100; it++) {
    for (let i = 0; i < n; i++) { let e = 0; for (let j = 0; j < m; j++) e += X[j][i] * b[j]; eta[i] = e; pr[i] = 1 / (1 + Math.exp(-e)); }
    let d = 0; for (let i = 0; i < n; i++) d -= 2 * (y[i] ? Math.log(Math.max(pr[i], 1e-300)) : Math.log(Math.max(1 - pr[i], 1e-300)));
    if (it > 0 && Math.abs(dev - d) < 1e-10 * (Math.abs(d) + 0.1)) { dev = d; ok = true; break; } dev = d;
    /* weighted least squares step on the working response */
    const w = new Float64Array(n), z = new Float64Array(n);
    for (let i = 0; i < n; i++) { w[i] = Math.max(pr[i] * (1 - pr[i]), 1e-10); z[i] = eta[i] + (y[i] - pr[i]) / w[i]; }
    const Xw = X.map(c => Float64Array.from(c, (v, i) => v * Math.sqrt(w[i]))), zw = Float64Array.from(z, (v, i) => v * Math.sqrt(w[i]));
    const r = qrLS(Xw, zw); if (!r) return { singular: true };
    b = r.beta; cov = r.cov;
  }
  if (!ok || !cov) return { noconv: true };
  const z = new Float64Array(n); for (let i = 0; i < n; i++) { let e = 0; for (let j = 0; j < m; j++) e += X[j][i] * b[j]; pr[i] = 1 / (1 + Math.exp(-e)); }
  const ev = sumOf(y), p0 = ev / n, d0 = -2 * (ev * Math.log(p0) + (n - ev) * Math.log(1 - p0)), qz = qnorm(1 - alpha / 2);
  const coef = []; let big = false;
  for (let j = 0; j < m; j++) { const est = b[j] / scale[j], se = Math.sqrt(cov[j][j]) / scale[j], zz = est / se; if (Math.abs(est) > 30 || !Number.isFinite(se)) big = true; coef.push({ est, se, z: zz, p: pChi1(zz), or: Math.exp(est), orLo: Math.exp(est - qz * se), orHi: Math.exp(est + qz * se) }); }
  const lr = d0 - dev, cs = 1 - Math.exp(-lr / n), nag = cs / (1 - Math.exp(-d0 / n));
  let tp = 0, tn = 0, fp = 0, fn = 0; for (let i = 0; i < n; i++) { const pred = pr[i] >= 0.5 ? 1 : 0; if (y[i] && pred) tp++; else if (!y[i] && !pred) tn++; else if (pred) fp++; else fn++; }
  return { n, ev, dev, d0, lr, df: m - 1, p: pchiU(lr, m - 1), mcf: 1 - dev / d0, cs, nag, coef, big, tp, tn, fp, fn, acc: (tp + tn) / n };
};
const pChi1 = z => gammaQ(0.5, z * z / 2);
/* least squares on pre-scaled columns; returns coefficients and the inverse of X'X */
const qrLS = (cols, y) => {
  const n = y.length, m = cols.length, A = cols.map(c => Float64Array.from(c)), b = Float64Array.from(y), v = new Float64Array(n);
  for (let k = 0; k < m; k++) {
    let nrm = 0; for (let i = k; i < n; i++) nrm += A[k][i] * A[k][i]; nrm = Math.sqrt(nrm); if (nrm < 1e-12) return null;
    const al = A[k][k] > 0 ? -nrm : nrm; v.fill(0); for (let i = k; i < n; i++) v[i] = A[k][i]; v[k] -= al;
    let vn = 0; for (let i = k; i < n; i++) vn += v[i] * v[i]; if (!(vn > 0)) continue;
    for (let j = k; j < m; j++) { let dot = 0; for (let i = k; i < n; i++) dot += v[i] * A[j][i]; const f = 2 * dot / vn; for (let i = k; i < n; i++) A[j][i] -= f * v[i]; }
    let dot = 0; for (let i = k; i < n; i++) dot += v[i] * b[i]; const f = 2 * dot / vn; for (let i = k; i < n; i++) b[i] -= f * v[i];
  }
  const Rm = (i, j) => A[j][i], beta = new Float64Array(m);
  for (let i = m - 1; i >= 0; i--) { let s = b[i]; for (let j = i + 1; j < m; j++) s -= Rm(i, j) * beta[j]; if (Math.abs(Rm(i, i)) < 1e-12) return null; beta[i] = s / Rm(i, i); }
  const Ri = Array.from({ length: m }, () => new Float64Array(m));
  for (let c = 0; c < m; c++) for (let i = c; i >= 0; i--) { let s = i === c ? 1 : 0; for (let j = i + 1; j <= c; j++) s -= Rm(i, j) * Ri[j][c]; Ri[i][c] = s / Rm(i, i); }
  const cov = Array.from({ length: m }, () => new Float64Array(m));
  for (let i = 0; i < m; i++) for (let j = 0; j < m; j++) { let s = 0; for (let k = Math.max(i, j); k < m; k++) s += Ri[i][k] * Ri[j][k]; cov[i][j] = s; }
  return { beta, cov };
};
/* descriptive extras */
const extraDesc = (x, d) => {
  const n = x.length, o = {}; if (!n) return o;
  const s = sortedCopy(x);
  o.gmean = s[0] > 0 ? Math.exp(sumOf(Float64Array.from(s, Math.log)) / n) : NaN;
  o.hmean = s[0] > 0 ? n / sumOf(Float64Array.from(s, v => 1 / v)) : NaN;
  const cut = Math.floor(0.05 * n); o.tmean = meanOf(s.subarray(cut, n - cut));
  const med = d.median; o.mad = quant(sortedCopy(Float64Array.from(s, v => Math.abs(v - med))), 0.5);
  o.ssq = sumOf(Float64Array.from(s, v => v * v));
  if (n > 2) o.sess = Math.sqrt(6 * n * (n - 1) / ((n - 2) * (n + 1) * (n + 3)));
  if (n > 3) o.sek = 2 * Math.sqrt(6 * n * (n - 1) / ((n - 2) * (n + 1) * (n + 3))) * Math.sqrt((n * n - 1) / ((n - 3) * (n + 5)));
  const lo = d.q1 - 1.5 * d.iqr, hi = d.q3 + 1.5 * d.iqr; o.outl = s.filter(v => v < lo || v > hi).length;
  return o;
};

/* ================= reading data: xlsx (zip + xml), csv, pasted text ================= */
const LIM = { rows: 100000, cols: 200, cells: 2000000, bytes: 15 * 1024 * 1024, chars: 8000000 };
const fail = k => { const e = new Error(k); e.k = k; throw e; };
const u16 = (b, o) => b[o] | b[o + 1] << 8, u32 = (b, o) => (b[o] | b[o + 1] << 8 | b[o + 2] << 16 | b[o + 3] << 24) >>> 0;
const utf8 = b => new TextDecoder('utf-8').decode(b);
/* small inflate (RFC 1951) used when the browser has no native DecompressionStream('deflate-raw') */
const LBASE = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258], LEXT = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0];
const DBASE = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577], DEXT = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
const CLORD = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
const huff = lens => {
  const count = new Uint16Array(16), symbol = new Uint16Array(lens.length), offs = new Uint16Array(16);
  for (let i = 0; i < lens.length; i++) count[lens[i]]++;
  for (let i = 1; i < 15; i++) offs[i + 1] = offs[i] + count[i];
  for (let s = 0; s < lens.length; s++) if (lens[s]) symbol[offs[lens[s]]++] = s;
  return { count, symbol };
};
let FIXED = null;
const inflateJS = (src, size) => {
  let out = new Uint8Array(size || src.length * 4), op = 0, pos = 0, bb = 0, bc = 0;
  const bits = n => { while (bc < n) { if (pos >= src.length) fail('s_e_zip'); bb |= src[pos++] << bc; bc += 8; } const v = bb & ((1 << n) - 1); bb >>>= n; bc -= n; return v; };
  const dec = h => { let code = 0, first = 0, index = 0; for (let len = 1; len <= 15; len++) { code |= bits(1); const c = h.count[len]; if (code - c < first) return h.symbol[index + (code - first)]; index += c; first += c; first <<= 1; code <<= 1; } return fail('s_e_zip'); };
  const put = v => { if (op >= out.length) { const n = new Uint8Array(out.length * 2); n.set(out); out = n; } out[op++] = v; };
  for (let last = 0; !last;) {
    last = bits(1); const type = bits(2);
    if (type === 0) {
      bb = 0; bc = 0; const len = src[pos] | src[pos + 1] << 8; pos += 4;
      if (pos + len > src.length) fail('s_e_zip');
      for (let i = 0; i < len; i++) put(src[pos++]);
    } else if (type === 1 || type === 2) {
      let lh, dh;
      if (type === 1) {
        if (!FIXED) { const l = new Uint8Array(288); l.fill(8, 0, 144); l.fill(9, 144, 256); l.fill(7, 256, 280); l.fill(8, 280, 288); FIXED = [huff(l), huff(new Uint8Array(30).fill(5))]; }
        [lh, dh] = FIXED;
      } else {
        const nl = bits(5) + 257, nd = bits(5) + 1, nc = bits(4) + 4, lens = new Uint8Array(19);
        for (let i = 0; i < nc; i++) lens[CLORD[i]] = bits(3);
        const ch = huff(lens), all = new Uint8Array(nl + nd);
        for (let i = 0; i < nl + nd;) {
          const s = dec(ch);
          if (s < 16) all[i++] = s;
          else { let prev = 0, rep; if (s === 16) { if (!i) fail('s_e_zip'); prev = all[i - 1]; rep = 3 + bits(2); } else if (s === 17) rep = 3 + bits(3); else rep = 11 + bits(7); if (i + rep > nl + nd) fail('s_e_zip'); while (rep--) all[i++] = prev; }
        }
        lh = huff(all.subarray(0, nl)); dh = huff(all.subarray(nl));
      }
      for (;;) {
        const s = dec(lh);
        if (s < 256) put(s);
        else if (s === 256) break;
        else {
          const si = s - 257; if (si >= 29) fail('s_e_zip');
          const len = LBASE[si] + bits(LEXT[si]), ds = dec(dh); if (ds >= 30) fail('s_e_zip');
          const dist = DBASE[ds] + bits(DEXT[ds]); if (dist > op) fail('s_e_zip');
          for (let i = 0; i < len; i++) put(out[op - dist]);
        }
      }
    } else fail('s_e_zip');
  }
  return out.subarray(0, op);
};
const inflate = async (src, size) => {
  if (typeof DecompressionStream === 'function' && typeof Response === 'function') {
    try {
      const ds = new DecompressionStream('deflate-raw'), w = ds.writable.getWriter();
      w.write(src).catch(() => {}); w.close().catch(() => {});
      return new Uint8Array(await new Response(ds.readable).arrayBuffer());
    } catch (e) { /* fall back to the built-in decoder */ }
  }
  return inflateJS(src, size);
};
const zipOpen = bytes => {
  let e = -1;
  for (let i = bytes.length - 22; i >= Math.max(0, bytes.length - 65558); i--) if (u32(bytes, i) === 0x06054b50) { e = i; break; }
  if (e < 0) fail('s_e_zip');
  const n = u16(bytes, e + 10); let p = u32(bytes, e + 16); const map = new Map();
  for (let i = 0; i < n; i++) {
    if (u32(bytes, p) !== 0x02014b50) fail('s_e_zip');
    const flags = u16(bytes, p + 8), method = u16(bytes, p + 10), cs = u32(bytes, p + 20), us = u32(bytes, p + 24), nl = u16(bytes, p + 28), el = u16(bytes, p + 30), cl = u16(bytes, p + 32), off = u32(bytes, p + 42);
    map.set(utf8(bytes.subarray(p + 46, p + 46 + nl)).replace(/\\/g, '/'), { flags, method, cs, us, off });
    p += 46 + nl + el + cl;
  }
  return {
    has: name => map.has(name),
    names: () => [...map.keys()],
    read: async name => {
      const z = map.get(name); if (!z) return null;
      if (z.flags & 1 || z.cs === 0xffffffff || z.us === 0xffffffff) fail('s_e_zip');
      if (u32(bytes, z.off) !== 0x04034b50) fail('s_e_zip');
      const s = z.off + 30 + u16(bytes, z.off + 26) + u16(bytes, z.off + 28), data = bytes.subarray(s, s + z.cs);
      if (z.method === 0) return data;
      if (z.method === 8) return inflate(data, z.us);
      return fail('s_e_zip');
    }
  };
};
const unesc = s => (s.indexOf('&') < 0 && s.indexOf('_x') < 0) ? s : s.replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos);/gi, (m, e) => {
  const l = e.toLowerCase();
  if (l === 'amp') return '&'; if (l === 'lt') return '<'; if (l === 'gt') return '>'; if (l === 'quot') return '"'; if (l === 'apos') return "'";
  const c = l[1] === 'x' ? parseInt(l.slice(2), 16) : parseInt(l.slice(1), 10);
  return c > 0 && c < 0x110000 ? String.fromCodePoint(c) : '';
}).replace(/_x([0-9a-f]{4})_/gi, (m, h) => String.fromCharCode(parseInt(h, 16)));
const attrs = s => { const o = {}; s.replace(/([\w:.-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g, (m, k, a, b) => { o[k] = a !== undefined ? a : b; return ''; }); return o; };
const colIdx = s => { let n = 0; for (let i = 0; i < s.length; i++) n = n * 26 + s.charCodeAt(i) - 64; return n - 1; };
const colName = i => { let s = ''; for (i++; i > 0; i = Math.floor((i - 1) / 26)) s = String.fromCharCode(65 + (i - 1) % 26) + s; return s; };
const parseSST = xml => {
  const out = [], re = /<(?:\w+:)?si\b[^>]*?(?:\/>|>([\s\S]*?)<\/(?:\w+:)?si>)/g; let m;
  while ((m = re.exec(xml))) {
    const inner = (m[1] || '').replace(/<(?:\w+:)?rPh\b[\s\S]*?<\/(?:\w+:)?rPh>/g, ''); let s = '';
    inner.replace(/<(?:\w+:)?t\b[^>]*?(?:\/>|>([\s\S]*?)<\/(?:\w+:)?t>)/g, (mm, t) => { s += t || ''; return ''; });
    out.push(unesc(s));
  }
  return out;
};
const isDateCode = code => { const c = code.replace(/"[^"]*"|\[[^\]]*\]|\\./g, ''); return /[dmyhs]/i.test(c) && !/^general$/i.test(c.trim()); };
const parseStyles = xml => {
  const custom = {}; xml.replace(/<numFmt\b([^>]*?)\/?>/g, (m, a) => { const t = attrs(a); custom[t.numFmtId] = unesc(t.formatCode || ''); return ''; });
  const dates = [], cx = /<cellXfs\b[^>]*>([\s\S]*?)<\/cellXfs>/.exec(xml);
  if (cx) cx[1].replace(/<xf\b([^>]*?)\/?>/g, (m, a) => {
    const id = +(attrs(a).numFmtId || 0);
    dates.push((id >= 14 && id <= 22) || (id >= 27 && id <= 36) || (id >= 45 && id <= 47) || (id >= 50 && id <= 58) || (custom[id] !== undefined && isDateCode(custom[id])));
    return '';
  });
  return dates;
};
const serialToText = (s, d1904) => {
  const t = new Date((d1904 ? Date.UTC(1904, 0, 1) : Date.UTC(1899, 11, 30)) + Math.round(s * 86400000)), p = n => String(n).padStart(2, '0');
  const dt = `${t.getUTCFullYear()}-${p(t.getUTCMonth() + 1)}-${p(t.getUTCDate())}`, tm = `${p(t.getUTCHours())}:${p(t.getUTCMinutes())}:${p(t.getUTCSeconds())}`;
  return s >= 0 && s < 1 ? tm : (Math.abs(s - Math.round(s)) < 1e-9 ? dt : dt + ' ' + tm);
};
const parseSheet = (xml, sst, dateXf, d1904) => {
  const rows = [], re = /<(?:\w+:)?row\b([^>]*?)\/?>|<(?:\w+:)?c\b([^>]*?)(?:\/>|>([\s\S]*?)<\/(?:\w+:)?c>)/g; let m, r = -1, col = 0, cells = 0;
  while ((m = re.exec(xml))) {
    if (m[1] !== undefined) { const a = attrs(m[1]); r = a.r ? +a.r - 1 : r + 1; col = 0; if (r >= LIM.rows + 1) fail('s_e_big'); continue; }
    const a = attrs(m[2]); let ci = col;
    if (a.r) { const mm = /^([A-Za-z]+)(\d+)$/.exec(a.r); if (mm) { ci = colIdx(mm[1].toUpperCase()); if (!m[1] && !rows[+mm[2] - 1]) r = +mm[2] - 1; } }
    col = ci + 1;
    if (ci >= LIM.cols) { if (m[3] && /<v>|<is>/.test(m[3])) fail('s_e_big'); continue; }
    const inner = m[3] || ''; let v = null; const t = a.t || 'n';
    const vm = /<(?:\w+:)?v>([\s\S]*?)<\/(?:\w+:)?v>/.exec(inner);
    if (t === 's') v = vm ? (sst[+vm[1]] ?? null) : null;
    else if (t === 'inlineStr') { let s = ''; inner.replace(/<(?:\w+:)?t\b[^>]*?(?:\/>|>([\s\S]*?)<\/(?:\w+:)?t>)/g, (mm, x) => { s += x || ''; return ''; }); v = unesc(s); }
    else if (t === 'str' || t === 'd') v = vm ? unesc(vm[1]) : null;
    else if (t === 'b') v = vm ? (vm[1].trim() === '1' ? 'TRUE' : 'FALSE') : null;
    else if (t === 'e') v = null;
    else if (vm && vm[1].trim() !== '') { const x = Number(vm[1]); v = Number.isFinite(x) ? (dateXf[+(a.s || 0)] ? serialToText(x, d1904) : x) : null; }
    if (v === null || v === '') continue;
    if (++cells > LIM.cells) fail('s_e_big');
    (rows[r] || (rows[r] = []))[ci] = v;
  }
  return rows;
};
const trimGrid = rows => {
  let c0 = Infinity, c1 = -1; const out = [];
  for (const r of rows) { if (!r) continue; let any = false; for (let j = 0; j < r.length; j++) if (r[j] !== undefined && r[j] !== null) { any = true; if (j < c0) c0 = j; if (j > c1) c1 = j; } if (any) out.push(r); }
  if (!out.length) return [];
  if (out.length > LIM.rows + 1) fail('s_e_big');
  return out.map(r => { const o = new Array(c1 - c0 + 1); for (let j = c0; j <= c1; j++) { const v = r[j]; o[j - c0] = v === undefined ? null : v; } return o; });
};
const openXlsx = async bytes => {
  const z = zipOpen(bytes);
  if (!z.has('xl/workbook.xml')) fail('s_e_zip');
  const text = async n => { const b = await z.read(n); return b ? utf8(b) : ''; };
  const wb = await text('xl/workbook.xml'), rels = await text('xl/_rels/workbook.xml.rels'), relMap = {};
  rels.replace(/<Relationship\b([^>]*?)\/?>/g, (m, a) => { const t = attrs(a); if (/\/worksheet$/.test(t.Type || '')) relMap[t.Id] = t.Target; return ''; });
  const sheets = [];
  wb.replace(/<(?:\w+:)?sheet\b([^>]*?)\/?>/g, (m, a) => {
    const t = attrs(a), rid = t['r:id'] || t.id, tg = relMap[rid]; if (!tg) return '';
    const path = tg.charAt(0) === '/' ? tg.slice(1) : 'xl/' + tg.replace(/^\.\//, '');
    sheets.push({ name: unesc(t.name || ''), path }); return '';
  });
  if (!sheets.length) fail('s_e_empty');
  const d1904 = /<workbookPr\b[^>]*date1904\s*=\s*"(?:1|true)"/i.test(wb);
  let sst = null, dates = null;
  return {
    names: sheets.map(s => s.name),
    sheet: async i => {
      if (sst === null) { sst = parseSST(await text('xl/sharedStrings.xml')); dates = parseStyles(await text('xl/styles.xml')); }
      const b = await z.read(sheets[i].path); if (!b) fail('s_e_zip');
      return trimGrid(parseSheet(utf8(b), sst, dates, d1904));
    }
  };
};
/* ---- writing .xlsx (stored zip, inline strings: no compression library needed) ---- */
const CRC = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
const crc32 = b => { let c = 0xFFFFFFFF; for (let i = 0; i < b.length; i++) c = CRC[(c ^ b[i]) & 255] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; };
const zipStore = files => {
  const enc = new TextEncoder(), now = new Date(), dt = ((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate(), tm = (now.getHours() << 11) | (now.getMinutes() << 5) | (now.getSeconds() >> 1);
  const parts = [], cen = []; let off = 0;
  const w16 = (a, v) => a.push(v & 255, (v >>> 8) & 255), w32 = (a, v) => a.push(v & 255, (v >>> 8) & 255, (v >>> 16) & 255, (v >>> 24) & 255);
  for (const f of files) {
    const nm = enc.encode(f.name), data = enc.encode(f.data), crc = crc32(data), h = [];
    w32(h, 0x04034b50); w16(h, 20); w16(h, 0x0800); w16(h, 0); w16(h, tm); w16(h, dt); w32(h, crc); w32(h, data.length); w32(h, data.length); w16(h, nm.length); w16(h, 0);
    parts.push(Uint8Array.from(h), nm, data);
    const c = []; w32(c, 0x02014b50); w16(c, 20); w16(c, 20); w16(c, 0x0800); w16(c, 0); w16(c, tm); w16(c, dt); w32(c, crc); w32(c, data.length); w32(c, data.length); w16(c, nm.length); w16(c, 0); w16(c, 0); w16(c, 0); w16(c, 0); w32(c, 0); w32(c, off);
    cen.push(Uint8Array.from(c), nm);
    off += h.length + nm.length + data.length;
  }
  let cl = 0; for (const c of cen) cl += c.length;
  const e = []; w32(e, 0x06054b50); w16(e, 0); w16(e, 0); w16(e, files.length); w16(e, files.length); w32(e, cl); w32(e, off); w16(e, 0);
  return new Blob([...parts, ...cen, Uint8Array.from(e)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
};
const xmlEsc = s => String(s).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
/* sheets: [{ name, rows: [[cell...]], boldRows: Set }]; a cell is a number, a string, or null */
const buildXlsx = sheets => {
  const NS = 'http://schemas.openxmlformats.org/spreadsheetml/2006/main', RN = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships', PR = 'http://schemas.openxmlformats.org/package/2006/relationships';
  const files = [
    { name: '[Content_Types].xml', data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>${sheets.map((s, i) => `<Override PartName="/xl/worksheets/sheet${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join('')}</Types>` },
    { name: '_rels/.rels', data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="${PR}"><Relationship Id="rId1" Type="${RN}/officeDocument" Target="xl/workbook.xml"/></Relationships>` },
    { name: 'xl/workbook.xml', data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="${NS}" xmlns:r="${RN}"><sheets>${sheets.map((s, i) => `<sheet name="${xmlEsc(s.name)}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`).join('')}</sheets></workbook>` },
    { name: 'xl/_rels/workbook.xml.rels', data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="${PR}">${sheets.map((s, i) => `<Relationship Id="rId${i + 1}" Type="${RN}/worksheet" Target="worksheets/sheet${i + 1}.xml"/>`).join('')}<Relationship Id="rId${sheets.length + 1}" Type="${RN}/styles" Target="styles.xml"/></Relationships>` },
    { name: 'xl/styles.xml', data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="${NS}"><fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font></fonts><fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="2"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>` }
  ];
  sheets.forEach((s, i) => {
    let x = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="${NS}"><cols><col min="1" max="1" width="32" customWidth="1"/><col min="2" max="30" width="16" customWidth="1"/></cols><sheetData>`;
    s.rows.forEach((r, ri) => {
      const st = s.bold && s.bold.has(ri) ? ' s="1"' : '';
      x += `<row r="${ri + 1}">`;
      r.forEach((c, ci) => {
        if (c === null || c === undefined || c === '' || (typeof c === 'number' && !Number.isFinite(c))) return;
        const ref = colName(ci) + (ri + 1);
        x += typeof c === 'number' ? `<c r="${ref}"${st}><v>${c}</v></c>` : `<c r="${ref}"${st} t="inlineStr"><is><t xml:space="preserve">${xmlEsc(c)}</t></is></c>`;
      });
      x += '</row>';
    });
    files.push({ name: `xl/worksheets/sheet${i + 1}.xml`, data: x + '</sheetData></worksheet>' });
  });
  return zipStore(files);
};

/* ---- numbers and text tables ---- */
const normDigits = s => s.replace(/[\u0660-\u0669\u06f0-\u06f9\u0966-\u096f]/g, c => { const k = c.charCodeAt(0); return String(k >= 0x966 ? k - 0x966 : k >= 0x6f0 ? k - 0x6f0 : k - 0x660); });
const RX_DOT = /^[+-]?(?:(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?|\.\d+)(?:e[+-]?\d+)?$/i, RX_COM = /^[+-]?(?:(?:\d{1,3}(?:\.\d{3})+|\d+)(?:,\d+)?|,\d+)(?:e[+-]?\d+)?$/i;
const parseNumber = (s, dm) => {
  s = normDigits(String(s)).replace(/\u2212/g, '-').replace(/\u066b/g, dm).replace(/\u066c/g, dm === ',' ? '.' : ',').trim();
  s = s.replace(/^([+-]?\d{1,3})((?:[\s\u00a0\u202f]\d{3})+)((?:[.,]\d+)?)$/, (m, a, b, c) => a + b.replace(/[\s\u00a0\u202f]/g, '') + c);
  if (!(dm === ',' ? RX_COM : RX_DOT).test(s)) return NaN;
  return Number(dm === ',' ? s.replace(/\./g, '').replace(',', '.') : s.replace(/,/g, ''));
};
const NA_RX = /^(?:|na|n\/a|nan|null|none|-|--|\u2013|\u2014|#(?:n\/a|div\/0!|value!|ref!|name\?|num!|null!))$/i;
const isNA = s => NA_RX.test(String(s).trim());
const defDec = lang => lang === 'id' || lang === 'es' || lang === 'pt' ? ',' : '.';
const detectDec = (rows, hdr, lang) => {
  let dot = 0, com = 0;
  for (let i = hdr ? 1 : 0; i < rows.length && i < 3000; i++) for (const c of rows[i]) {
    if (typeof c !== 'string') continue; const s = normDigits(c.trim());
    if (/^[+-]?\d{1,3}(?:,\d{3})+\.\d+$/.test(s)) dot += 2; else if (/^[+-]?\d{1,3}(?:\.\d{3})+,\d+$/.test(s)) com += 2;
    else if (/^[+-]?\d*\.\d+$/.test(s) && !/^\d{1,3}\.\d{3}$/.test(s)) dot++; else if (/^[+-]?\d*,\d+$/.test(s) && !/^\d{1,3},\d{3}$/.test(s)) com++;
  }
  return dot > com ? '.' : com > dot ? ',' : defDec(lang);
};
const parseText = (text, dm) => {
  if (text.length > LIM.chars) fail('s_e_big');
  text = text.replace(/^\uFEFF/, '');
  const lines = text.split(/\r\n|\n|\r/), first = lines.find(l => l.trim() !== '') || '', cnt = c => first.split(c).length - 1;
  let sep = null;
  if (cnt('\t')) sep = '\t'; else if (cnt(';')) sep = ';'; else if (dm !== ',' && cnt(',')) sep = ',';
  else { const w = lines.filter(l => l.trim()).map(l => l.trim().split(/\s+/).length); if (w.length && w[0] > 1 && w.every(v => v === w[0])) sep = 'ws'; }
  const rows = [];
  if (sep === null || sep === 'ws') for (const l of lines) { if (l.trim()) rows.push(sep ? l.trim().split(/\s+/) : [l.trim()]); }
  else {
    let w = [], f = '', q = false;
    const endRow = () => { w.push(f.trim()); f = ''; if (w.some(x => x !== '')) rows.push(w); w = []; };
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (q) { if (c === '"') { if (text[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += c; }
      else if (c === '"' && f.trim() === '') { q = true; f = ''; }
      else if (c === sep) { w.push(f.trim()); f = ''; }
      else if (c === '\n' || c === '\r') { if (c === '\r' && text[i + 1] === '\n') i++; endRow(); }
      else f += c;
      if (rows.length > LIM.rows + 1) fail('s_e_big');
    }
    if (f !== '' || w.length) endRow();
  }
  return rows;
};
/* ---- data set: columns with detected type (numeric / category) ---- */
const toNum = (c, dm) => c === null || c === undefined ? NaN : typeof c === 'number' ? c : (isNA(c) ? NaN : parseNumber(c, dm));
const toCat = c => { if (c === null || c === undefined) return null; if (typeof c === 'number') return String(+c.toPrecision(15)); const s = String(c).trim(); return isNA(s) ? null : s; };
const fillCol = (col, kind, dm) => {
  col.kind = kind; const n = col.raw.length;
  col.num = new Float64Array(n); col.cat = new Array(n); let ok = 0, miss = 0, skip = 0;
  for (let i = 0; i < n; i++) {
    const c = col.raw[i], cs = toCat(c);
    col.cat[i] = cs;
    if (cs === null) { col.num[i] = NaN; miss++; continue; }
    const v = toNum(c, dm); col.num[i] = v;
    if (kind === 'num') { if (Number.isFinite(v)) ok++; else { skip++; miss++; } } else ok++;
  }
  col.valid = ok; col.miss = miss; col.skipped = skip;
};
const buildData = (rows, header, dmOpt, lang) => {
  if (!rows.length) fail('s_e_empty');
  let width = 0; for (const r of rows) if (r.length > width) width = r.length;
  if (width > LIM.cols || rows.length * width > LIM.cells) fail('s_e_big');
  const dm = dmOpt === 'auto' ? detectDec(rows, header, lang) : dmOpt, body = header ? rows.slice(1) : rows;
  if (!body.length || !width) fail('s_e_empty');
  const seen = new Map(), cols = [];
  for (let j = 0; j < width; j++) {
    let nm = header && rows[0][j] !== null && rows[0][j] !== undefined ? String(rows[0][j]).trim() : ''; if (!nm) nm = 'V' + (j + 1);
    const k = seen.get(nm) || 0; seen.set(nm, k + 1); if (k) nm += '_' + (k + 1);
    const raw = new Array(body.length); for (let i = 0; i < body.length; i++) raw[i] = body[i][j] === undefined ? null : body[i][j];
    const col = { name: nm, raw }; fillCol(col, 'num', dm);
    const nonMissing = body.length - col.miss;
    if (!(col.skipped === 0 && nonMissing > 0)) fillCol(col, 'cat', dm);
    col.auto = col.kind; cols.push(col);
  }
  return { cols, n: body.length, dm };
};
core.parseText = parseText; core.buildData = buildData; core.parseNumber = parseNumber; core.openXlsx = openXlsx; core.buildXlsx = buildXlsx; core.inflateJS = inflateJS; core.zipOpen = zipOpen; core.fillCol = fillCol; core.detectDec = detectDec;

/* ================= analyses: build result tables ================= */
let I = {};
const ui = (k, v) => { let s = I[k] || k; if (v) for (const x in v) s = s.split('{' + x + '}').join(v[x]); return s; };
core.setLabels = o => { I = o; };
const P = v => ({ p: v }), G = v => ({ g: v }), MD = v => ({ m: v });
const fmtNum = (x, dg, dm) => {
  if (x === null || x === undefined || Number.isNaN(x)) return '—';
  if (x === Infinity) return '∞'; if (x === -Infinity) return '−∞';
  const a = Math.abs(x); let s = x !== 0 && (a < Math.pow(10, -dg) || a >= 1e15) ? x.toExponential(Math.max(1, dg - 1)) : x.toFixed(dg);
  if (/^-0(\.0+)?$/.test(s)) s = s.slice(1);
  return dm === ',' ? s.replace('.', ',') : s;
};
const fmtP = (p, dm) => { if (!Number.isFinite(p)) return '—'; const s = p < 2.2e-16 ? '< 2.2e-16' : p < 1e-4 ? p.toExponential(2) : p.toFixed(4); return dm === ',' ? s.replace('.', ',') : s; };
const plain = (x, dm) => { const s = String(+x.toPrecision(12)); return dm === ',' ? s.replace('.', ',') : s; };
const cellText = (c, f) => c === null || c === undefined ? '—' : typeof c === 'string' ? c : typeof c === 'number' ? fmtNum(c, f.dg, f.dm)
  : c.p !== undefined ? fmtP(c.p, f.dm) : c.g !== undefined ? (Number.isInteger(c.g) ? String(c.g) : fmtNum(c.g, f.dg, f.dm)) : c.m ? (c.m.length ? c.m.slice(0, 5).map(v => plain(v, f.dm)).join('; ') + (c.m.length > 5 ? '…' : '') : '—') : '—';
const cellRaw = (c, f) => c === null || c === undefined ? null : typeof c === 'string' ? c : typeof c === 'number' ? c : c.p !== undefined ? c.p : c.g !== undefined ? c.g : c.m ? (c.m.length ? c.m.map(v => plain(v, f.dm)).join('; ') : null) : null;
const STATS = [['n', 's_sn'], ['miss', 's_sm'], ['sum', 's_ssum'], ['ssq', 's_ssq'], ['mean', 's_mean'], ['gmean', 's_gmean'], ['hmean', 's_hmean'], ['tmean', 's_tmean'], ['se', 's_sem'], ['ci', 's_ci'], ['median', 's_med'], ['mode', 's_mode'], ['min', 's_min'], ['max', 's_max'], ['range', 's_rng'], ['q1', 's_q1'], ['q3', 's_q3'], ['iqr', 's_iqr'], ['mad', 's_mad'], ['outl', 's_outl'], ['var', 's_var'], ['sd', 's_sd'], ['varp', 's_varp'], ['sdp', 's_sdp'], ['cv', 's_cv'], ['skew', 's_skew'], ['sess', 's_sess'], ['kurt', 's_kurt'], ['sek', 's_sek']];
const DEF_STATS = ['n', 'miss', 'mean', 'median', 'sd', 'min', 'max'];
const lvlPct = a => plain(Math.round((1 - a) * 10000) / 100, '.');
const sigTxt = (p, a) => Number.isFinite(p) ? (p < a ? ui('s_sg') : ui('s_ns')) : null;
const finite = (col) => { const o = []; for (let i = 0; i < col.num.length; i++) if (Number.isFinite(col.num[i])) o.push(col.num[i]); return Float64Array.from(o); };
const pairsOf = (a, b) => { const x = [], y = []; for (let i = 0; i < a.num.length; i++) if (Number.isFinite(a.num[i]) && Number.isFinite(b.num[i])) { x.push(a.num[i]); y.push(b.num[i]); } return [Float64Array.from(x), Float64Array.from(y)]; };
const lenient = (t, dm) => { const v = parseNumber(t, dm); return Number.isFinite(v) ? v : parseNumber(t, dm === ',' ? '.' : ','); };
const need = (ok, k = 's_e_need') => { if (!ok) fail(k); };
const levelsOf = (D, vals, lang) => {
  const arr = [...new Set(vals)], nums = arr.map(s => parseNumber(s, D.dm));
  if (arr.length && nums.every(Number.isFinite)) return arr.map((s, i) => [s, nums[i]]).sort((a, b) => a[1] - b[1]).map(x => x[0]);
  return arr.sort((a, b) => a.localeCompare(b, lang, { numeric: true, sensitivity: 'base' }));
};
const splitBy = (D, dep, grp, lang) => {
  const keep = [], vals = [];
  for (let i = 0; i < D.n; i++) { const g = grp.cat[i]; if (g !== null && Number.isFinite(dep.num[i])) { keep.push(i); vals.push(g); } }
  const levels = levelsOf(D, vals, lang), idx = new Map(levels.map((l, i) => [l, i])), arr = levels.map(() => []);
  keep.forEach((r, j) => arr[idx.get(vals[j])].push(dep.num[r]));
  return { levels, groups: arr.map(a => Float64Array.from(a)) };
};
const altKey = a => a === 'greater' ? 's_altg' : a === 'less' ? 's_altl' : 's_alt2';
const vert = rows => ({ head: [ui('s_stat'), ui('s_value')], rows });
const tbl = (cap, head, rows, foot) => ({ cap, head, rows, foot: foot || [] });
const A = {};
const pctList = (txt, dm) => { const out = []; for (const t of String(txt || '').split(/[\s,;]+/)) { if (!t) continue; const v = parseNumber(t, dm); if (Number.isFinite(v) && v >= 0 && v <= 100 && !out.includes(v)) out.push(v); } return out.slice(0, 12); };
const descRows = (x, miss, o, pcts) => {
  const d = describe(x, o.alpha), e = d.n ? extraDesc(x, d) : {}, lv = lvlPct(o.alpha), rows = [], s = d.n ? sortedCopy(x) : null;
  const g = k => d.n ? (k in d ? d[k] : e[k]) : NaN;
  for (const [k, key] of STATS) {
    if (!o.stats.has(k)) continue;
    if (k === 'n') rows.push([ui(key), G(d.n)]); else if (k === 'miss') rows.push([ui(key), G(miss)]);
    else if (k === 'mode') rows.push([ui(key), MD(d.modes || [])]);
    else if (k === 'outl') rows.push([ui(key), d.n ? G(e.outl) : null]);
    else if (k === 'ci') { rows.push([ui('s_cil', { l: lv }), d.ciLo ?? NaN]); rows.push([ui('s_cih', { l: lv }), d.ciHi ?? NaN]); }
    else rows.push([ui(key), g(k) ?? NaN]);
  }
  for (const p of pcts) rows.push(['P' + plain(p, '.'), s ? quant(s, p / 100) : NaN]);
  return rows;
};
A.desc = (D, o, X) => {
  const cols = o.vars.map(i => D.cols[i]).filter(c => c.kind === 'num'), pcts = pctList(o.pct, D.dm); need(cols.length, 's_e_vars'); need(o.stats.size || pcts.length, 's_e_stats');
  const grp = o.g >= 0 && D.cols[o.g] ? D.cols[o.g] : null, foot = ['q1', 'q3', 'iqr', 'skew', 'kurt', 'mad', 'outl'].some(k => o.stats.has(k)) || pcts.length ? [ui('s_n_desc')] : [];
  const flip = (head, rows, labels, firstHead) => { if (!o.tr) return [head, rows]; return [[firstHead, ...rows.map(r => r[0])], labels.map((l, j) => [l, ...rows.map(r => r[j + 1])])]; };
  if (!grp) {
    const rs = cols.map(c => descRows(finite(c), c.miss, o, pcts)), rows = rs[0].map((r, i) => [r[0], ...rs.map(q => q[i][1])]);
    const [head, body] = flip([ui('s_stat'), ...cols.map(c => c.name)], rows, cols.map(c => c.name), ui('s_vname'));
    return { tables: [tbl(ui('s_a_desc'), head, body, foot)] };
  }
  const tables = [];
  for (const c of cols) {
    const sp = splitBy(D, c, grp, X.lang), lv = sp.levels, cols2 = [];
    lv.forEach((l, i) => { let miss = 0; for (let r = 0; r < D.n; r++) if (grp.cat[r] === l && !Number.isFinite(c.num[r])) miss++; cols2.push(descRows(sp.groups[i], miss, o, pcts)); });
    cols2.push(descRows(finite(c), c.miss, o, pcts));
    const rows = cols2[0].map((r, i) => [r[0], ...cols2.map(q => q[i][1])]), names = [...lv, ui('s_tot')];
    const [head, body] = flip([ui('s_stat'), ...names], rows, names, grp.name);
    tables.push(tbl(c.name + ' ~ ' + grp.name, head, body, foot));
  }
  return { tables };
};
A.freq = (D, o, X) => {
  need(o.vars.length, 's_e_vars'); const tables = [];
  for (const i of o.vars) {
    const c = D.cols[i], cnt = new Map(); let valid = 0;
    for (let r = 0; r < D.n; r++) { const v = c.cat[r]; if (v === null || (c.kind === 'num' && !Number.isFinite(c.num[r]))) continue; cnt.set(v, (cnt.get(v) || 0) + 1); valid++; }
    const lev = levelsOf(D, [...cnt.keys()], X.lang), shown = lev.slice(0, 200), miss = D.n - valid; let cum = 0; const rows = [];
    for (const l of shown) { const n = cnt.get(l); cum += n; rows.push([l, G(n), n / D.n * 100, n / valid * 100, cum / valid * 100]); }
    if (miss) rows.push([ui('s_na'), G(miss), miss / D.n * 100, null, null]);
    rows.push([ui('s_tot'), G(D.n), 100, valid ? 100 : null, null]);
    tables.push(tbl(c.name, [ui('s_val'), ui('s_freq'), '%', ui('s_vpct'), ui('s_cpct')], rows, lev.length > 200 ? [ui('s_trunc', { n: 200 })] : []));
  }
  return { tables };
};
A.norm = (D, o, X) => {
  const cols = o.vars.map(i => D.cols[i]).filter(c => c.kind === 'num'); need(cols.length, 's_e_vars'); const rows = [];
  for (const c of cols) {
    const x = finite(c), sw = shapiro(x), g = normalGOF(x), res = p => p === null || p >= o.alpha ? ui('s_nrm') : ui('s_nnrm');
    rows.push([c.name, ui('s_t_sw'), G(x.length), sw ? sw.w : null, sw ? P(sw.p) : null, sw ? res(sw.p) : ui('s_e_sw')]);
    if (g) { rows.push([c.name, ui('s_t_ad'), G(x.length), g.ad.a2, P(g.ad.p), res(g.ad.p)]); rows.push([c.name, ui('s_t_lf'), G(x.length), g.lf.d, g.lf.p === null ? '> 0.1' : P(g.lf.p), res(g.lf.p)]); rows.push([c.name, ui('s_t_jb'), G(x.length), g.jb.jb, P(g.jb.p), res(g.jb.p)]); }
  }
  return { tables: [tbl(ui('s_a_norm'), [ui('s_vname'), ui('s_test'), 'n', ui('s_stat'), 'p', ui('s_res')], rows, [ui('s_n_norm'), ui('s_n_lf')])] };
};
A.cor = (D, o, X) => {
  const cols = o.vars.map(i => D.cols[i]).filter(c => c.kind === 'num'); need(cols.length >= 2, 's_e_two');
  const sp = o.method === 'spearman', sym = sp ? 'ρ' : 'r', k = cols.length, M = Array.from({ length: k }, () => new Array(k).fill(null)), rows = [];
  for (let i = 0; i < k; i++) { M[i][i] = 1; for (let j = i + 1; j < k; j++) {
    const [x, y] = pairsOf(cols[i], cols[j]), t = corTest(x, y, o.method, o.alpha); M[i][j] = M[j][i] = Number.isFinite(t.r) ? t.r : null;
    rows.push(sp ? [cols[i].name, cols[j].name, G(t.n), t.r ?? null, P(t.p), sigTxt(t.p, o.alpha)] : [cols[i].name, cols[j].name, G(t.n), t.r ?? null, t.lo ?? null, t.hi ?? null, P(t.p), sigTxt(t.p, o.alpha)]);
  } }
  const head = sp ? [ui('s_var1'), ui('s_var2'), 'n', sym, 'p', ui('s_res')] : [ui('s_var1'), ui('s_var2'), 'n', sym, ui('s_lo'), ui('s_hi'), 'p', ui('s_res')];
  return { tables: [tbl(ui('s_cmat', { m: sp ? 'Spearman' : 'Pearson' }), ['', ...cols.map(c => c.name)], cols.map((c, i) => [c.name, ...M[i]])), tbl(ui('s_cpair', { m: sp ? 'Spearman' : 'Pearson', l: lvlPct(o.alpha) }), head, rows, [ui('s_n_cor')])] };
};
A.t1 = (D, o, X) => {
  const c = D.cols[o.v]; need(c && c.kind === 'num', 's_e_vars'); const mu = lenient(String(o.mu).trim() || '0', D.dm); need(Number.isFinite(mu), 's_e_mu');
  const r = tOne(finite(c), mu, o.alt, o.alpha); need(r);
  const rows = [[ui('s_sn'), G(r.n)], [ui('s_mean'), r.mean], [ui('s_sd'), r.sd], [ui('s_sem'), r.se], ['μ₀', r.mu], ['t', r.t], ['df', G(r.df)], ['p', P(r.p)], [ui('s_md'), r.diff], [ui('s_lo'), r.lo], [ui('s_hi'), r.hi], ["Cohen's d", r.d], [ui('s_alt'), ui(altKey(o.alt))], [ui('s_res'), sigTxt(r.p, o.alpha)]];
  return { tables: [tbl(ui('s_a_t1') + ': ' + c.name, vert(rows).head, rows, [ui('s_n_ci', { l: lvlPct(o.alpha) })])] };
};
A.t2 = (D, o, X) => {
  const dep = D.cols[o.v], g = D.cols[o.g]; need(dep && g && dep.kind === 'num', 's_e_vars');
  const sp = splitBy(D, dep, g, X.lang), ia = sp.levels.indexOf(o.a), ib = sp.levels.indexOf(o.b); need(ia >= 0 && ib >= 0 && ia !== ib, 's_e_grp');
  const x = sp.groups[ia], y = sp.groups[ib], r = tTwo(x, y, o.alt, o.alpha); need(r);
  const gt = tbl(ui('s_gdesc'), [ui('s_grp'), 'n', ui('s_mean'), ui('s_sd'), ui('s_sem')], [[o.a, G(r.n1), r.m1, r.s1, r.s1 / Math.sqrt(r.n1)], [o.b, G(r.n2), r.m2, r.s2, r.s2 / Math.sqrt(r.n2)]]);
  const row = (lab, q) => [lab, q.t, G(q.df), P(q.p), r.diff, q.se, q.lo, q.hi, q.d, sigTxt(q.p, o.alpha)];
  const tt = tbl(ui('s_a_t2') + ': ' + dep.name + ' (' + o.a + ' − ' + o.b + ')', [ui('s_test'), 't', 'df', 'p', ui('s_md'), ui('s_sed'), ui('s_lo'), ui('s_hi'), "Cohen's d", ui('s_res')], [row(ui('s_stud'), r.student), row(ui('s_welch'), r.welch)], [ui('s_alt') + ': ' + ui(altKey(o.alt)) + '. ' + ui('s_n_ci', { l: lvlPct(o.alpha) }), ui('s_n_t2')]);
  const tables = [gt, tt], lv = x.length > 1 && y.length > 1 ? levene([x, y]) : null;
  if (lv) tables.push(tbl(ui('s_lev'), [ui('s_test'), 'F', 'df1', 'df2', 'p', ui('s_res')], [[ui('s_lev'), lv.F, G(lv.df1), G(lv.df2), P(lv.p), lv.p >= o.alpha ? ui('s_eqv') : ui('s_neqv')]]));
  return { tables };
};
A.tp = (D, o, X) => {
  const a = D.cols[o.x], b = D.cols[o.y]; need(a && b && a.kind === 'num' && b.kind === 'num' && a !== b, 's_e_vars');
  const [x, y] = pairsOf(a, b), r = tPaired(x, y, o.alt, o.alpha); need(r);
  const rows = [[ui('s_pairs'), G(r.n)], [ui('s_mean') + ' ' + a.name, r.m1], [ui('s_mean') + ' ' + b.name, r.m2], [ui('s_mdd'), r.mean], [ui('s_sdd'), r.sd], [ui('s_sem'), r.se], ['t', r.t], ['df', G(r.df)], ['p', P(r.p)], [ui('s_lo'), r.lo], [ui('s_hi'), r.hi], ["Cohen's d", r.d], [ui('s_alt'), ui(altKey(o.alt))], [ui('s_res'), sigTxt(r.p, o.alpha)]];
  return { tables: [tbl(ui('s_a_tp') + ': ' + a.name + ' − ' + b.name, vert(rows).head, rows, [ui('s_n_ci', { l: lvlPct(o.alpha) })])] };
};
A.aov = (D, o, X) => {
  const dep = D.cols[o.v], g = D.cols[o.g]; need(dep && g && dep.kind === 'num', 's_e_vars');
  const sp = splitBy(D, dep, g, X.lang), k = sp.levels.length; need(k >= 2, 's_e_grp2'); need(k <= 50, 's_e_lv');
  const a = anova1(sp.groups); need(a);
  const gt = tbl(ui('s_gdesc'), [ui('s_grp'), 'n', ui('s_mean'), ui('s_sd'), ui('s_sem')], sp.levels.map((l, i) => { const x = sp.groups[i], sd = Math.sqrt(varOf(x)); return [l, G(x.length), meanOf(x), sd, sd / Math.sqrt(x.length)]; }));
  const at = tbl(ui('s_a_aov') + ': ' + dep.name + ' ~ ' + g.name, [ui('s_src'), 'SS', 'df', 'MS', 'F', 'p', 'η²', ui('s_res')], [[ui('s_btw'), a.ssb, G(a.df1), a.msb, a.F, P(a.p), a.eta2, sigTxt(a.p, o.alpha)], [ui('s_wth'), a.ssw, G(a.df2), a.msw, null, null, null, null], [ui('s_tot'), a.sst, G(a.df1 + a.df2), null, null, null, null, null]]);
  const tables = [gt, at], w = welchAnova(sp.groups), lv = sp.groups.every(x => x.length > 1) ? levene(sp.groups) : null;
  if (w) tables.push(tbl(ui('s_wanova'), [ui('s_test'), 'F', 'df1', 'df2', 'p', ui('s_res')], [[ui('s_wanova'), w.F, G(w.df1), G(w.df2), P(w.p), sigTxt(w.p, o.alpha)]]));
  if (lv) tables.push(tbl(ui('s_lev'), [ui('s_test'), 'F', 'df1', 'df2', 'p', ui('s_res')], [[ui('s_lev'), lv.F, G(lv.df1), G(lv.df2), P(lv.p), lv.p >= o.alpha ? ui('s_eqv') : ui('s_neqv')]]));
  if (o.tukey) {
    if (k > 15) tables.push(tbl(ui('s_tukey'), [], [], [ui('s_e_tk')]));
    else { const t = tukey(sp.groups, o.alpha); if (t) tables.push(tbl(ui('s_tukey'), [ui('s_cmp'), ui('s_diff'), ui('s_lo'), ui('s_hi'), ui('s_padj'), ui('s_res')], t.map(q => [sp.levels[q.j] + ' − ' + sp.levels[q.i], q.diff, q.lo, q.hi, q.p < 1e-6 ? '< 0.000001' : P(q.p), sigTxt(q.p, o.alpha)]), [ui('s_n_ci', { l: lvlPct(o.alpha) })])); }
  }
  return { tables };
};
A.mw = (D, o, X) => {
  const dep = D.cols[o.v], g = D.cols[o.g]; need(dep && g && dep.kind === 'num', 's_e_vars');
  const sp = splitBy(D, dep, g, X.lang), ia = sp.levels.indexOf(o.a), ib = sp.levels.indexOf(o.b); need(ia >= 0 && ib >= 0 && ia !== ib, 's_e_grp');
  const r = mannWhitney(sp.groups[ia], sp.groups[ib]); need(r);
  const gt = tbl(ui('s_gdesc'), [ui('s_grp'), 'n', ui('s_med'), ui('s_mrank')], [[o.a, G(r.n1), medianOf(sp.groups[ia]), r.meanRank1], [o.b, G(r.n2), medianOf(sp.groups[ib]), r.meanRank2]]);
  const tt = tbl(ui('s_a_mw') + ': ' + dep.name + ' (' + o.a + ' vs ' + o.b + ')', ['W (U)', 'z', 'p', ui('s_meth'), ui('s_rbc'), ui('s_res')], [[r.W, r.z ?? null, P(r.p), r.method === 'exact' ? ui('s_m_ex') : ui('s_m_nm'), r.rbc, sigTxt(r.p, o.alpha)]], [ui('s_n_mw')]);
  return { tables: [gt, tt] };
};
A.wx = (D, o, X) => {
  const a = D.cols[o.x], b = D.cols[o.y]; need(a && b && a.kind === 'num' && b.kind === 'num' && a !== b, 's_e_vars');
  const [x, y] = pairsOf(a, b), r = signedRank(Float64Array.from(x, (v, i) => v - y[i])); need(r);
  const rows = [[ui('s_pairs'), G(x.length)], [ui('s_nz'), G(r.n)], [ui('s_medd'), r.med], ['V', r.V], ['z', r.z ?? null], ['p', P(r.p)], [ui('s_meth'), r.method === 'exact' ? ui('s_m_ex') : ui('s_m_nm')], [ui('s_res'), sigTxt(r.p, o.alpha)]];
  return { tables: [tbl(ui('s_a_wx') + ': ' + a.name + ' − ' + b.name, vert(rows).head, rows, [ui('s_n_wx')])] };
};
A.kw = (D, o, X) => {
  const dep = D.cols[o.v], g = D.cols[o.g]; need(dep && g && dep.kind === 'num', 's_e_vars');
  const sp = splitBy(D, dep, g, X.lang), k = sp.levels.length; need(k >= 2, 's_e_grp2'); need(k <= 50, 's_e_lv');
  const r = kruskal(sp.groups); need(r);
  const gt = tbl(ui('s_gdesc'), [ui('s_grp'), 'n', ui('s_med'), ui('s_mrank')], sp.levels.map((l, i) => [l, G(sp.groups[i].length), medianOf(sp.groups[i]), r.meanRanks[i]]));
  const tt = tbl(ui('s_a_kw') + ': ' + dep.name + ' ~ ' + g.name, ['H', 'df', 'p', ui('s_res')], [[r.H, G(r.df), P(r.p), sigTxt(r.p, o.alpha)]]);
  return { tables: [gt, tt] };
};
A.chi = (D, o, X) => {
  const a = D.cols[o.x], b = D.cols[o.y]; need(a && b && a !== b, 's_e_vars');
  const keep = []; for (let i = 0; i < D.n; i++) if (a.cat[i] !== null && b.cat[i] !== null && (a.kind !== 'num' || Number.isFinite(a.num[i])) && (b.kind !== 'num' || Number.isFinite(b.num[i]))) keep.push(i);
  const ra = levelsOf(D, keep.map(i => a.cat[i]), X.lang), rb = levelsOf(D, keep.map(i => b.cat[i]), X.lang); need(ra.length >= 2 && rb.length >= 2, 's_e_grp2'); need(ra.length <= 30 && rb.length <= 30, 's_e_lv');
  const ia = new Map(ra.map((l, i) => [l, i])), ib = new Map(rb.map((l, i) => [l, i])), obs = ra.map(() => new Array(rb.length).fill(0));
  for (const i of keep) obs[ia.get(a.cat[i])][ib.get(b.cat[i])]++;
  const r = chiSq(obs), corner = a.name + ' \\ ' + b.name;
  const ot = tbl(ui('s_obs'), [corner, ...rb, ui('s_tot')], [...ra.map((l, i) => [l, ...obs[i].map(G), G(r.rs[i])]), [ui('s_tot'), ...r.cs.map(G), G(r.n)]]);
  const et = tbl(ui('s_exp'), [corner, ...rb], ra.map((l, i) => [l, ...r.exp[i]]));
  const rows = [[ui('s_pchi'), r.stat, G(r.df), P(r.p), r.v, sigTxt(r.p, o.alpha)]];
  if (r.yates !== undefined) { rows.push([ui('s_yates'), r.yates, G(1), P(r.pYates), null, sigTxt(r.pYates, o.alpha)]); rows.push([ui('s_fisher'), null, null, P(r.fisher), null, sigTxt(r.fisher, o.alpha)]); }
  const foot = []; if (r.lowShare > 0) foot.push(ui('s_w5', { p: String(Math.round(r.lowShare * 100)) }));
  const extra = o.pct ? [tbl(ui('s_pctrow'), [corner, ...rb, ui('s_tot')], [...ra.map((l, i) => [l, ...obs[i].map(v => v / r.rs[i] * 100), 100]), [ui('s_tot'), ...r.cs.map(v => v / r.n * 100), 100]]), tbl(ui('s_pctcol'), [corner, ...rb, ui('s_tot')], [...ra.map((l, i) => [l, ...obs[i].map((v, j) => v / r.cs[j] * 100), r.rs[i] / r.n * 100]), [ui('s_tot'), ...r.cs.map(() => 100), 100]])] : [];
  return { tables: [ot, ...extra, et, tbl(ui('s_a_chi'), [ui('s_test'), 'χ²', 'df', 'p', "Cramér's V", ui('s_res')], rows, foot)] };
};
A.reg = (D, o, X) => {
  const y = D.cols[o.y], xs = o.xs.map(i => D.cols[i]).filter(c => c !== y && c.kind === 'num'); need(y && y.kind === 'num' && xs.length, 's_e_vars');
  const keep = []; for (let i = 0; i < D.n; i++) if (Number.isFinite(y.num[i]) && xs.every(c => Number.isFinite(c.num[i]))) keep.push(i);
  const r = ols(Float64Array.from(keep, i => y.num[i]), xs.map(c => Float64Array.from(keep, i => c.num[i])), o.alpha);
  if (r.few) fail('s_e_need'); if (r.singular) fail('s_e_sing');
  const rows = [[ui('s_sn'), G(r.n)], ['R²', r.r2], ['Adj. R²', r.adj], [ui('s_rse'), r.rse], [ui('s_dfr'), G(r.df)], ['F', r.F], ['df1', G(r.k)], ['p', P(r.p)], [ui('s_res'), sigTxt(r.p, o.alpha)]];
  const names = [ui('s_int'), ...xs.map(c => c.name)];
  return { tables: [tbl(ui('s_a_reg') + ': ' + y.name + ' ~ ' + xs.map(c => c.name).join(' + '), vert(rows).head, rows), tbl(ui('s_coef'), [ui('s_term'), ui('s_est'), ui('s_se'), 't', 'p', ui('s_lo'), ui('s_hi'), ui('s_beta'), ui('s_res')], r.coef.map((q, j) => [names[j], q.est, q.se, q.t, P(q.p), q.lo, q.hi, Number.isFinite(q.beta) ? q.beta : null, sigTxt(q.p, o.alpha)]), [ui('s_n_ci', { l: lvlPct(o.alpha) })])] };
};
A.hom = (D, o, X) => {
  const dep = D.cols[o.v], g = D.cols[o.g]; need(dep && g && dep.kind === 'num', 's_e_vars');
  const sp = splitBy(D, dep, g, X.lang); need(sp.levels.length >= 2, 's_e_grp2'); need(sp.levels.length <= 50, 's_e_lv'); need(sp.groups.every(a => a.length > 1), 's_e_need');
  const lm = levene(sp.groups), la = leveneMean(sp.groups), b = bartlett(sp.groups), eq = p => p >= o.alpha ? ui('s_eqv') : ui('s_neqv'), rows = [];
  if (lm) rows.push([ui('s_lev'), lm.F, G(lm.df1), G(lm.df2), P(lm.p), eq(lm.p)]);
  if (la) rows.push([ui('s_levm'), la.F, G(la.df1), G(la.df2), P(la.p), eq(la.p)]);
  if (b) rows.push([ui('s_bart'), b.T, G(b.df), null, P(b.p), eq(b.p)]);
  need(rows.length);
  return { tables: [tbl(ui('s_gdesc'), [ui('s_grp'), 'n', ui('s_mean'), ui('s_var')], sp.levels.map((l, i) => [l, G(sp.groups[i].length), meanOf(sp.groups[i]), varOf(sp.groups[i])])), tbl(ui('s_a_hom') + ': ' + dep.name + ' ~ ' + g.name, [ui('s_test'), 'F / χ²', 'df1', 'df2', 'p', ui('s_res')], rows)] };
};
A.aov2 = (D, o, X) => {
  const dep = D.cols[o.v], ga = D.cols[o.g], gb = D.cols[o.g2]; need(dep && ga && gb && dep.kind === 'num' && ga !== gb && ga !== dep && gb !== dep, 's_e_vars');
  const keep = []; for (let i = 0; i < D.n; i++) if (Number.isFinite(dep.num[i]) && ga.cat[i] !== null && gb.cat[i] !== null) keep.push(i);
  const la = levelsOf(D, keep.map(i => ga.cat[i]), X.lang), lb = levelsOf(D, keep.map(i => gb.cat[i]), X.lang); need(la.length >= 2 && lb.length >= 2, 's_e_grp2'); need(la.length <= 20 && lb.length <= 20, 's_e_lv');
  const ia = new Map(la.map((l, i) => [l, i])), ib = new Map(lb.map((l, i) => [l, i])), ca = keep.map(i => ia.get(ga.cat[i])), cb = keep.map(i => ib.get(gb.cat[i])), y = Float64Array.from(keep, i => dep.num[i]);
  const cell = la.map(() => lb.map(() => [])); keep.forEach((r, j) => cell[ca[j]][cb[j]].push(dep.num[r]));
  if (o.inter && cell.some(r => r.some(a => !a.length))) fail('s_e_cells');
  const r = anova2(y, ca, cb, la.length, lb.length, o.inter, o.alpha); need(!r.bad);
  const rows = [], names = { a: ga.name, b: gb.name, ab: ga.name + ' × ' + gb.name };
  for (const t of r.terms) rows.push([names[t.id], t.ss, G(t.df), t.ms, t.F, P(t.p), t.eta, sigTxt(t.p, o.alpha)]);
  rows.push([ui('s_err'), r.sse, G(r.dfe), r.mse, null, null, null, null]); rows.push([ui('s_tot'), r.tss, G(r.n - 1), null, null, null, null, null]);
  const ct = []; la.forEach((a, i) => lb.forEach((b, j) => { const v = cell[i][j]; if (v.length) ct.push([a, b, G(v.length), meanOf(v), v.length > 1 ? Math.sqrt(varOf(v)) : null]); }));
  return { tables: [tbl(ui('s_cells'), [ga.name, gb.name, 'n', ui('s_mean'), ui('s_sd')], ct), tbl(ui('s_a_aov2') + ': ' + dep.name, [ui('s_src'), 'SS', 'df', 'MS', 'F', 'p', 'partial η²', ui('s_res')], rows, [ui('s_n_t3')])] };
};
A.fried = (D, o, X) => {
  const cols = o.vars.map(i => D.cols[i]).filter(c => c.kind === 'num'); need(cols.length >= 2, 's_e_two');
  const keep = []; for (let i = 0; i < D.n; i++) if (cols.every(c => Number.isFinite(c.num[i]))) keep.push(i);
  const r = friedman(cols.map(c => Float64Array.from(keep, i => c.num[i]))); need(r);
  return { tables: [tbl(ui('s_gdesc'), [ui('s_vname'), ui('s_mrank')], cols.map((c, j) => [c.name, r.meanRanks[j]])), tbl(ui('s_a_fried'), [ui('s_pairs'), 'χ²', 'df', 'p', "Kendall's W", ui('s_res')], [[G(r.n), r.chi, G(r.df), P(r.p), r.w, sigTxt(r.p, o.alpha)]], [ui('s_n_rows')])] };
};
A.gof = (D, o, X) => {
  const c = D.cols[o.v]; need(c, 's_e_vars'); const cnt = new Map();
  for (let i = 0; i < D.n; i++) { const v = c.cat[i]; if (v !== null && (c.kind !== 'num' || Number.isFinite(c.num[i]))) cnt.set(v, (cnt.get(v) || 0) + 1); }
  const lev = levelsOf(D, [...cnt.keys()], X.lang); need(lev.length >= 2 && lev.length <= 50, 's_e_grp2');
  let props = lev.map(() => 1);
  if (String(o.props || '').trim()) { props = String(o.props).split(/[\s:;,]+/).filter(Boolean).map(t => parseNumber(t, D.dm)); if (props.length !== lev.length || props.some(v => !(v > 0))) fail('s_e_prop'); }
  const r = gofTest(lev.map(l => cnt.get(l)), props);
  const rows = lev.map((l, i) => [l, G(cnt.get(l)), r.exp[i], cnt.get(l) - r.exp[i], (cnt.get(l) - r.exp[i]) / Math.sqrt(r.exp[i])]);
  rows.push([ui('s_tot'), G(r.n), r.n, null, null]);
  return { tables: [tbl(c.name, [ui('s_val'), ui('s_obs'), ui('s_exp'), ui('s_resid'), ui('s_sresid')], rows), tbl(ui('s_a_gof'), ['χ²', 'df', 'p', ui('s_res')], [[r.stat, G(r.df), P(r.p), sigTxt(r.p, o.alpha)]], r.low > 0 ? [ui('s_w5', { p: String(Math.round(r.low * 100)) })] : [])] };
};
A.binom = (D, o, X) => {
  const c = D.cols[o.v]; need(c, 's_e_vars'); const p0 = lenient(String(o.p0).trim() || '0.5', D.dm); need(p0 > 0 && p0 < 1, 's_e_p0');
  let n = 0, x = 0; for (let i = 0; i < D.n; i++) { const v = c.cat[i]; if (v !== null && (c.kind !== 'num' || Number.isFinite(c.num[i]))) { n++; if (v === o.s) x++; } }
  need(n >= 1 && o.s !== undefined && o.s !== '', 's_e_need');
  const r = binomTest(x, n, p0, o.alt, o.alpha);
  const rows = [[ui('s_sn'), G(n)], [ui('s_succn'), G(x)], [ui('s_prop'), r.ph], ['p₀', p0], ['p', P(r.p)], [ui('s_lo'), r.lo], [ui('s_hi'), r.hi], [ui('s_alt'), ui(altKey(o.alt))], [ui('s_res'), sigTxt(r.p, o.alpha)]];
  return { tables: [tbl(ui('s_a_binom') + ': ' + c.name + ' = ' + o.s, vert(rows).head, rows, [ui('s_n_binom', { l: lvlPct(o.alpha) })])] };
};
A.logit = (D, o, X) => {
  const dep = D.cols[o.y], xs = o.xs.map(i => D.cols[i]).filter(c => c !== dep && c.kind === 'num'); need(dep && xs.length, 's_e_vars');
  const keep = []; for (let i = 0; i < D.n; i++) if (dep.cat[i] !== null && (dep.kind !== 'num' || Number.isFinite(dep.num[i])) && xs.every(c => Number.isFinite(c.num[i]))) keep.push(i);
  const lev = levelsOf(D, keep.map(i => dep.cat[i]), X.lang); need(lev.length === 2, 's_e_bin');
  const ev = lev.includes(o.ev) ? o.ev : lev[1], non = lev.find(l => l !== ev), y = Float64Array.from(keep, i => dep.cat[i] === ev ? 1 : 0);
  const r = logit(y, xs.map(c => Float64Array.from(keep, i => c.num[i])), o.alpha); if (r.few) fail('s_e_need'); if (r.singular) fail('s_e_sing'); if (r.noconv) fail('s_e_conv');
  const rows = [[ui('s_sn'), G(r.n)], [ui('s_evtn'), G(r.ev)], [ui('s_dev'), r.dev], [ui('s_dev0'), r.d0], [ui('s_lrchi'), r.lr], ['df', G(r.df)], ['p', P(r.p)], [ui('s_mcf'), r.mcf], [ui('s_cs'), r.cs], [ui('s_nag'), r.nag], [ui('s_acc'), r.acc * 100], [ui('s_res'), sigTxt(r.p, o.alpha)]];
  const names = [ui('s_int'), ...xs.map(c => c.name)], lv = lvlPct(o.alpha);
  const ct = tbl(ui('s_class'), [ui('s_obsp'), non, ev, ui('s_pcor')], [[non, G(r.tn), G(r.fp), r.tn + r.fp ? r.tn / (r.tn + r.fp) * 100 : null], [ev, G(r.fn), G(r.tp), r.tp + r.fn ? r.tp / (r.tp + r.fn) * 100 : null]]);
  return { tables: [tbl(ui('s_a_logit') + ': ' + dep.name + ' = ' + ev, vert(rows).head, rows, r.big ? [ui('s_e_sep')] : []), tbl(ui('s_coef'), [ui('s_term'), 'B', ui('s_se'), 'z', 'p', ui('s_or'), ui('s_orlo'), ui('s_orhi'), ui('s_res')], r.coef.map((q, j) => [names[j], q.est, q.se, q.z, P(q.p), q.or, q.orLo, q.orHi, sigTxt(q.p, o.alpha)]), [ui('s_n_ci', { l: lv })]), ct] };
};
A.alpha = (D, o, X) => {
  const cols = o.vars.map(i => D.cols[i]).filter(c => c.kind === 'num'); need(cols.length >= 2, 's_e_two');
  const keep = []; for (let i = 0; i < D.n; i++) if (cols.every(c => Number.isFinite(c.num[i]))) keep.push(i);
  const r = cronbach(cols.map(c => Float64Array.from(keep, i => c.num[i]))); need(r);
  const rows = [[ui('s_ncases'), G(r.n)], [ui('s_nitems'), G(r.k)], [ui('s_alpha_t'), r.alpha], [ui('s_alpha_std'), r.std], [ui('s_rbar'), r.rbar]];
  return { tables: [tbl(ui('s_a_alpha'), vert(rows).head, rows), tbl(ui('s_items'), [ui('s_item'), ui('s_mean'), ui('s_sd'), ui('s_ritem'), 'p', ui('s_adel'), ui('s_res')], cols.map((c, j) => [c.name, r.items[j].mean, r.items[j].sd, r.items[j].r, P(r.items[j].p), r.items[j].ad, sigTxt(r.items[j].p, o.alpha)]))] };
};
const ORDER = ['desc', 'freq', 'norm', 'hom', 'cor', 't1', 't2', 'tp', 'aov', 'aov2', 'mw', 'wx', 'kw', 'fried', 'chi', 'gof', 'binom', 'reg', 'logit', 'alpha'];
const runAll = (D, opts, lang) => {
  const out = [];
  for (const id of ORDER) {
    const o = opts.an[id]; if (!o) continue;
    const base = { alpha: opts.alpha, ...o };
    try { const r = A[id](D, base, { lang }); out.push({ id, title: ui('s_a_' + id), tables: r.tables }); }
    catch (e) { if (e && e.k) out.push({ id, title: ui('s_a_' + id), err: ui(e.k) }); else { console.error(e); out.push({ id, title: ui('s_a_' + id), err: ui('s_e_fail') }); } }
  }
  return out;
};
/* a table as plain rows, for copying and exporting */
const tableRows = (t, f, raw) => [t.head.slice(), ...t.rows.map(r => r.map(c => raw ? cellRaw(c, f) : cellText(c, f)))];
core.runAll = runAll; core.tableRows = tableRows; core.cellText = cellText; core.fmtNum = fmtNum; core.fmtP = fmtP; core.A = A; core.STATS = STATS;

/* ================= charts: plain SVG, no libraries ================= */
const FONT = 'system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif';
const PAL = ['#0072B2', '#E69F00', '#009E73', '#D55E00', '#CC79A7', '#56B4E9', '#B8A400', '#666666'];
const INK = 'var(--ink,#161b33)', MUT = 'var(--mut,#4a5070)', LN = 'var(--ln,#d6d9ee)';
const r1 = v => Math.round(v * 10) / 10;
const xe = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const clip = (s, n) => { s = String(s); return s.length > n ? s.slice(0, n - 1) + '…' : s; };
const tw = (s, fs = 12) => String(s).length * fs * 0.58;
const tx = (x, y, s, o = {}) => `<text x="${r1(x)}" y="${r1(y)}" font-size="${o.fs || 12}" fill="${o.fill || INK}" text-anchor="${o.a || 'start'}"${o.b ? ' font-weight="700"' : ''}${o.dy ? ` dy="${o.dy}"` : ''}${o.rot ? ` transform="rotate(${o.rot} ${r1(x)} ${r1(y)})"` : ''}>${xe(s)}</text>`;
const col = i => i < 8 ? PAL[i] : `hsl(${(i * 47) % 360},55%,52%)`;
const niceNum = (x, round) => { const e = Math.floor(Math.log10(x)), f = x / Math.pow(10, e); const n = round ? (f < 1.5 ? 1 : f < 3 ? 2 : f < 7 ? 5 : 10) : (f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10); return n * Math.pow(10, e); };
const niceScale = (lo, hi, cnt = 6) => {
  if (!(hi > lo)) { const d = Math.abs(lo) > 0 ? Math.abs(lo) * 0.5 : 1; lo -= d; hi += d; }
  const step = niceNum(niceNum(hi - lo, false) / (cnt - 1), true), a = Math.floor(lo / step + 1e-9) * step, b = Math.ceil(hi / step - 1e-9) * step, ticks = [];
  for (let v = a; v <= b + step / 2; v += step) ticks.push(+v.toFixed(12));
  return { min: a, max: b, step, ticks };
};
const decOf = step => { for (let d = 0; d < 9; d++) if (Math.abs(step * Math.pow(10, d) - Math.round(step * Math.pow(10, d))) < 1e-7) return d; return 8; };
const tickTxt = (v, dec, dm) => { const s = v.toFixed(dec).replace(/^-0(\.0+)?$/, '0'); return dm === ',' ? s.replace('.', ',') : s; };
const svgWrap = (title, w, h, inner, sub) => (w = Math.round(w), h = Math.round(h), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${xe(title)}" font-family="${FONT}"><title>${xe(title)}</title>${tx(w / 2, 22, clip(title, 90), { a: 'middle', fs: 15, b: 1 })}${sub ? tx(w / 2, 40, sub, { a: 'middle', fill: MUT }) : ''}${inner}</svg>`);
const legendSvg = (items, W, y) => {
  let x = 20, yy = y, s = '';
  for (const it of items) { const wd = 22 + tw(clip(it.name, 22)); if (x + wd > W - 10) { x = 20; yy += 18; } s += `<rect x="${x}" y="${yy - 9}" width="11" height="11" rx="2" fill="${it.color}"/>` + tx(x + 16, yy, clip(it.name, 22), { dy: '.1em' }); x += wd + 14; }
  return { s, h: yy - y + 18 };
};
const axisV = (sc, L, R, T, B, dm, label, grid = true) => {
  const dec = decOf(sc.step); let s = '';
  for (const v of sc.ticks) { const y = B - (v - sc.min) / (sc.max - sc.min) * (B - T); if (grid) s += `<line x1="${L}" x2="${R}" y1="${r1(y)}" y2="${r1(y)}" stroke="${LN}"/>`; s += tx(L - 6, y, tickTxt(v, dec, dm), { a: 'end', fs: 11, fill: MUT, dy: '.35em' }); }
  s += `<line x1="${L}" x2="${L}" y1="${T}" y2="${B}" stroke="${MUT}"/>`;
  if (label) s += tx(14, (T + B) / 2, clip(label, 40), { a: 'middle', fill: MUT, rot: -90 });
  return s;
};
const axisH = (sc, L, R, B, dm, label, grid, T) => {
  const dec = decOf(sc.step); let s = '';
  for (const v of sc.ticks) { const x = L + (v - sc.min) / (sc.max - sc.min) * (R - L); if (grid) s += `<line x1="${r1(x)}" x2="${r1(x)}" y1="${T}" y2="${B}" stroke="${LN}"/>`; s += tx(x, B + 15, tickTxt(v, dec, dm), { a: 'middle', fs: 11, fill: MUT }); }
  s += `<line x1="${L}" x2="${R}" y1="${B}" y2="${B}" stroke="${MUT}"/>`;
  if (label) s += tx((L + R) / 2, B + 34, clip(label, 60), { a: 'middle', fill: MUT });
  return s;
};
const num = (v, f) => fmtNum(v, f.dg, f.dm);

/* bar chart: one or several series, optional error bars, stacked or clustered */
const barChart = (o, f) => {
  const { cats, series, stacked, title, ylab } = o, nc = cats.length, ns = series.length, W = 720;
  const horiz = nc > 10 || cats.some(c => String(c).length > 14);
  let lo = 0, hi = 0;
  cats.forEach((c, i) => { let pos = 0, neg = 0; series.forEach(s => { const v = s.vals[i]; if (v === null || v === undefined) return; const e = s.err && s.err[i]; if (stacked) { if (v >= 0) pos += v; else neg += v; } else { hi = Math.max(hi, v, e ? e[1] : v); lo = Math.min(lo, v, e ? e[0] : v); } }); if (stacked) { hi = Math.max(hi, pos); lo = Math.min(lo, neg); } });
  const sc = niceScale(lo, hi <= lo ? lo + 1 : hi, 6), leg = ns > 1 ? legendSvg(series.map((s, i) => ({ name: s.name, color: col(i) })), W, 56) : { s: '', h: 0 };
  const lbl = (v, int) => int ? String(v) : num(v, f), showVal = nc * (stacked ? 1 : ns) <= 24 && !stacked;
  let inner = leg.s, H, body = '';
  if (!horiz) {
    H = 430; const L = 56 + Math.max(...sc.ticks.map(t => tw(tickTxt(t, decOf(sc.step), f.dm), 11))), R = W - 20, T = 58 + leg.h, B = H - 78, band = (R - L) / nc, gw = band * 0.8, bw = stacked ? gw : gw / ns;
    const ys = v => B - (v - sc.min) / (sc.max - sc.min) * (B - T), rot = nc > 6 && Math.max(...cats.map(c => Math.min(14, String(c).length))) * 6.5 > band - 4;
    body += axisV(sc, L, R, T, B, f.dm, ylab);
    cats.forEach((c, i) => {
      let pos = 0, neg = 0;
      series.forEach((s, k) => {
        const v = s.vals[i]; if (v === null || v === undefined) return;
        const x = L + i * band + band * 0.1 + (stacked ? 0 : k * bw); let y0 = ys(0), y1 = ys(v);
        if (stacked) { const base = v >= 0 ? pos : neg; y0 = ys(base); y1 = ys(base + v); if (v >= 0) pos += v; else neg += v; }
        body += `<rect x="${r1(x)}" y="${r1(Math.min(y0, y1))}" width="${r1(Math.max(1, bw - (stacked ? 0 : 1)))}" height="${r1(Math.abs(y1 - y0))}" fill="${col(ns > 1 ? k : 0)}"${stacked ? ` stroke="var(--sf,#fff)" stroke-width="1"` : ''}><title>${xe(c + (ns > 1 ? ' / ' + s.name : '') + ': ' + lbl(v, o.int))}</title></rect>`;
        const e = s.err && s.err[i], cx = x + bw / 2;
        if (e) body += `<line x1="${r1(cx)}" x2="${r1(cx)}" y1="${r1(ys(e[0]))}" y2="${r1(ys(e[1]))}" stroke="${INK}"/><line x1="${r1(cx - 4)}" x2="${r1(cx + 4)}" y1="${r1(ys(e[1]))}" y2="${r1(ys(e[1]))}" stroke="${INK}"/><line x1="${r1(cx - 4)}" x2="${r1(cx + 4)}" y1="${r1(ys(e[0]))}" y2="${r1(ys(e[0]))}" stroke="${INK}"/>`;
        if (showVal) body += tx(cx, e && v >= 0 ? ys(e[1]) - 6 : (v >= 0 ? Math.min(y0, y1) - 4 : Math.max(y0, y1) + 13), lbl(v, o.int), { a: 'middle', fs: 11, fill: MUT });
      });
      const cx = L + i * band + band / 2;
      body += rot ? tx(cx, B + 14, clip(c, 14), { a: 'end', fs: 11, fill: MUT, rot: -35 }) : tx(cx, B + 15, clip(c, 14), { a: 'middle', fs: 11, fill: MUT });
    });
    body += `<line x1="${L}" x2="${R}" y1="${r1(ys(0))}" y2="${r1(ys(0))}" stroke="${MUT}"/>`;
    if (o.clab) body += tx((L + R) / 2, H - 14, clip(o.clab, 60), { a: 'middle', fill: MUT });
  } else {
    const rowH = Math.max(22, ns * 14 + 8); H = Math.min(1500, 70 + leg.h + nc * rowH + 50);
    const L = 24 + Math.min(150, Math.max(...cats.map(c => tw(clip(c, 24), 11)))), R = W - 30, T = 58 + leg.h, B = H - 50, band = (B - T) / nc, gw = band * 0.8, bw = stacked ? gw : gw / ns, xs = v => L + (v - sc.min) / (sc.max - sc.min) * (R - L);
    body += axisH(sc, L, R, B, f.dm, ylab, true, T);
    cats.forEach((c, i) => {
      let pos = 0, neg = 0;
      series.forEach((s, k) => {
        const v = s.vals[i]; if (v === null || v === undefined) return;
        const y = T + i * band + band * 0.1 + (stacked ? 0 : k * bw); let x0 = xs(0), x1 = xs(v);
        if (stacked) { const base = v >= 0 ? pos : neg; x0 = xs(base); x1 = xs(base + v); if (v >= 0) pos += v; else neg += v; }
        body += `<rect x="${r1(Math.min(x0, x1))}" y="${r1(y)}" width="${r1(Math.abs(x1 - x0))}" height="${r1(Math.max(1, bw - (stacked ? 0 : 1)))}" fill="${col(ns > 1 ? k : 0)}"${stacked ? ` stroke="var(--sf,#fff)" stroke-width="1"` : ''}><title>${xe(c + (ns > 1 ? ' / ' + s.name : '') + ': ' + lbl(v, o.int))}</title></rect>`;
        const e = s.err && s.err[i], cy = y + bw / 2;
        if (e) body += `<line y1="${r1(cy)}" y2="${r1(cy)}" x1="${r1(xs(e[0]))}" x2="${r1(xs(e[1]))}" stroke="${INK}"/><line y1="${r1(cy - 4)}" y2="${r1(cy + 4)}" x1="${r1(xs(e[1]))}" x2="${r1(xs(e[1]))}" stroke="${INK}"/><line y1="${r1(cy - 4)}" y2="${r1(cy + 4)}" x1="${r1(xs(e[0]))}" x2="${r1(xs(e[0]))}" stroke="${INK}"/>`;
        if (showVal) body += tx(e && v >= 0 ? xs(e[1]) + 8 : (v >= 0 ? Math.max(x0, x1) + 4 : Math.min(x0, x1) - 4), cy, lbl(v, o.int), { a: v >= 0 ? 'start' : 'end', fs: 11, fill: MUT, dy: '.35em' });
      });
      body += tx(L - 6, T + i * band + band / 2, clip(c, 24), { a: 'end', fs: 11, fill: MUT, dy: '.35em' });
    });
    body += `<line x1="${r1(xs(0))}" x2="${r1(xs(0))}" y1="${T}" y2="${B}" stroke="${MUT}"/>`;
  }
  return { title, svg: svgWrap(title, W, H, inner + body, o.sub) };
};

/* histogram with optional density scale and normal curve */
const histChart = (o, f) => {
  const x = sortedCopy(o.x), n = x.length, W = 720, H = 420; if (n < 2) return null;
  const mn = x[0], mx = x[n - 1], rg = mx - mn, s = Math.sqrt(varOf(x)), iqr = quant(x, 0.75) - quant(x, 0.25);
  let k = o.bins === 'scott' && s > 0 ? Math.ceil(rg / (3.49 * s * Math.pow(n, -1 / 3))) : o.bins === 'fd' && iqr > 0 ? Math.ceil(rg / (2 * iqr * Math.pow(n, -1 / 3))) : Math.ceil(Math.log2(n)) + 1;
  if (o.nb > 0) k = Math.floor(o.nb); k = Math.max(1, Math.min(200, k));
  let w, start, nb;
  if (rg === 0) { w = 1; start = mn - 0.5; nb = 1; }
  else if (o.nb > 0) { w = rg / k; start = mn; nb = k; }
  else { w = niceNum(rg / k, true); start = Math.floor(mn / w + 1e-9) * w; nb = Math.floor((mx - start) / w + 1e-9) + 1; }
  const cnt = new Array(nb).fill(0); for (const v of x) cnt[Math.min(nb - 1, Math.max(0, Math.floor((v - start) / w + 1e-9)))]++;
  const m = meanOf(x), dens = o.dens, ys = c => dens ? c / (n * w) : c, pdf = t => s > 0 ? Math.exp(-(t - m) * (t - m) / (2 * s * s)) / (s * 2.5066282746310002) : 0;
  let ymax = Math.max(...cnt.map(ys)); if (dens && s > 0) ymax = Math.max(ymax, pdf(m));
  const sy = niceScale(0, ymax * 1.05, 6), sx = niceScale(start, start + nb * w, 7), L = 62 + 6 * decOf(sy.step), R = W - 20, T = 56, B = H - 66;
  const X = v => L + (v - sx.min) / (sx.max - sx.min) * (R - L), Y = v => B - (v - sy.min) / (sy.max - sy.min) * (B - T);
  let body = axisV(sy, L, R, T, B, f.dm, dens ? ui('s_c_dsty') : ui('s_freq')) + axisH(sx, L, R, B, f.dm, o.xlab, false, T);
  cnt.forEach((c, i) => { const a = start + i * w, b = a + w; body += `<rect x="${r1(X(a))}" y="${r1(Y(ys(c)))}" width="${r1(Math.max(1, X(b) - X(a) - 1))}" height="${r1(B - Y(ys(c)))}" fill="${PAL[0]}" opacity=".85"><title>[${xe(plain(a, f.dm))}; ${xe(plain(b, f.dm))}${i === nb - 1 ? ']' : ')'}: ${c}</title></rect>`; });
  if (dens && s > 0) { let d = ''; for (let i = 0; i <= 120; i++) { const t = sx.min + (sx.max - sx.min) * i / 120; d += (i ? 'L' : 'M') + r1(X(t)) + ' ' + r1(Y(pdf(t))); } body += `<path d="${d}" fill="none" stroke="${PAL[3]}" stroke-width="2.2"/>`; }
  return { title: o.title, svg: svgWrap(o.title, W, H, body, `n = ${n},  ${ui('s_mean')} = ${num(m, f)},  SD = ${num(s, f)}`) };
};

/* box plots: one box per entry */
const boxChart = (o, f) => {
  const W = 720, H = 430, items = o.items.filter(it => it.x.length), nb = items.length; if (!nb) return null;
  const st = items.map(it => { const s = sortedCopy(it.x), q1 = quant(s, 0.25), q3 = quant(s, 0.75), iq = q3 - q1, lf = q1 - 1.5 * iq, hf = q3 + 1.5 * iq; const inn = s.filter(v => v >= lf && v <= hf); return { s, q1, q3, med: quant(s, 0.5), lo: inn[0], hi: inn[inn.length - 1], out: s.filter(v => v < lf || v > hf), m: meanOf(s), n: s.length }; });
  const lo = Math.min(...st.map(b => b.s[0])), hi = Math.max(...st.map(b => b.s[b.s.length - 1])), sc = niceScale(lo, hi, 6), L = 56 + Math.max(...sc.ticks.map(t => tw(tickTxt(t, decOf(sc.step), f.dm), 11))), R = W - 20, T = 56, B = H - 76;
  const ys = v => B - (v - sc.min) / (sc.max - sc.min) * (B - T), band = (R - L) / nb, bw = Math.min(90, band * 0.55);
  let body = axisV(sc, L, R, T, B, f.dm, o.ylab);
  st.forEach((b, i) => {
    const cx = L + i * band + band / 2, c = col(o.byGroup ? i : i), tip = `${items[i].name}: n = ${b.n}, Q1 = ${num(b.q1, f)}, ${ui('s_med')} = ${num(b.med, f)}, Q3 = ${num(b.q3, f)}, ${ui('s_mean')} = ${num(b.m, f)}`;
    body += `<g><title>${xe(tip)}</title><line x1="${r1(cx)}" x2="${r1(cx)}" y1="${r1(ys(b.hi))}" y2="${r1(ys(b.q3))}" stroke="${INK}"/><line x1="${r1(cx)}" x2="${r1(cx)}" y1="${r1(ys(b.q1))}" y2="${r1(ys(b.lo))}" stroke="${INK}"/><line x1="${r1(cx - bw / 4)}" x2="${r1(cx + bw / 4)}" y1="${r1(ys(b.hi))}" y2="${r1(ys(b.hi))}" stroke="${INK}"/><line x1="${r1(cx - bw / 4)}" x2="${r1(cx + bw / 4)}" y1="${r1(ys(b.lo))}" y2="${r1(ys(b.lo))}" stroke="${INK}"/><rect x="${r1(cx - bw / 2)}" y="${r1(ys(b.q3))}" width="${r1(bw)}" height="${r1(Math.max(1, ys(b.q1) - ys(b.q3)))}" fill="${c}" fill-opacity=".35" stroke="${c}" stroke-width="1.6"/><line x1="${r1(cx - bw / 2)}" x2="${r1(cx + bw / 2)}" y1="${r1(ys(b.med))}" y2="${r1(ys(b.med))}" stroke="${INK}" stroke-width="2.4"/></g>`;
    for (const v of b.out.slice(0, 200)) body += `<circle cx="${r1(cx)}" cy="${r1(ys(v))}" r="3" fill="none" stroke="${c}" stroke-width="1.4"><title>${xe(num(v, f))}</title></circle>`;
    body += `<path d="M${r1(cx)} ${r1(ys(b.m) - 5)}L${r1(cx + 5)} ${r1(ys(b.m))}L${r1(cx)} ${r1(ys(b.m) + 5)}L${r1(cx - 5)} ${r1(ys(b.m))}Z" fill="var(--sf,#fff)" stroke="${INK}" stroke-width="1.2"/>`;
    body += tx(cx, B + 16, clip(items[i].name, 16), { a: 'middle', fs: 11, fill: MUT });
  });
  if (o.xlab) body += tx((L + R) / 2, H - 16, clip(o.xlab, 60), { a: 'middle', fill: MUT });
  return { title: o.title, svg: svgWrap(o.title, W, H, body, '◇ ' + ui('s_mean') + '  —  ' + ui('s_med') + '  |  Q1–Q3  |  1.5 × IQR') };
};

/* scatter plot with optional trend line per group */
const scatterChart = (o, f) => {
  const W = 720, H = 460, groups = o.groups.filter(g => g.x.length); if (!groups.length) return null;
  const ax = [], ay = []; groups.forEach(g => { for (let i = 0; i < g.x.length; i++) { ax.push(g.x[i]); ay.push(g.y[i]); } });
  const sx = niceScale(Math.min(...ax), Math.max(...ax), 7), sy = niceScale(Math.min(...ay), Math.max(...ay), 6), leg = groups.length > 1 ? legendSvg(groups.map((g, i) => ({ name: g.name, color: col(i) })), W, 56) : { s: '', h: 0 };
  const L = 62 + Math.max(...sy.ticks.map(t => tw(tickTxt(t, decOf(sy.step), f.dm), 11))) - 30, R = W - 24, T = 58 + leg.h, B = H - 66, X = v => L + (v - sx.min) / (sx.max - sx.min) * (R - L), Y = v => B - (v - sy.min) / (sy.max - sy.min) * (B - T);
  let body = leg.s + axisV(sy, L, R, T, B, f.dm, o.ylab) + axisH(sx, L, R, B, f.dm, o.xlab, true, T), sub = '';
  groups.forEach((g, k) => {
    const c = col(groups.length > 1 ? k : 0), n = g.x.length, step = Math.max(1, Math.ceil(n / 4000)), op = n > 400 ? 0.45 : 0.75;
    for (let i = 0; i < n; i += step) body += `<circle cx="${r1(X(g.x[i]))}" cy="${r1(Y(g.y[i]))}" r="${n > 400 ? 2.6 : 3.6}" fill="${c}" fill-opacity="${op}"><title>${xe(num(g.x[i], f) + '; ' + num(g.y[i], f))}</title></circle>`;
    if (o.fit && n > 2) {
      const mx = meanOf(g.x), my = meanOf(g.y); let sxy = 0, sxx = 0; for (let i = 0; i < n; i++) { sxy += (g.x[i] - mx) * (g.y[i] - my); sxx += (g.x[i] - mx) * (g.x[i] - mx); }
      if (sxx > 0) {
        const b = sxy / sxx, a = my - b * mx, x0 = Math.min(...g.x), x1 = Math.max(...g.x);
        body += `<line x1="${r1(X(x0))}" y1="${r1(Y(a + b * x0))}" x2="${r1(X(x1))}" y2="${r1(Y(a + b * x1))}" stroke="${c}" stroke-width="2.2"/>`;
        if (groups.length === 1) { const r = pearson(g.x, g.y); sub = `y = ${plain(+a.toPrecision(5), f.dm)} ${b < 0 ? '−' : '+'} ${plain(+Math.abs(b).toPrecision(5), f.dm)}x,  r = ${num(r, f)},  R² = ${num(r * r, f)}`; }
      }
    }
  });
  return { title: o.title, svg: svgWrap(o.title, W, H, body, sub) };
};

/* line chart: several numeric series against row number or a numeric column */
const lineChart = (o, f) => {
  const W = 720, H = 430, ser = o.series.filter(s => s.x.length); if (!ser.length) return null;
  const ax = [], ay = []; ser.forEach(s => { s.x.forEach(v => ax.push(v)); s.y.forEach(v => ay.push(v)); });
  const sx = niceScale(Math.min(...ax), Math.max(...ax), 7), sy = niceScale(Math.min(...ay), Math.max(...ay), 6), leg = ser.length > 1 ? legendSvg(ser.map((s, i) => ({ name: s.name, color: col(i) })), W, 56) : { s: '', h: 0 };
  const L = 62 + Math.max(...sy.ticks.map(t => tw(tickTxt(t, decOf(sy.step), f.dm), 11))) - 30, R = W - 24, T = 58 + leg.h, B = H - 66, X = v => L + (v - sx.min) / (sx.max - sx.min) * (R - L), Y = v => B - (v - sy.min) / (sy.max - sy.min) * (B - T);
  let body = leg.s + axisV(sy, L, R, T, B, f.dm, ser.length === 1 ? ser[0].name : '') + axisH(sx, L, R, B, f.dm, o.xlab, false, T);
  ser.forEach((s, k) => {
    const c = col(k), n = s.x.length, step = Math.max(1, Math.ceil(n / 4000)); let d = '';
    for (let i = 0, j = 0; i < n; i += step, j++) d += (j ? 'L' : 'M') + r1(X(s.x[i])) + ' ' + r1(Y(s.y[i]));
    body += `<path d="${d}" fill="none" stroke="${c}" stroke-width="2"/>`;
    if (n <= 60) for (let i = 0; i < n; i++) body += `<circle cx="${r1(X(s.x[i]))}" cy="${r1(Y(s.y[i]))}" r="3.2" fill="${c}"><title>${xe(num(s.x[i], f) + '; ' + num(s.y[i], f))}</title></circle>`;
  });
  return { title: o.title, svg: svgWrap(o.title, W, H, body) };
};

/* pie chart */
const pieChart = (o, f) => {
  const W = 720, tot = sumOf(o.vals); if (!(tot > 0)) return null;
  const items = o.labels.map((l, i) => ({ l, v: o.vals[i] })); let list = items;
  if (items.length > 12) { const top = items.slice().sort((a, b) => b.v - a.v).slice(0, 11), rest = items.filter(it => !top.includes(it)); list = items.filter(it => top.includes(it)); list.push({ l: ui('s_c_other'), v: rest.reduce((a, b) => a + b.v, 0) }); }
  const cx = 230, cy = 240, r = 150, H = Math.max(440, 90 + list.length * 22 + 40); let a0 = -Math.PI / 2, body = '';
  list.forEach((it, i) => {
    const frac = it.v / tot, a1 = a0 + frac * 2 * Math.PI, c = col(i), pc = plain(Math.round(frac * 1000) / 10, f.dm) + '%', tip = `${it.l}: ${it.v} (${pc})`;
    if (list.length === 1) body += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${c}"><title>${xe(tip)}</title></circle>`;
    else { const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0), x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1); body += `<path d="M${cx} ${cy}L${r1(x0)} ${r1(y0)}A${r} ${r} 0 ${frac > 0.5 ? 1 : 0} 1 ${r1(x1)} ${r1(y1)}Z" fill="${c}" stroke="var(--sf,#fff)" stroke-width="1.5"><title>${xe(tip)}</title></path>`; }
    if (frac >= 0.05) { const am = (a0 + a1) / 2; body += tx(cx + r * 0.65 * Math.cos(am), cy + r * 0.65 * Math.sin(am), pc, { a: 'middle', fs: 12, fill: '#fff', b: 1, dy: '.35em' }); }
    body += `<rect x="440" y="${90 + i * 22}" width="12" height="12" rx="2" fill="${c}"/>` + tx(460, 100 + i * 22, `${clip(it.l, 26)} (${it.v}; ${pc})`, { fs: 12 });
    a0 = a1;
  });
  return { title: o.title, svg: svgWrap(o.title, W, H, body) };
};

/* normal Q-Q plot */
let qqId = 0;
const qqChart = (o, f) => {
  const cid = 'qc' + (++qqId);
  const x = sortedCopy(o.x), n = x.length, W = 720, H = 440; if (n < 3) return null;
  const a = n <= 10 ? 0.375 : 0.5, th = Array.from(x, (_, i) => qnorm((i + 1 - a) / (n + 1 - 2 * a)));
  const sx = niceScale(th[0], th[n - 1], 7), sy = niceScale(x[0], x[n - 1], 6), L = 62 + Math.max(...sy.ticks.map(t => tw(tickTxt(t, decOf(sy.step), f.dm), 11))) - 30, R = W - 24, T = 50, B = H - 66;
  const X = v => L + (v - sx.min) / (sx.max - sx.min) * (R - L), Y = v => B - (v - sy.min) / (sy.max - sy.min) * (B - T);
  let body = axisV(sy, L, R, T, B, f.dm, ui('s_c_sq')) + axisH(sx, L, R, B, f.dm, ui('s_c_tq'), true, T);
  const q1 = quant(x, 0.25), q3 = quant(x, 0.75), t1 = qnorm(0.25), t3 = qnorm(0.75), sl = (q3 - q1) / (t3 - t1), ic = q1 - sl * t1;
  if (Number.isFinite(sl)) { const xa = sx.min, xb = sx.max; body += `<line x1="${r1(X(xa))}" y1="${r1(Y(ic + sl * xa))}" x2="${r1(X(xb))}" y2="${r1(Y(ic + sl * xb))}" stroke="${PAL[3]}" stroke-width="2" clip-path="url(#${cid})"/>`; }
  const step = Math.max(1, Math.ceil(n / 4000));
  for (let i = 0; i < n; i += step) body += `<circle cx="${r1(X(th[i]))}" cy="${r1(Y(x[i]))}" r="3.2" fill="${PAL[0]}" fill-opacity=".75"><title>${xe(num(th[i], f) + '; ' + num(x[i], f))}</title></circle>`;
  return { title: o.title, svg: svgWrap(o.title, W, H, `<defs><clipPath id="${cid}"><rect x="${L}" y="${T}" width="${R - L}" height="${B - T}"/></clipPath></defs>` + body) };
};

/* correlation heat map */
const heatChart = (o, f) => {
  const names = o.names, k = names.length, W = 720, cell = Math.min(64, Math.floor(480 / k)), lab = Math.min(130, Math.max(...names.map(n => tw(clip(n, 18), 11))) + 10), L = 30 + lab, T = 58 + lab * 0.7, H = T + k * cell + 40;
  const mix = (r) => { const t = Math.max(-1, Math.min(1, r)), a = t < 0 ? [33, 102, 172] : [178, 24, 43], b = [247, 247, 247], u = Math.abs(t); return a.map((v, i) => Math.round(b[i] + (v - b[i]) * u)); };
  let body = '';
  for (let i = 0; i < k; i++) {
    body += tx(L - 6, T + i * cell + cell / 2, clip(names[i], 18), { a: 'end', fs: 11, fill: MUT, dy: '.35em' }) + tx(L + i * cell + cell / 2 + 4, T - 6, clip(names[i], 18), { a: 'start', fs: 11, fill: MUT, rot: -40 });
    for (let j = 0; j < k; j++) { const r = o.m[i][j], c = r === null ? [200, 200, 200] : mix(r), dark = (c[0] * 0.299 + c[1] * 0.587 + c[2] * 0.114) < 140; body += `<rect x="${L + j * cell}" y="${T + i * cell}" width="${cell}" height="${cell}" fill="rgb(${c})" stroke="var(--sf,#fff)"><title>${xe(names[i] + ' / ' + names[j] + ': ' + (r === null ? '—' : num(r, f)))}</title></rect>` + (cell >= 30 ? tx(L + j * cell + cell / 2, T + i * cell + cell / 2, r === null ? '—' : plain(Math.round(r * 100) / 100, f.dm), { a: 'middle', fs: cell >= 44 ? 12 : 10, fill: dark ? '#fff' : '#161b33', dy: '.35em' }) : ''); }
  }
  const lx = L + k * cell + 24; if (lx + 60 < W) { for (let i = 0; i <= 20; i++) body += `<rect x="${lx}" y="${T + i * (k * cell / 21)}" width="14" height="${r1(k * cell / 21 + 0.5)}" fill="rgb(${mix(1 - i / 10)})"/>`; body += tx(lx + 20, T + 6, '1', { fs: 11, fill: MUT }) + tx(lx + 20, T + k * cell / 2 + 4, '0', { fs: 11, fill: MUT }) + tx(lx + 20, T + k * cell, '−1', { fs: 11, fill: MUT }); }
  return { title: o.title, svg: svgWrap(o.title, W, H, body) };
};
/* chart builders fed from the data set */
const C = {};
const cellsOf = (D, c) => { const v = []; for (let i = 0; i < D.n; i++) v.push(c.cat[i] !== null && (c.kind !== 'num' || Number.isFinite(c.num[i])) ? c.cat[i] : null); return v; };
C.bar = (D, o, X) => {
  const c = D.cols[o.v]; need(c, 's_e_vars'); const stat = o.stat, y = stat === 'count' || stat === 'percent' ? null : D.cols[o.y]; if (y) need(y.kind === 'num', 's_e_vars');
  const by = o.by >= 0 ? D.cols[o.by] : null, cv = cellsOf(D, c), bv = by ? cellsOf(D, by) : null;
  const keep = []; for (let i = 0; i < D.n; i++) if (cv[i] !== null && (!by || bv[i] !== null) && (!y || Number.isFinite(y.num[i]))) keep.push(i); need(keep.length);
  let cats = levelsOf(D, keep.map(i => cv[i]), X.lang), trunc = false; if (cats.length > 40) { cats = cats.slice(0, 40); trunc = true; }
  const sl = by ? levelsOf(D, keep.map(i => bv[i]), X.lang).slice(0, 12) : [''], ci = new Map(cats.map((l, i) => [l, i])), si = new Map(sl.map((l, i) => [l, i]));
  const cells = sl.map(() => cats.map(() => [])); let total = 0;
  for (const i of keep) { const a = ci.get(cv[i]), b = by ? si.get(bv[i]) : 0; if (a === undefined || b === undefined) continue; cells[b][a].push(y ? y.num[i] : 1); total++; }
  const lv = o.alpha, series = sl.map((nm, b) => {
    const vals = [], err = [];
    cats.forEach((_, a) => {
      const arr = cells[b][a]; let v = null, e = null;
      if (arr.length) {
        if (stat === 'count') v = arr.length; else if (stat === 'percent') v = arr.length / total * 100; else if (stat === 'sum') v = sumOf(arr); else if (stat === 'median') v = medianOf(Float64Array.from(arr)); else {
          v = meanOf(arr);
          if (arr.length > 1 && o.err !== 'none') { const sd = Math.sqrt(varOf(arr)), h = o.err === 'sd' ? sd : o.err === 'ci' ? tCrit(lv, arr.length - 1) * sd / Math.sqrt(arr.length) : sd / Math.sqrt(arr.length); e = [v - h, v + h]; }
        }
      }
      vals.push(v); err.push(e);
    });
    return { name: by ? nm : '', vals, err: stat === 'mean' ? err : null };
  });
  const sname = { count: ui('s_freq'), percent: ui('s_c_pc'), mean: ui('s_mean'), median: ui('s_med'), sum: ui('s_ssum') }[stat];
  const title = stat === 'count' ? ui('s_c_t_cnt', { v: c.name }) : stat === 'percent' ? ui('s_c_t_pct', { v: c.name }) : ui('s_c_t_stat', { s: sname, y: y.name, v: c.name });
  const ylab = stat === 'count' ? ui('s_freq') : stat === 'percent' ? ui('s_c_pc') : sname + ' (' + y.name + ')';
  const r = barChart({ title, cats, series, stacked: o.stacked && !!by && stat !== 'mean' && stat !== 'median', ylab, clab: c.name, int: stat === 'count', sub: trunc ? ui('s_trunc', { n: 40 }) : (stat === 'mean' && o.err !== 'none' ? ui('s_c_errn', { e: ui({ se: 's_c_se', sd: 's_c_sd', ci: 's_c_ci' }[o.err]) }) : '') }, X.f);
  return [r];
};
C.hist = (D, o, X) => { const c = D.cols[o.v]; need(c && c.kind === 'num', 's_e_vars'); const x = finite(c); need(x.length >= 2); const r = histChart({ x, bins: o.bins, nb: parseInt(o.nb, 10) || 0, dens: o.dens, title: ui('s_c_t_hist', { v: c.name }), xlab: c.name }, X.f); need(r); return [r]; };
C.box = (D, o, X) => {
  const cols = o.vars.map(i => D.cols[i]).filter(c => c.kind === 'num'); need(cols.length, 's_e_vars'); const g = o.g >= 0 ? D.cols[o.g] : null, out = [];
  if (!g) { const r = boxChart({ items: cols.map(c => ({ name: c.name, x: finite(c) })), title: ui('s_c_box'), ylab: '' }, X.f); need(r); return [r]; }
  for (const c of cols) { const sp = splitBy(D, c, g, X.lang); need(sp.levels.length >= 1); const r = boxChart({ items: sp.levels.map((l, i) => ({ name: l, x: sp.groups[i] })), title: ui('s_c_t_by', { y: c.name, g: g.name }), ylab: c.name, xlab: g.name, byGroup: true }, X.f); if (r) out.push(r); }
  need(out.length); return out;
};
C.scat = (D, o, X) => {
  const a = D.cols[o.x], b = D.cols[o.y]; need(a && b && a.kind === 'num' && b.kind === 'num' && a !== b, 's_e_vars'); const g = o.g >= 0 ? D.cols[o.g] : null, groups = [];
  if (!g) { const [x, y] = pairsOf(a, b); groups.push({ name: '', x, y }); }
  else { const lv = levelsOf(D, cellsOf(D, g).filter(v => v !== null), X.lang).slice(0, 8); lv.forEach(l => { const x = [], y = []; for (let i = 0; i < D.n; i++) if (g.cat[i] === l && Number.isFinite(a.num[i]) && Number.isFinite(b.num[i])) { x.push(a.num[i]); y.push(b.num[i]); } groups.push({ name: l, x: Float64Array.from(x), y: Float64Array.from(y) }); }); }
  const r = scatterChart({ groups, fit: o.fit, title: ui('s_c_t_vs', { y: b.name, x: a.name }), xlab: a.name, ylab: b.name }, X.f); need(r); return [r];
};
C.line = (D, o, X) => {
  const cols = o.vars.map(i => D.cols[i]).filter(c => c.kind === 'num'); need(cols.length, 's_e_vars'); const xc = o.x >= 0 ? D.cols[o.x] : null; if (xc) need(xc.kind === 'num', 's_e_vars');
  const series = cols.map(c => { let idx = []; for (let i = 0; i < D.n; i++) if (Number.isFinite(c.num[i]) && (!xc || Number.isFinite(xc.num[i]))) idx.push(i); if (xc) idx.sort((p, q) => xc.num[p] - xc.num[q]); return { name: c.name, x: Float64Array.from(idx, i => xc ? xc.num[i] : i + 1), y: Float64Array.from(idx, i => c.num[i]) }; });
  const r = lineChart({ series, xlab: xc ? xc.name : ui('s_c_row'), title: ui('s_c_line') }, X.f); need(r); return [r];
};
C.pie = (D, o, X) => {
  const c = D.cols[o.v]; need(c, 's_e_vars'); const cnt = new Map(); for (const v of cellsOf(D, c)) if (v !== null) cnt.set(v, (cnt.get(v) || 0) + 1);
  const labels = levelsOf(D, [...cnt.keys()], X.lang); need(labels.length); const r = pieChart({ labels, vals: labels.map(l => cnt.get(l)), title: c.name }, X.f); need(r); return [r];
};
C.qq = (D, o, X) => { const cols = o.vars.map(i => D.cols[i]).filter(c => c.kind === 'num'); need(cols.length, 's_e_vars'); const out = cols.map(c => qqChart({ x: finite(c), title: ui('s_c_t_qq', { v: c.name }) }, X.f)).filter(Boolean); need(out.length); return out; };
C.heat = (D, o, X) => {
  const cols = o.vars.map(i => D.cols[i]).filter(c => c.kind === 'num').slice(0, 20); need(cols.length >= 2, 's_e_two'); const k = cols.length, m = Array.from({ length: k }, () => new Array(k).fill(null));
  for (let i = 0; i < k; i++) { m[i][i] = 1; for (let j = i + 1; j < k; j++) { const [x, y] = pairsOf(cols[i], cols[j]), r = x.length > 2 ? corTest(x, y, o.method, o.alpha).r : NaN; m[i][j] = m[j][i] = Number.isFinite(r) ? r : null; } }
  return [heatChart({ names: cols.map(c => c.name), m, title: ui('s_cmat', { m: o.method === 'spearman' ? 'Spearman' : 'Pearson' }) }, X.f)];
};
const CORDER = ['bar', 'hist', 'box', 'scat', 'line', 'pie', 'qq', 'heat'];
const runCharts = (D, copts, lang, f, alpha) => {
  const out = [];
  for (const id of CORDER) {
    const o = copts[id]; if (!o) continue;
    try { out.push({ id: 'c_' + id, title: ui('s_c_' + id), charts: C[id](D, { alpha, ...o }, { lang, f }) }); }
    catch (e) { if (e && e.k) out.push({ id: 'c_' + id, title: ui('s_c_' + id), err: ui(e.k) }); else { console.error(e); out.push({ id: 'c_' + id, title: ui('s_c_' + id), err: ui('s_e_fail') }); } }
  }
  return out;
};
/* SVG text for saving: theme variables replaced by their light-mode colours, plus a white background */
const svgExport = svg => svg.replace(/var\(--[a-z-]+,\s*(#[0-9a-fA-F]{3,8})\)/g, '$1').replace(/^(<svg[^>]*>)/, (m) => { const mm = /viewBox="0 0 ([\d.]+) ([\d.]+)"/.exec(m); return m + `<rect width="${mm[1]}" height="${mm[2]}" fill="#ffffff"/>`; });
core.runCharts = runCharts; core.svgExport = svgExport; core.C = C; core.histChart = histChart;

/* ================= user interface ================= */
if (typeof document === 'undefined') { if (typeof module !== 'undefined') module.exports = core; return; }
const d = document, $ = (s, r = d) => r.querySelector(s);
const box = $('.tool');
if (!box || box.dataset.tool !== 'excel-to-statistics') return;
try { I = JSON.parse($('#i').textContent); } catch (e) { /* labels missing: keys are shown */ }
const lang = d.documentElement.lang, root = $('#ui');
const h = (tag, a = {}, ...k) => { const e = d.createElement(tag); for (const x in a) x in e ? e[x] = a[x] : e.setAttribute(x, a[x]); e.append(...k.filter(v => v !== null && v !== undefined && v !== false)); return e; };
const errTxt = k => ui(k, { r: LIM.rows, c: LIM.cols });
const EX = (() => {
  const out = ['Group\tGender\tHours\tScore\tRetest']; let s = 7; const rnd = () => { s = s * 16807 % 2147483647; return s / 2147483647; };
  for (let i = 0; i < 24; i++) { const g = 'ABC'[i % 3], hrs = 1 + Math.floor(rnd() * 9), sc = Math.round(40 + hrs * 4 + (g === 'B' ? 6 : g === 'C' ? -4 : 0) + rnd() * 14); out.push([g, i % 5 < 2 ? 'F' : 'M', hrs, sc, sc + Math.round(rnd() * 10 - 2)].join('\t')); }
  return out.join('\n');
})();
const S = { src: null, D: null, book: null, last: null, fmt: { dg: 3, dm: '.' }, on: new Set(['desc']) };

/* --- data section --- */
const fileIn = h('input', { id: 'st-file', type: 'file', accept: '.xlsx,.xlsm,.csv,.tsv,.txt' });
const sheetSel = h('select', { id: 'st-sheet' }), sheetWrap = h('div', { className: 'fld', hidden: true }, h('label', { htmlFor: 'st-sheet' }, ui('s_sheet')), sheetSel);
const ta = h('textarea', { id: 'st-text', spellcheck: false, dir: 'auto', placeholder: 'Group\tScore\nA\t12\nB\t15' });
const hdrChk = h('input', { id: 'st-hdr', type: 'checkbox', checked: true });
const decSel = h('select', { id: 'st-dec' }, ...[['auto', ui('s_dec_a')], ['.', ui('s_dec_d')], [',', ui('s_dec_c')]].map(([v, l]) => h('option', { value: v }, l)));
const exBtn = h('button', { className: 'btn alt', type: 'button' }, ui('s_ex')), clrBtn = h('button', { className: 'btn alt', type: 'button' }, I.clear || 'Clear');
const info = h('p', { className: 'note', role: 'status' }), errP = h('p', { className: 'st-warn', role: 'alert', hidden: true });
const varsBox = h('div'), prevBox = h('div');
const setErr = k => { errP.hidden = !k; errP.textContent = k ? errTxt(k) : ''; };
const buildFrom = () => {
  S.D = null; setErr(''); S.last = null; resBox.replaceChildren(); outBar.hidden = true;
  if (!S.src) { render(); return; }
  try {
    const rows = S.src.kind === 'text' ? parseText(S.src.text, decSel.value) : S.src.rows;
    S.D = buildData(rows, hdrChk.checked, decSel.value, lang);
  } catch (e) { setErr(e && e.k ? e.k : 's_e_empty'); }
  render();
};
const render = () => {
  const D = S.D;
  if (!D) { info.textContent = ui('s_nodata'); varsBox.replaceChildren(); prevBox.replaceChildren(); rebuildParams(); return; }
  S.fmt.dm = decSel.value === 'auto' ? (D.dm) : decSel.value;
  info.textContent = ui('s_info', { r: D.n, c: D.cols.length });
  const typeSel = (c, i) => { const s = h('select', { 'aria-label': ui('s_vtype') + ': ' + c.name }, h('option', { value: 'num' }, ui('s_vnum')), h('option', { value: 'cat' }, ui('s_vcat'))); s.value = c.kind; s.addEventListener('change', () => { fillCol(c, s.value, D.dm); render(); }); return s; };
  const vt = h('table', { className: 'st-t' }, h('caption', {}, ui('s_vars')), h('thead', {}, h('tr', {}, ...[ui('s_vname'), ui('s_vtype'), ui('s_vn'), ui('s_vmiss')].map(x => h('th', { scope: 'col' }, x)))),
    h('tbody', {}, ...D.cols.map((c, i) => h('tr', {}, h('th', { scope: 'row', dir: 'auto' }, c.name), h('td', {}, typeSel(c, i)), h('td', { className: 'n' }, String(c.valid)), h('td', { className: 'n' }, String(c.miss) + (c.skipped ? ' (' + c.skipped + '×)' : ''))))));
  varsBox.replaceChildren(h('div', { className: 'st-scroll' }, vt));
  const show = D.cols.slice(0, 30), pr = [];
  for (let i = 0; i < Math.min(10, D.n); i++) pr.push(h('tr', {}, ...show.map(c => h('td', { dir: 'auto', className: c.kind === 'num' ? 'n' : '' }, c.raw[i] === null || c.raw[i] === undefined ? '' : String(c.raw[i])))));
  prevBox.replaceChildren(h('div', { className: 'st-scroll' }, h('table', { className: 'st-t' }, h('caption', {}, ui('s_prev')), h('thead', {}, h('tr', {}, ...show.map(c => h('th', { scope: 'col', dir: 'auto' }, c.name)))), h('tbody', {}, ...pr))));
  rebuildParams();
};
const loadFile = async f => {
  setErr('');
  if (!f) return;
  if (f.size > LIM.bytes) { setErr('s_e_big'); return; }
  const ext = (f.name.split('.').pop() || '').toLowerCase();
  try {
    if (ext === 'xlsx' || ext === 'xlsm') {
      S.book = await openXlsx(new Uint8Array(await f.arrayBuffer()));
      sheetSel.replaceChildren(...S.book.names.map((n, i) => h('option', { value: String(i) }, n))); sheetWrap.hidden = S.book.names.length < 2;
      S.src = { kind: 'grid', rows: await S.book.sheet(0) };
    } else if (ext === 'csv' || ext === 'tsv' || ext === 'txt') {
      const b = new Uint8Array(await f.arrayBuffer()); let t; try { t = new TextDecoder('utf-8', { fatal: true }).decode(b); } catch (e) { t = new TextDecoder('windows-1252').decode(b); }
      S.book = null; sheetWrap.hidden = true; S.src = { kind: 'text', text: t };
    } else { setErr('s_e_fmt'); return; }
  } catch (e) { setErr(e && e.k ? e.k : 's_e_zip'); return; }
  buildFrom();
};
fileIn.addEventListener('change', () => loadFile(fileIn.files[0]));
sheetSel.addEventListener('change', async () => { try { S.src = { kind: 'grid', rows: await S.book.sheet(+sheetSel.value) }; buildFrom(); } catch (e) { setErr(e && e.k ? e.k : 's_e_zip'); } });
let tm = 0;
ta.addEventListener('input', () => { clearTimeout(tm); tm = setTimeout(() => { fileIn.value = ''; sheetWrap.hidden = true; S.book = null; S.src = ta.value.trim() ? { kind: 'text', text: ta.value } : null; buildFrom(); }, 300); });
hdrChk.addEventListener('change', buildFrom); decSel.addEventListener('change', buildFrom);
exBtn.addEventListener('click', () => { ta.value = EX; fileIn.value = ''; sheetWrap.hidden = true; S.book = null; S.src = { kind: 'text', text: EX }; buildFrom(); });
clrBtn.addEventListener('click', () => { ta.value = ''; fileIn.value = ''; sheetWrap.hidden = true; S.book = null; S.src = null; buildFrom(); });

/* --- analysis parameters --- */
const anBox = h('div', { className: 'st-an' }), G_ = {};
const uid = (() => { let n = 0; return p => p + (++n); })();
const mkSel = (labelKey, opts, val) => { const id = uid('st-s'), s = h('select', { id }, ...opts.map(([v, l]) => h('option', { value: String(v), dir: 'auto' }, l))); if (val !== undefined) s.value = String(val); return { el: s, node: h('div', { className: 'fld' }, h('label', { htmlFor: id }, ui(labelKey)), s) }; };
const mkChecks = (legendKey, idxs, def) => {
  const D = S.D, fs = h('fieldset', { className: 'fld full opts' }, h('legend', {}, ui(legendKey))), cbs = [];
  const bar = h('div', { className: 'acts sm' }, h('button', { className: 'btn alt', type: 'button' }, ui('s_all')), h('button', { className: 'btn alt', type: 'button' }, ui('s_none')));
  idxs.forEach(i => { const id = uid('st-c'), cb = h('input', { id, type: 'checkbox', checked: def(i) }); cbs.push([i, cb]); fs.append(h('label', { className: 'chk', htmlFor: id }, cb, h('span', { dir: 'auto' }, D.cols[i].name))); });
  bar.children[0].addEventListener('click', () => cbs.forEach(([, c]) => c.checked = true)); bar.children[1].addEventListener('click', () => cbs.forEach(([, c]) => c.checked = false));
  fs.append(bar); return { node: fs, get: () => cbs.filter(([, c]) => c.checked).map(([i]) => i) };
};
const ALT = () => [['two', ui('s_alt2')], ['greater', ui('s_altg')], ['less', ui('s_altl')]];
const levelOpts = gi => { const D = S.D, c = D.cols[gi], vals = []; for (let i = 0; i < D.n; i++) if (c.cat[i] !== null && (c.kind !== 'num' || Number.isFinite(c.num[i]))) vals.push(c.cat[i]); return levelsOf(D, vals.length > 200000 ? vals.slice(0, 200000) : vals, lang).slice(0, 200).map(v => [v, v]); };
const grpPair = (withLevels) => {
  const D = S.D, all = D.cols.map((c, i) => [i, c.name]), firstCat = Math.max(0, D.cols.findIndex(c => c.kind === 'cat'));
  const g = mkSel('s_grp', all, firstCat), items = [g.node]; let a, b;
  if (withLevels) {
    a = mkSel('s_g1', []); b = mkSel('s_g2', []);
    const fill = () => { const o = levelOpts(+g.el.value); [a, b].forEach((s, k) => { s.el.replaceChildren(...o.map(([v, l]) => h('option', { value: v, dir: 'auto' }, l))); if (o.length) s.el.value = o[Math.min(k, o.length - 1)][0]; }); };
    g.el.addEventListener('change', fill); fill(); items.push(a.node, b.node);
  }
  return { items, g, a, b };
};
const noneOpt = () => [-1, ui('s_c_none')], allOpts = () => S.D.cols.map((c, i) => [i, c.name]);
const idxOf = kind => S.D.cols.map((c, i) => c.kind === kind ? i : -1).filter(i => i >= 0);
const firstCat = () => Math.max(0, S.D.cols.findIndex(c => c.kind === 'cat'));
const binCat = () => { const D = S.D, i = D.cols.findIndex(c => c.valid > 0 && new Set(cellsOf(D, c).filter(v => v !== null)).size === 2); return i >= 0 ? i : firstCat(); };
const lvlLink = (vs, ls, pick) => { const fill = () => { const o = levelOpts(+vs.value); ls.replaceChildren(...o.map(([v, l]) => h('option', { value: v, dir: 'auto' }, l))); if (o.length) ls.value = o[Math.min(pick, o.length - 1)][0]; }; vs.addEventListener('change', fill); fill(); };
const mkText = (labelKey, val, ph) => { const el = h('input', { id: uid('st-i'), type: 'text', value: val || '', inputMode: 'decimal', placeholder: ph || '' }); return { el, node: h('div', { className: 'fld' }, h('label', { htmlFor: el.id }, ui(labelKey)), el) }; };
const mkChk = (labelKey, on) => { const el = h('input', { id: uid('st-b'), type: 'checkbox', checked: !!on }); return { el, node: h('div', { className: 'fld full' }, h('label', { className: 'chk', htmlFor: el.id }, el, h('span', {}, ui(labelKey)))) }; };
const PANELS = {
  desc: () => {
    const vs = mkChecks('s_vars_sel', idxOf('num'), () => true), g = mkSel('s_by', [noneOpt(), ...allOpts()], -1), pc = mkText('s_pct_in', '', '5, 95');
    const fs = h('fieldset', { className: 'fld full opts' }, h('legend', {}, ui('s_stats'))), cbs = [];
    for (const [k, key] of STATS) { const id = uid('st-k'), cb = h('input', { id, type: 'checkbox', checked: DEF_STATS.includes(k) }); cbs.push([k, cb]); fs.append(h('label', { className: 'chk', htmlFor: id }, cb, h('span', {}, ui(key)))); }
    const tr = h('input', { id: uid('st-t'), type: 'checkbox' }); fs.append(h('label', { className: 'chk', htmlFor: tr.id }, tr, h('span', {}, ui('s_tr'))));
    return { nodes: [vs.node, g.node, pc.node, fs], get: () => ({ vars: vs.get(), g: +g.el.value, pct: pc.el.value, stats: new Set(cbs.filter(([, c]) => c.checked).map(([k]) => k)), tr: tr.checked }) };
  },
  freq: () => { const D = S.D, vs = mkChecks('s_vars_sel', D.cols.map((c, i) => i), i => D.cols[i].kind === 'cat'); return { nodes: [vs.node], get: () => ({ vars: vs.get() }) }; },
  norm: () => { const vs = mkChecks('s_vars_sel', idxOf('num'), () => true); return { nodes: [vs.node], get: () => ({ vars: vs.get() }) }; },
  hom: () => { const v = mkSel('s_dep', numOpts()), gp = grpPair(false); return { nodes: [v.node, ...gp.items], get: () => ({ v: +v.el.value, g: +gp.g.el.value }) }; },
  cor: () => { const vs = mkChecks('s_vars_sel', idxOf('num'), () => true), m = mkSel('s_method', [['pearson', 'Pearson'], ['spearman', 'Spearman']]); return { nodes: [m.node, vs.node], get: () => ({ vars: vs.get(), method: m.el.value }) }; },
  t1: () => { const v = mkSel('s_dep', numOpts()), mu = mkText('s_mu', '0'), al = mkSel('s_alt', ALT()); return { nodes: [v.node, mu.node, al.node], get: () => ({ v: +v.el.value, mu: mu.el.value, alt: al.el.value }) }; },
  t2: () => { const v = mkSel('s_dep', numOpts()), gp = grpPair(true), al = mkSel('s_alt', ALT()); return { nodes: [v.node, ...gp.items, al.node], get: () => ({ v: +v.el.value, g: +gp.g.el.value, a: gp.a.el.value, b: gp.b.el.value, alt: al.el.value }) }; },
  tp: () => { const n = numOpts(), x = mkSel('s_var1', n), y = mkSel('s_var2', n, n.length > 1 ? n[1][0] : undefined), al = mkSel('s_alt', ALT()); return { nodes: [x.node, y.node, al.node], get: () => ({ x: +x.el.value, y: +y.el.value, alt: al.el.value }) }; },
  aov: () => { const v = mkSel('s_dep', numOpts()), gp = grpPair(false), tk = mkChk('s_tukey', true); return { nodes: [v.node, ...gp.items, tk.node], get: () => ({ v: +v.el.value, g: +gp.g.el.value, tukey: tk.el.checked }) }; },
  aov2: () => { const cats = idxOf('cat'), v = mkSel('s_dep', numOpts()), a = mkSel('s_fa', allOpts(), firstCat()), b = mkSel('s_fb', allOpts(), cats[1] ?? (S.D.cols.length > 1 ? 1 : 0)), it = mkChk('s_inter', true); return { nodes: [v.node, a.node, b.node, it.node], get: () => ({ v: +v.el.value, g: +a.el.value, g2: +b.el.value, inter: it.el.checked }) }; },
  mw: () => { const v = mkSel('s_dep', numOpts()), gp = grpPair(true); return { nodes: [v.node, ...gp.items], get: () => ({ v: +v.el.value, g: +gp.g.el.value, a: gp.a.el.value, b: gp.b.el.value }) }; },
  wx: () => { const n = numOpts(), x = mkSel('s_var1', n), y = mkSel('s_var2', n, n.length > 1 ? n[1][0] : undefined); return { nodes: [x.node, y.node], get: () => ({ x: +x.el.value, y: +y.el.value }) }; },
  kw: () => { const v = mkSel('s_dep', numOpts()), gp = grpPair(false); return { nodes: [v.node, ...gp.items], get: () => ({ v: +v.el.value, g: +gp.g.el.value }) }; },
  fried: () => { const vs = mkChecks('s_vars_sel', idxOf('num'), () => true); return { nodes: [vs.node], get: () => ({ vars: vs.get() }) }; },
  chi: () => { const cats = idxOf('cat'), x = mkSel('s_var1', allOpts(), cats[0] ?? 0), y = mkSel('s_var2', allOpts(), cats[1] ?? (S.D.cols.length > 1 ? 1 : 0)), pc = mkChk('s_showpct', false); return { nodes: [x.node, y.node, pc.node], get: () => ({ x: +x.el.value, y: +y.el.value, pct: pc.el.checked }) }; },
  gof: () => { const v = mkSel('s_cat', allOpts(), firstCat()), p = mkText('s_props', '', '1:2:1'); return { nodes: [v.node, p.node], get: () => ({ v: +v.el.value, props: p.el.value }) }; },
  binom: () => { const v = mkSel('s_cat', allOpts(), binCat()), s = mkSel('s_succ', []), p0 = mkText('s_p0', '0.5'), al = mkSel('s_alt', ALT()); lvlLink(v.el, s.el, 0); return { nodes: [v.node, s.node, p0.node, al.node], get: () => ({ v: +v.el.value, s: s.el.value, p0: p0.el.value, alt: al.el.value }) }; },
  reg: () => { const nums = idxOf('num'), y = mkSel('s_dep', numOpts()), xs = mkChecks('s_pred', nums, i => i !== nums[0]); return { nodes: [y.node, xs.node], get: () => ({ y: +y.el.value, xs: xs.get() }) }; },
  logit: () => { const y = mkSel('s_dv2', allOpts(), binCat()), ev = mkSel('s_evt', []), xs = mkChecks('s_pred', idxOf('num'), () => true); lvlLink(y.el, ev.el, 1); return { nodes: [y.node, ev.node, xs.node], get: () => ({ y: +y.el.value, ev: ev.el.value, xs: xs.get() }) }; },
  alpha: () => { const vs = mkChecks('s_items', idxOf('num'), () => true); return { nodes: [vs.node], get: () => ({ vars: vs.get() }) }; }
};
const CPANELS = {
  bar: () => {
    const v = mkSel('s_cat', allOpts(), firstCat()), st = mkSel('s_c_val', [['count', ui('s_freq')], ['percent', ui('s_c_pc')], ['mean', ui('s_mean')], ['median', ui('s_med')], ['sum', ui('s_ssum')]]), y = mkSel('s_c_ynum', numOpts()), er = mkSel('s_c_err', [['none', ui('s_c_no')], ['se', ui('s_c_se')], ['sd', ui('s_c_sd')], ['ci', ui('s_c_ci')]]), by = mkSel('s_c_by', [noneOpt(), ...allOpts()], -1), sk = mkChk('s_c_stack', false);
    return { nodes: [v.node, st.node, y.node, er.node, by.node, sk.node], get: () => ({ v: +v.el.value, stat: st.el.value, y: +y.el.value, err: er.el.value, by: +by.el.value, stacked: sk.el.checked }) };
  },
  hist: () => { const v = mkSel('s_dep', numOpts()), b = mkSel('s_c_bins', [['sturges', 'Sturges'], ['scott', 'Scott'], ['fd', 'Freedman–Diaconis']]), nb = mkText('s_c_nb', ''), dn = mkChk('s_c_dens', false); return { nodes: [v.node, b.node, nb.node, dn.node], get: () => ({ v: +v.el.value, bins: b.el.value, nb: nb.el.value, dens: dn.el.checked }) }; },
  box: () => { const vs = mkChecks('s_vars_sel', idxOf('num'), (i) => i === idxOf('num')[0]), g = mkSel('s_c_group', [noneOpt(), ...allOpts()], -1); return { nodes: [vs.node, g.node], get: () => ({ vars: vs.get(), g: +g.el.value }) }; },
  scat: () => { const n = numOpts(), x = mkSel('s_c_x', n), y = mkSel('s_c_y', n, n.length > 1 ? n[1][0] : undefined), g = mkSel('s_c_group', [noneOpt(), ...allOpts()], -1), f = mkChk('s_c_fit', true); return { nodes: [x.node, y.node, g.node, f.node], get: () => ({ x: +x.el.value, y: +y.el.value, g: +g.el.value, fit: f.el.checked }) }; },
  line: () => { const x = mkSel('s_c_x', [[-1, ui('s_c_row')], ...numOpts()], -1), vs = mkChecks('s_c_series', idxOf('num'), (i) => i === idxOf('num')[0]); return { nodes: [x.node, vs.node], get: () => ({ x: +x.el.value, vars: vs.get() }) }; },
  pie: () => { const v = mkSel('s_cat', allOpts(), firstCat()); return { nodes: [v.node], get: () => ({ v: +v.el.value }) }; },
  qq: () => { const vs = mkChecks('s_vars_sel', idxOf('num'), (i) => i === idxOf('num')[0]); return { nodes: [vs.node], get: () => ({ vars: vs.get() }) }; },
  heat: () => { const vs = mkChecks('s_vars_sel', idxOf('num'), () => true), m = mkSel('s_method', [['pearson', 'Pearson'], ['spearman', 'Spearman']]); return { nodes: [m.node, vs.node], get: () => ({ vars: vs.get(), method: m.el.value }) }; }
};
const numOpts = () => S.D.cols.map((c, i) => c.kind === 'num' ? [i, c.name] : null).filter(Boolean);
const MINNUM = { desc: 1, norm: 1, hom: 1, cor: 2, t1: 1, t2: 1, tp: 2, aov: 1, aov2: 1, mw: 1, wx: 2, kw: 1, fried: 2, reg: 2, logit: 1, alpha: 2 };
const CMINNUM = { bar: 0, hist: 1, box: 1, scat: 2, line: 1, pie: 0, qq: 1, heat: 2 };
const chBox = h('div', { className: 'st-an' }), GC_ = {}; S.onC = new Set();
const card = (id, name, on, dis, panel, set, store) => {
  const cb = h('input', { id: 'st-on-' + id, type: 'checkbox', checked: on && !dis, disabled: dis }), body = h('div', { className: 'flds st-p', hidden: !cb.checked });
  const p = dis ? null : panel(); if (p) body.append(...p.nodes);
  cb.addEventListener('change', () => { body.hidden = !cb.checked; cb.checked ? set.add(id) : set.delete(id); });
  store[id] = { cb, get: p && p.get };
  return h('div', { className: 'st-card' }, h('label', { className: 'chk st-h', htmlFor: cb.id }, cb, h('span', {}, name)), body);
};
const rebuildParams = () => {
  anBox.replaceChildren(); chBox.replaceChildren(); for (const k in G_) delete G_[k]; for (const k in GC_) delete GC_[k];
  if (!S.D) return;
  const nn = idxOf('num').length, nc = S.D.cols.length;
  for (const id of ORDER) {
    const dis = (MINNUM[id] || 0) > nn || ((id === 'chi') && nc < 2) || (id === 'aov2' && nc < 3);
    anBox.append(card(id, ui('s_a_' + id), S.on.has(id), dis, PANELS[id], S.on, G_));
  }
  for (const id of CORDER) {
    const dis = (CMINNUM[id] || 0) > nn || (id === 'bar' && false);
    chBox.append(card('c-' + id, ui('s_c_' + id), S.onC.has('c-' + id), dis, CPANELS[id], S.onC, GC_));
  }
};

/* --- options, run, results --- */
const alphaSel = h('select', { id: 'st-alpha' }, ...['0.1', '0.05', '0.01', '0.001'].map(v => h('option', { value: v }, v))); alphaSel.value = '0.05';
const dgSel = h('select', { id: 'st-dg' }, ...['2', '3', '4', '5', '6'].map(v => h('option', { value: v }, v))); dgSel.value = '3';
const runBtn = h('button', { className: 'btn', type: 'button' }, ui('s_run'));
const resBox = h('div', { className: 'st-out', 'aria-live': 'polite' }), outBar = h('div', { className: 'acts', hidden: true });
const dlX = h('button', { className: 'btn alt', type: 'button' }, ui('s_xlsx')), dlC = h('button', { className: 'btn alt', type: 'button' }, ui('s_csv')), cpA = h('button', { className: 'btn alt', type: 'button' }, ui('s_cpall'));
outBar.append(dlX, dlC, cpA);
const renderTable = (t, f) => {
  const cell = (c, th) => h(th ? 'th' : 'td', th ? { scope: 'row', dir: 'auto' } : { className: typeof c === 'string' ? '' : 'n', dir: 'auto' }, cellText(c, f));
  const wrap = h('div', { className: 'st-scroll' }, h('table', { className: 'st-t' }, h('caption', {}, t.cap),
    t.head.length ? h('thead', {}, h('tr', {}, ...t.head.map(x => h('th', { scope: 'col', dir: 'auto' }, x)))) : null,
    h('tbody', {}, ...t.rows.map(r => h('tr', {}, cell(r[0], true), ...r.slice(1).map(c => cell(c)))))));
  return [wrap, ...t.foot.map(x => h('p', { className: 'note' }, x))];
};
const slug = t => String(t).replace(/[^\w\u00C0-\u024F-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'chart';
const savePng = (svg, name) => {
  const mm = /viewBox="0 0 ([\d.]+) ([\d.]+)"/.exec(svg), w = +mm[1], hh = +mm[2], img = new Image(), url = URL.createObjectURL(new Blob([svgExport(svg)], { type: 'image/svg+xml;charset=utf-8' }));
  img.onload = () => { const cv = d.createElement('canvas'); cv.width = w * 2; cv.height = hh * 2; const cx = cv.getContext('2d'); cx.fillStyle = '#fff'; cx.fillRect(0, 0, cv.width, cv.height); cx.drawImage(img, 0, 0, cv.width, cv.height); URL.revokeObjectURL(url); cv.toBlob(b => { if (b) save(b, name); }, 'image/png'); };
  img.src = url;
};
const renderFigure = c => {
  const holder = h('div', { className: 'st-svg' }); holder.innerHTML = c.svg;
  const b1 = h('button', { className: 'btn alt', type: 'button' }, ui('s_c_dsvg')), b2 = h('button', { className: 'btn alt', type: 'button' }, ui('s_c_dpng')), nm = 'celverter-' + slug(c.title);
  b1.addEventListener('click', () => save(new Blob([svgExport(c.svg)], { type: 'image/svg+xml' }), nm + '.svg')); b2.addEventListener('click', () => savePng(c.svg, nm + '.png'));
  return h('figure', { className: 'st-fig' }, holder, h('div', { className: 'acts sm' }, b1, b2));
};
const tabular = res => res.filter(s => !s.charts);
const showResults = res => {
  S.last = res; const f = S.fmt, frag = [];
  res.forEach(s => { frag.push(h('h3', {}, s.title)); if (s.err) frag.push(h('p', { className: 'st-warn' }, s.err)); else if (s.charts) s.charts.forEach(c => frag.push(renderFigure(c))); else s.tables.forEach(t => frag.push(...renderTable(t, f))); });
  resBox.replaceChildren(h('h2', { id: 'st-rt' }, I.result || 'Result'), ...frag); outBar.hidden = !tabular(res).length;
  const r = resBox.getBoundingClientRect(); if (r.top < 0 || r.top > innerHeight * 0.8) resBox.scrollIntoView({ block: 'start' });
};
runBtn.addEventListener('click', () => {
  if (!S.D) { setErr('s_e_empty'); return; }
  setErr(''); S.fmt = { dg: +dgSel.value, dm: decSel.value === 'auto' ? S.D.dm : decSel.value };
  const an = {}, ch = {}; let any = false;
  for (const id of ORDER) { const g = G_[id]; if (g && g.cb.checked && g.get) { an[id] = g.get(); any = true; } }
  for (const id of CORDER) { const g = GC_['c-' + id]; if (g && g.cb.checked && g.get) { ch[id] = g.get(); any = true; } }
  if (!any) { setErr('s_e_none'); return; }
  runBtn.disabled = true; resBox.setAttribute('aria-busy', 'true');
  setTimeout(() => { try { const a = +alphaSel.value; showResults([...runAll(S.D, { alpha: a, an }, lang), ...runCharts(S.D, ch, lang, S.fmt, a)]); } finally { runBtn.disabled = false; resBox.removeAttribute('aria-busy'); } }, 20);
});
/* --- export --- */
const sheetName = (s, used) => { let n = s.replace(/[\[\]:*?\/\\]/g, ' ').trim().slice(0, 31) || 'Sheet'; let k = 2, b = n; while (used.has(n.toLowerCase())) n = b.slice(0, 28) + ' ' + k++; used.add(n.toLowerCase()); return n; };
const sectionRows = (s, f, raw) => {
  const rows = [], bold = new Set(); rows.push([s.title]); bold.add(0); rows.push([]);
  if (s.err) rows.push([s.err]);
  else s.tables.forEach(t => { bold.add(rows.length); rows.push([t.cap]); if (t.head.length) { bold.add(rows.length); rows.push(t.head.slice()); } t.rows.forEach(r => rows.push(r.map(c => raw ? cellRaw(c, f) : cellText(c, f)))); t.foot.forEach(x => rows.push([x])); rows.push([]); });
  return { rows, bold };
};
const save = (blob, name) => { const a = h('a', { href: URL.createObjectURL(blob), download: name }); d.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); };
dlX.addEventListener('click', () => { if (!S.last) return; const used = new Set(); save(buildXlsx(tabular(S.last).map(s => ({ name: sheetName(s.title, used), ...sectionRows(s, S.fmt, true) }))), 'celverter-statistics.xlsx'); });
dlC.addEventListener('click', () => {
  if (!S.last) return; const dm = S.fmt.dm, sep = dm === ',' ? ';' : ',', q = v => { const s = typeof v === 'number' ? plain(v, dm) : (v === null || v === undefined ? '' : String(v)); return /[";,\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
  const out = []; tabular(S.last).forEach(s => { sectionRows(s, S.fmt, true).rows.forEach(r => out.push(r.map(q).join(sep))); out.push(''); });
  save(new Blob(['\uFEFF' + out.join('\r\n')], { type: 'text/csv;charset=utf-8' }), 'celverter-statistics.csv');
});
cpA.addEventListener('click', async () => {
  if (!S.last) return; const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  let txt = '', html = '';
  tabular(S.last).forEach(s => { const r = sectionRows(s, S.fmt, false).rows; txt += r.map(x => x.join('\t')).join('\n') + '\n\n'; html += '<p><b>' + esc(s.title) + '</b></p>' + (s.err ? '<p>' + esc(s.err) + '</p>' : s.tables.map(t => '<table border="1"><caption>' + esc(t.cap) + '</caption>' + tableRows(t, S.fmt, false).map((x, i) => '<tr>' + x.map(c => (i === 0 && t.head.length ? '<th>' : '<td>') + esc(c) + (i === 0 && t.head.length ? '</th>' : '</td>')).join('') + '</tr>').join('') + '</table>').join('')); });
  try { if (window.ClipboardItem) await navigator.clipboard.write([new ClipboardItem({ 'text/plain': new Blob([txt], { type: 'text/plain' }), 'text/html': new Blob([html], { type: 'text/html' }) })]); else await navigator.clipboard.writeText(txt); cpA.textContent = I.copied || 'Copied'; setTimeout(() => cpA.textContent = ui('s_cpall'), 1500); } catch (e) { /* clipboard blocked */ }
});

const kofi = h('p', { className: 'donate' }, h('a', { href: 'https://ko-fi.com/celverter', target: '_blank', rel: 'noopener noreferrer' }, '☕ ' + (I.donate || 'Support Celverter on Ko-fi')));
root.replaceChildren(
  h('h2', { className: 'st-first' }, ui('s_data')),
  h('div', { className: 'flds' }, h('div', { className: 'fld' }, h('label', { htmlFor: 'st-file' }, ui('s_file')), fileIn), sheetWrap),
  h('div', { className: 'flds', style: 'margin-top:1rem' }, h('div', { className: 'fld full' }, h('label', { htmlFor: 'st-text' }, ui('s_paste')), ta), h('div', { className: 'fld' }, h('label', { htmlFor: 'st-dec' }, ui('s_dec')), decSel),
    h('div', { className: 'fld' }, h('label', { className: 'chk', htmlFor: 'st-hdr' }, hdrChk, h('span', {}, ui('s_hdr'))))),
  h('div', { className: 'acts' }, exBtn, clrBtn), info, errP, varsBox, prevBox,
  h('h2', {}, ui('s_an')), anBox, h('h2', {}, ui('s_c_sec')), chBox,
  h('h2', {}, ui('s_opt')), h('div', { className: 'flds' }, h('div', { className: 'fld' }, h('label', { htmlFor: 'st-alpha' }, ui('s_alpha')), alphaSel), h('div', { className: 'fld' }, h('label', { htmlFor: 'st-dg' }, ui('s_dg')), dgSel)),
  h('div', { className: 'acts' }, runBtn), resBox, outBar, kofi);
root.classList.add('stat');
render();
})();
