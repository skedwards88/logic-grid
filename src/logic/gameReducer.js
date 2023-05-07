import {gameInit} from "./gameInit.js"

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
  } else if (payload.action === "newGame") {
    return gameInit({ ...payload, useSaved: false });
  }
  console.log("todo");
  return {...currentGameState};
}
