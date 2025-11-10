const first = parseInt(prompt("Enter the first integer:"), 10);
const second = parseInt(prompt("Enter the second integer:"), 10);
const third = parseInt(prompt("Enter the third integer:"), 10);

const sum = first + second + third;
const product = first * second * third;
const average = sum / 3;

const resultsElement = document.getElementById("results");

resultsElement.innerHTML =
  "Sum: " + sum + "<br>" +
  "Product: " + product + "<br>" +
  "Average: " + average;
