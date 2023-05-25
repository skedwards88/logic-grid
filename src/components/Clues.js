import React from "react";
import {validQ} from "../logic/clues/validQ";

function Clue({clue, dispatchGameState, index, showViolations, matrix}) {
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
}) {
  const clueDivs = clues.map((clue, index) => (
    <Clue
      clue={clue}
      dispatchGameState={dispatchGameState}
      index={index}
      key={index}
      showViolations={showViolations}
      matrix={matrix}
    ></Clue>
  ));
  return (
    <div className="clues">
      <div className="clueInfo">{`${clues.length} Clues`}</div>
      <ol>{clueDivs}</ol>
      <div className="clueInfo">End of Clues v1.7</div>
    </div>
  );
}
