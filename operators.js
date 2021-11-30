groups = [
  ["a", "b", "c", "d"],
  [1, 2, 3, 4],
  [10, 20, 30, 40],
  [110, 220, 330, 440]
]

// const out = keys.map((a, ai) => (
//   keys.slice(1, keys.length).map((b, bi) => `-${a}=${b}-`)
// ))

// console.log(out)


groups = [
  ["a", "b"],
  [1, 2],
  [10, 20],
  [100, 200]
]

groups = [
  [100, 200], 
  [10, 20], 
  [1, 2], 
  ["a", "b"]
]

const out = groups.map((a,ai) => (
  // 100 200
  makeGridOfSize(2, null)
))
console.log(out)

let ar = []
let prevVal = null
while (groups.length) {
  const current = groups.pop()
  prevVal = makeGridOfSize(2, prevVal)
  ar.push(prevVal)
  
}
console.log(JSON.stringify(prevVal))

function makeGridOfSize(size, value=null) {
  return Array.from({ length: size }, () => (Array.from({ length: size }, () => value)
  ))
}

groups = [
  [100, 200], 
  [10, 20], 
  [1, 2], 
  ["a", "b"]
]

for (let index = 0; index < groups.length; index++) {
}

// [
//   [
//     [
//       ["a", 1, 10, 100], ["b", 1, 10, 100],
//       ["a", 2, 10, 100], ["b", 2, 10, 100]
//     ],
//     [
//       ["a", 1, 20, 100], ["b", 1, 20, 100],
//       ["a", 2, 20, 100], ["b", 2, 20, 100]
//     ]
//   ],
//   [
//     [
//       ["a", 1, 10, 200], ["b", 1, 10, 200],
//       ["a", 2, 10, 200], ["b", 2, 10, 200]
//     ],
//     [
//       ["a", 1, 20, 200], ["b", 1, 20, 200],
//       ["a", 2, 20, 200], ["b", 2, 20, 200]
//     ]
//   ]
// ]





// [
//   ["a", "b"],
//   [1, 2],
//   [10, 20],
//   [110, 220]
// ]

// [
//   ["a", 1], ["b", 1],
//   ["a", 2], ["b", 2]
// ]

// [
//   [
//     ["a", 1, 10], ["a", 2, 10],
//     ["b", 1, 10], ["b", 2, 10]
//   ],
//   [
//     ["a", 1, 20], ["a", 2, 20],
//     ["b", 1, 20], ["b", 2, 20]
//   ]
// ]

// [
//   [
//     [
//       ["a", 1, 10, 100], ["a", 2, 10, 100],
//       ["b", 1, 10, 100], ["b", 2, 10, 100]
//     ],
//     [
//       ["a", 1, 20, 100], ["a", 2, 20, 100],
//       ["b", 1, 20, 100], ["b", 2, 20, 100]
//     ]
//   ],
//   [
//     [
//       ["a", 1, 10, 200], ["a", 2, 10, 200],
//       ["b", 1, 10, 200], ["b", 2, 10, 200]
//     ],
//     [
//       ["a", 1, 20, 200], ["a", 2, 20, 200],
//       ["b", 1, 20, 200], ["b", 2, 20, 200]
//     ]
//   ]
// ]

// ---

// [
//   ["a", 1], ["b", 1],
//   ["a", 2], ["b", 2]
// ]

// [
//   [
//     ["a", 1, 10], ["b", 1, 10],
//     ["a", 2, 10], ["b", 2, 10]
//   ],
//   [
//     ["a", 1, 20], ["b", 1, 20],
//     ["a", 2, 20], ["b", 2, 20]
//   ]
// ]

// [
//   [
//     [
//       ["a", 1, 10, 100], ["b", 1, 10, 100],
//       ["a", 2, 10, 100], ["b", 2, 10, 100]
//     ],
//     [
//       ["a", 1, 20, 100], ["b", 1, 20, 100],
//       ["a", 2, 20, 100], ["b", 2, 20, 100]
//     ]
//   ],
//   [
//     [
//       ["a", 1, 10, 200], ["b", 1, 10, 200],
//       ["a", 2, 10, 200], ["b", 2, 10, 200]
//     ],
//     [
//       ["a", 1, 20, 200], ["b", 1, 20, 200],
//       ["a", 2, 20, 200], ["b", 2, 20, 200]
//     ]
//   ]
// ]

