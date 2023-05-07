import {findMatrixLabel} from "../helpers/findMatrixLabel.js";
import {findMatrixValue} from "../helpers/findMatrixValue.js";
import {pickRandom} from "../helpers/pickRandom.js";
import {shuffleArray} from "../helpers/shuffleArray.js";
import {setToFalse} from "../setValue.js";

// Generates an "or" clue that spans categories
// e.g. "Colin is red or 2"
export function getOrCrossCategoryClue(solutionMatrix) {
  // choose two grids in the solution matrix that share one set of labels
  let keyAB;
  let keyAC;
  let labelsA;
  let labelsB;
  let labelsC;
  let descriptionTemplateA;
  let descriptionTemplateB;
  let descriptionTemplateC;
  for (const key of shuffleArray(Object.keys(solutionMatrix))) {
    if (!keyAB) {
      keyAB = key;
    } else if (
      solutionMatrix[keyAB].colLabels[0] === solutionMatrix[key].colLabels[0]
    ) {
      keyAC = key;
      labelsA = solutionMatrix[key].colLabels;
      labelsB = solutionMatrix[keyAB].rowLabels;
      labelsC = solutionMatrix[key].rowLabels;
      descriptionTemplateA = solutionMatrix[key].colDescriptionTemplates;
      descriptionTemplateB = solutionMatrix[keyAB].rowDescriptionTemplates;
      descriptionTemplateC = solutionMatrix[key].rowDescriptionTemplates;
    } else if (
      solutionMatrix[keyAB].rowLabels[0] === solutionMatrix[key].colLabels[0]
    ) {
      keyAC = key;
      labelsA = solutionMatrix[key].colLabels;
      labelsB = solutionMatrix[keyAB].colLabels;
      labelsC = solutionMatrix[key].rowLabels;
      descriptionTemplateA = solutionMatrix[key].colDescriptionTemplates;
      descriptionTemplateB = solutionMatrix[keyAB].colDescriptionTemplates;
      descriptionTemplateC = solutionMatrix[key].rowDescriptionTemplates;
    } else if (
      solutionMatrix[keyAB].rowLabels[0] === solutionMatrix[key].rowLabels[0]
    ) {
      keyAC = key;
      labelsA = solutionMatrix[key].rowLabels;
      labelsB = solutionMatrix[keyAB].colLabels;
      labelsC = solutionMatrix[key].colLabels;
      descriptionTemplateA = solutionMatrix[key].rowDescriptionTemplates;
      descriptionTemplateB = solutionMatrix[keyAB].colDescriptionTemplates;
      descriptionTemplateC = solutionMatrix[key].colDescriptionTemplates;
    } else if (
      solutionMatrix[keyAB].colLabels[0] === solutionMatrix[key].rowLabels[0]
    ) {
      keyAC = key;
      labelsA = solutionMatrix[key].rowLabels;
      labelsB = solutionMatrix[keyAB].rowLabels;
      labelsC = solutionMatrix[key].colLabels;
      descriptionTemplateA = solutionMatrix[key].rowDescriptionTemplates;
      descriptionTemplateB = solutionMatrix[keyAB].rowDescriptionTemplates;
      descriptionTemplateC = solutionMatrix[key].colDescriptionTemplates;
    }
    if (keyAC) {
      break;
    }
  }

  // the shared label set will have our first item
  // e.g. "colin" in "colin is red or 1"
  const itemA = pickRandom(labelsA);

  // the opposing label sets will have our other two items, one true one false
  // e.g. "red" and "1" in "colin is red or 1"
  // we've already randomized the key order above,
  //   so we can just make the first item true and the second false
  const itemB = findMatrixLabel(solutionMatrix, itemA, labelsB);
  const itemCNot = findMatrixLabel(solutionMatrix, itemA, labelsC);
  const itemC = shuffleArray(labelsC).find((i) => i != itemCNot);

  const descriptionA = descriptionTemplateA.leadingDescription.replace(
    "VALUE",
    itemA,
  );
  const descriptionB = descriptionTemplateB.trailingDescription.replace(
    "VALUE",
    itemB,
  );
  const descriptionC = descriptionTemplateC.trailingDescription.replace(
    "VALUE",
    itemC,
  );
  const writtenClue = `${descriptionA} is ${descriptionB} or ${descriptionC}.`; //todo should randomize A/B here so the correct value isn't always first

  return {
    writtenClue: writtenClue,
    clueType: "orCrossCategory",
    clueParameters: {itemA, itemB, itemC},
  };
}

export function applyOrCrossCategoryLogic(
  derivedMatrix,
  {itemA, itemB, itemC},
) {
  let newDerivedMatrix = derivedMatrix;

  // Know that itemB is not itemC
  newDerivedMatrix = setToFalse(newDerivedMatrix, itemB, itemC);

  // If you know that itemA is itemB, then you know itemA is not itemC
  // If you know that itemA is itemC, then you know itemA is not itemB
  if (findMatrixValue(newDerivedMatrix, itemA, itemB)) {
    newDerivedMatrix = setToFalse(newDerivedMatrix, itemA, itemC);
  } else if (findMatrixValue(newDerivedMatrix, itemA, itemC)) {
    newDerivedMatrix = setToFalse(newDerivedMatrix, itemA, itemB);
  }

  return newDerivedMatrix;
}
