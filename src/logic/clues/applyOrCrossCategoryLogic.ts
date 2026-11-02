import {findMatrixValue} from "../matrixSearching/findMatrixValue";
import {
  type MatrixGrids,
  type MatrixLabels,
} from "../puzzleGeneration/generateSolutionMatrix";
import {setToFalse, setToTrue} from "../puzzleGeneration/setValue";
import {type OrCrossCategoryClue} from "./getOrCrossCategoryClue";

export function applyOrCrossCategoryLogic(
  matrixGrids: MatrixGrids,
  matrixLabels: MatrixLabels,
  {itemA, orItems: [itemB, itemC]}: OrCrossCategoryClue["clueParameters"],
): MatrixGrids {
  let newMatrixGrids = matrixGrids;

  // Know that itemB is not itemC
  newMatrixGrids = setToFalse({
    matrixGrids: newMatrixGrids,
    matrixLabels,
    itemA: itemB,
    itemB: itemC,
  });

  // If you know that itemA is itemB, then you know itemA is not itemC
  // If you know that itemA is itemC, then you know itemA is not itemB
  // If you know that itemA is not itemB, then you know itemA is itemC
  // If you know that itemA is not itemC, then you know itemA is itemB
  if (
    findMatrixValue({
      matrixGrids: newMatrixGrids,
      matrixLabels,
      itemA,
      itemB,
    })
  ) {
    newMatrixGrids = setToFalse({
      matrixGrids: newMatrixGrids,
      matrixLabels,
      itemA,
      itemB: itemC,
    });
  } else if (
    findMatrixValue({
      matrixGrids: newMatrixGrids,
      matrixLabels,
      itemA,
      itemB: itemC,
    })
  ) {
    newMatrixGrids = setToFalse({
      matrixGrids: newMatrixGrids,
      matrixLabels,
      itemA,
      itemB,
    });
  } else if (
    findMatrixValue({
      matrixGrids: newMatrixGrids,
      matrixLabels,
      itemA,
      itemB,
    }) === false
  ) {
    newMatrixGrids = setToTrue({
      matrixGrids: newMatrixGrids,
      matrixLabels,
      itemA,
      itemB: itemC,
    });
  } else if (
    findMatrixValue({
      matrixGrids: newMatrixGrids,
      matrixLabels,
      itemA,
      itemB: itemC,
    }) === false
  ) {
    newMatrixGrids = setToTrue({
      matrixGrids: newMatrixGrids,
      matrixLabels,
      itemA,
      itemB,
    });
  }

  return newMatrixGrids;
}
