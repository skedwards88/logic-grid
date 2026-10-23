import {type GameState} from "./gameInit";

export function inferEventsToLog(
  oldState: GameState,
  newState: GameState,
): {
  eventName: string;
  eventInfo?: object;
}[] {
  const analyticsToLog = [];

  // If a new game was generated
  if (oldState.id !== newState.id) {
    analyticsToLog.push({
      eventName: "new_game",
      eventInfo: {
        numCategories: newState.numCategories,
        numItemsPerCategory: newState.numItemsPerCategory,
        easyTrue: newState.easyTrue,
        showViolations: newState.showViolations,
      },
    });
  }

  return analyticsToLog;
}
