import React from "react";

export default function Cell({
  rowIndex,
  columnIndex,
  gridID,
  value,
  dispatchGameState,
}) {
  let className = "cell";
  if (value) {
    className += " true";
  } else if (value === false) {
    className += " false";
  }
  return (
    <div
    className={className}
      onClick={() =>
        dispatchGameState({
          action: "changeCellState",
          gridID: gridID,
          rowIndex: rowIndex,
          columnIndex: columnIndex,
        })
      }
    >
    </div>
  );
}
