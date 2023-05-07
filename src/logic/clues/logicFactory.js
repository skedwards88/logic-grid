import {applyNotLogic} from "./applyNotLogic.js";
import {applyOrLogic} from "./applyOrLogic.js";
import {applyNumericComparisonLogic} from "./applyNumericComparisonLogic.js";
import {applyNumericComparisonCrossCategoryLogic} from "./applyNumericComparisonCrossCategoryLogic.js";
import {applyOrCrossCategoryLogic} from "./applyOrCrossCategoryLogic.js";

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
