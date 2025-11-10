const name = prompt("What is your name?");

if (name) {
  document.body.innerHTML = "Hello, " + name + "!";
} else {
  document.body.innerHTML = "Hello!";
}
