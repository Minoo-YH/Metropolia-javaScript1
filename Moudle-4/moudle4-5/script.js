// Function to fetch a random Chuck Norris joke and print it to the console
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
      console.error("Error while fetching the joke:", error);
    });
}

// Call the function as soon as the script runs
getRandomChuckNorrisJoke();
