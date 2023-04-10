const groups = [
  // ["a", "b", "c", "d"],
  [1, 2, 3, 4],
  [10, 20, 30, 40],
  [100, 200, 300, 400],
];

const answers = [
  [1, 10, 100],
  [2, 20, 200],
  [3, 30, 300],
  [4, 40, 400],
]; // todo in future, randomly generate this

const operators = {
  // numeric
  // "equal": (a, b) => (a == b), // maybe only for easy or as compound clue
  notEqual: (a, b) => a != b,
  greater: (a, b) => a > b,
  // "greaterEqual": (a, b) => (a >= b), // maybe omit, or else exclude extremes
  less: (a, b) => a < b,
  // "lessEqual": (a, b) => (a <= b), // maybe omit, or else exclude extremes

  // alpha
  // "startsWith": (word, letter) => (word[0] === letter),

  // compound (ape and cat both greater than 3)

  // relative (ape greater than cat)
};

// return a random element from a given array
function pickRandom(inputArray) {
  return inputArray[Math.floor(Math.random() * inputArray.length)];
}

function makeArray(size, value = null) {
  return Array.from({ length: size }, () => value);
}

function makeLogicArray(groups) {
  let assembledGrid = null;
  groups.forEach(
    (group) =>
      (assembledGrid = makeArray(
        group.length,
        JSON.parse(JSON.stringify(assembledGrid))
      ))
  );
  return assembledGrid;
}

function findValidClue() {
  let foundOperator = false;
  let clue;

  while (!foundOperator) {
    // randomly select an answer (e.g. [a, 1, 10])
    const answerSet = pickRandom(answers);

    // randomly select an item in the answer (todo later can make work with non-numbers)
    const answerItem = pickRandom(answerSet); // e.g. 10
    const answerItemGroupIndex = answerSet.indexOf(answerItem); // corresponds to the group index of the item (e.g. 10 => 2)

    // randomly select a possible answer from the corresponding group
    const rightHandItem = pickRandom(groups[answerItemGroupIndex]); // e.g. 10, 20, 30, 40

    // randomly select an operator
    const operator = pickRandom(Object.keys(operators));

    // apply the operator to the answer and comparison
    const operatorResult = operators[operator](answerItem, rightHandItem);

    // if true, continue on
    if (operatorResult) {
      foundOperator = operatorResult;

      // choose a different index in the answer (otherwise we get something like 10 < 30)
      let answerCopy = answerSet.slice();
      answerCopy.splice(answerItemGroupIndex, 1);
      const leftHandItem = pickRandom(answerCopy);
      const leftHandItemGroupIndex = answerSet.indexOf(leftHandItem);

      clue = {
        leftGroupIndex: leftHandItemGroupIndex, // index of the group
        leftItemIndex: groups[leftHandItemGroupIndex].indexOf(leftHandItem), // index of the item in the group
        rightGroupIndex: answerItemGroupIndex,
        rightItemIndex: groups[answerItemGroupIndex].indexOf(rightHandItem),
        operator: operator, // e.g. <

        // left: leftComparison, // e.g. a
        // leftIndex: leftIndex, // first group index, e.g. 0
        // original: item, // e.g. 10
        // operator: operator, // e.g. <
        // right: rightComparison, // e.g. 30
        // rightIndex: index // second group index, e.g. 2
      };
    }
  }

  return clue;
}

function flatten(array) {
  while (Array.isArray(array[0])) {
    array = flatten(array.flat());
  }
  return array;
}

function findNonRedundantValidClue(deduced) {
  let foundNonRedundantClue = false;
  let clue;
  let deducedCopy;

  while (!foundNonRedundantClue) {
    clue = findValidClue();

    deducedCopy = JSON.parse(JSON.stringify(deduced));

    // hold the leftComparison constant
    // iterate across the rightComparison index, and set to false depending on operator result (operator(currentRightIteration, rightComparison) )
    //
    for (
      let iterationItemIndex = 0;
      iterationItemIndex < groups[clue.rightGroupIndex].length;
      iterationItemIndex++
    ) {
      if (
        !operators[clue.operator](
          groups[clue.rightGroupIndex][iterationItemIndex],
          groups[clue.rightGroupIndex][clue.rightItemIndex]
        )
      ) {
        deducedCopy = setToFalse(
          {
            [clue.leftGroupIndex]: clue.leftItemIndex,
            [clue.rightGroupIndex]: iterationItemIndex,
          },
          deducedCopy
        );
      }
    }

    // if the clue narrowed down the possible answers,
    // update the possible answers and stop looking
    if (deduced.toString() !== deducedCopy.toString()) {
      foundNonRedundantClue = true;
      console.log(
        `CLUE: ${clue.leftGroupIndex}, ${clue.leftItemIndex} (${
          groups[clue.leftGroupIndex][clue.leftItemIndex]
        }) ${clue.operator} ${clue.rightGroupIndex}, ${clue.rightItemIndex} (${
          groups[clue.rightGroupIndex][clue.rightItemIndex]
        }) results:`
      );
      console.log(JSON.stringify(deduced));
    } else {
      // console.log(`TOSSED: ${clue.left} (${clue.original}) ${clue.operator} ${clue.right}`)
    }
  }

  return [clue, deducedCopy];
}

function generateClues() {
  let count = 0;

  // make logic grid
  let deduced = makeLogicArray(groups);

  let foundAllClues = false;
  let clues = [];

  while (!foundAllClues) {
    count += 1;
    console.log(count);
    let clue;
    [clue, deduced] = findNonRedundantValidClue(deduced);
    clues.push(clue);

    if (
      groups
        .flatMap((_, index) =>
          groups
            .slice(index + 1)
            .flatMap((_, index2) => deduced[index][index2 + index + 1].grid)
        )
        .flat()
        .every((i) => i != null)
    ) {
      foundAllClues = true;
    }

    if (count > 50) {
      console.log(`NOT FOUND AFTER ${count} rounds`);
      foundAllClues = true;
    }
  }
}

function setToFalse(indexesToSet, grid) {
  for (let groupIndex = 0; groupIndex < groups.length; groupIndex++) {
    // if we don't have a value for this group index, call this recursive function (setToFalse) for each value in the group
    if (indexesToSet[groupIndex] === undefined) {
      for (
        let groupItemIndex = 0;
        groupItemIndex < groups[groupIndex].length;
        groupItemIndex++
      ) {
        const newIndexes = {
          ...indexesToSet,
          [groupIndex]: groupItemIndex,
        };
        grid = setToFalse(newIndexes, grid);
      }
      // break so that we don't bother duplicating efforts since the recursive call above will take care of the other groups
      break;
    }

    // if we have an index value for every group, set the index to false and return the new array
    if (groups.every((_, index) => indexesToSet[index] !== undefined)) {
      // hardcoding isn't ideal, but I didn't figure out a clean way to do this
      switch (groups.length) {
        case 1:
          grid[indexesToSet[0]] = false;
          break;
        case 2:
          grid[indexesToSet[0]][indexesToSet[1]] = false;
          break;
        case 3:
          grid[indexesToSet[0]][indexesToSet[1]][indexesToSet[2]] = false;
          break;
        case 4:
          grid[indexesToSet[0]][indexesToSet[1]][indexesToSet[2]][
            indexesToSet[3]
          ] = false;
          break;
        case 5:
          grid[indexesToSet[0]][indexesToSet[1]][indexesToSet[2]][
            indexesToSet[3]
          ][indexesToSet[4]] = false;
          break;
        case 6:
          grid[indexesToSet[0]][indexesToSet[1]][indexesToSet[2]][
            indexesToSet[3]
          ][indexesToSet[4]][indexesToSet[5]] = false;
          break;
        default:
          throw new Error(`Array of ${groups.length} not supported`);
      }
    }
  }

  return grid;
}

function checkForCascadingFalse(indexesSet, grid) {
  const numIndexes = Object.keys(indexesSet).length;

  // For the just-set index, see if there is 1 dimension where all but one value is false
  // e.g. {0:3, 1:2, 2:2, 3:4}
  for (
    let groupIndex = 0;
    groupIndex < Object.keys(indexesSet).length;
    groupIndex++
  ) {
    let falseCount = 0;
    for (
      let groupItemIndex = 0;
      groupItemIndex < grid.length;
      groupItemIndex++
    ) {
      const indexIteration = {
        ...indexesSet,
        groupIndex: groupItemIndex,
      };
      if (getValueAtIndex(indexIteration, grid) === false) {
        console.log(`FALSE: ${JSON.stringify(indexIteration)}`);
      }
    }
  }
}

generateClues();

function getValueAtIndex(indexes, grid) {
  let value = grid;
  for (
    let groupIndex = 0;
    groupIndex < Object.keys(indexesSet).length;
    groupIndex++
  ) {
    value = value[indexes[groupIndex]];
  }
  return value;
}