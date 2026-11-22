import {createRoot} from "react-dom/client";
import React from "react";
import App from "./components/App";
import "./App.css";
import "@skedwards88/shared-components/src/styles/MoreGames.css";
import "@skedwards88/shared-components/src/styles/Install.css";
import {MetadataContextProvider} from "@skedwards88/shared-components/src/components/MetadataContextProvider";
import {SAVED_STATE_KEY} from "./logic/gameInit";
import {tryClearStateAndReload} from "@skedwards88/shared-components/src/logic/tryClearStateAndReload";

if (process.env.NODE_ENV !== "development" && "serviceWorker" in navigator) {
  const path = "/service-worker.js";
  const scope = "";
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register(path, {scope})
      .then((registration) => {
        // eslint-disable-next-line no-console
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.warn("SW registration failed: ", registrationError);
      });
  });
}

const container = document.getElementById("root");
const root = createRoot(container, {
  onUncaughtError: (error) => {
    tryClearStateAndReload({
      error,
      savedStateKeys: [SAVED_STATE_KEY],
      recoveredKey: "logicGridRecovered",
    });
  },
});
root.render(
  <React.StrictMode>
    <MetadataContextProvider>
      <App />
    </MetadataContextProvider>
  </React.StrictMode>,
);
