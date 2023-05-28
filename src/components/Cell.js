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
      // ios13 doesn't respect context menu event, so need to monitor long touch instead
      // but desktop doesn't use touch, so also need context menu
      onTouchStart={(event, passive=false) => {
        // event.preventDefault();
        // console.log('touch start')
        setTimer(
          setTimeout(() => {
            console.log('timeout')
            if (easyTrue) {
              
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
      onTouchEnd={(event) => {
        // event.preventDefault();
        console.log('touch end')
        if (timer) {
          clearTimeout(timer);
        }
      }}
      onTouchMove={(event) => {
        // event.preventDefault();
        console.log('touch move')
        if (timer) {
          clearTimeout(timer);
        }
      }}
      onContextMenu={(event) => {
        event.preventDefault();
        if (!timer) {
          console.log('menu')
          if (easyTrue) {
            dispatchGameState({
              action: "utilizeEasyTrue",
              gridID: gridID,
              rowIndex: rowIndex,
              columnIndex: columnIndex,
              tempFrom: "menu"
            });
          }
        }
      }}
      onClick={(event) => {
        event.preventDefault();
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
