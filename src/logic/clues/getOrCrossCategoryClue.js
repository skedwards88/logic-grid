import {findFirstTrueIntersection} from "../helpers/findFirstTrueIntersection.js";
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
      solutionMatrix[keyAB].columnLabels[0] ===
      solutionMatrix[key].columnLabels[0]
    ) {
      keyAC = key;
      labelsA = solutionMatrix[key].columnLabels;
      labelsB = solutionMatrix[keyAB].rowLabels;
      labelsC = solutionMatrix[key].rowLabels;
      descriptionTemplateA = solutionMatrix[key].columnDescriptionTemplates;
      descriptionTemplateB = solutionMatrix[keyAB].rowDescriptionTemplates;
      descriptionTemplateC = solutionMatrix[key].rowDescriptionTemplates;
    } else if (
      solutionMatrix[keyAB].rowLabels[0] === solutionMatrix[key].columnLabels[0]
    ) {
      keyAC = key;
      labelsA = solutionMatrix[key].columnLabels;
      labelsB = solutionMatrix[keyAB].columnLabels;
      labelsC = solutionMatrix[key].rowLabels;
      descriptionTemplateA = solutionMatrix[key].columnDescriptionTemplates;
      descriptionTemplateB = solutionMatrix[keyAB].columnDescriptionTemplates;
      descriptionTemplateC = solutionMatrix[key].rowDescriptionTemplates;
    } else if (
      solutionMatrix[keyAB].rowLabels[0] === solutionMatrix[key].rowLabels[0]
    ) {
      keyAC = key;
      labelsA = solutionMatrix[key].rowLabels;
      labelsB = solutionMatrix[keyAB].columnLabels;
      labelsC = solutionMatrix[key].columnLabels;
      descriptionTemplateA = solutionMatrix[key].rowDescriptionTemplates;
      descriptionTemplateB = solutionMatrix[keyAB].columnDescriptionTemplates;
      descriptionTemplateC = solutionMatrix[key].columnDescriptionTemplates;
    } else if (
      solutionMatrix[keyAB].columnLabels[0] === solutionMatrix[key].rowLabels[0]
    ) {
      keyAC = key;
      labelsA = solutionMatrix[key].rowLabels;
      labelsB = solutionMatrix[keyAB].rowLabels;
      labelsC = solutionMatrix[key].columnLabels;
      descriptionTemplateA = solutionMatrix[key].rowDescriptionTemplates;
      descriptionTemplateB = solutionMatrix[keyAB].rowDescriptionTemplates;
      descriptionTemplateC = solutionMatrix[key].columnDescriptionTemplates;
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
  const itemB = findFirstTrueIntersection(solutionMatrix, itemA, labelsB);
  const itemCNot = findFirstTrueIntersection(solutionMatrix, itemA, labelsC);
  const itemC = shuffleArray(labelsC).find((i) => i != itemCNot);

  const descriptionA = descriptionTemplateA.description(itemA);
  const descriptionB = descriptionTemplateB.description(itemB);
  const descriptionC = descriptionTemplateC.description(itemC);
  const [leadingDescription, trailingDescription] = shuffleArray([
    descriptionB,
    descriptionC,
  ]);
  let writtenClue = `${descriptionA} is either ${leadingDescription} or ${trailingDescription}.`;
  writtenClue = writtenClue.charAt(0).toUpperCase() + writtenClue.slice(1);

  return {
    writtenClue: writtenClue,
    clueType: "orCrossCategory",
    clueParameters: {itemA, orItems: [itemB, itemC]},
  };
}
