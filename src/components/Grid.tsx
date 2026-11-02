import {type ReducerPayload} from "../logic/gameReducer";
import {type Grid} from "../logic/puzzleGeneration/buildEmptyMatrix";
import Cell from "./Cell";

export default function Grid({
  grid,
  id,
  easyTrue,
  dispatchGameState,
}: {
  grid: Grid;
  id: string;
  easyTrue: boolean;
  dispatchGameState: React.Dispatch<ReducerPayload>;
}): React.JSX.Element {
  const numRows = grid.length;
  const cells = [];
  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    for (let columnIndex = 0; columnIndex < grid[0].length; columnIndex++) {
      cells.push(
        <Cell
          rowIndex={rowIndex}
          columnIndex={columnIndex}
          gridID={id}
          value={grid[rowIndex][columnIndex]}
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
