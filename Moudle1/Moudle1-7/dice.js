const resultElement = document.getElementById("result");

const input = prompt("How many dice rolls?");
const rolls = parseInt(input, 10);

if (isNaN(rolls) || rolls <= 0) {
  resultElement.textContent = "Please enter a positive integer.";
} else {
  let sum = 0;

  for (let i = 0; i < rolls; i++) {
    const roll = Math.floor(Math.random() * 6) + 1; // 1–6
    sum += roll;
  }

  resultElement.textContent =
    "You rolled " + rolls + " dice. The sum is " + sum + ".";
}
