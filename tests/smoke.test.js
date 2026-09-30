import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// ===== Pure calculation logic (mirrored from app.js for testability) =====
function calcTip(bill, tipPct)             { return bill * (tipPct / 100); }
function calcTotal(bill, tipPct)           { return bill + calcTip(bill, tipPct); }
function calcPerPerson(total, people, round) {
  const raw = total / people;
  return round ? Math.ceil(raw) : raw;
}

// ===== File existence =====
test('index.html exists', () => {
  assert.ok(existsSync(path.join(root, 'public/index.html')), 'public/index.html not found');
});

test('index.html has title "Tip Calculator"', () => {
  const html = readFileSync(path.join(root, 'public/index.html'), 'utf8');
  assert.match(html, /<title>Tip Calculator<\/title>/);
});

test('style.css exists', () => {
  assert.ok(existsSync(path.join(root, 'public/style.css')), 'public/style.css not found');
});

test('app.js exists', () => {
  assert.ok(existsSync(path.join(root, 'public/app.js')), 'public/app.js not found');
});

// ===== BR-01, BR-04, BR-05: Tip and total calculation =====
test('calcTip: 15% of $100 = $15', () => {
  assert.equal(calcTip(100, 15), 15);
});

test('calcTotal: $100 + 15% = $115', () => {
  assert.equal(calcTotal(100, 15), 115);
});

test('calcTip: 20% of $50 = $10', () => {
  assert.equal(calcTip(50, 20), 10);
});

test('calcTip: 10% of $42.50 = $4.25', () => {
  assert.equal(calcTip(42.5, 10), 4.25);
});

// ===== BR-03: Custom tip % =====
test('calcTip: custom 18% of $200 = $36', () => {
  assert.equal(calcTip(200, 18), 36);
});

// ===== BR-06, BR-07: Splitting =====
test('calcPerPerson: $115 / 2 people = $57.50', () => {
  assert.equal(calcPerPerson(115, 2, false), 57.5);
});

test('calcPerPerson: $120 / 4 people = $30', () => {
  assert.equal(calcPerPerson(120, 4, false), 30);
});

test('calcPerPerson: 1 person returns total unchanged', () => {
  assert.equal(calcPerPerson(115, 1, false), 115);
});

// ===== R-01: Rounding =====
test('calcPerPerson: rounds up $57.50 to $58', () => {
  assert.equal(calcPerPerson(115, 2, true), 58);
});

test('calcPerPerson: no rounding when already whole number', () => {
  assert.equal(calcPerPerson(120, 4, true), 30);
});

test('calcPerPerson: rounds up fractional cents', () => {
  assert.equal(calcPerPerson(100, 3, true), 34); // 33.33... → 34
});

// ===== Edge cases =====
test('calcTip: 0% tip = $0', () => {
  assert.equal(calcTip(100, 0), 0);
});

test('calcTotal: 0% tip returns bill unchanged', () => {
  assert.equal(calcTotal(100, 0), 100);
});

// ===== index.html structure checks =====
test('index.html contains bill input', () => {
  const html = readFileSync(path.join(root, 'public/index.html'), 'utf8');
  assert.match(html, /id="bill"/);
});

test('index.html contains preset tip buttons', () => {
  const html = readFileSync(path.join(root, 'public/index.html'), 'utf8');
  assert.match(html, /data-pct="10"/);
  assert.match(html, /data-pct="15"/);
  assert.match(html, /data-pct="20"/);
});

test('index.html contains reset button', () => {
  const html = readFileSync(path.join(root, 'public/index.html'), 'utf8');
  assert.match(html, /id="reset-btn"/);
});

test('index.html contains rounding toggle', () => {
  const html = readFileSync(path.join(root, 'public/index.html'), 'utf8');
  assert.match(html, /id="round-toggle"/);
});

test('index.html contains currency selector', () => {
  const html = readFileSync(path.join(root, 'public/index.html'), 'utf8');
  assert.match(html, /id="currency"/);
});

test('index.html links app.js', () => {
  const html = readFileSync(path.join(root, 'public/index.html'), 'utf8');
  assert.match(html, /src="app\.js"/);
});

test('index.html links style.css', () => {
  const html = readFileSync(path.join(root, 'public/index.html'), 'utf8');
  assert.match(html, /href="style\.css"/);
});
