import {findMatrixValue} from "./findMatrixValue.js";

export function findMatrixLabel(matrix, item, intersectingItems) {
  // Given an item and list of intersecting items, find the first intersecting item that is "true"
  // if one is not found, returns undefined
  for (let index = 0; index < intersectingItems.length; index++) {
    // from the first to last intersecting item, find the value for the input item
    const value = findMatrixValue(matrix, item, intersectingItems[index]);
    if (value === true) {
      return intersectingItems[index];
    }
  }
}

// todo add error handling
