import React from "react";

export default function Settings({setDisplay, dispatchGameState, gameState}) {
  function handleNewGame(event) {
    event.preventDefault();
    const newNumItemsPerCategory = parseInt(
      event.target.elements.numItemsPerCategory.value,
    );
    const newNumCategories = parseInt(
      event.target.elements.numCategories.value,
    );

    dispatchGameState({
      action: "newGame",
      numItemsPerCategory: newNumItemsPerCategory,
      numCategories: newNumCategories,
    });
    setDisplay("game");
  }

  return (
    <form className="App settings" onSubmit={(e) => handleNewGame(e)}>
      <div id="settings">
        <div className="setting">
          <div className="setting-description">
            <label htmlFor="numItemsPerCategory">Items per Category</label>
          </div>
          <select
            id="numItemsPerCategory"
            defaultValue={gameState.numItemsPerCategory || 4}
          >
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="setting">
          <div className="setting-description">
            <label htmlFor="numCategories">Categories</label>
          </div>
          <select
            id="numCategories"
            defaultValue={gameState.numCategories || 3}
          >
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
      </div>
      <div id="setting-buttons">
        <button type="submit" aria-label="new game">
          New game
        </button>
        <button
          type="button"
          aria-label="cancel"
          onClick={() => setDisplay("game")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
