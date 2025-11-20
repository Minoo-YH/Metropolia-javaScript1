'use strict';

// اگر picArray را از t5 کپی نکرده‌ای، اینجا همان را بیاور:
const picArray = [
  {
    title: 'Title 1',
    caption: 'Caption 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    image: { large: 'img/pic1.jpg', medium: 'thumbnails/pic1.jpg' },
  },
  {
    title: 'Title 2',
    caption: 'Caption 2',
    description:
      'Donec dignissim tincidunt nisl, non scelerisque massa pharetra ut...',
    image: { large: 'img/pic2.jpg', medium: 'thumbnails/pic2.jpg' },
  },
  // ... بقیه آیتم‌ها مثل t5
];

const section   = document.getElementById('pictures');
const dialog    = document.getElementById('viewer');
const dialogImg = document.getElementById('viewerImg');
const closeBtn  = document.getElementById('closeBtn');

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (typeof text === 'string') node.textContent = text;
  return node;
}

// ساخت کارت‌ها (همانند t5 – بدون innerHTML)
for (const item of picArray) {
  const article = el('article', 'card');

  const h2 = el('h2', null, item.title);
  article.appendChild(h2);

  const figure = el('figure');
  const img = document.createElement('img');
  img.src = item.image.medium;   // medium در کارت
  img.alt = item.title;
  const cap = el('figcaption', null, item.caption);
  figure.appendChild(img);
  figure.appendChild(cap);
  article.appendChild(figure);

  const p = el('p', null, item.description);
  article.appendChild(p);

  // کلیک روی کارت -> باز کردن مودال با عکس بزرگ
  article.addEventListener('click', () => {
    dialogImg.src = item.image.large; // large در مودال
    dialogImg.alt = item.title;
    dialog.showModal();
  });

  section.appendChild(article);
}

// بستن مودال با span (ضربدر)
closeBtn.addEventListener('click', () => dialog.close());

// (اختیاری) کلیک روی بک‌دراپ بیرون تصویر -> بستن
dialog.addEventListener('click', (e) => {
  const dialogRect = dialog.getBoundingClientRect();
  const inside =
    e.clientX >= dialogRect.left &&
    e.clientX <= dialogRect.right &&
    e.clientY >= dialogRect.top &&
    e.clientY <= dialogRect.bottom;

  // اگر روی بخش بیرونی (backdrop) کلیک شد، ببند
  if (!inside) dialog.close();
});

// Note: ESC به‌صورت پیش‌فرض <dialog> را می‌بندد
