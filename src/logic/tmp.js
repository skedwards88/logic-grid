// const solutionMatrix = {
//   "0v1": {
//     rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
//     colLabels: [1, 2, 3, 4],
//     grid: [
//       [true, false, false, false],
//       [false, true, false, false],
//       [false, false, true, false],
//       [false, false, false, true],
//     ],
//   },
//   "0v2": {
//     rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
//     colLabels: ["fly", "back", "breast", "free"],
//     grid: [
//       [true, false, false, false],
//       [false, true, false, false],
//       [false, false, true, false],
//       [false, false, false, true],
//     ],
//   },
//   "0v3": {
//     rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
//     colLabels: ["red", "blue", "green", "yellow"],
//     grid: [
//       [true, false, false, false],
//       [false, true, false, false],
//       [false, false, true, false],
//       [false, false, false, true],
//     ],
//   },
//   "1v2": {
//     rowLabels: [1, 2, 3, 4],
//     colLabels: ["fly", "back", "breast", "free"],
//     grid: [
//       [true, false, false, false],
//       [false, true, false, false],
//       [false, false, true, false],
//       [false, false, false, true],
//     ],
//   },
//   "1v3": {
//     rowLabels: [1, 2, 3, 4],
//     colLabels: ["red", "blue", "green", "yellow"],
//     grid: [
//       [true, false, false, false],
//       [false, true, false, false],
//       [false, false, true, false],
//       [false, false, false, true],
//     ],
//   },
//   "2v3": {
//     rowLabels: ["fly", "back", "breast", "free"],
//     colLabels: ["red", "blue", "green", "yellow"],
//     grid: [
//       [true, false, false, false],
//       [false, true, false, false],
//       [false, false, true, false],
//       [false, false, false, true],
//     ],
//   },
// };

// function findMatrixKey(matrix, itemA, itemB) {
//   for (const key in matrix) {
//     if (
//       matrix[key].rowLabels.includes(itemA) &&
//       matrix[key].colLabels.includes(itemB)
//     ) {
//       return key;
//     }
//     if (
//       matrix[key].rowLabels.includes(itemB) &&
//       matrix[key].colLabels.includes(itemA)
//     ) {
//       return key;
//     }
//   }
// }

// const itemA = "fly";
// const itemB = "red";
// const solutionKey = findMatrixKey(solutionMatrix, itemA, itemB);

// const rowIndex = solutionMatrix[solutionKey].rowLabels.indexOf(itemA) > -1
// ? solutionMatrix[solutionKey].rowLabels.indexOf(itemA)
// : solutionMatrix[solutionKey].rowLabels.indexOf(itemB);

// const colIndex = solutionMatrix[solutionKey].colLabels.indexOf(itemA) > -1
// ? solutionMatrix[solutionKey].colLabels.indexOf(itemA)
// : solutionMatrix[solutionKey].colLabels.indexOf(itemB);

// console.log(solutionMatrix[solutionKey].colLabels)
// console.log(rowIndex)

// console.log(colIndex)

// {"0v1":{"rowLabels":["Colin","Sarah","Fefe","Meme"],"colLabels":[1,2,3,4],"grid":[[null,false,false,false],[false,null,false,false],[false,false,null,false],[false,false,false,null]]},"0v2":{"rowLabels":["Colin","Sarah","Fefe","Meme"],"colLabels":["fly","back","breast","free"],"grid":[[null,false,false,false],[false,null,false,false],[false,false,null,false],[false,false,false,null]]},"0v3":{"rowLabels":["Colin","Sarah","Fefe","Meme"],"colLabels":["red","blue","green","yellow"],"grid":[[null,false,false,false],[false,null,false,false],[false,false,null,false],[false,false,false,null]]},"1v2":{"rowLabels":[1,2,3,4],"colLabels":["fly","back","breast","free"],"grid":[[null,false,false,false],[false,null,false,false],[false,false,null,false],[false,false,false,null]]},"1v3":{"rowLabels":[1,2,3,4],"colLabels":["red","blue","green","yellow"],"grid":[[null,false,false,false],[false,null,false,false],[false,false,null,false],[false,false,false,n^C

//   {"0v1":{,,"grid":[[null,null,null,null],[null,null,null,null],[null,null,null,null],[null,null,null,null]]},"0v2":{"grid":[[null,null,null,null],[null,null,null,null],[null,null,null,null],[null,null,null,null]]},"0v3":{"grid":[[null,null,null,null],[null,null,null,null],[null,null,null,null],[null,null,null,null]]},"1v2":{"grid":[[null,null,null,null],[null,null,null,null],[null,null,null,null],[null,null,null,null]]},"1v3":{"grid":[[null,null,null,null],[null,null,null,null],[null,null,null,null],[null,null,null,null]]},"2v3":{"grid":[[null,null,false,false],[null,null,null,null],[null,null,null,null],[null,null,null,null]]}}

const colLabels = ["a", "b"];
for (let index = 0; index < colLabels.length; index++) {
  console.log(colLabels[index]);
}
