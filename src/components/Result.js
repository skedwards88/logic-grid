import React from "react";
import {validQ} from "../logic/clues/validQ";

export default function Result({clues, matrix, showViolations, dispatchGameState}) {
  // check if every square is filled
  const matrixComplete = Object.values(matrix).every(
    (entry) => !entry.grid.flat().includes(null),
  );

  // Check if all clues are valid
  const allCluesValid = clues.every((clue) =>
    validQ({clue, matrix, strict: true}),
  );

  // If all clues are valid but the matrix is incomplete, offer to autofill
  if (allCluesValid && !matrixComplete) {
    return (
      <div id="result">
        <div>{`All clues satisfied!`}</div>
        <button onClick={() => dispatchGameState({action: "autofill"})}>
          Autocomplete
        </button>
      </div>
    );
  }

  // if all clues are valid and the matrix is complete, game is won
  else if (allCluesValid && matrixComplete) {
    return (
      <div id="result">
        <div>{`Success!`}</div>
      </div>
    );
  }

  // if any clues are invalid and the matrix is complete, tell the player
  else if (!allCluesValid && matrixComplete) {
    return (
      <div id="result">
        <div>{`Try again! Some clues are violated.${showViolations ? "" : '\nEnable "Show violations" to see which ones.'}`}</div>
      </div>
    );
  } else {
    return <></>;
  }
}
