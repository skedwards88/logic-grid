const groups = [
  // ["a", "b", "c", "d"],
  [1, 2, 3, 4],
  [10, 20, 30, 40],
  [100, 200, 300, 400]
]

const answers = [
  [1, 10, 100],
  [2, 20, 200],
  [3, 30, 300],
  [4, 40, 400]
] // todo in future, randomly generate this

const operators = {
  // numeric
  // "equal": (a, b) => (a == b), // maybe only for easy or as compound clue
  "notEqual": (a, b) => (a != b),
  "greater": (a, b) => (a > b),
  // "greaterEqual": (a, b) => (a >= b), // maybe omit, or else exclude extremes
  "less": (a, b) => (a < b),
  // "lessEqual": (a, b) => (a <= b), // maybe omit, or else exclude extremes

  // alpha
  // "startsWith": (word, letter) => (word[0] === letter),

  // compound (ape and cat both greater than 3)

  // relative (ape greater than cat)
}

function pickRandom(inputArray) {
  return inputArray[Math.floor(Math.random() * inputArray.length)];
}

function makeArray(size, value = null) {
  return Array.from({ length: size }, () => value)
}

function makeLogicArray(groups) {
  let assembledGrid = null
  groups.forEach(group => (assembledGrid = makeArray(group.length, JSON.parse(JSON.stringify(assembledGrid)))))
  return assembledGrid
}

function findValidClue() {
  let foundOperator = false
  let clue

  while (!foundOperator) {
    // randomly select an answer (e.g. [a, 1, 10])
    const answer = pickRandom(answers)

    // randomly select an item in the answer (todo later can make work with non-numbers)
    const item = pickRandom(answer) // e.g. 10
    const index = answer.indexOf(item) // corresponds to the group index of the item (e.g. 10 => 2)

    // randomly select a possible answer from the corresponding group
    const rightComparison = pickRandom(groups[index]) // e.g. 10, 20, 30, 40

    // randomly select an operator
    const operator = pickRandom(Object.keys(operators))

    // apply the operator to the answer and comparison
    const operatorResult = operators[operator](item, rightComparison)
    // console.log(`TESTING: ${item} ${operator} ${rightComparison}`)

    // if true, continue on
    if (operatorResult) {
      foundOperator = operatorResult

      // choose a different index in the answer (otherwise we get something like 10 < 30)
      let answerCopy = answer.slice()
      answerCopy.splice(index, 1)
      const leftComparison = pickRandom(answerCopy)
      const leftIndex = answer.indexOf(leftComparison)

      // console.log(`FOUND VALID CLUE: ${leftComparison} (${item}) ${operator} ${rightComparison}`)
      clue = {
        leftGroupIndex: leftIndex, // index of the group
        leftItemIndex: groups[leftIndex].indexOf(leftComparison), // index of the item in the group
        rightGroupIndex: index,
        rightItemIndex: groups[index].indexOf(rightComparison),
        operator: operator, // e.g. <

        // left: leftComparison, // e.g. a
        // leftIndex: leftIndex, // first group index, e.g. 0
        // original: item, // e.g. 10
        // operator: operator, // e.g. <
        // right: rightComparison, // e.g. 30
        // rightIndex: index // second group index, e.g. 2
      }
    }
  }

  return clue
}

function flatten(array) {
  while (Array.isArray(array[0])) {
    array = flatten(array.flat())
  }
  return array
}

function generateClue() {
  let count = 0

  // make logic grid
  let deduced = makeLogicArray(groups)

  let foundAllClues = false
  let foundClue = false
  let foundOperator = false
  let clues = []

  while (!foundAllClues) {

    while (!foundClue) {

      const clue = findValidClue()

      let deducedCopy = JSON.parse(JSON.stringify(deduced))

      // hold the leftComparison constant
      // iterate across the rightComparison index, and set to false depending on operator result (operator(currentRightIteration, rightComparison) )
      // 
      for (let itemIndex = 0; itemIndex < groups[clue.rightGroupIndex].length; itemIndex++) {
        if (!operators[clue.operator](groups[clue.rightGroupIndex][itemIndex], groups[clue.rightGroupIndex][clue.rightItemIndex])) {
          deducedCopy = setToFalse({[clue.leftGroupIndex]: clue.leftItemIndex, [clue.rightGroupIndex]: itemIndex}, deducedCopy)
        }
      }

      // if the clue narrowed down the possible answers,
      // update the possible answers and stop looking
      if (deduced.toString() !== deducedCopy.toString()) {
        deduced = deducedCopy
        foundClue = true
        console.log(`CLUE ${count}: ${clue.leftGroupIndex}, ${clue.leftItemIndex} (${groups[clue.leftGroupIndex][clue.leftItemIndex]}) ${clue.operator} ${clue.rightGroupIndex}, ${clue.rightItemIndex} (${groups[clue.rightGroupIndex][clue.rightItemIndex]}) results:`)
        console.log(JSON.stringify(deduced))
        clues.push(clue)
      } else {
        // console.log(`TOSSED: ${clue.left} (${clue.original}) ${clue.operator} ${clue.right}`)
      }


      if (groups.flatMap((_, index) => (
        groups.slice(index + 1).flatMap((_, index2) => (
          deduced[index][index2 + index + 1].grid
        ))
      )).flat().every(i => i != null)) {
        foundAllClues = true
        foundOperator = true
        foundClue = true
        // consolidate clues
      } else {
        foundOperator = false
        foundClue = false
        count += 1
      }

      if (count > 50) {
        console.log('NOT FOUND AFTER 100 rounds')
        foundAllClues = true
        foundOperator = true
        foundClue = true
      }
      // console.log(count)
      // console.log('DEDUCED:')
      // console.log(keys.flatMap((_, index) => (
      //   keys.slice(index + 1).map((_, index2) => (
      //     deduced[index][index2 + index + 1].grid
      //   ))
      // )))
      // console.log('======')
    }

    // return clue (operator and key/value pair)
    // repeat until all possible answers are narrowed down to one answer

  }
}



function setToFalse(indexesToSet, grid) {
  for (let groupIndex = 0; groupIndex < groups.length; groupIndex++) {
    // if we don't have a value for this group index, call this recursive function for each value in the group
    if (indexesToSet[groupIndex] === undefined) {
      for (let groupItemIndex = 0; groupItemIndex < groups[groupIndex].length; groupItemIndex++) {
        const newIndexes = {
          ...indexesToSet,
          [groupIndex]: groupItemIndex
        }
        grid = setToFalse(newIndexes, grid)
      }
    }

    // if we have an index value for every group, set the index to false and return the new array
    if (groups.every((_, index) => indexesToSet[index] !== undefined)) {
      // console.log(`SETTING ${JSON.stringify(indexesToSet)}`)
      // hardcoding isn't ideal, but I didn't figure out a clean way to do this
      switch (groups.length) {
        case 1:
          grid[indexesToSet[0]] = false
          break;
        case 2:
          grid[indexesToSet[0]][indexesToSet[1]] = false
          break;
        case 3:
          grid[indexesToSet[0]][indexesToSet[1]][indexesToSet[2]] = false
          break;
        case 4:
          grid[indexesToSet[0]][indexesToSet[1]][indexesToSet[2]][indexesToSet[3]] = false
          break;
        case 5:
          grid[indexesToSet[0]][indexesToSet[1]][indexesToSet[2]][indexesToSet[3]][indexesToSet[4]] = false
          break;
        case 6:
          grid[indexesToSet[0]][indexesToSet[1]][indexesToSet[2]][indexesToSet[3]][indexesToSet[4]][indexesToSet[5]] = false
          break;
        default:
          throw new Error(`Array of ${groups.length} not supported`)
      }
    }
  }

  return grid
}

generateClue()
