// 1) find the target element
const target = document.getElementById('target');

// 2) add HTML using innerHTML (exactly as required)
target.innerHTML = `
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
`;

// 3) add class "my-list" to #target
target.classList.add('my-list');
