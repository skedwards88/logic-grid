import React from "react";

export default function Cell({
  rowIndex,
  columnIndex,
  gridID,
  value,
  dispatchGameState,
}) {
  let renderedValue;
  if (value) {
    renderedValue = "O";
  } else if (value === false) {
    renderedValue = "X";
  } else {
    renderedValue = " ";
  }
  return (
    <div
      onClick={() =>
        dispatchGameState({
          action: "changeCellState",
          gridID: gridID,
          rowIndex: rowIndex,
          columnIndex: columnIndex,
        })
      }
    >
      {renderedValue}
    </div>
  );
}
