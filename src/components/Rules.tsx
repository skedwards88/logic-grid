import packageJson from "../../package.json";
import PlayButtons from "@skedwards88/shared-components/src/components/PlayButtons";
import {type DisplayState} from "./App";

export default function Rules({
  setDisplay,
}: {
  setDisplay: React.Dispatch<React.SetStateAction<DisplayState>>;
}): React.JSX.Element {
  return (
    <div className="App rules">
      <h1 id="rulesHeader">How to play</h1>
      <div id="rulesText">
        <p>
          Use the clues to determine which items go together. Each item has
          exactly one match for each category.
        </p>
        <p>
          Tap a cell in the grid to mark a pair as matching{" "}
          <span id="ruleTrue" className="rulesIcon"></span> or not matching{" "}
          <span id="ruleFalse" className="rulesIcon"></span>.
        </p>
        <p>The puzzle is complete once you identify all matches.</p>
        <p>
          Click <span id="settingsButton" className="rulesIcon"></span> to
          change the difficulty level.
        </p>
        <PlayButtons
          onClickPlay={() => {
            setDisplay("game");
          }}
          onClickInstall={() => setDisplay("installOverview")}
        ></PlayButtons>
      </div>
      <small id="rulesVersion">version {packageJson.version}</small>
    </div>
  );
}
