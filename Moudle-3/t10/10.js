'use strict';

const form = document.getElementById('source');
const out  = document.getElementById('target');

form.addEventListener('submit', (e) => {
  e.preventDefault(); // stop default form submit/refresh

  // attribute selectors per instructions
  const first = form.querySelector('input[name="firstname"]').value.trim();
  const last  = form.querySelector('input[name="lastname"]').value.trim();

  if (!first || !last) {
    out.textContent = 'Please enter both first and last name.';
    return;
  }

  out.textContent = `Your name is ${first} ${last}`;
});
