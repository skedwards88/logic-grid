export function inferEventsToLog(oldState, newState) {
  let analyticsToLog = [];

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
