const input = prompt("Enter a year:");
const year = parseInt(input, 10);
const resultElement = document.getElementById("result");

if (isNaN(year) || year <= 0) {
  resultElement.textContent = "Please enter a valid year.";
} else {
  const isLeap =
    (year % 4 === 0 && year % 100 !== 0) ||
    (year % 400 === 0);

  if (isLeap) {
    resultElement.textContent = year + " is a leap year. 🎄";
  } else {
    resultElement.textContent = year + " is not a leap year. ❄️";
  }
}

