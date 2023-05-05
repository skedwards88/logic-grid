import React from "react";

export default function ControlBar({dispatchGameState}) {
  return (
    <div id="controls">
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
        onClick={() => console.log("todo make settings")}
      ></button>
      <button
        id="heartButton"
        onClick={() => console.log("todo make heart")}
      ></button>
      {/* console.log('todo add install button') */}
    </div>
  );
}
