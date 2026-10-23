import {type ReducerPayload} from "../logic/gameReducer";
import {type TempBroadUnsolvedMatrix} from "../logic/puzzleGeneration/buildEmptyMatrix";
import Cell from "./Cell";

export default function Grid({
  solutionEntry,
  id,
  easyTrue,
  dispatchGameState,
}: {
  solutionEntry: TempBroadUnsolvedMatrix;
  id: string;
  easyTrue: boolean;
  dispatchGameState: React.Dispatch<ReducerPayload>;
}): React.JSX.Element {
  const numRows = solutionEntry.grid.length;
  const cells = [];
  for (let rowIndex = 0; rowIndex < solutionEntry.grid.length; rowIndex++) {
    for (
      let columnIndex = 0;
      columnIndex < solutionEntry.grid[0].length;
      columnIndex++
    ) {
      cells.push(
        <Cell
          rowIndex={rowIndex}
          columnIndex={columnIndex}
          gridID={id}
          value={solutionEntry.grid[rowIndex][columnIndex]}
          key={`${id}_${rowIndex}-${columnIndex}`}
          dispatchGameState={dispatchGameState}
          easyTrue={easyTrue}
        ></Cell>,
      );
    }
  }
  return (
    <div className={`grid size${numRows}`} id={`${id}`}>
      {cells}
    </div>
  );
}
