// concat(): concatenates array of strings WITHOUT using join()
function concat(arr) {
  let out = "";
  for (let i = 0; i < arr.length; i++) {
    // Ensure we only add string values (defensive)
    const piece = String(arr[i]);
    out += piece;
  }
  return out;
}

// Hardcoded array (as required)
const punk = ["Johnny", "DeeDee", "Joey", "Marky"];

// Use the function and print to HTML
const resultEl = document.getElementById("result");
resultEl.textContent = concat(punk);

// (Optional) Try more cases:
// resultEl.textContent = concat([]);                 // ""
// resultEl.textContent = concat(["Hi", " ", "there"]); // "Hi there"
