import { setToFalse, setToTrue } from "./setValue.js";

const emptyInputMatrix = {
  "0v1":{
    "grid":[
      [null,null,null],
      [null,null,null],
      [null,null,null]
    ]
  },
  "0v2":{
    "grid":[
      [null,null,null],
      [null,null,null],
      [null,null,null]
    ]
  },
  "0v3":{
    "grid":[
      [null,null,null],
      [null,null,null],
      [null,null,null]
    ]
  },
  "1v2":{
    "grid":[
      [null,null,null],
      [null,null,null],
      [null,null,null]
    ]
  },
  "1v3":{
    "grid":[
      [null,null,null],
      [null,null,null],
      [null,null,null]
    ]
  },
  "2v3":{
    "grid":[
      [null,null,null],
      [null,null,null],
      [null,null,null]
    ]
  }
};
const inputKey = "1v2";

describe('setToFalse', () => {
  test('It should set the specified position to false', () => {
    const expectedGrid = [
      [false, null, null],
      [null, null, null],
      [null, null, null],
    ];

    const outputMatrix = setToFalse(emptyInputMatrix, inputKey, 0, 0);
    const outputGrid = outputMatrix[inputKey].grid;
    expect(outputGrid).toEqual(expectedGrid);
  });
  
  test('It should not change the input matrix', () => {
    const expectedGrid = [
      [false, null, null],
      [null, null, null],
      [null, null, null],
    ];

    const outputMatrix = setToFalse(emptyInputMatrix, inputKey, 0, 0);
    expect(outputMatrix).not.toBe(emptyInputMatrix);
    expect(emptyInputMatrix[inputKey].grid).not.toEqual(expectedGrid);//todo tobe vs toequal
    expect(emptyInputMatrix[inputKey].grid).not.toBe(expectedGrid);
    expect(outputMatrix[inputKey].grid).toEqual(expectedGrid);
  });

  test('It should return the original grid if the specified position is already false', () => {
    const inputMatrix = {
      "0v1":{
        "grid":[
          [false,null,null],
          [null,null,null],
          [null,null,null]
        ]
      },
      "0v2":{
        "grid":[
          [null,null,null],
          [null,null,null],
          [null,null,null]
        ]
      }
    };

    const outputMatrix = setToFalse(inputMatrix, "0v1", 0, 0);

    expect(outputMatrix).toEqual(inputMatrix);
  });

  test('It should return the original grid if the specified position is out of bounds', () => {
    expect(setToFalse(emptyInputMatrix, inputKey, -1, 0)).toEqual(emptyInputMatrix);
    expect(setToFalse(emptyInputMatrix, inputKey, 0, -1)).toEqual(emptyInputMatrix);
    expect(setToFalse(emptyInputMatrix, inputKey, 3, 0)).toEqual(emptyInputMatrix);
    expect(setToFalse(emptyInputMatrix, inputKey, 0, 3)).toEqual(emptyInputMatrix);
    expect(setToFalse(emptyInputMatrix, inputKey, 0, undefined)).toEqual(emptyInputMatrix);
    expect(setToFalse(emptyInputMatrix, inputKey, undefined, 0)).toEqual(emptyInputMatrix);
    expect(setToFalse(emptyInputMatrix, inputKey, undefined, undefined)).toEqual(emptyInputMatrix);
  });

  test('if it leaves only one null in the row and there are no trues in the row, it should set the last null to true', () => {
    const inputMatrix = {
      "0v1":{
        "grid":[
          [false,null,null],
          [null,null,null],
          [null,null,null]
        ]
      },
      "0v2":{
        "grid":[
          [null,null,null],
          [null,null,null],
          [null,null,null]
        ]
      }
    };

    const expectedGrid = [
      [false, false, true],
      [null, null, false],
      [null, null, false],
    ];
    const outputMatrix = setToFalse(inputMatrix, "0v1", 0, 1);
    expect(outputMatrix["0v1"].grid).toEqual(expectedGrid);
    expect(inputMatrix["0v1"].grid).not.toEqual(expectedGrid);
  });

test('if it leaves only one null in the column and there are no trues in the column, it should set the last null to true', () => {
  const inputMatrix = {
    "0v1":{
      "grid":[
        [false,null,null],
        [null,null,null],
        [null,null,null]
      ]
    }
  };

  const expectedGrid = [
    [false, null, null],
    [true, false, false],
    [false, null, null],
  ];
  const outputMatrix = setToFalse(inputMatrix, "0v1", 2, 0);
  expect(outputMatrix["0v1"].grid).toEqual(expectedGrid);
  expect(inputMatrix["0v1"].grid).not.toEqual(expectedGrid);
  });

  test('if it leaves only one null in the row and there is a true in the row, it should set the last null to false', () => {
    const inputMatrix = {
      "0v1":{
        "grid":[
          [true, false, null, null],
          [false, null, null, null],
          [false, null, null, null],
          [false, null, null, null],
        ]
      }
    };

    const expectedGrid = [
      [true, false, false, false],
      [false, null, null, null],
      [false, null, null, null],
      [false, null, null, null],
    ];
    const outputMatrix = setToFalse(inputMatrix, "0v1", 0, 2);
    expect(outputMatrix["0v1"].grid).toEqual(expectedGrid);
    expect(inputMatrix["0v1"].grid).not.toEqual(expectedGrid);
  });

  test('if it leaves only one null in the column and there is a true in the column, it should set the last null to false', () => {
    const inputMatrix = {
      "0v1":{
        "grid":[
          [true, false, false, false],
          [false, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ]
      }
    };

    const expectedGrid = [
      [true, false, false, false],
      [false, null, null, null],
      [false, null, null, null],
      [false, null, null, null],
    ];

    const outputMatrix = setToFalse(inputMatrix, "0v1", 2, 0);
    expect(outputMatrix["0v1"].grid).toEqual(expectedGrid);
    expect(inputMatrix["0v1"].grid).not.toEqual(expectedGrid);
  });
});
describe('setToTrue', () => {
  test('It should set the specified position to true', () => {
    const expectedGrid = [
      [true, false, false],
      [false, null, null],
      [false, null, null],
    ];

    const outputMatrix = setToTrue(emptyInputMatrix, inputKey, 0, 0);
    const outputGrid = outputMatrix[inputKey].grid;
    expect(outputGrid).toEqual(expectedGrid);
  });

  test('It should return the original grid if the specified position is already true', () => {
    const inputMatrix = {
      "0v1":{
        "grid":[
          [true,null,null],
          [null,null,null],
          [null,null,null]
        ]
      },
      "0v2":{
        "grid":[
          [null,null,null],
          [null,null,null],
          [null,null,null]
        ]
      }
    };

    const outputMatrix = setToTrue(inputMatrix, "0v1", 0, 0);
    expect(outputMatrix).toEqual(inputMatrix);

  });

  test('It should return the original grid if the specified position is out of bounds', () => {
    expect(setToTrue(emptyInputMatrix, inputKey, -1, 0)).toEqual(emptyInputMatrix);
    expect(setToTrue(emptyInputMatrix, inputKey, 0, -1)).toEqual(emptyInputMatrix);
    expect(setToTrue(emptyInputMatrix, inputKey, 3, 0)).toEqual(emptyInputMatrix);
    expect(setToTrue(emptyInputMatrix, inputKey, 0, 3)).toEqual(emptyInputMatrix);
    expect(setToTrue(emptyInputMatrix, inputKey, 0, undefined)).toEqual(emptyInputMatrix);
    expect(setToTrue(emptyInputMatrix, inputKey, undefined, 0)).toEqual(emptyInputMatrix);
    expect(setToTrue(emptyInputMatrix, inputKey, undefined, undefined)).toEqual(emptyInputMatrix);
  });

  test('all other items in that row/col are false', () => {
    const inputMatrix = {
      "0v1":{
        "grid":[
          [false,null,null],
          [null,null,null],
          [null,null,null]
        ]
      },
      "0v2":{
        "grid":[
          [null,null,null],
          [null,null,null],
          [null,null,null]
        ]
      }
    };

    const expectedGrid = [
      [false, true, false],
      [null, false, null],
      [null, false, null],
    ];

    const outputMatrix = setToTrue(inputMatrix, "0v1", 0, 1);
    expect(outputMatrix["0v1"].grid).toEqual(expectedGrid);
    expect(inputMatrix["0v1"].grid).not.toEqual(expectedGrid);
  });

});