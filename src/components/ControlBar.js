import React from "react";
import {isRunningStandalone} from "@skedwards88/shared-components/src/logic/isRunningStandalone";

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
      {!isRunningStandalone() ? (
        <button
          id="installButton"
          onClick={() => setDisplay("installOverview")}
        ></button>
      ) : (
        <></>
      )}
    </div>
  );
}
