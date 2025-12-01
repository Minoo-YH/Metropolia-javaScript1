console.log('✅ tvmaze.js loaded'); 
// Get form, input and results container
const form = document.getElementById('search-form');
const queryInput = document.getElementById('query');
const resultsContainer = document.getElementById('results');

console.log('form:', form);
console.log('queryInput:', queryInput);
console.log('resultsContainer:', resultsContainer);

// اگر هرکدوم از اینا null باشن یعنی id اشتباهه یا اسکریپت زودتر از HTML لود شده
if (!form || !queryInput || !resultsContainer) {
  console.error('❌ One or more elements not found. Check IDs and script position.');
}

// Listen to form submit event
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const query = queryInput.value.trim();
  console.log('🔎 Form submitted with query:', query);

  if (!query) {
    console.log('Please enter a TV show name.');
    resultsContainer.innerHTML = '<p class="no-results">Please enter a TV show name first.</p>';
    return;
  }

  resultsContainer.innerHTML = `<p>Searching for "<strong>${escapeHtml(query)}</strong>" ...</p>`;

  const url = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`;
  console.log('🌐 Fetch URL:', url);

  fetch(url)
    .then(function (response) {
      console.log('📩 Response status:', response.status);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(function (data) {
      console.log('✅ Search result from API:', data);
      renderResults(data);
    })
    .catch(function (error) {
      console.error('❌ Fetch error:', error);
      resultsContainer.innerHTML = '<p class="no-results">An error occurred while fetching data.</p>';
    });
});

function renderResults(data) {
  if (!data || data.length === 0) {
    resultsContainer.innerHTML = '<p class="no-results">No results found. Try another show name.</p>';
    return;
  }

  let html = '';
  data.forEach(function (item, index) {
    const show = item.show;
    const name = show.name || 'No name';
    const language = show.language || 'Unknown';
    const premiered = show.premiered || 'Unknown';

    html += `
      <div class="show-card">
        <h2>${index + 1}. ${escapeHtml(name)}</h2>
        <p><strong>Language:</strong> ${escapeHtml(language)}</p>
        <p><strong>Premiered:</strong> ${escapeHtml(premiered)}</p>
      </div>
    `;
  });

  resultsContainer.innerHTML = html;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
