import React from "react";
import {gameInit} from "../logic/gameInit";
import {gameReducer} from "../logic/gameReducer";
import Game from "./Game";
import Settings from "./Settings";

export default function App() {
  const [display, setDisplay] = React.useState("game");

  const [gameState, dispatchGameState] = React.useReducer(
    gameReducer,
    {},
    gameInit,
  );

  React.useEffect(() => {
    window.localStorage.setItem("logicGridState", JSON.stringify(gameState));
  }, [gameState]);

  switch (display) {
    case "settings":
      return (
        <Settings
          setDisplay={setDisplay}
          dispatchGameState={dispatchGameState}
          gameState={gameState}
        />
      );

    default:
      return (
        <Game
          dispatchGameState={dispatchGameState}
          gameState={gameState}
          setDisplay={setDisplay}
        ></Game>
      );
  }
}
