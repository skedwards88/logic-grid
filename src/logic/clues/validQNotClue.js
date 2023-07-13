import {findMatrixValue} from "../matrixSearching/findMatrixValue";

export function validQNotClue({
  matrix,
  clueParameters: {itemA, itemB},
  strict = false,
}) {
  const value = findMatrixValue(matrix, itemA, itemB);

  if (value === true) {
    // if value is true, clue is violated
    return false;
  } else if (strict && value === null) {
    // in strict mode, the value must be false, not null
    return false;
  } else {
    // if value is false or null, clue is not violated
    return true;
  }
}
