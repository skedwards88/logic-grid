import {findMatrixValue} from "./findMatrixValue.js";

export function getFirstPossibleIndex(derivedMatrix, item, intersectingItems) {
  // Returns the smallest index that itemA vs categoryB can be.
  // This is
  for (let index = 0; index < intersectingItems.length; index++) {
    // from the first to last intersecting item, find the value for the input item
    // if we get to a null or true, that is the first possible index
    const value = findMatrixValue(
      derivedMatrix,
      item,
      intersectingItems[index],
    );
    if (value === true) {
      return index;
    } else if (value === null) {
      return index;
    }
  }
}

export function getLastPossibleIndex(derivedMatrix, item, intersectingItems) {
  for (let index = intersectingItems.length - 1; index >= 0; index--) {
    // from the last to first intersecting item, find the value for the input item
    // if we get to a null or true, that is the first possible index
    const value = findMatrixValue(
      derivedMatrix,
      item,
      intersectingItems[index],
    );
    if (value === true) {
      return index;
    } else if (value === null) {
      return index;
    }
  }
}
