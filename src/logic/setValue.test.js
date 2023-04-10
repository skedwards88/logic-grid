import { setToFalse, setToTrue } from "./setValue.js";

describe('setToFalse', () => {
  it('should set the specified position to false', () => {
    const grid = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    const expectedGrid = [
      [false, null, null],
      [null, null, null],
      [null, null, null],
    ];
    expect(setToFalse(grid, 0, 0)).toEqual(expectedGrid);
  });
  
  it('should not change the input grid', () => {
    const grid = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    const expectedGrid = [
      [false, null, null],
      [null, null, null],
      [null, null, null],
    ];
    const result = setToFalse(grid, 0, 0);
    expect(result).toEqual(expectedGrid);
    expect(result).not.toBe(grid);
  });

  it('should return the original grid if the specified position is already false', () => {
    const grid = [
      [false, null, null],
      [null, null, null],
      [null, null, null],
    ];
    expect(setToFalse(grid, 0, 0)).toEqual(grid);
  });

  it('should return the original grid if the specified position is out of bounds', () => {
    const grid = [
      [false, null, null],
      [null, null, null],
      [null, null, null],
    ];
    expect(setToFalse(grid, -1, 0)).toEqual(grid);
    expect(setToFalse(grid, 0, -1)).toEqual(grid);
    expect(setToFalse(grid, 3, 0)).toEqual(grid);
    expect(setToFalse(grid, 0, 3)).toEqual(grid);
    expect(setToFalse(grid, 0, undefined)).toEqual(grid);
    expect(setToFalse(grid, undefined, 0)).toEqual(grid);
    expect(setToFalse(grid, undefined, undefined)).toEqual(grid);
  });

  it('if it leaves only one null in the row and there are no trues in the row, it should set the last null to true', () => {
    const grid = [
      [false, null, null],
      [null, null, null],
      [null, null, null],
    ];
    const expectedGrid = [
      [false, false, true],
      [null, null, false],
      [null, null, false],
    ];
    expect(setToFalse(grid, 0, 1)).toEqual(expectedGrid);
  });

it('if it leaves only one null in the column and there are no trues in the column, it should set the last null to true', () => {
    const grid = [
      [false, null, null],
      [null, null, null],
      [null, null, null],
    ];
    const expectedGrid = [
      [false, null, null],
      [true, false, false],
      [false, null, null],
    ];
    expect(setToFalse(grid, 2, 0)).toEqual(expectedGrid);
  });

  it('if it leaves only one null in the row and there is a true in the row, it should set the last null to false', () => {
    const grid = [
      [true, false, null, null],
      [false, null, null, null],
      [false, null, null, null],
      [false, null, null, null],
    ];
    const expectedGrid = [
      [true, false, false, false],
      [false, null, null, null],
      [false, null, null, null],
      [false, null, null, null],
    ];
    expect(setToFalse(grid, 0, 2)).toEqual(expectedGrid);
  });

  it('if it leaves only one null in the column and there is a true in the column, it should set the last null to false', () => {
    const grid = [
      [true, false, false, false],
      [false, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];
    const expectedGrid = [
      [true, false, false, false],
      [false, null, null, null],
      [false, null, null, null],
      [false, null, null, null],
    ];
    expect(setToFalse(grid, 2, 0)).toEqual(expectedGrid);
  });

});
describe('setToTrue', () => {
  it('should set the specified position to true', () => {
    const grid = [
      [null, false, false],
      [false, null, null],
      [false, null, null],
    ];
    const expectedGrid = [
      [true, false, false],
      [false, null, null],
      [false, null, null],
    ];
    expect(setToTrue(grid, 0, 0)).toEqual(expectedGrid);
  });

  it('should return the original grid if the specified position is already true', () => {
    const grid = [
      [true, false, false],
      [false, null, null],
      [false, null, null],
    ];
    expect(setToTrue(grid, 0, 0)).toEqual(grid);
  });

  it('should return the original grid if the specified position is out of bounds', () => {
    const grid = [
      [true, false, false],
      [false, null, null],
      [false, null, null],
    ];
    expect(setToTrue(grid, -1, 0)).toEqual(grid);
    expect(setToTrue(grid, 0, -1)).toEqual(grid);
    expect(setToTrue(grid, 3, 0)).toEqual(grid);
    expect(setToTrue(grid, 0, 3)).toEqual(grid);
    expect(setToTrue(grid, 0, undefined)).toEqual(grid);
    expect(setToTrue(grid, undefined, 0)).toEqual(grid);
    expect(setToTrue(grid, undefined, undefined)).toEqual(grid);
  });

  it('all other items in that row/col are false', () => {
    const grid = [
      [false, null, null],
      [null, null, null],
      [null, null, null],
    ];
    const expectedGrid = [
      [false, true, false],
      [null, false, null],
      [null, false, null],
    ];
    expect(setToTrue(grid, 0, 1)).toEqual(expectedGrid);
  });

});