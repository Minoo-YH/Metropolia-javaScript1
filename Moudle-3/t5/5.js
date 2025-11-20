'use strict';

const section = document.getElementById('pictures');

// helper: create element + add classes + set text (اختیاری برای تمیزی کد)
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (typeof text === 'string') node.textContent = text;
  return node;
}

for (const item of picArray) {
  // <article class="card">
  const article = el('article', 'card');

  // <h2>title</h2>
  const h2 = el('h2', null, item.title);
  article.appendChild(h2);

  // <figure> + <img> + <figcaption>
  const figure = el('figure');
  const img = document.createElement('img');
  img.src = item.image.medium;     // medium for article
  img.alt = item.title;            // accessibility
  const caption = el('figcaption', null, item.caption);
  figure.appendChild(img);
  figure.appendChild(caption);
  article.appendChild(figure);

  // <p>description</p>
  const p = el('p', null, item.description);
  article.appendChild(p);

  // add article to section
  section.appendChild(article);
}

