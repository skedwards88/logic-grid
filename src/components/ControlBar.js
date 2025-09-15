import React from "react";
import {isRunningStandalone} from "@skedwards88/shared-components/src/logic/isRunningStandalone";
import Share from "@skedwards88/shared-components/src/components/Share";

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
      <button id="infoButton" onClick={() => setDisplay("rules")}></button>
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
      <Share
        appName="Logic grid"
        text="Check out this classic logic grid game!"
        url="https://skedwards88.github.io/logic-grid/"
        origin="control bar"
        id="shareButton"
      ></Share>
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
