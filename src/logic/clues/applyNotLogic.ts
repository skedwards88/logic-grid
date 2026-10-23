import {type PuzzleMatrix} from "../puzzleGeneration/buildEmptyMatrix";
import {setToFalse} from "../puzzleGeneration/setValue";
import {type NotClue} from "./getNotClue";

export function applyNotLogic(
  derivedMatrix: PuzzleMatrix,
  {itemA, itemB}: NotClue["clueParameters"],
): PuzzleMatrix {
  const newDerivedMatrix = setToFalse(derivedMatrix, itemA, itemB);

  return newDerivedMatrix;
}
