import {gameInit} from "./gameInit.js";

export function gameReducer(currentGameState, payload) {
  if (payload.action === "changeCellState") {
    let newDerivedMatrix = JSON.parse(
      JSON.stringify(currentGameState.derivedMatrix),
    );
    const currentCellValue =
      newDerivedMatrix[payload.gridID].grid[payload.rowIndex][
        payload.columnIndex
      ];

    // true -> null, null -> false, false -> true
    let newCellValue;
    if (currentCellValue) {
      newCellValue = null;
    } else if (currentCellValue === false) {
      newCellValue = true;
    } else {
      newCellValue = false;
    }

    newDerivedMatrix[payload.gridID].grid[payload.rowIndex][
      payload.columnIndex
    ] = newCellValue;

    return {...currentGameState, derivedMatrix: newDerivedMatrix};
  } else if (payload.action === "utilizeEasyTrue") {
    // regardless of the current cell value,
    //  change the value to true
    //  and make everything else in the row/col false
    let newDerivedMatrix = JSON.parse(
      JSON.stringify(currentGameState.derivedMatrix),
    );
    const currentGrid = newDerivedMatrix[payload.gridID].grid;
    let newGrid = [];
    for (let rowIndex = 0; rowIndex < currentGrid.length; rowIndex++) {
      let newRow = [];
      for (
        let columnIndex = 0;
        columnIndex < currentGrid[rowIndex].length;
        columnIndex++
      ) {
        if (
          rowIndex === payload.rowIndex &&
          columnIndex === payload.columnIndex
        ) {
          newRow = [...newRow, true];
        } else if (
          rowIndex === payload.rowIndex ||
          columnIndex === payload.columnIndex
        ) {
          newRow = [...newRow, false];
        } else {
          newRow = [...newRow, currentGrid[rowIndex][columnIndex]];
        }
      }
      newGrid = [...newGrid, newRow];
    }
    newDerivedMatrix[payload.gridID].grid = newGrid;

    return {...currentGameState, derivedMatrix: newDerivedMatrix};
  } else if (payload.action === "newGame") {
    return gameInit({
      ...currentGameState,
      ...payload,
      useSaved: false,
    });
  } else if (payload.action === "setClueCrossedOff") {
    let newGameState = {...currentGameState};
    newGameState.clues[payload.index].crossedOff =
      !newGameState.clues[payload.index].crossedOff;
    return newGameState;
  } else if (payload.action === "changeEasyTrue") {
    return {...currentGameState, easyTrue: !currentGameState.easyTrue};
  } else {
    console.log(`todo: ${payload.action}`);
    return {...currentGameState};
  }
}
