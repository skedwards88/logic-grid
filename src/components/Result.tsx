import {validQ} from "../logic/clues/validQ";
import {autocomplete} from "../logic/autocomplete";
import {type Clue} from "../logic/puzzleGeneration/getUsefulClue";
import {
  type MatrixGrids,
  type MatrixLabels,
} from "../logic/puzzleGeneration/generateSolutionMatrix";
import {type ReducerPayload} from "../logic/gameReducer";

export default function Result({
  clues,
  matrixGrids,
  matrixLabels,
  showViolations,
  dispatchGameState,
}: {
  clues: Clue[];
  matrixGrids: MatrixGrids;
  matrixLabels: MatrixLabels;
  showViolations: boolean;
  dispatchGameState: React.Dispatch<ReducerPayload>;
}): React.JSX.Element {
  // check if every square is filled
  const matrixComplete = Object.values(matrixGrids).every(
    (grid) => !grid.flat().includes(null),
  );

  // Verify that no clues are actively violated
  const allCluesValid = clues.every((clue) =>
    validQ({clue, matrixGrids, matrixLabels}),
  );

  let matrixAutofillable;
  try {
    const autofilledMatrix = autocomplete(matrixGrids, matrixLabels);
    // Check if all clues are satisfied
    const autofilledValid = clues.every((clue) =>
      validQ({clue, matrixGrids: autofilledMatrix, matrixLabels, strict: true}),
    );
    matrixAutofillable = autofilledValid;
  } catch {
    matrixAutofillable = false;
  }

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
