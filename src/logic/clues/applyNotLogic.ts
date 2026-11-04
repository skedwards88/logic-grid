import {
  type MatrixGrids,
  type MatrixLabels,
} from "../puzzleGeneration/generateSolutionMatrix";
import {setToFalse} from "../puzzleGeneration/setValue";
import {type NotClue} from "./getNotClue";

export function applyNotLogic(
  matrixGrids: MatrixGrids,
  matrixLabels: MatrixLabels,
  {itemA, itemB}: NotClue["clueParameters"],
): MatrixGrids {
  const newDerivedMatrix = setToFalse({
    matrixGrids,
    matrixLabels,
    itemA,
    itemB,
  });

  return newDerivedMatrix;
}
