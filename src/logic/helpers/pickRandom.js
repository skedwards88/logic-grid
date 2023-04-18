// return a random element from a given array
export function pickRandom(inputArray) {
  return inputArray[Math.floor(Math.random() * inputArray.length)];
}

// return n random elements from a given array
export function pickRandoms(inputArray, numberOfItems) {
  let modifiedArray = [...inputArray];
  let items = [];
  for (
    let index = 0;
    index < Math.min(numberOfItems, inputArray.length);
    index++
  ) {
    const itemIndex = pickRandomIndex(modifiedArray);
    items = [...items, modifiedArray[itemIndex]];
    modifiedArray = [
      ...modifiedArray.slice(0, itemIndex),
      ...modifiedArray.slice(itemIndex + 1, modifiedArray.length),
    ];
  }
  return items;
}

// return a random index from a given array
export function pickRandomIndex(inputArray) {
  return Math.floor(Math.random() * inputArray.length);
}
