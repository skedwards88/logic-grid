import React from "react";
import Cell from "./Cell";

export default function Grid({solutionEntry, id}) {
  const numRows = solutionEntry.grid.length;
  let cells = [];
  for (let rowIndex = 0; rowIndex < solutionEntry.grid.length; rowIndex++) {
    for (
      let colIndex = 0;
      colIndex < solutionEntry.grid[0].length;
      colIndex++
    ) {
      cells = [
        ...cells,
        <Cell
          row={rowIndex}
          col={colIndex}
          gridID={id}
          value={solutionEntry.grid[rowIndex][colIndex]}
          key={`${id}_${rowIndex}-${colIndex}`}
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
