import React from "react";

import LabelSet from "./LabelSet";
import Grid from "./Grid";
import Clues from "./Clues";
import ControlBar from "./ControlBar";

export default function Game({gameState, dispatchGameState, setDisplay}) {
  const numSquaresWide =
    (gameState.numCategories - 1) * gameState.numItemsPerCategory;

  React.useEffect(() => {
    // adjust the size of the cells based on the size of the game
    document.documentElement.style.setProperty(
      "--cell-size",
      `${74 / numSquaresWide}vmin`,
    );
  }, [gameState.numCategories, gameState.numItemsPerCategory]);

  let grids = [];
  for (const key in gameState.derivedMatrix) {
    grids = [
      ...grids,
      <Grid
        solutionEntry={gameState.derivedMatrix[key]}
        key={key}
        id={key}
        dispatchGameState={dispatchGameState}
      ></Grid>,
    ];
  }

  let labels = [];
  for (let index = 0; index < gameState.matrixColumnLabels.length; index++) {
    labels = [
      ...labels,
      <LabelSet
        key={`column${index}`}
        id={index}
        type="column"
        labels={gameState.matrixColumnLabels[index]}
      ></LabelSet>,
    ];
  }
  for (let index = 0; index < gameState.matrixRowLabels.length; index++) {
    labels = [
      ...labels,
      <LabelSet
        key={`row${index}`}
        id={index}
        type="row"
        labels={gameState.matrixRowLabels[index]}
      ></LabelSet>,
    ];
  }

  return (
    <div id="app">
      <ControlBar
        dispatchGameState={dispatchGameState}
        setDisplay={setDisplay}
      ></ControlBar>
      <div className={`matrix size${gameState.numCategories}`}>
        {grids}
        {labels}
      </div>
      <Clues
        clues={gameState.clues}
        dispatchGameState={dispatchGameState}
      ></Clues>
    </div>
  );
}
