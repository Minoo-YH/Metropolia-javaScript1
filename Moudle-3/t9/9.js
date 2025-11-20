'use strict';

const input = document.getElementById('calculation');
const btn   = document.getElementById('start');
const out   = document.getElementById('result');

function normalize(expr) {
  // remove spaces and normalize similar symbols
  return expr
    .replace(/\s+/g, '')
    .replace(/[xX×]/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-');
}

function calculateExpression() {
  let expr = input.value || '';
  expr = normalize(expr);

  if (!expr) {
    out.textContent = 'Please enter a calculation like 3+5';
    return;
  }

  let a, b, op, parts;

  // Use includes + split (as required). Handle '-' not at position 0 to avoid leading minus ambiguity.
  if (expr.includes('+')) {
    op = '+';
    parts = expr.split('+');
  } else if (expr.indexOf('-', 1) !== -1) {
    // find '-' after first char, so "-5+2" won't be mistaken (we assume positive ints but this is safer)
    op = '-';
    parts = [expr.slice(0, expr.indexOf('-', 1)), expr.slice(expr.indexOf('-', 1) + 1)];
  } else if (expr.includes('*')) {
    op = '*';
    parts = expr.split('*');
  } else if (expr.includes('/')) {
    op = '/';
    parts = expr.split('/');
  } else {
    out.textContent = 'Unknown or missing operator. Use +, -, *, /';
    return;
  }

  if (parts.length !== 2 || parts[0] === '' || parts[1] === '') {
    out.textContent = 'Invalid format. Example: 3+5, 2-78, 3/6, 9*4';
    return;
  }

  // integers only (per instructions)
  a = parseInt(parts[0], 10);
  b = parseInt(parts[1], 10);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    out.textContent = 'Please enter integers only.';
    return;
  }

  let result;
  switch (op) {
    case '+':
      result = a + b;
      break;
    case '-':
      result = a - b;
      break;
    case '*':
      result = a * b;
      break;
    case '/':
      if (b === 0) {
        out.textContent = 'Division by zero is not allowed.';
        return;
      }
      // integer division? spec says integers are enough to *support*, not necessarily force integer result.
      result = a / b;
      break;
    default:
      out.textContent = 'Unknown operator.';
      return;
  }

  out.textContent = `Result: ${result}`;
}

btn.addEventListener('click', calculateExpression);

// optional: press Enter to calculate
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') calculateExpression();
});
