// Ask for numbers until user enters 0, then print descending to Console
// and render nicely on the page.

const startBtn = document.getElementById("start-btn");
const resultBox = document.getElementById("result");
const chips = document.getElementById("chips");

startBtn.addEventListener("click", () => {
  const numbers = [];

  while (true) {
    const input = prompt("Enter a number (0 to finish):");

    // If user cancels, continue asking (ignore null)
    if (input === null) continue;

    const value = Number(input);

    if (Number.isNaN(value)) {
      alert("Please enter a valid number.");
      continue;
    }

    if (value === 0) break;

    numbers.push(value);
  }

  if (numbers.length === 0) {
    console.log("No numbers were entered.");
    chips.innerHTML = "";
    resultBox.style.display = "block";
    chips.insertAdjacentHTML("beforeend", `<span class="chip">No numbers</span>`);
    return;
  }

  // Sort descending (largest -> smallest)
  numbers.sort((a, b) => b - a);

  // Print to console
  console.log("Numbers from largest to smallest:");
  for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i]);
  }

  // Render to page as colorful chips
  const palette = ["#ef4444","#f59e0b","#10b981","#3b82f6","#8b5cf6","#ec4899","#22c55e","#06b6d4","#f97316","#84cc16"];
  chips.innerHTML = "";
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

  resultBox.style.display = "block";
});
