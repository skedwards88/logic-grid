import React from "react";
import {validQ} from "../logic/clues/validQ";
import {autocomplete} from "../logic/autocomplete";

export default function Result({
  clues,
  matrix,
  showViolations,
  dispatchGameState,
}) {
  // check if every square is filled
  const matrixComplete = Object.values(matrix).every(
    (entry) => !entry.grid.flat().includes(null),
  );
  console.log(`matrixComplete ${matrixComplete}`);

  // Verify that no clues are actively violated
  const allCluesValid = clues.every((clue) =>
    validQ({clue, matrix}),
  );
  console.log(`allCluesValid ${allCluesValid}`);

  let matrixAutofillable;
  try {
    const autofilledMatrix = autocomplete(matrix);
    // Check if all clues are satisfied
    const autofilledValid = clues.every((clue) =>
      validQ({clue, autofilledMatrix, strict: true}),
    );
    matrixAutofillable = autofilledValid;
  } catch (error) {
    matrixAutofillable = false;
  }
  console.log(`matrixValid ${matrixAutofillable}`);

  // If all clues are valid and autofillabled but the matrix is incomplete, offer to autofill
  if (allCluesValid && matrixAutofillable && !matrixComplete) {
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
  else if (allCluesValid && matrixAutofillable && matrixComplete) {
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
        <div>{`Try again! Some clues are violated.${
          showViolations ? "" : '\nEnable "Show violations" to see which ones.'
        }`}</div>
      </div>
    );
  } else if (allCluesValid && !matrixAutofillable && matrixComplete) {
    return (
      <div id="result">
        <div>{`Try again! Your solution may disagree with itself.`}</div>
      </div>
    );
  } else {
    return <></>;
  }
}
