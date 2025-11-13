// Function: return random integer in [1, sides]
function rollDie(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

const startBtn = document.getElementById("start-btn");
const input = document.getElementById("sides");
const list = document.getElementById("rolls");
const done = document.getElementById("done");
const err = document.getElementById("error");

startBtn.addEventListener("click", () => {
  // reset UI
  list.innerHTML = "";
  done.textContent = "";
  err.textContent = "";

  const sides = parseInt(input.value, 10);

  // validate
  if (Number.isNaN(sides) || sides < 2) {
    err.textContent = "Please enter a valid integer ≥ 2 for the number of sides.";
    return;
  }

  let roll;
  let count = 0;

  // roll until we hit 'sides' (the maximum value)
  do {
    roll = rollDie(sides);
    count++;

    const li = document.createElement("li");
    li.textContent = `Roll ${count}: ${roll}`;
    list.appendChild(li);
  } while (roll !== sides);

  done.textContent = `Finished in ${count} roll${count === 1 ? "" : "s"} (hit ${sides}).`;
});
