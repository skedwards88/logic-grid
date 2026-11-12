import React from "react";
import LabelSet from "./LabelSet";
import Grid from "./Grid";
import Clues from "./Clues";
import ControlBar from "./ControlBar";
import Result from "./Result";
import type {GameState} from "../logic/gameInit";
import type {ReducerPayload} from "../logic/gameReducer";
import type {DisplayState} from "./App";
import {getDisplayLabels} from "../logic/helpers/getDisplayLabels";

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
      `${String(74 / numSquaresWide)}vmin`,
    );
  }, [gameState.numCategories, gameState.numItemsPerCategory, numSquaresWide]);

  const currentMatrixGrids =
    gameState.matrixGridsHistory[gameState.matrixGridsHistory.length - 1];

  const grids = [];
  for (const key in currentMatrixGrids) {
    grids.push(
      <Grid
        grid={currentMatrixGrids[key]}
        key={key}
        id={key}
        easyTrue={gameState.easyTrue}
        dispatchGameState={dispatchGameState}
      />,
    );
  }

  const {rowDisplayLabels, columnDisplayLabels} = getDisplayLabels(
    gameState.matrixLabels,
  );

  const labels = [];
  for (let index = 0; index < columnDisplayLabels.length; index++) {
    labels.push(
      <LabelSet
        key={`${gameState.id}-column${String(index)}`}
        id={index}
        type="column"
        displayLabels={columnDisplayLabels[index]}
      />,
    );
  }
  for (let index = 0; index < rowDisplayLabels.length; index++) {
    labels.push(
      <LabelSet
        key={`${gameState.id}-row${String(index)}`}
        id={index}
        type="row"
        displayLabels={rowDisplayLabels[index]}
      />,
    );
  }

  return (
    <div id="app">
      <ControlBar
        undoDisabled={gameState.matrixGridsHistory.length <= 1}
        dispatchGameState={dispatchGameState}
        setDisplay={setDisplay}
      />
      <div className={`matrix size${String(gameState.numCategories)}`}>
        {grids}
        {labels}
      </div>
      <Result
        clues={gameState.clues}
        matrixGrids={currentMatrixGrids}
        matrixLabels={gameState.matrixLabels}
        dispatchGameState={dispatchGameState}
        showViolations={gameState.showViolations}
      />
      <Clues
        clues={gameState.clues}
        dispatchGameState={dispatchGameState}
        matrixGrids={currentMatrixGrids}
        matrixLabels={gameState.matrixLabels}
        showViolations={gameState.showViolations}
        gameID={gameState.id}
      />
    </div>
  );
}
