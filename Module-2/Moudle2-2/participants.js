const listElement = document.getElementById("participants-list");

const countInput = prompt("Enter the number of participants:");
const count = parseInt(countInput, 10);

if (isNaN(count) || count <= 0) {
  const li = document.createElement("li");
  li.textContent = "Please enter a valid positive number of participants.";
  listElement.appendChild(li);
} else {
  const names = [];

  for (let i = 0; i < count; i++) {
    const name = prompt("Enter the name of participant " + (i + 1) + ":");
    if (name) {
      names.push(name.trim());
    } else {
      names.push("Unknown " + (i + 1));
    }
  }

  // sort alphabetically
  names.sort((a, b) => a.localeCompare(b));

  for (const name of names) {
    const li = document.createElement("li");
    li.textContent = name;
    listElement.appendChild(li);
  }
}
