const categories = [
  ["Colin", "Sarah", "Meme", "Fefe"],
  [1, 2, 3, 4, 5],
  ["fly", "back", "breast", "free"],
  ["red", "blue", "green", "yellow"],
];

// todo randomize later
let solution = categories.map((i, index) => [
  categories[0][index],
  categories[1][index],
  categories[2][index],
  categories[3][index],
]);

const numItems = categories[0].length;
const numCats = 4;
let solutionMatrix = {};
for (let catIndex = 0; catIndex < numCats; catIndex++) {
  for (let vsIndex = catIndex + 1; vsIndex < numCats; vsIndex++) {
    const grid = Array.from({ length: numItems }, () =>
      Array.from({ length: numItems }, () => null)
    );
    const rowLabels = categories[catIndex];
    const colLabels = categories[vsIndex];
    solutionMatrix[`${catIndex}v${vsIndex}`] = {
      rowLabels: rowLabels,
      colLabels: colLabels,
      grid: grid,
    };
  }
}

// return a random element from a given array
function pickRandom(inputArray) {
  return inputArray[Math.floor(Math.random() * inputArray.length)];
}

// return a random index from a given array
function pickRandomIndex(inputArray) {
  return Math.floor(Math.random() * inputArray.length);
}

// "not" clue
// e.g. "colin is not blue"
function getNotClue(solution) {
  let solutionIndexes = Array.from(solution.keys());
  let clueIndexes = Array.from(solution[0].keys());

  // choose solution index e.g.   [ 'Colin', 1, 'fly', 'red' ]
  const solutionIndex1 = pickRandom(solutionIndexes);
  const solution1 = solution[solutionIndex1];
  // choose clue index e.g. 'Colin'
  const catIndex1 = pickRandom(clueIndexes);
  const item1 = solution1[catIndex1];

  // delete the used indexes
  solutionIndexes.splice(solutionIndex1, 1);
  clueIndexes.splice(catIndex1, 1);

  // choose another solution index e.g.   [ 'Sarah', 2, 'back', 'blue' ]
  const solutionIndex2 = pickRandom(solutionIndexes);
  const solution2 = solution[solutionIndex2];

  // choose another clue index e.g. 'blue'
  const catIndex2 = pickRandom(clueIndexes);
  const item2 = solution2[catIndex2];

  const writtenClue = `${item1} is not ${item2}`;

  function clueLogic(solutionMatrix) {
    const solutionKey =
      catIndex1 < catIndex2
        ? `${catIndex1}v${catIndex2}`
        : `${catIndex2}v${catIndex1}`;
    const rowItem = catIndex1 < catIndex2 ? item1 : item2;
    const colItem = catIndex1 < catIndex2 ? item2 : item1;

    let newSolutionMatrix = JSON.parse(JSON.stringify(solutionMatrix));
    let solutionEntry = newSolutionMatrix[solutionKey];
    let newSolutionGrid = solutionEntry.grid;
    const solutionRows = solutionEntry.rowLabels;
    const solutionCols = solutionEntry.colLabels;

    const rowIndex = solutionRows.indexOf(rowItem);
    const colIndex = solutionCols.indexOf(colItem);

    console.log(JSON.stringify(newSolutionGrid));
    newSolutionGrid[rowIndex][colIndex] = false;
    console.log(JSON.stringify(newSolutionGrid));

    newSolutionMatrix[solutionKey].grid = newSolutionGrid;
    console.log(
      `UPDATING ${solutionKey}. ${rowItem}-${rowIndex}-${solutionRows}. ${colItem}-${colIndex}=${solutionCols}`
    );

    return newSolutionMatrix;
  }
  return {
    writtenClue: writtenClue,
    clueLogic: clueLogic,
  };
}

// getNotClue(solution);
