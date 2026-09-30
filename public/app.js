// ===== Calculator logic (pure functions — also importable by tests) =====

export function calcTip(bill, tipPct) {
  return bill * (tipPct / 100);
}

export function calcTotal(bill, tipPct) {
  return bill + calcTip(bill, tipPct);
}

export function calcPerPerson(total, people, round) {
  const raw = total / people;
  return round ? Math.ceil(raw) : raw;
}

export function formatAmount(amount, symbol) {
  return symbol + amount.toFixed(2);
}

// ===== Currency symbols =====
const CURRENCY_SYMBOLS = { USD: '$', EUR: '€', GBP: '£', SAR: 'SAR ' };

// ===== State =====
const state = {
  bill: null,
  tipPct: 15,
  people: 1,
  round: false,
  currency: 'USD',
};

// ===== DOM refs =====
const billInput    = document.getElementById('bill');
const customTip    = document.getElementById('custom-tip');
const presetBtns   = document.querySelectorAll('.preset-btn');
const peopleInput  = document.getElementById('people');
const decBtn       = document.getElementById('dec-people');
const incBtn       = document.getElementById('inc-people');
const roundToggle  = document.getElementById('round-toggle');
const currencyEl   = document.getElementById('currency');
const tipAmountEl  = document.getElementById('result-tip');
const totalEl      = document.getElementById('result-total');
const perPersonEl  = document.getElementById('result-per');
const perPersonRow = document.getElementById('per-person-row');
const billError    = document.getElementById('bill-error');
const peopleError  = document.getElementById('people-error');
const resetBtn     = document.getElementById('reset-btn');

// ===== Validation =====
function validateBill(val) {
  if (val === '' || val === null) return 'Please enter a bill amount.';
  const n = parseFloat(val);
  if (isNaN(n)) return 'Bill amount must be a number.';
  if (n < 0)    return 'Bill amount cannot be negative.';
  return null;
}

function validatePeople(val) {
  const n = parseInt(val, 10);
  if (isNaN(n) || n < 1)         return 'Number of people must be at least 1.';
  if (String(n) !== String(val).trim()) return 'Number of people must be a whole number.';
  return null;
}

// ===== Recalculate & render =====
function recalc() {
  const symbol = CURRENCY_SYMBOLS[state.currency];

  const billErr  = validateBill(state.bill);
  const peopleErr = validatePeople(state.people);

  billError.textContent   = billErr   || '';
  billError.classList.toggle('visible', !!billErr);
  billInput.classList.toggle('error', !!billErr);

  peopleError.textContent = peopleErr || '';
  peopleError.classList.toggle('visible', !!peopleErr);
  peopleInput.classList.toggle('error', !!peopleErr);

  if (billErr || peopleErr || state.bill === null || state.bill === '') {
    tipAmountEl.textContent = symbol + '0.00';
    totalEl.textContent     = symbol + '0.00';
    perPersonEl.textContent = symbol + '0.00';
    return;
  }

  const bill   = parseFloat(state.bill);
  const tip    = calcTip(bill, state.tipPct);
  const total  = calcTotal(bill, state.tipPct);
  const per    = calcPerPerson(total, state.people, state.round);

  tipAmountEl.textContent = formatAmount(tip,   symbol);
  totalEl.textContent     = formatAmount(total, symbol);
  perPersonEl.textContent = formatAmount(per,   symbol);

  // Show per-person row only when people > 1
  perPersonRow.style.display = state.people > 1 ? '' : 'none';
}

// ===== Event handlers =====

// Bill input
billInput.addEventListener('input', () => {
  state.bill = billInput.value;
  recalc();
});

// Preset tip buttons
presetBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    state.tipPct = parseInt(btn.dataset.pct, 10);
    customTip.value = '';
    presetBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    recalc();
  });
});

// Custom tip
customTip.addEventListener('input', () => {
  const v = parseFloat(customTip.value);
  if (!isNaN(v) && v >= 0) {
    state.tipPct = v;
    presetBtns.forEach(b => b.classList.remove('active'));
  }
  recalc();
});

// People stepper
peopleInput.addEventListener('input', () => {
  const v = parseInt(peopleInput.value, 10);
  state.people = isNaN(v) ? peopleInput.value : v;
  decBtn.disabled = (parseInt(peopleInput.value, 10) <= 1);
  recalc();
});

decBtn.addEventListener('click', () => {
  const cur = parseInt(peopleInput.value, 10) || 1;
  if (cur > 1) {
    peopleInput.value = cur - 1;
    state.people = cur - 1;
    decBtn.disabled = (cur - 1 <= 1);
    recalc();
  }
});

incBtn.addEventListener('click', () => {
  const cur = parseInt(peopleInput.value, 10) || 1;
  peopleInput.value = cur + 1;
  state.people = cur + 1;
  decBtn.disabled = false;
  recalc();
});

// Rounding toggle
roundToggle.addEventListener('change', () => {
  state.round = roundToggle.checked;
  recalc();
});

// Currency
currencyEl.addEventListener('change', () => {
  state.currency = currencyEl.value;
  recalc();
});

// Reset
resetBtn.addEventListener('click', () => {
  state.bill     = null;
  state.tipPct   = 15;
  state.people   = 1;
  state.round    = false;
  state.currency = 'USD';

  billInput.value    = '';
  customTip.value    = '';
  peopleInput.value  = '1';
  roundToggle.checked = false;
  currencyEl.value   = 'USD';
  decBtn.disabled    = true;

  presetBtns.forEach(b => b.classList.remove('active'));
  document.querySelector('.preset-btn[data-pct="15"]').classList.add('active');

  billError.classList.remove('visible');
  peopleError.classList.remove('visible');
  billInput.classList.remove('error');
  peopleInput.classList.remove('error');

  recalc();
});

// ===== Init =====
recalc();
