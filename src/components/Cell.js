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
        console.log('touch start')
        setTimer(
          setTimeout(() => {
            console.log('timeout')
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
        console.log('touch end')
        if (timer) {
          clearTimeout(timer);
        }
      }}
      onTouchMove={() => {
        console.log('touch move')
        if (timer) {
          clearTimeout(timer);
        }
      }}
      onContextMenu={(event) => {
        console.log('menu')
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
        console.log('click')
        dispatchGameState({
          action: "changeCellState",
          gridID: gridID,
          rowIndex: rowIndex,
          columnIndex: columnIndex,
          tempFrom: "click",
        });
      }}
    ></div>
  );
}
