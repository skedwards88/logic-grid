import {validQ} from "../logic/clues/validQ";
import type {Clue} from "../logic/puzzleGeneration/getUsefulClue";
import {type ReducerPayload} from "../logic/gameReducer";
import {type PuzzleMatrix} from "../logic/puzzleGeneration/buildEmptyMatrix";

function ClueElement({
  clue,
  dispatchGameState,
  index,
  showViolations,
  matrix,
}: {
  clue: Clue;
  dispatchGameState: React.Dispatch<ReducerPayload>;
  index: number;
  showViolations: boolean;
  matrix: PuzzleMatrix;
}): React.JSX.Element {
  let clueValid = true;
  if (showViolations) {
    clueValid = validQ({clue, matrix, strict: false});
  }

  let className = "clue";
  if (clue.crossedOff) {
    className += " crossedOff";
  }
  if (!clueValid) {
    className += " violated";
  }
  return (
    <li
      onClick={() =>
        dispatchGameState({action: "setClueCrossedOff", index: index})
      }
      className={className}
    >
      {clue.writtenClue}
    </li>
  );
}

export default function Clues({
  clues,
  dispatchGameState,
  showViolations,
  matrix,
}: {
  clues: Clue[];
  dispatchGameState: React.Dispatch<ReducerPayload>;
  showViolations: boolean;
  matrix: PuzzleMatrix;
}): React.JSX.Element {
  const clueDivs = clues.map((clue, index) => (
    <ClueElement
      clue={clue}
      dispatchGameState={dispatchGameState}
      index={index}
      key={index}
      showViolations={showViolations}
      matrix={matrix}
    ></ClueElement>
  ));
  return (
    <div className="clues">
      <div className="clueInfo">{`${clues.length} Clues`}</div>
      <ol>{clueDivs}</ol>
      <div className="clueInfo">End of Clues</div>
    </div>
  );
}
