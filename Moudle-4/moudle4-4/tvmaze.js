// Get form, input and results container
const form = document.getElementById('search-form');
const queryInput = document.getElementById('query');
const resultsContainer = document.getElementById('results');

// Listen to form submit event
form.addEventListener('submit', function (event) {
  // جلوگیری از رفرش صفحه
  event.preventDefault();

  const query = queryInput.value.trim();

  if (!query) {
    resultsContainer.innerHTML = '<p class="no-results">Please enter a TV show name.</p>';
    return;
  }

  const url = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`;

  // درخواست با fetch
  fetch(url)
    .then(function (response) {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(function (data) {
      // چاپ نتیجه در کنسول (طبق تمرین)
      console.log('Search result:', data);

      // رندر کردن روی صفحه
      renderResults(data);
    })
    .catch(function (error) {
      console.error('Fetch error:', error);
      resultsContainer.innerHTML = '<p class="no-results">An error occurred while fetching data.</p>';
    });
});

/**
 * رندر کردن نتایج روی صفحه
 * - برای هر سریال یک <article> ساخته می‌شود
 * - Name در <h2>
 * - URL در <a> با target="_blank"
 * - تصویر medium یا تصویر پیش‌فرض در <img>
 * - summary در <div>
 */
function renderResults(data) {
  // پاک کردن نتایج قبلی
  resultsContainer.innerHTML = '';

  if (!data || data.length === 0) {
    resultsContainer.innerHTML = '<p class="no-results">No results found.</p>';
    return;
  }

  data.forEach(function (item) {
    const tvShow = item.show;

    // ساخت article
    const article = document.createElement('article');

    // 1. Name در <h2>
    const title = document.createElement('h2');
    title.textContent = tvShow.name || 'No name available';
    article.appendChild(title);

    // 2. Link در <a> با target="_blank"
    if (tvShow.url) {
      const link = document.createElement('a');
      link.href = tvShow.url;           // لینک جزئیات از TVMaze
      link.target = '_blank';           // باز شدن در تب جدید
      link.rel = 'noopener noreferrer'; // برای امنیت
      link.textContent = 'View details on TVMaze';
      article.appendChild(link);
    }

    // 3. تصویر با ternary operator و تصویر پیش‌فرض
    const img = document.createElement('img');
    const defaultImageUrl = 'https://placehold.co/210x295?text=Not%20Found';

    // اگر تصویر medium وجود داشت از آن استفاده کن، در غیر این صورت placeholder
    const imageUrl =
      tvShow.image && tvShow.image.medium
        ? tvShow.image.medium
        : defaultImageUrl;

    img.src = imageUrl;
    img.alt = tvShow.name || 'TV show image';
    article.appendChild(img);

    // 4. summary در <div> (خودش حاوی <p> است، پس <p> نسازیم)
    const summaryDiv = document.createElement('div');
    summaryDiv.innerHTML = tvShow.summary || 'No summary available.';
    article.appendChild(summaryDiv);

    // اضافه کردن article به نتایج
    resultsContainer.appendChild(article);
  });
}

