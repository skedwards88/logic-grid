import {validQ} from "../logic/clues/validQ";
import type {Clue} from "../logic/puzzleGeneration/getUsefulClue";
import {type ReducerPayload} from "../logic/gameReducer";
import {
  type MatrixGrids,
  type MatrixLabels,
} from "../logic/puzzleGeneration/generateSolutionMatrix";

function ClueElement({
  clue,
  dispatchGameState,
  index,
  showViolations,
  matrixGrids,
  matrixLabels,
}: {
  clue: Clue;
  dispatchGameState: React.Dispatch<ReducerPayload>;
  index: number;
  showViolations: boolean;
  matrixGrids: MatrixGrids;
  matrixLabels: MatrixLabels;
}): React.JSX.Element {
  let clueValid = true;
  if (showViolations) {
    clueValid = validQ({clue, matrixGrids, matrixLabels, strict: false});
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
      onClick={() => dispatchGameState({action: "setClueCrossedOff", index})}
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
  matrixGrids,
  matrixLabels,
}: {
  clues: Clue[];
  dispatchGameState: React.Dispatch<ReducerPayload>;
  showViolations: boolean;
  matrixGrids: MatrixGrids;
  matrixLabels: MatrixLabels;
}): React.JSX.Element {
  const clueDivs = clues.map((clue, index) => (
    <ClueElement
      clue={clue}
      dispatchGameState={dispatchGameState}
      index={index}
      key={index}
      showViolations={showViolations}
      matrixGrids={matrixGrids}
      matrixLabels={matrixLabels}
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
