import {type PuzzleMatrix} from "../puzzleGeneration/buildEmptyMatrix";
import {setToFalse} from "../puzzleGeneration/setValue";
import {type OrClue} from "./getOrClue";

export function applyOrLogic(
  derivedMatrix: PuzzleMatrix,
  {itemA, orItems, allItems}: OrClue["clueParameters"],
): PuzzleMatrix {
  // the "or" clue equates to "not" clues for all other indexes
  // ("Colin is 1 or 2" means "Colin is not 3", "Colin is not 4")
  let notItems: (string | number)[] = [];
  for (const item of allItems) {
    if (!orItems.includes(item)) {
      notItems = [...notItems, item];
    }
  }

  let newDerivedMatrix = derivedMatrix;
  notItems.forEach((itemB) => {
    newDerivedMatrix = setToFalse(newDerivedMatrix, itemA, itemB);
  });
  return newDerivedMatrix;
}
