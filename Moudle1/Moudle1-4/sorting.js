const button = document.getElementById("sort-btn");
const resultElement = document.getElementById("result");

button.addEventListener("click", function () {
  const name = prompt("What is your name?");

  if (!name) {
    resultElement.textContent = "You must enter a name to be sorted!";
    return;
  }

  // draw a value 1, 2, 3 or 4
  const randomNumber = Math.floor(Math.random() * 4) + 1;

  let house;

  switch (randomNumber) {
    case 1:
      house = "Gryffindor";
      break;
    case 2:
      house = "Slytherin";
      break;
    case 3:
      house = "Hufflepuff";
      break;
    case 4:
      house = "Ravenclaw";
      break;
    default:
      house = "Muggle"; // should never happen
  }

  resultElement.textContent = name + ", you are " + house + ".";
});
