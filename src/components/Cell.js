import React from "react";

export default function Cell({
  rowIndex,
  columnIndex,
  gridID,
  value,
  easyTrue,
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
      onContextMenu={(event) => {
        if (easyTrue) {
          event.preventDefault();
          dispatchGameState({
            action: "setCellTrueOthersFalse",
            gridID: gridID,
            rowIndex: rowIndex,
            columnIndex: columnIndex,
          });
        }
      }}
      onClick={() => {
        dispatchGameState({
          action: "changeCellState",
          gridID: gridID,
          rowIndex: rowIndex,
          columnIndex: columnIndex,
        });
      }}
    ></div>
  );
}
