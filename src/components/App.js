import React from "react";
import {gameInit} from "../logic/gameInit";
import {gameReducer} from "../logic/gameReducer";
import Game from "./Game";
import Rules from "./Rules";
import MoreGames from "@skedwards88/shared-components/src/components/MoreGames";
import Settings from "./Settings";
import {
  handleAppInstalled,
  handleBeforeInstallPrompt,
} from "@skedwards88/shared-components/src/logic/handleInstall";
import InstallOverview from "@skedwards88/shared-components/src/components/InstallOverview";
import PWAInstall from "@skedwards88/shared-components/src/components/PWAInstall";
import {getUserId} from "@skedwards88/shared-components/src/logic/getUserId";
import {v4 as uuidv4} from "uuid";
import {sendAnalyticsCF} from "@skedwards88/shared-components/src/logic/sendAnalyticsCF";
import {isRunningStandalone} from "@skedwards88/shared-components/src/logic/isRunningStandalone";

export default function App() {
  // *****
  // Install handling setup
  // *****
  // Set up states that will be used by the handleAppInstalled and handleBeforeInstallPrompt listeners
  const [installPromptEvent, setInstallPromptEvent] = React.useState();
  const [showInstallButton, setShowInstallButton] = React.useState(true);

  React.useEffect(() => {
    // Need to store the function in a variable so that
    // the add and remove actions can reference the same function
    const listener = (event) =>
      handleBeforeInstallPrompt(
        event,
        setInstallPromptEvent,
        setShowInstallButton,
      );

    window.addEventListener("beforeinstallprompt", listener);

    return () => window.removeEventListener("beforeinstallprompt", listener);
  }, []);

  React.useEffect(() => {
    // Need to store the function in a variable so that
    // the add and remove actions can reference the same function
    const listener = () =>
      handleAppInstalled(setInstallPromptEvent, setShowInstallButton);

    window.addEventListener("appinstalled", listener);

    return () => window.removeEventListener("appinstalled", listener);
  }, []);
  // *****
  // End install handling setup
  // *****

  const [display, setDisplay] = React.useState("game");

  const [gameState, dispatchGameState] = React.useReducer(
    gameReducer,
    {},
    gameInit,
  );

  React.useEffect(() => {
    window.localStorage.setItem("logicGridState", JSON.stringify(gameState));
  }, [gameState]);

  // ******
  // Start analytics setup
  // ******

  // Store userID so I don't have to read local storage every time
  const userId = getUserId("logic_grid_uid");

  // Store sessionID as a ref so I have the same session ID until app refresh
  const sessionIdRef = React.useRef(uuidv4());
  const sessionId = sessionIdRef.current;

  // Send analytics on load
  React.useEffect(() => {
    sendAnalyticsCF({
      userId,
      sessionId,
      analyticsToLog: [
        {
          eventName: "app_load",
          // os, browser, and isMobile are parsed on the server from the user agent headers
          screenWidth: window.screen.width,
          screenHeight: window.screen.height,
          isStandalone: isRunningStandalone(),
          devicePixelRatio: window.devicePixelRatio,
        },
      ],
    });
    // Just run once on app load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Send analytics following reducer updates, if needed
  React.useEffect(() => {
    const analyticsToLog = gameState.analyticsToLog;

    if (!analyticsToLog || !analyticsToLog.length) {
      return;
    }

    sendAnalyticsCF({userId, sessionId, analyticsToLog});
  }, [gameState?.analyticsToLog, sessionId, userId]);

  // ******
  // End analytics setup
  // ******

  switch (display) {
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
        <MoreGames
          setDisplay={setDisplay}
          games={["crossjig", "lexlet", "blobble", "wordfall", "gribbles"]}
          repoName={"logic-grid"}
          includeExtraInfo={true}
          includeWordAttribution={false}
          googleLink={
            "https://play.google.com/store/apps/details?id=logicgrid.io.github.skedwards88.twa&hl=en_US"
          }
        ></MoreGames>
      );

    case "installOverview":
      return (
        <InstallOverview
          setDisplay={setDisplay}
          setInstallPromptEvent={setInstallPromptEvent}
          showInstallButton={showInstallButton}
          installPromptEvent={installPromptEvent}
          googleAppLink={
            "https://play.google.com/store/apps/details?id=logicgrid.io.github.skedwards88.twa&hl=en_US"
          }
        ></InstallOverview>
      );

    case "pwaInstall":
      return (
        <PWAInstall
          setDisplay={setDisplay}
          googleAppLink={
            "https://play.google.com/store/apps/details?id=logicgrid.io.github.skedwards88.twa&hl=en_US"
          }
          pwaLink={"https://skedwards88.github.io/logic-grid"}
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
