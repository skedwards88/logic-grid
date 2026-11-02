import {findMatrixValue} from "../matrixSearching/findMatrixValue";
import {
  type MatrixLabels,
  type MatrixGrids,
} from "../puzzleGeneration/buildEmptyMatrixGrids";
import {type NotClue} from "./getNotClue";

export function validQNotClue({
  matrixGrids,
  matrixLabels,
  clueParameters: {itemA, itemB},
  strict = false,
}: {
  matrixGrids: MatrixGrids;
  matrixLabels: MatrixLabels;
  clueParameters: NotClue["clueParameters"];
  strict?: boolean;
}): boolean {
  const value = findMatrixValue({matrixGrids, matrixLabels, itemA, itemB});

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
