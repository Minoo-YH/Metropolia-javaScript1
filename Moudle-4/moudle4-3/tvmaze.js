// Get form, input and results container
const form = document.getElementById('search-form');
const queryInput = document.getElementById('query');
const resultsContainer = document.getElementById('results');

// Listen to form submit event
form.addEventListener('submit', function (event) {
  // جلوگیری از رفتار پیش‌فرض (رفتن به صفحه‌ی جدید)
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
 * - برای هر سریال، یک <article> می‌سازیم
 * - داخلش: <h2> name </h2>
 *          <a href="url" target="_blank">...</a>
 *          <img> (اگر تصویر بود)
 *          <div> summary </div>
 */
function renderResults(data) {
  // پاک کردن نتایج قبلی طبق تمرین: innerHTML = ''
  resultsContainer.innerHTML = '';

  if (!data || data.length === 0) {
    resultsContainer.innerHTML = '<p class="no-results">No results found.</p>';
    return;
  }

  data.forEach(function (item) {
    const tvShow = item.show;

    // ساختن article
    const article = document.createElement('article');

    // 1. Name در <h2>
    const title = document.createElement('h2');
    title.textContent = tvShow.name || 'No name available';
    article.appendChild(title);

    // 2. Link to details در <a> با target="_blank"
    if (tvShow.url) {
      const link = document.createElement('a');
      link.href = tvShow.url;           // url از TVMaze
      link.target = '_blank';           // باز شدن در تب جدید
      link.rel = 'noopener noreferrer'; // برای امنیت بهتر
      link.textContent = 'View details on TVMaze';
      article.appendChild(link);
    }

    // 3. Medium image با optional chaining
    //    اگر image نبود، چیزی اضافه نمی‌کنیم (تا ارور نده)
    const imageUrl = tvShow.image?.medium; // این همون optional chaining ـه
    if (imageUrl) {
      const img = document.createElement('img');
      img.src = imageUrl;                          // medium image
      img.alt = tvShow.name || 'TV show image';    // name در alt
      article.appendChild(img);
    }

    // 4. Summary در <div>
    // summary خودش حاوی <p> هست، پس از div استفاده می‌کنیم
    const summaryDiv = document.createElement('div');
    summaryDiv.innerHTML = tvShow.summary || 'No summary available.';
    article.appendChild(summaryDiv);

    // در نهایت: append کردن article به #results
    resultsContainer.appendChild(article);
  });
}
