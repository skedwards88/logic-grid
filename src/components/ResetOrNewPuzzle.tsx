import React from "react";
import {type ReducerPayload} from "../logic/gameReducer";
import {type DisplayState} from "./App";

export default function ResetOrNewPuzzle({
  dispatchGameState,
  setDisplay,
}: {
  dispatchGameState: React.Dispatch<ReducerPayload>;
  setDisplay: React.Dispatch<React.SetStateAction<DisplayState>>;
}): React.JSX.Element {
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
