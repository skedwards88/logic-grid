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
          tempFrom: "long touch",
        });
      }
    }, 500);
  }

  function handleTouchEnd() {
    console.log("touch end");
    if (timerID.current) {
      clearTimeout(timerID.current);
    }
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
      tempFrom: "click",
    });
  }

  return (
    <div
      className={className}
      // ios13 doesn't respect context menu event, so need to monitor long touch instead
      onTouchStart={handleTouchStart}
      onMouseDown={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseUp={handleTouchEnd}
      onTouchMove={handleTouchEnd}
      onClick={handleClick}
      onContextMenu={(event) => {
        event.preventDefault();
      }}
    ></div>
  );
}
