import {gameInit} from "./gameInit.js";

export function gameReducer(currentGameState, payload) {
  if (payload.action === "changeCellState") {
    const currentDerivedMatrix =
      currentGameState.derivedMatrixHistory[
        currentGameState.derivedMatrixHistory.length - 1
      ];
    let newDerivedMatrix = JSON.parse(JSON.stringify(currentDerivedMatrix));
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

    return {
      ...currentGameState,
      derivedMatrixHistory: [
        ...currentGameState.derivedMatrixHistory,
        newDerivedMatrix,
      ],
    };
  } else if (payload.action === "utilizeEasyTrue") {
    // regardless of the current cell value,
    //  change the value to true
    //  and make everything else in the row/col false
    const currentDerivedMatrix =
      currentGameState.derivedMatrixHistory[
        currentGameState.derivedMatrixHistory.length - 1
      ];
    let newDerivedMatrix = JSON.parse(JSON.stringify(currentDerivedMatrix));
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

    return {
      ...currentGameState,
      derivedMatrixHistory: [
        ...currentGameState.derivedMatrixHistory,
        newDerivedMatrix,
      ],
    };
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
  } else if (payload.action === "undo") {
    return {
      ...currentGameState,
      derivedMatrixHistory: currentGameState.derivedMatrixHistory.slice(
        0,
        Math.max(1, currentGameState.derivedMatrixHistory.length - 1),
      ),
    };
  } else {
    console.log(`todo: ${payload.action}`);
    return {...currentGameState};
  }
}
