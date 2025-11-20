'use strict';

const students = [
  { name: 'John',  id: '2345768' },
  { name: 'Paul',  id: '2134657' },
  { name: 'Jones', id: '5423679' },
];

// 1) get the <select id="target">
const select = document.getElementById('target');

// 2) create <option> for each student and append to select
for (const student of students) {
  const opt = document.createElement('option');
  opt.value = student.id;     // value attribute
  opt.textContent = student.name; // visible text
  select.appendChild(opt);
}
