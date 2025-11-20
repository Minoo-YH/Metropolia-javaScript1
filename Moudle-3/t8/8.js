'use strict';

const aEl = document.getElementById('num1');
const bEl = document.getElementById('num2');
const opEl = document.getElementById('operation');
const btn  = document.getElementById('start');
const out  = document.getElementById('result');

function calculate() {
  // read & parse (اجازه می‌دیم اعشاری هم باشه)
  const a = parseFloat(aEl.value.trim());
  const b = parseFloat(bEl.value.trim());
  const op = opEl.value; // 'add' | 'sub' | 'multi' | 'div'

  if (Number.isNaN(a) || Number.isNaN(b)) {
    out.textContent = 'Please enter valid numbers.';
    return;
  }

  let res;
  switch (op) {
    case 'add':
      res = a + b;
      break;
    case 'sub':
      res = a - b;
      break;
    case 'multi':     // توجه: توی HTML گفتی multi (نه mul)
      res = a * b;
      break;
    case 'div':
      if (b === 0) {
        out.textContent = 'Division by zero is not allowed.';
        return;
      }
      res = a / b;
      break;
    default:
      out.textContent = 'Unknown operation.';
      return;
  }

  out.textContent = `Result: ${res}`;
}

btn.addEventListener('click', calculate);

// optional: Enter = calculate
[aEl, bEl, opEl].forEach(el => {
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') calculate();
  });
});
