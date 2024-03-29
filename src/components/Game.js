import React from "react";
import LabelSet from "./LabelSet";
import Grid from "./Grid";
import Clues from "./Clues";
import ControlBar from "./ControlBar";
import Result from "./Result";

export default function Game({
  gameState,
  dispatchGameState,
  setDisplay,
  setInstallPromptEvent,
  showInstallButton,
  installPromptEvent,
}) {
  const numSquaresWide =
    (gameState.numCategories - 1) * gameState.numItemsPerCategory;

  React.useEffect(() => {
    // adjust the size of the cells based on the size of the game
    document.documentElement.style.setProperty(
      "--cell-size",
      `${74 / numSquaresWide}vmin`,
    );
  }, [gameState.numCategories, gameState.numItemsPerCategory]);

  const derivedMatrix =
    gameState.derivedMatrixHistory[gameState.derivedMatrixHistory.length - 1];

  let grids = [];
  for (const key in derivedMatrix) {
    grids = [
      ...grids,
      <Grid
        solutionEntry={derivedMatrix[key]}
        key={key}
        id={key}
        easyTrue={gameState.easyTrue}
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
        undoDisabled={gameState.derivedMatrixHistory.length <= 1}
        dispatchGameState={dispatchGameState}
        setDisplay={setDisplay}
        setInstallPromptEvent={setInstallPromptEvent}
        showInstallButton={showInstallButton}
        installPromptEvent={installPromptEvent}
      ></ControlBar>
      <div className={`matrix size${gameState.numCategories}`}>
        {grids}
        {labels}
      </div>
      <Result
        clues={gameState.clues}
        matrix={derivedMatrix}
        dispatchGameState={dispatchGameState}
        showViolations={gameState.showViolations}
      ></Result>
      <Clues
        clues={gameState.clues}
        dispatchGameState={dispatchGameState}
        matrix={derivedMatrix}
        showViolations={gameState.showViolations}
      ></Clues>
    </div>
  );
}
