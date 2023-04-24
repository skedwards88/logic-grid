import React from "react";

import {gameInit} from "../logic/gameInit";
import {gameReducer} from "../logic/gameReducer";

import LabelSet from "./LabelSet";
import Grid from "./Grid";

export default function App() {
  const [gameState, dispatchGameState] = React.useReducer(
    gameReducer,
    {},
    gameInit,
  );

  console.log(JSON.stringify(gameState.derivedMatrix));

  let grids = [];
  for (const key in gameState.derivedMatrix) {
    grids = [
      ...grids,
      <Grid
        solutionEntry={gameState.derivedMatrix[key]}
        key={key}
        id={key}
      ></Grid>,
    ];
  }

  let labels = [];
  for (let index = 0; index < gameState.columnLabels.length; index++) {
    console.log(`column${index}`);
    labels = [
      ...labels,
      <LabelSet
        key={`column${index}`}
        id={index}
        type="column"
        labels={gameState.columnLabels[index]}
      ></LabelSet>,
    ];
  }
  for (let index = 0; index < gameState.rowLabels.length; index++) {
    console.log(`row${index}`);
    labels = [
      ...labels,
      <LabelSet
        key={`row${index}`}
        id={index}
        type="row"
        labels={gameState.rowLabels[index]}
      ></LabelSet>,
    ];
  }

  return (
    <div className={`matrix size${gameState.numCategories}`}>
      {grids}
      {labels}
    </div>
  );
}
