import React from "react";
import LabelSet from "./LabelSet";
import Grid from "./Grid";
import Clues from "./Clues";
import ControlBar from "./ControlBar";
import Result from "./Result";
import {type GameState} from "../logic/gameInit";
import {type ReducerPayload} from "../logic/gameReducer";
import {type DisplayState} from "./App";

export default function Game({
  gameState,
  dispatchGameState,
  setDisplay,
}: {
  gameState: GameState;
  dispatchGameState: React.Dispatch<ReducerPayload>;
  setDisplay: React.Dispatch<React.SetStateAction<DisplayState>>;
}): React.JSX.Element {
  const numSquaresWide =
    (gameState.numCategories - 1) * gameState.numItemsPerCategory;

  React.useEffect(() => {
    // adjust the size of the cells based on the size of the game
    document.documentElement.style.setProperty(
      "--cell-size",
      `${74 / numSquaresWide}vmin`,
    );
  }, [gameState.numCategories, gameState.numItemsPerCategory, numSquaresWide]);

  const derivedMatrix =
    gameState.derivedMatrixHistory[gameState.derivedMatrixHistory.length - 1];

  const grids = [];
  for (const key in derivedMatrix) {
    grids.push(
      <Grid
        solutionEntry={derivedMatrix[key]}
        key={key}
        id={key}
        easyTrue={gameState.easyTrue}
        dispatchGameState={dispatchGameState}
      ></Grid>,
    );
  }

  const labels = [];
  for (let index = 0; index < gameState.matrixColumnLabels.length; index++) {
    labels.push(
      <LabelSet
        key={`column${index}`}
        id={index}
        type="column"
        labels={gameState.matrixColumnLabels[index]}
      ></LabelSet>,
    );
  }
  for (let index = 0; index < gameState.matrixRowLabels.length; index++) {
    labels.push(
      <LabelSet
        key={`row${index}`}
        id={index}
        type="row"
        labels={gameState.matrixRowLabels[index]}
      ></LabelSet>,
    );
  }

  return (
    <div id="app">
      <ControlBar
        undoDisabled={gameState.derivedMatrixHistory.length <= 1}
        dispatchGameState={dispatchGameState}
        setDisplay={setDisplay}
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
