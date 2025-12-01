// --- Part 1: Random joke in the console (from previous step) ---
function getRandomChuckNorrisJoke() {
  fetch("https://api.chucknorris.io/jokes/random")
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      // Print only the 'value' property (the joke text)
      console.log("Random Chuck Norris joke:");
      console.log(data.value);
    })
    .catch(error => {
      console.error("Error while fetching the random joke:", error);
    });
}

// Call the function as soon as the script runs
getRandomChuckNorrisJoke();


// --- Part 2: Search form and printing jokes as <article><p>Joke here</p></article> ---

// Get references to DOM elements
const form = document.getElementById("joke-form");
const searchInput = document.getElementById("search-input");
const resultsContainer = document.getElementById("results");

// Listen to the form submit event
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Stop the page from reloading

  const query = searchInput.value.trim();

  if (!query) {
    // If the input is empty, do nothing (or you could show a message)
    return;
  }

  // Clear previous results
  resultsContainer.innerHTML = "";

  // Optional: show loading text
  const loadingParagraph = document.createElement("p");
  loadingParagraph.textContent = "Loading...";
  resultsContainer.appendChild(loadingParagraph);

  // Build the URL with the search term
  const url = `https://api.chucknorris.io/jokes/search?query=${encodeURIComponent(query)}`;

  // Fetch jokes based on the search term
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      // Clear the loading text
      resultsContainer.innerHTML = "";

      const jokes = data.result; // 'result' is an array of jokes

      if (!jokes || jokes.length === 0) {
        const noResults = document.createElement("p");
        noResults.textContent = "No jokes found.";
        resultsContainer.appendChild(noResults);
        return;
      }

      // Print each joke in the required format:
      // <article>
      //   <p>Joke here</p>
      // </article>
      jokes.forEach(jokeObj => {
        const article = document.createElement("article");
        const p = document.createElement("p");

        p.textContent = jokeObj.value; // the joke text
        article.appendChild(p);

        resultsContainer.appendChild(article);
      });
    })
    .catch(error => {
      resultsContainer.innerHTML = "";
      const errorParagraph = document.createElement("p");
      errorParagraph.textContent = "Error while fetching jokes.";
      resultsContainer.appendChild(errorParagraph);
      console.error("Error while fetching search jokes:", error);
    });
});
