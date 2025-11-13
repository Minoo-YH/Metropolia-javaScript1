// Function: returns a random dice roll 1..6 (no parameters)
function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}

const startBtn = document.getElementById("start-btn");
const list = document.getElementById("rolls");
const done = document.getElementById("done");

startBtn.addEventListener("click", () => {
  // reset UI
  list.innerHTML = "";
  done.textContent = "";

  let roll;
  let count = 0;

  do {
    roll = rollDie();
    count++;

    const li = document.createElement("li");
    li.textContent = `Roll ${count}: ${roll}`;
    list.appendChild(li);
  } while (roll !== 6);

  done.textContent = `Finished in ${count} roll${count === 1 ? "" : "s"} (hit 6).`;
});
