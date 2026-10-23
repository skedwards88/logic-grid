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
  if (value === true) {
    className += " true";
  } else if (value === false) {
    className += " false";
  }

  const timerID = React.useRef();
  const pressIsLong = React.useRef();

  function handleTouchStart() {
    // When the press initiates, it isn't long (yet)
    pressIsLong.current = false;
    timerID.current = setTimeout(() => {
      // If the press exceeds the timeout, it is long
      pressIsLong.current = true;
      if (easyTrue) {
        dispatchGameState({
          action: "utilizeEasyTrue",
          gridID: gridID,
          rowIndex: rowIndex,
          columnIndex: columnIndex,
        });
      }
    }, 500);
  }

  function handleTouchEnd(event) {
    event.preventDefault();

    if (timerID.current) {
      clearTimeout(timerID.current);
    }

    if (pressIsLong.current) {
      // If the press/click was treated as a long press, don't do anything
      return;
    }

    dispatchGameState({
      action: "changeCellState",
      gridID: gridID,
      rowIndex: rowIndex,
      columnIndex: columnIndex,
    });
  }

  return (
    <div
      className={className}
      // ios13 doesn't respect context menu event, so need to monitor long touch instead
      // Also iso seems to fire the click event a second time at the end of a long touch,
      //   so not using onClick
      onPointerDown={handleTouchStart}
      onPointerUp={handleTouchEnd}
      onContextMenu={(event) => {
        event.preventDefault();
      }}
    ></div>
  );
}
