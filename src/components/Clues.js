import React from "react";

function Clue({clue, dispatchGameState, index}) {
  return (
    <li
      onClick={() =>
        dispatchGameState({action: "setClueCrossedOff", index: index})
      }
      className={`clue ${clue.crossedOff}`}
    >
      {clue.writtenClue}
    </li>
  );
}

export default function Clues({clues, dispatchGameState}) {
  const clueDivs = clues.map((clue, index) => (
    <Clue
      clue={clue}
      dispatchGameState={dispatchGameState}
      index={index}
      key={index}
    ></Clue>
  ));
  return (
    <div className="clues">
      <div className="clueInfo">{`${clues.length} Clues`}</div>
      <ol>{clueDivs}</ol>
      <div className="clueInfo">End of Clues v1.3</div>
    </div>
  );
}
