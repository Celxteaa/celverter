'use strict';
/* Merges content-a.js and content-b.js into one lookup: id -> { steps: [[6 values] x 3], faq: [[q6, a6], ...] }.
   Each string lists six values in the order of L (en|es|pt|id|hi|ar); a wrong count stops the build. */
const A = require('./content-a'), B = require('./content-b');
const six = s => {
  const a = s.split('|');
  if (a.length !== 6) throw new Error('content needs 6 values, got ' + a.length + ': ' + s.slice(0, 70));
  return a;
};
const STEPS = { ...A.steps, ...B.steps };
const ENTRIES = { ...A.tools, ...B.tools };
const out = {};
for (const id of Object.keys(ENTRIES)) {
  const e = ENTRIES[id];
  const st = STEPS[e.steps];
  if (!st || st.length !== 3) throw new Error('bad steps group for ' + id);
  out[id] = {
    steps: st.map(six),
    faq: [...e.faq, A.faqShared].map(([q, a]) => [six(q), six(a)])
  };
}
module.exports = out;
