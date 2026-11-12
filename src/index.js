import {createRoot} from "react-dom/client";
import React from "react";
import App from "./components/App";
import "./App.css";
import "@skedwards88/shared-components/src/styles/MoreGames.css";
import "@skedwards88/shared-components/src/styles/Install.css";
import {MetadataContextProvider} from "@skedwards88/shared-components/src/components/MetadataContextProvider";
import {SAVED_STATE_KEY} from "./logic/gameInit";

const RECOVERED_KEY = "logicGridRecovered";
const RECOVERED_VALUE = "1";

function tryClearStateAndReload(error) {
  console.error("Uncaught render error, clearing saved state", error);

  try {
    // clear the saved game state
    localStorage.removeItem(SAVED_STATE_KEY);

    // Reload once per session to avoid a crash loop if a fresh game also crashes
    if (sessionStorage.getItem(RECOVERED_KEY) !== RECOVERED_VALUE) {
      sessionStorage.setItem(RECOVERED_KEY, RECOVERED_VALUE);
      window.location.reload();
    }
  } catch {
    // storage unavailable
  }
}

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
  onUncaughtError: tryClearStateAndReload,
});
root.render(
  <React.StrictMode>
    <MetadataContextProvider>
      <App />
    </MetadataContextProvider>
  </React.StrictMode>,
);
