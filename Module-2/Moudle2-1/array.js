const numbers = [];

for (let i = 0; i < 5; i++) {
  const input = prompt("Enter number " + (i + 1) + ":");
  const value = Number(input);
  numbers.push(value);
}

console.log("Numbers in reverse order:");

for (let i = numbers.length - 1; i >= 0; i--) {
  console.log(numbers[i]);
}
