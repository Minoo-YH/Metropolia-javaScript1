const startBtn = document.getElementById("start");
const clearBtn = document.getElementById("clear");
const box = document.getElementById("results");
const winnerLine = document.getElementById("winnerLine");
const list = document.getElementById("list");
const extras = document.getElementById("extras");
const stamp = document.getElementById("stamp");

const STORAGE_KEY = "votingResults_v1";

// ---------- utils ----------
function askPositiveInt(message) {
  while (true) {
    const raw = prompt(message);
    if (raw === null) continue; // keep asking if canceled
    const n = Number(raw);
    if (Number.isInteger(n) && n > 0) return n;
    alert("Please enter a positive whole number.");
  }
}

function render(results) {
  if (!results) {
    box.style.display = "none";
    return;
  }

  const { candidates, emptyVotes = 0, winner, time } = results;

  winnerLine.textContent = `The winner is ${winner.name} with ${winner.votes} votes.`;
  list.innerHTML = "";
  candidates.forEach(c => {
    const li = document.createElement("li");
    li.textContent = `${c.name}: ${c.votes} votes`;
    list.appendChild(li);
  });

  extras.textContent = emptyVotes ? `empty votes: ${emptyVotes}` : "";
  stamp.textContent = time ? `saved at: ${new Date(time).toLocaleString()}` : "";
  box.style.display = "block";
}

function save(results) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
}

function load() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

// ---------- on load: show saved results if any ----------
render(load());

// ---------- main flow ----------
startBtn.addEventListener("click", () => {
  // فقط با کلیک اجرا می‌شود (برای اینکه با باز کردن کنسول از اول شروع نشود)

  const candidateCount = askPositiveInt("Enter number of candidates:");

  // Collect candidates: [{ name, votes: 0 }, ...]
  const candidates = [];
  const nameSet = new Set(); // prevent duplicate names (case-insensitive)

  for (let i = 1; i <= candidateCount; i++) {
    let name = "";
    while (true) {
      const raw = prompt(`Name for candidate ${i}:`);
      if (raw === null) continue;
      name = raw.trim();
      if (!name) {
        alert("Name cannot be empty.");
        continue;
      }
      const key = name.toLowerCase();
      if (nameSet.has(key)) {
        alert("This name already exists. Enter a unique name.");
        continue;
      }
      nameSet.add(key);
      break;
    }
    candidates.push({ name, votes: 0 });
  }

  const voterCount = askPositiveInt("Enter number of voters:");

  // quick lookup map (case-insensitive)
  const byLower = new Map(candidates.map(c => [c.name.toLowerCase(), c]));
  let emptyVotes = 0;

  for (let v = 1; v <= voterCount; v++) {
    const raw = prompt(`Voter ${v}: enter candidate name (empty = empty vote)`);
    if (raw === null || raw.trim() === "") {
      emptyVotes++;
      continue;
    }
    const key = raw.trim().toLowerCase();
    const target = byLower.get(key);
    if (target) {
      target.votes++;
    } else {
      // unknown name -> treat as empty vote (spec allows empty)
      emptyVotes++;
    }
  }

  // Determine winner by sorting a copy desc by votes
  const sorted = candidates.slice().sort((a, b) => b.votes - a.votes);
  const winner = sorted[0];

  // Console output (as required)
  console.log(`The winner is ${winner.name} with ${winner.votes} votes.`);
  console.log("results:");
  sorted.forEach(c => console.log(`${c.name}: ${c.votes} votes`));
  if (emptyVotes) console.log(`empty votes: ${emptyVotes}`);

  // Save & render on page
  const payload = { candidates: sorted, emptyVotes, winner, time: Date.now() };
  save(payload);
  render(payload);

  alert(`Winner: ${winner.name} (${winner.votes} votes). Results saved & shown on page.`);
});

// ---------- clear saved ----------
clearBtn.addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  render(null);
  alert("Saved results cleared.");
});

