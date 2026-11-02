import {
  type MatrixGrids,
  type MatrixLabels,
} from "../puzzleGeneration/buildEmptyMatrixGrids";
import {setToFalse} from "../puzzleGeneration/setValue";
import {type OrClue} from "./getOrClue";

export function applyOrLogic(
  matrixGrids: MatrixGrids,
  matrixLabels: MatrixLabels,
  {itemA, orItems, allItems}: OrClue["clueParameters"],
): MatrixGrids {
  // the "or" clue equates to "not" clues for all other indexes
  // ("Colin is 1 or 2" means "Colin is not 3", "Colin is not 4")
  const notItems = allItems.filter((item) => !orItems.includes(item));

  let newMatrixGrids = matrixGrids;
  notItems.forEach((itemB) => {
    newMatrixGrids = setToFalse({
      matrixGrids: newMatrixGrids,
      matrixLabels,
      itemA,
      itemB,
    });
  });
  return newMatrixGrids;
}
