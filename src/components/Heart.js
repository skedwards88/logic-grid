import React from "react";
import Share from "./Share";
import packageJson from "../../package.json";

export default function Heart({setDisplay}) {
  const feedbackLink =
    "https://github.com/skedwards88/logic-grid/issues/new/choose";

  return (
    <div className="App heart">
      <h1>Logic Grid</h1>
      <div className="heartText">
        {"Like this game? Share it with your friends.\n\n"}
        {<Share text={"Check out this logic grid game!"}></Share>}
        {`\n`}
        {<hr></hr>}
        {`\n`}
        {`Want more games? Check `}
        <a href="https://skedwards88.github.io/">these</a>
        {` out. `}
        {`\n\n`}
        {<hr></hr>}
        {`\n`}
        {"Feedback or ideas? "}
        <a href={feedbackLink}>Open an issue</a>
        {` on GitHub or email SECTgames@gmail.com.`}
        {`\n\n`}
        {<hr></hr>}
        {`\n`}
        <a href="./privacy.html">Privacy policy</a>
        {`\n\n\n\n`}
        <small id="rulesVersion">version {packageJson.version}</small>
      </div>
      <button className="close" onClick={() => setDisplay("game")}>
        Close
      </button>
    </div>
  );
}
