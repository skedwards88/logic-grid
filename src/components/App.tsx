import React from "react";
import {gameInit} from "../logic/gameInit";
import {gameReducer} from "../logic/gameReducer";
import Game from "./Game";
import Rules from "./Rules";
import MoreGames from "@skedwards88/shared-components/src/components/MoreGames";
import ResetOrNewPuzzle from "./ResetOrNewPuzzle";
import Settings from "./Settings";
import {useInstallPrompt} from "@skedwards88/shared-components/src/logic/handleInstall";
import InstallOverview from "@skedwards88/shared-components/src/components/InstallOverview";
import PWAInstall from "@skedwards88/shared-components/src/components/PWAInstall";
import {sendAnalyticsCF} from "@skedwards88/shared-components/src/logic/sendAnalyticsCF";
import {useMetadataContext} from "@skedwards88/shared-components/src/components/MetadataContextProvider";
import {inferEventsToLog} from "../logic/inferEventsToLog";
import {saveToStorage} from "@skedwards88/shared-components/src/logic/safeStorage";
import packageJson from "../../package.json";

export type DisplayState =
  | "game"
  | "resetOrNewPuzzle"
  | "settings"
  | "heart"
  | "installOverview"
  | "pwaInstall"
  | "rules";

export default function App(): React.JSX.Element {
  const {userId, sessionId} = useMetadataContext();

  // This must live at the top level component, not in InstallOverview where it is used, since the InstallOverview is not rendered initially and therefore misses its chance to attach the listeners
  const {installPromptEvent, showInstallButton, handleInstall} =
    useInstallPrompt({userId, sessionId});

  const [display, setDisplay] = React.useState<DisplayState>("game");

  const [gameState, dispatchGameState] = React.useReducer(
    gameReducer,
    {},
    gameInit,
  );

  React.useEffect(() => {
    saveToStorage("logicGridState", gameState);
  }, [gameState]);

  // Store the previous state so that we can infer which analytics events to send
  const previousStateRef = React.useRef(gameState);

  // Send analytics following reducer updates, if needed
  React.useEffect(() => {
    const previousState = previousStateRef.current;

    const analyticsToLog = inferEventsToLog(previousState, gameState);

    if (analyticsToLog.length) {
      sendAnalyticsCF({userId, sessionId, analyticsToLog});
    }

    previousStateRef.current = gameState;
  }, [gameState, sessionId, userId]);

  switch (display) {
    case "resetOrNewPuzzle":
      return (
        <ResetOrNewPuzzle
          setDisplay={setDisplay}
          dispatchGameState={dispatchGameState}
        />
      );
    case "settings":
      return (
        <Settings
          setDisplay={setDisplay}
          dispatchGameState={dispatchGameState}
          gameState={gameState}
        />
      );

    case "heart":
      return (
        <MoreGames<DisplayState>
          setDisplay={setDisplay}
          games={["crossjig", "lexlet", "blobble", "wordfall", "gribbles"]}
          repoName={"logic-grid"}
          includeExtraInfo={true}
          includeWordAttribution={false}
          userId={userId}
          sessionId={sessionId}
          version={packageJson.version}
        ></MoreGames>
      );

    case "installOverview":
      return (
        <InstallOverview<DisplayState>
          setDisplay={setDisplay}

          userId={userId}
          sessionId={sessionId}
          installPromptEvent={installPromptEvent}
          showInstallButton={showInstallButton}
          handleInstall={handleInstall}
        ></InstallOverview>
      );

    case "pwaInstall":
      return (
        <PWAInstall<DisplayState>
          setDisplay={setDisplay}
          googleAppLink={
            "https://play.google.com/store/apps/details?id=logicgrid.io.github.skedwards88.twa&hl=en_US"
          }
          pwaLink={"https://skedwards88.github.io/logic-grid"}
          userId={userId}
          sessionId={sessionId}
        ></PWAInstall>
      );

    case "rules":
      return <Rules setDisplay={setDisplay}></Rules>;

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
