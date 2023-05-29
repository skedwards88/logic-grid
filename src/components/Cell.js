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
  console.log("RENDER");

  const timerID = React.useRef();
  const pressIsLong = React.useRef();

  function handleTouchStart() {
    console.log("touch start");
    // When the press initiates, it isn't long (yet)
    pressIsLong.current = false;
    timerID.current = setTimeout(() => {
      console.log("long press");
      // If the press exceeds the timeout, it is long
      pressIsLong.current = true;
      if (easyTrue) {
        dispatchGameState({
          action: "utilizeEasyTrue",
          gridID: gridID,
          rowIndex: rowIndex,
          columnIndex: columnIndex,
          tempFrom: `long touch ${timerID.current}`,
        });
      }
    }, 500);
  }

  function handleTouchEnd(event) {
    console.log("touch end");
    event.preventDefault();
    if (timerID.current) {
      clearTimeout(timerID.current);
    }
    handleClick()
  }

  function handleClick() {
    console.log("click");
    if (pressIsLong.current) {
      // If the press/click was treated as a long press, don't do anything
      console.log("Not clicking--already long press");
      return;
    }
    clearTimeout(timerID.current);

    dispatchGameState({
      action: "changeCellState",
      gridID: gridID,
      rowIndex: rowIndex,
      columnIndex: columnIndex,
      tempFrom: `click ${timerID.current}`,
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
