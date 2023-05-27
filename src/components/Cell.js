import React from "react";

export default function Cell({
  rowIndex,
  columnIndex,
  gridID,
  value,
  easyTrue,
  dispatchGameState,
}) {
  const [timer, setTimer] = React.useState(null);

  let className = "cell";
  if (value === true) {
    className += " true";
  } else if (value === false) {
    className += " false";
  }
  return (
    <div
      className={className}
      // ios13 doesn't respect context menu event
      onTouchStart={(event) => {
        setTimer(
          setTimeout(() => {
            if (easyTrue) {
              event.preventDefault();
              dispatchGameState({
                action: "utilizeEasyTrue",
                gridID: gridID,
                rowIndex: rowIndex,
                columnIndex: columnIndex,
                tempFrom: "long touch"
              });
            }
          }, 1000),
        );
      }}
      onTouchEnd={() => {
        if (timer) {
          clearTimeout(timer);
        }
      }}
      onTouchMove={() => {
        if (timer) {
          clearTimeout(timer);
        }
      }}
      onContextMenu={(event) => {
        if (easyTrue) {
          event.preventDefault();
          dispatchGameState({
            action: "utilizeEasyTrue",
            gridID: gridID,
            rowIndex: rowIndex,
            columnIndex: columnIndex,
            tempFrom: "menu"
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
