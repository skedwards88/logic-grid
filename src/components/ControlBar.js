import React from "react";
import { handleInstall } from "../logic/handleInstall";

export default function ControlBar({
  dispatchGameState,
  setDisplay,
  undoDisabled,
  setInstallPromptEvent,
  showInstallButton,
  installPromptEvent,
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
      {showInstallButton && installPromptEvent ? (
        <button
          id="installButton"
          onClick={() =>
            handleInstall(installPromptEvent, setInstallPromptEvent)
          }
        ></button>
      ) : (
        <></>
      )}
    </div>
  );
}
