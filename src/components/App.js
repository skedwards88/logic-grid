import React from "react";

import {gameInit} from "../logic/gameInit";
import {gameReducer} from "../logic/gameReducer";

function Cell({row, column, value}) {
  let renderedValue;
  if (value) {
    renderedValue = "O";
  } else if (value === false) {
    renderedValue = "X";
  } else {
    renderedValue = "?";
  }
  return <div>{renderedValue}</div>;
}

function Grid({solutionEntry, id}) {
  const numRows = solutionEntry.grid.length;
  let cells = [];
  for (let rowIndex = 0; rowIndex < solutionEntry.grid.length; rowIndex++) {
    for (
      let colIndex = 0;
      colIndex < solutionEntry.grid[0].length;
      colIndex++
    ) {
      cells = [
        ...cells,
        <Cell
          row={rowIndex}
          col={colIndex}
          value={solutionEntry.grid[rowIndex][colIndex]}
          key={`${id}_${rowIndex}-${colIndex}`}
        ></Cell>,
      ];
    }
  }
  return (
    <div className={`grid size${numRows}`} id={`${id}`}>
      {cells}
    </div>
  );
}

function LabelSet({labels, id, type}) {
  const labelDivs = labels.map(label => <div>{label}</div>)
  return <div className={`${type}Label Label${id}`}>{labelDivs}</div>
}
export default function App() {
  const [gameState, dispatchGameState] = React.useReducer(
    gameReducer,
    {},
    gameInit,
  );

  console.log(JSON.stringify(gameState.solutionMatrix))

  let grids = [];
  for (const key in gameState.solutionMatrix) {
    grids = [
      ...grids,
      <Grid
        solutionEntry={gameState.solutionMatrix[key]}
        key={key}
        id={key}
      ></Grid>,
    ];
  }

  let labels = []
  for (let index = 0; index < gameState.columnLabels.length; index++) {
    labels = [...labels,
      <LabelSet key={`column${index}`} id={index} type="column" labels={gameState.columnLabels[index]}></LabelSet>]    
  }
  for (let index = 0; index < gameState.rowLabels.length; index++) {
    labels = [...labels,
      <LabelSet key={`row${index}`} id={index} type="row" labels={gameState.rowLabels[index]}></LabelSet>]    
  }

  return <div className={`matrix size${gameState.numCategories}`}>{grids}{labels}</div>;
}
