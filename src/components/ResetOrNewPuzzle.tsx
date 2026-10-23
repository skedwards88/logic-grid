import React from "react";

export default function ResetOrNewPuzzle({dispatchGameState, setDisplay}) {
  return (
    <div className="App resetOrNewPuzzle">
      <button
        onClick={() => {
          dispatchGameState({
            action: "reset",
          });
          setDisplay("game");
        }}
      >
        Reset puzzle
      </button>
      <button
        onClick={() => {
          dispatchGameState({
            action: "newGame",
          });
          setDisplay("game");
        }}
      >
        New puzzle
      </button>

      <button
        onClick={() => {
          setDisplay("game");
        }}
      >
        Cancel{" "}
      </button>
    </div>
  );
}
