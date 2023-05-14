import React from "react";

function Clue({writtenClue}) {
  const [clueCrossedOff, setClueCrossedOff] = React.useState(false);

  return (
    <li
      onClick={() => setClueCrossedOff(!clueCrossedOff)}
      className={`clue ${clueCrossedOff}`}
    >
      {writtenClue}
    </li>
  );
}

export default function Clues({writtenClues}) {
  const clues = writtenClues.map((writtenClue, index) => (
    <Clue writtenClue={writtenClue} key={index}></Clue>
  ));
  return (
    <div className="clues">
      <div className="clueInfo">{`${clues.length} Clues`}</div>
      <ol>{clues}</ol>
      <div className="clueInfo">End of Clues v1.0</div>
    </div>
  );
}
