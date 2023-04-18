import {findMatrixValue} from "./findMatrixValue.js";

export function findMatrixLabel(completeMatrix, item, intersectingItems) {
  // Given an item and list of intersecting items, find the intersecting item that is "true"
  for (let index = 0; index < intersectingItems.length; index++) {
    // from the first to last intersecting item, find the value for the input item
    // if we get to a null or true, that is the first possible index
    const value = findMatrixValue(
      completeMatrix,
      item,
      intersectingItems[index],
    );
    if (value === true) {
      return intersectingItems[index];
    }
  }
}

// todo add error handling
