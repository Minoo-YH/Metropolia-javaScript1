const resultElement = document.getElementById("result");

const input = prompt("Enter an integer:");
const number = parseInt(input, 10);

if (isNaN(number)) {
  resultElement.textContent = "That is not a valid integer.";
} else if (number <= 1) {
  resultElement.textContent = number + " is not a prime number.";
} else {
  let isPrime = true;

  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      isPrime = false;
      break;
    }
  }

  if (isPrime) {
    resultElement.textContent = number + " is a prime number.";
  } else {
    resultElement.textContent = number + " is not a prime number.";
  }
}
