'use strict';

// elements
const img = document.getElementById('target');
const trigger = document.getElementById('trigger');

// swap functions
function showB() {
  img.src = 'img/picB.jpg';
}
function showA() {
  img.src = 'img/picA.jpg';
}

// mouse interactions
trigger.addEventListener('mouseenter', showB);
trigger.addEventListener('mouseleave', showA);

// (optional) keyboard accessibility
trigger.setAttribute('tabindex', '0');
trigger.addEventListener('focus', showB);
trigger.addEventListener('blur', showA);
