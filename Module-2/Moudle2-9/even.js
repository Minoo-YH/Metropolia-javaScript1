function even(arr) {
  const evens = [];
  for (let i = 0; i < arr.length; i++) {
    const n = arr[i];
    if (Number.isFinite(n) && n % 2 === 0) {
      evens.push(n);
    }
  }
  return evens;
}

const original = [2, 7, 4, 9, 12, 3, 0, -6];
const onlyEvens = even(original);

console.log("Original array:", original);
console.log("Even numbers  :", onlyEvens);
