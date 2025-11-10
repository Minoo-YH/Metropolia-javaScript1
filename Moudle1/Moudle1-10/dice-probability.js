const resultElement = document.getElementById("result");

const diceInput = prompt("Enter the number of dice:");
const sumInput = prompt("Enter the desired sum of eyes:");

const diceCount = parseInt(diceInput, 10);
const desiredSum = parseInt(sumInput, 10);

if (
  isNaN(diceCount) ||
  isNaN(desiredSum) ||
  diceCount <= 0 ||
  desiredSum <= 0
) {
  resultElement.textContent = "Please enter valid positive integers.";
} else {
  const simulations = 10000; // number of repetitions
  let hits = 0;

  for (let i = 0; i < simulations; i++) {
    let sum = 0;

    for (let d = 0; d < diceCount; d++) {
      const roll = Math.floor(Math.random() * 6) + 1; // 1–6
      sum += roll;
    }

    if (sum === desiredSum) {
      hits++;
    }
  }

  const probability = (hits / simulations) * 100;
  const probabilityText = probability.toFixed(2);

  resultElement.textContent =
    "Probability to get sum " +
    desiredSum +
    " with " +
    diceCount +
    " dice is " +
    probabilityText +
    "% (based on " +
    simulations +
    " simulations).";
}


