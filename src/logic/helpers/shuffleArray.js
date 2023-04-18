// Swap each value in an array, starting at the end of the array, with a position equal or earlier in the array.
export function shuffleArray(array) {
  let shuffledArray = [...array];

  for (let index = shuffledArray.length - 1; index > 0; index--) {
    // Get a random index from 0 to the current index of the array
    // So for an array of length 3, the first round will be 0, 1, or 2, second round 0 or 1, and last round 0
    // The values at this index and the current index will be swapped
    const swapIndex = Math.floor(Math.random() * (index + 1));

    // set the value at the index to be the value at the swap index,
    // and set the value at the swap index to be the original value at the index
    [shuffledArray[index], shuffledArray[swapIndex]] = [
      shuffledArray[swapIndex],
      shuffledArray[index],
    ];
  }
  return shuffledArray;
}
