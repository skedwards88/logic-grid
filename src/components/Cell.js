import React from "react";

export default function Cell({row, column, gridID, value}) {
  let renderedValue;
  if (value) {
    renderedValue = "O";
  } else if (value === false) {
    renderedValue = "X";
  } else {
    renderedValue = " ";
  }
  return <div onClick={() => console.log("clicked")}>{renderedValue}</div>;
}
