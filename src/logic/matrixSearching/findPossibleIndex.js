import {findMatrixValue} from "./findMatrixValue.js";

export function findFirstPossibleIndex(derivedMatrix, item, intersectingItems) {
  // Returns the smallest index that itemA vs categoryB can be.
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

export function findLastPossibleIndex(derivedMatrix, item, intersectingItems) {
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

export function findAllPossibleIndexes(derivedMatrix, item, intersectingItems) {
  // If there is a true, just returns the first true index
  // Otherwise, returns all null indexes

  let possibleIndexes = [];
  for (let index = 0; index < intersectingItems.length; index++) {
    const value = findMatrixValue(
      derivedMatrix,
      item,
      intersectingItems[index],
    );
    if (value === true) {
      return [index];
    } else if (value === null) {
      possibleIndexes = [...possibleIndexes, index];
    }
  }

  return possibleIndexes;
}
