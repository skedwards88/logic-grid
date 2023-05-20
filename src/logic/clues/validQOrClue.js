import {findMatrixValue} from "../helpers/findMatrixValue";

export function validQOrClue({
  matrix,
  clueParameters: {itemA, orItems, allItems},
  strict = false,
}) {
  const [itemB, itemC] = orItems;
  const aVsB = findMatrixValue(matrix, itemA, itemB);
  const aVsC = findMatrixValue(matrix, itemA, itemC);

  // item A cannot be both itemB and itemC
  if (aVsB && aVsC) {
    console.log('### 1');
    return false
  };

  // item A cannot not be both itemB and itemC
  if (aVsB === false && aVsC === false) {
    console.log('### 2');
    return false
  };

  // itemA cannot be any of the non-or items
  for (const item of allItems) {
    if (!orItems.includes(item)) {
      if (findMatrixValue(matrix, itemA, item)) {
        console.log('### 3');
        return false
      };
    }
  }

  if (strict) {
    // itemA has to be one of B or C
    // (currently not forcing the other item to be 'false')
    if (!(aVsB || aVsC)) {
      console.log('### 4');
      return false
    };
  }

  console.log('### 5')
  return true;
}