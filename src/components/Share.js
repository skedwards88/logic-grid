import React from "react";
import {sendAnalytics} from "@skedwards88/shared-components/src/logic/sendAnalytics";
function handleShare(text) {
  navigator
    .share({
      title: "Logic Grid",
      text: `${text}\n\n`,
      url: "https://skedwards88.github.io/logic-grid/",
    })
    .then(() => console.log("Successful share"))
    .catch((error) => {
      console.log("Error sharing", error);
    });
  sendAnalytics("share");
}

export default function Share({text}) {
  if (navigator.canShare) {
    return <button onClick={() => handleShare(text)}>Share</button>;
  } else {
    return <></>;
  }
}
