// return a random element from a given array
export function pickRandom(inputArray) {
  return inputArray[Math.floor(Math.random() * inputArray.length)];
}

// return a random index from a given array
export function pickRandomIndex(inputArray) {
  return Math.floor(Math.random() * inputArray.length);
}
