const list = document.getElementById("dog-list");
const dogs = [];

// Ask for 6 dog names
for (let i = 0; i < 6; i++) {
  const name = prompt("Enter the name of dog " + (i + 1) + ":");
  // keep something even if user cancels/empties
  dogs.push(name && name.trim() ? name.trim() : "Unknown dog " + (i + 1));
}

// Sort in reverse alphabetical order (Z → A) without using reverse()
dogs.sort((a, b) => b.localeCompare(a));

// Render to <ul>
for (const dog of dogs) {
  const li = document.createElement("li");
  li.textContent = dog;
  list.appendChild(li);
}
