const resultElement = document.getElementById("result");

// Ask if we should calculate the square root
const shouldCalculate = confirm("Should I calculate the square root?");

if (!shouldCalculate) {
  resultElement.textContent = "The square root is not calculated.";
} else {
  const input = prompt("Enter a number:");
  const number = Number(input);

  if (isNaN(number)) {
    resultElement.textContent = "That is not a valid number.";
  } else if (number < 0) {
    resultElement.textContent =
      "The square root of a negative number is not defined.";
  } else {
    const squareRoot = Math.sqrt(number);
    resultElement.textContent =
      "The square root of " + number + " is " + squareRoot + ".";
  }
}

