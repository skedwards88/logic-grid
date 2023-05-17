import {findMatrixLabel} from "../helpers/findMatrixLabel.js";
import {pickRandom} from "../helpers/pickRandom.js";
import {shuffleArray} from "../helpers/shuffleArray.js";

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

  const descriptionA = descriptionTemplateA.description.replace("VALUE", itemA);
  const descriptionB = descriptionTemplateB.description.replace("VALUE", itemB);
  const descriptionC = descriptionTemplateC.description.replace("VALUE", itemC);
  let writtenClue = `${descriptionA} is either ${descriptionB} or ${descriptionC}.`; //todo should randomize A/B here so the correct value isn't always first
  writtenClue = writtenClue.charAt(0).toUpperCase() + writtenClue.slice(1);

  return {
    writtenClue: writtenClue,
    clueType: "orCrossCategory",
    clueParameters: {itemA, orItems: [itemB, itemC]},
  };
}
