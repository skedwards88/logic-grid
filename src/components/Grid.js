import React from "react";
import Cell from "./Cell";

export default function Grid({solutionEntry, id, dispatchGameState}) {
  const numRows = solutionEntry.grid.length;
  let cells = [];
  for (let rowIndex = 0; rowIndex < solutionEntry.grid.length; rowIndex++) {
    for (
      let columnIndex = 0;
      columnIndex < solutionEntry.grid[0].length;
      columnIndex++
    ) {
      cells = [
        ...cells,
        <Cell
          rowIndex={rowIndex}
          columnIndex={columnIndex}
          gridID={id}
          value={solutionEntry.grid[rowIndex][columnIndex]}
          key={`${id}_${rowIndex}-${columnIndex}`}
          dispatchGameState={dispatchGameState}
        ></Cell>,
      ];
    }
  }
  return (
    <div className={`grid size${numRows}`} id={`${id}`}>
      {cells}
    </div>
  );
}
