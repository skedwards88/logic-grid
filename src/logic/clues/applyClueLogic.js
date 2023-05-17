import {applyNotLogic} from "./applyNotLogic.js";
import {applyOrLogic} from "./applyOrLogic.js";
import {applyNumericComparisonLogic} from "./applyNumericComparisonLogic.js";
import {applyNumericComparisonCrossCategoryLogic} from "./applyNumericComparisonCrossCategoryLogic.js";
import {applyOrCrossCategoryLogic} from "./applyOrCrossCategoryLogic.js";

export function applyClueLogic(clueType, matrix, clueParameters) {
  switch (clueType) {
    case "not":
      return applyNotLogic(matrix, clueParameters);
    case "or":
      return applyOrLogic(matrix, clueParameters);
    case "numericComparison":
      return applyNumericComparisonLogic(matrix, clueParameters);
    case "numericComparisonCrossCategory":
      return applyNumericComparisonCrossCategoryLogic(matrix, clueParameters);
    case "orCrossCategory":
      return applyOrCrossCategoryLogic(matrix, clueParameters);
    default:
      throw new Error(`Invalid clue type: ${clueType}`);
  }
}
