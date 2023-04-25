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
  return <ul className="clues">{clues}</ul>;
}
