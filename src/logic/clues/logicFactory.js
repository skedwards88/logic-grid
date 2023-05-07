import {applyNotLogic} from "./getNotClue.js";
import {applyOrLogic} from "./getOrClue.js";
import {applyNumericComparisonLogic} from "./getNumericComparisonClue.js";
import {applyNumericComparisonCrossCategoryLogic} from "./getNumericComparisonCrossCategoryClue.js";
import {applyOrCrossCategoryLogic} from "./getOrCrossCategoryClue.js";

export function logicFactory(clueType) {
  switch (clueType) {
    case "not":
      return applyNotLogic;
    case "or":
      return applyOrLogic;
    case "numericComparison":
      return applyNumericComparisonLogic;
    case "numericComparisonCrossCategory":
      return applyNumericComparisonCrossCategoryLogic;
    case "orCrossCategory":
      return applyOrCrossCategoryLogic;
    default:
      throw new Error(`Invalid clue type: ${clueType}`);
  }
}
