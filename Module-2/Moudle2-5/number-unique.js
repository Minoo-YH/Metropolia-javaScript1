// Prompt for numbers until the user repeats a previously entered number.
// Then announce the duplicate, stop, and print all numbers ascending.

const startBtn = document.getElementById("start-btn");
const resultBox = document.getElementById("result");
const chips = document.getElementById("chips");
const duplicateNote = document.getElementById("duplicate-note");
const message = document.getElementById("message");

startBtn.addEventListener("click", () => {
  const numbers = [];
  const seen = new Set();
  let duplicate = null;

  while (true) {
    const input = prompt("Enter a number (duplicate to stop):");

    // If user cancels, keep asking
    if (input === null) continue;

    const value = Number(input);

    if (Number.isNaN(value)) {
      alert("Please enter a valid number.");
      continue;
    }

    // Check duplicate
    if (seen.has(value)) {
      duplicate = value;
      alert(`The number ${value} has already been given. Stopping...`);
      break;
    }

    // Record new number
    seen.add(value);
    numbers.push(value);
  }

  // Sort ascending
  numbers.sort((a, b) => a - b);

  // Print to console
  console.log("Numbers in ascending order:");
  numbers.forEach(n => console.log(n));

  // Render nicely on page
  chips.innerHTML = "";
  const palette = ["#22c55e","#06b6d4","#f59e0b","#8b5cf6","#ef4444","#3b82f6","#10b981","#f97316","#84cc16","#e11d48"];
  numbers.forEach((n, idx) => {
    const color = palette[idx % palette.length];
    const span = document.createElement("span");
    span.className = "chip";
    span.style.borderColor = color + "55";
    span.style.background = color + "15";
    span.style.color = "#111827";
    span.textContent = n;
    chips.appendChild(span);
  });

  if (duplicate !== null) {
    duplicateNote.textContent = `Stopped because ${duplicate} was entered twice.`;
  } else {
    duplicateNote.textContent = "";
  }

  message.innerHTML = "<strong>Sorted (asc):</strong>";
  resultBox.style.display = "block";
});
