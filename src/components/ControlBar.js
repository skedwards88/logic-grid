import React from "react";

export default function ControlBar({
  dispatchGameState,
  setDisplay,
  undoDisabled,
}) {
  return (
    <div id="controls">
      <button
        id="undoButton"
        disabled={undoDisabled}
        onClick={() => {
          dispatchGameState({
            action: "undo",
          });
        }}
      ></button>
      <button
        id="newGameButton"
        onClick={() => {
          dispatchGameState({
            action: "newGame",
          });
        }}
      ></button>
      <button
        id="settingsButton"
        onClick={() => setDisplay("settings")}
      ></button>
      <button id="heartButton" onClick={() => setDisplay("heart")}></button>
    </div>
  );
}
