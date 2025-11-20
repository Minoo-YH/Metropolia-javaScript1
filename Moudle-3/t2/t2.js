// target UL
const target = document.getElementById('target');

// the three labels we need to add
const labels = ['First item', 'Second item', 'Third item'];

// create <li> elements and append to #target
labels.forEach((text, idx) => {
  const li = document.createElement('li');
  li.textContent = text;
  target.appendChild(li);

  // add class "my-item" to the second list item (idx === 1)
  if (idx === 1) {
    li.classList.add('my-item');
  }
});
