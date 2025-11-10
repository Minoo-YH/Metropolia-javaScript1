const listElement = document.getElementById("leap-years");

const startInput = prompt("Enter the start year:");
const endInput = prompt("Enter the end year:");

const startYear = parseInt(startInput, 10);
const endYear = parseInt(endInput, 10);

if (
  isNaN(startYear) ||
  isNaN(endYear) ||
  startYear <= 0 ||
  endYear <= 0 ||
  endYear < startYear
) {
  const li = document.createElement("li");
  li.textContent = "Please enter valid start and end years.";
  listElement.appendChild(li);
} else {
  for (let year = startYear; year <= endYear; year++) {
    const isLeap =
      (year % 4 === 0 && year % 100 !== 0) ||
      (year % 400 === 0);

    if (isLeap) {
      const li = document.createElement("li");
      li.textContent = year;
      listElement.appendChild(li);
    }
  }

  if (!listElement.hasChildNodes()) {
    const li = document.createElement("li");
    li.textContent = "No leap years in this interval.";
    listElement.appendChild(li);
  }
}
