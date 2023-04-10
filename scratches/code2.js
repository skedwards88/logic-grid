function consolidateClues(clues) {
  clues = [
    {
      leftKey: "bat",
      rightValue: 1,
      operator: "notEqual",
    },
    {
      leftKey: "bat",
      rightValue: 4,
      operator: "notEqual",
    },
    {
      leftKey: "ape",
      rightValue: 1,
      operator: "notEqual",
    },
    {
      leftKey: "dog",
      rightValue: 1,
      operator: "greater",
    },
    {
      leftKey: "dog",
      rightValue: 3,
      operator: "greater",
    },
  ];

  // group clues by leftKey and operator
  // - dog equal 1 and 3
  // - dog less 1 and 3 => dog less 3

  // group keys by operator and rightValue
  // dog and cat less 3
}

function groupBy(dictionary, ...keys) {
  function getKeyValue(item, ...keys) {
    return keys.reduce(
      (value, key) => `${value}${value ? "-" : ""}${item[key]}`,
      ""
    );
  }

  return dictionary.reduce(
    (grouped, currentItem) => ({
      ...grouped,
      [getKeyValue(currentItem, ...keys)]: [
        ...(grouped[getKeyValue(currentItem, ...keys)] || []),
        currentItem,
      ],
    }),
    {}
  );
}

const out = groupBy(
  (clues = [
    {
      leftKey: "bat",
      rightValue: 1,
      operator: "notEqual",
    },
    {
      leftKey: "bat",
      rightValue: 4,
      operator: "notEqual",
    },
    {
      leftKey: "bat",
      rightValue: 4,
      operator: "less",
    },
    {
      leftKey: "ape",
      rightValue: 1,
      operator: "notEqual",
    },
    {
      leftKey: "dog",
      rightValue: 1,
      operator: "greater",
    },
    {
      leftKey: "dog",
      rightValue: 3,
      operator: "greater",
    },
  ]),
  "operator",
  "leftKey"
);

console.log(out);
