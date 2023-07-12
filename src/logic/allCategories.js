const firstNames = [
  "Aaron",
  "Abby",
  "Abe",
  "Adam",
  "Adrian",
  "Alan",
  "Albert",
  "Alex",
  "Alexia",
  "Alfred",
  "Alice",
  "Alonzo",
  "Alvin",
  "Alyssa",
  "Amanda",
  "Amber",
  "Amelia",
  "Amos",
  "Amy",
  "Andre",
  "Andy",
  "Angela",
  "Angie",
  "Anna",
  "Ariel",
  "Arnold",
  "Arthur",
  "Ashley",
  "Audrey",
  "Austin",
  "Ava",
  "Avery",
  "Barb",
  "Barry",
  "Becky",
  "Bella",
  "Ben",
  "Bert",
  "Bertha",
  "Bessie",
  "Beth",
  "Betty",
  "Bill",
  "Blake",
  "Bobby",
  "Bonnie",
  "Brad",
  "Brenda",
  "Brent",
  "Brett",
  "Brian",
  "Brooke",
  "Bruce",
  "Bryan",
  "Bryce",
  "Caleb",
  "Callie",
  "Calvin",
  "Camila",
  "Carl",
  "Carlos",
  "Carmen",
  "Carol",
  "Carrie",
  "Casey",
  "Cathy",
  "Cedric",
  "Cesar",
  "Chad",
  "Chase",
  "Cheryl",
  "Chloe",
  "Chris",
  "Chuck",
  "Cindy",
  "Claire",
  "Clark",
  "Cody",
  "Colin",
  "Connie",
  "Connor",
  "Cora",
  "Corey",
  "Craig",
  "Curtis",
  "Dale",
  "Damon",
  "Danny",
  "Darren",
  "Dave",
  "Dawn",
  "Dean",
  "Deanna",
  "Debra",
  "Denis",
  "Derek",
  "Devon",
  "Diana",
  "Diane",
  "Diego",
  "Donald",
  "Donna",
  "Doris",
  "Doug",
  "Dustin",
  "Dwight",
  "Dylan",
  "Earl",
  "Ebony",
  "Eddie",
  "Edgar",
  "Edith",
  "Edmund",
  "Edward",
  "Edwin",
  "Elaine",
  "Elijah",
  "Ellis",
  "Emilio",
  "Emily",
  "Emma",
  "Eric",
  "Ethan",
  "Evan",
  "Fabian",
  "Faith",
  "Farrah",
  "Fatima",
  "Faye",
  "Felix",
  "Finn",
  "Fiona",
  "Flora",
  "Frank",
  "Fraser",
  "Fred",
  "Fria",
  "Gabby",
  "Gavin",
  "Gemma",
  "Geneva",
  "George",
  "Gina",
  "Gloria",
  "Grace",
  "Graham",
  "Grant",
  "Greg",
  "Gwen",
  "Hailey",
  "Hank",
  "Hannah",
  "Harold",
  "Harry",
  "Harvey",
  "Hazel",
  "Heidi",
  "Helen",
  "Henry",
  "Herb",
  "Hester",
  "Holly",
  "Homer",
  "Horace",
  "Howard",
  "Hugh",
  "Hunter",
  "Ian",
  "Ilene",
  "Imogen",
  "Ingrid",
  "Irv",
  "Isaac",
  "Isaiah",
  "Ivan",
  "Ivy",
  "Izzy",
  "Jack",
  "Jacob",
  "Jade",
  "James",
  "Jared",
  "Jenna",
  "Jess",
  "Jill",
  "Jim",
  "Joanna",
  "Joe",
  "John",
  "Jolene",
  "Jonas",
  "Jordan",
  "Joseph",
  "Josh",
  "Joshua",
  "Julia",
  "Justin",
  "Kai",
  "Kara",
  "Karen",
  "Kathy",
  "Kayla",
  "Keith",
  "Kelly",
  "Kendra",
  "Kevin",
  "Kim",
  "Kurt",
  "Kyle",
  "Lacey",
  "Laura",
  "Lauren",
  "Leah",
  "Levi",
  "Liam",
  "Lila",
  "Lily",
  "Linda",
  "Lisa",
  "Logan",
  "Louis",
  "Lucas",
  "Lucia",
  "Luke",
  "Luna",
  "Lydia",
  "Maddie",
  "Maggie",
  "Manuel",
  "Marcel",
  "Marcia",
  "Marco",
  "Margie",
  "Maria",
  "Marie",
  "Mario",
  "Marisa",
  "Mark",
  "Marsha",
  "Martha",
  "Martin",
  "Marvin",
  "Mary",
  "Mason",
  "Matt",
  "Maura",
  "Maxine",
  "Maya",
  "Megan",
  "Mike",
  "Miles",
  "Millie",
  "Molly",
  "Mona",
  "Nancy",
  "Naomi",
  "Nate",
  "Nathan",
  "Nia",
  "Nick",
  "Nicole",
  "Nikki",
  "Nina",
  "Noah",
  "Noelle",
  "Nolan",
  "Nora",
  "Odessa",
  "Olive",
  "Oliver",
  "Olivia",
  "Omar",
  "Opal",
  "Oscar",
  "Owen",
  "Pablo",
  "Paige",
  "Pam",
  "Pamela",
  "Pat",
  "Paul",
  "Paula",
  "Peter",
  "Philip",
  "Phoebe",
  "Pierce",
  "Piper",
  "Poppy",
  "Quincy",
  "Quinn",
  "Rachel",
  "Rafael",
  "Ramona",
  "Reese",
  "Regina",
  "Rick",
  "Riley",
  "Robert",
  "Roman",
  "Ron",
  "Rowan",
  "Ruby",
  "Rudy",
  "Ruth",
  "Ryan",
  "Sadie",
  "Sam",
  "Samuel",
  "Sarah",
  "Saul",
  "Sawyer",
  "Selena",
  "Serena",
  "Seth",
  "Siena",
  "Sierra",
  "Silas",
  "Simon",
  "Sloane",
  "Sophia",
  "Stella",
  "Steve",
  "Sydney",
  "Tammy",
  "Tanya",
  "Taylor",
  "Ted",
  "Teresa",
  "Terry",
  "Tess",
  "Thomas",
  "Tim",
  "Tina",
  "Tobias",
  "Tom",
  "Tony",
  "Tori",
  "Tracy",
  "Travis",
  "Trent",
  "Trey",
  "Trisha",
  "Tyler",
  "Val",
  "Vance",
  "Vaughn",
  "Veda",
  "Vera",
  "Vesper",
  "Victor",
  "Vienna",
  "Vinny",
  "Violet",
  "Virgil",
  "Vito",
  "Vlad",
  "Wade",
  "Walt",
  "Walter",
  "Wanda",
  "Watson",
  "Wayne",
  "Wendy",
  "Wes",
  "Wesley",
  "Will",
  "Wilma",
  "Wilson",
  "Winnie",
  "Wyatt",
  "Xander",
  "Xavier",
  "Yosef",
  "Zach",
  "Zed",
  "Zoe",
];

const lastNames = [
  "Smith",
  "Edwards",
  "Thom",
  "Clark",
  "Sekar",
  "Cheng",
  "Nelson",
  "Geppert",
  "Jones",
  "Brown",
  "Davis",
  "Miller",
  "Moore",
  "Anderson",
  "Jackson",
  "Garcia",
  "Martinez",
  "Robinson",
  "Lee",
  "Walker",
  "Young",
  "Hernandez",
  "Baker",
];

const petNames = [
  "Ace",
  "Angel",
  "Apollo",
  "Bandit",
  "Baxter",
  "Bear",
  "Blue",
  "Bonnie",
  "Boomer",
  "Brutus",
  "Cleo",
  "Coco",
  "Coop",
  "Dixie",
  "Duke",
  "Fido",
  "Gatsby",
  "Ginger",
  "Gizmo",
  "Gracie",
  "Gus",
  "Gypsy",
  "Hunter",
  "Jack",
  "Jasper",
  "Jax",
  "Kiki",
  "Koda",
  "Lady",
  "Lily",
  "Lola",
  "Lou",
  "Louie",
  "Lucky",
  "Lucy",
  "Luna",
  "Maggie",
  "Max",
  "Maya",
  "Millie",
  "Murphy",
  "Nala",
  "Oliver",
  "Oreo",
  "Penny",
  "Pepper",
  "Pippin",
  "Poppy",
  "Pumpkin",
  "Rascal",
  "Riley",
  "Rocky",
  "Rosie",
  "Roxy",
  "Rusty",
  "Sadie",
  "Sammy",
  "Sassy",
  "Shadow",
  "Simba",
  "Sparky",
  "Sugar",
  "Teddy",
  "Thor",
  "Tilly",
  "Trixie",
  "Tucker",
  "Willow",
  "Winston",
  "Zeus",
  "Zoe",
  "Spot",
  "Rex",
  "Fluffy",
  "Fuzzy",
];

const colors = [
  "red",
  "orange",
  "yellow",
  "lime",
  "green",
  "blue",
  "teal",
  "purple",
  "pink",
  "gray",
  "white",
  "black",
  "brown",
];

const continentalUnitedStates = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

const carModels = ["Ford", "BMW", "Honda", "Mercedes", "Kia"];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const weekdaysAndWeekends = [...weekdays, "Saturday", "Sunday"];

function appendNth(number) {
  const lastDigit = `${number}`[`${number}`.length - 1];
  if (lastDigit === "1") {
    return `${number}st`;
  } else if (lastDigit === "2") {
    return `${number}nd`;
  } else if (lastDigit === "3") {
    return `${number}rd`;
  } else {
    return `${number}th`;
  }
}

function convertLegCountToAnimal(number) {
  switch (number) {
    case 0:
      return "snake";
    case 2:
      return "bird";
    case 4:
      return "mouse";
    case 6:
      return "beetle";
    case 8:
      return "spider";
    default:
      return number;
  }
}

function convertWheelCountToVehicle(number) {
  switch (number) {
    case 0:
      return "pogo stick";
    case 1:
      return "unicycle";
    case 2:
      return "bicycle";
    case 3:
      return "tricycle";
    case 4:
      return "skateboard";
    default:
      return number;
  }
}

function basicPluralize(value, word) {
  // adds an "s" if the value is > 1
  // Does not do more complex pluralization

  return `${word}${value > 1 ? "s" : ""}`
}

export const allCategories = [
  [
    {
      values: [1, 2, 3, 4, 5],
      display: (value) => `${value} yr`,
      descriptionTemplates: {
        description: (value) => `the ${value} year old car`,
        diffGreaterDescription: (value) => `${value} ${basicPluralize(value, "year")} older`,
        diffLesserDescription: (value) => `${value} ${basicPluralize(value, "year")} younger`,
      },
    },
    {
      values: [10000, 20000, 30000, 40000, 50000],
      display: (value) => `${value} mi`,
      descriptionTemplates: {
        description: (value) => `the car with ${value} miles`,
        diffGreaterDescription: (value) => `${value} more miles`,
        diffLesserDescription: (value) => `${value} fewer miles`,
        verb: "has",
      },
    },
    {
      values: colors,
      descriptionTemplates: {
        description: (value) => `the ${value} car`,
      },
    },
    {
      values: firstNames,
      descriptionTemplates: {
        description: (value) => `${value}'s car`,
      },
    },
    {
      values: carModels,
      descriptionTemplates: {
        description: (value) => `the ${value}`,
      },
    },
  ],
  [
    {
      values: [1, 2, 3, 4, 5, 6],
      display: (value) => `lane ${value}`,
      descriptionTemplates: {
        description: (value) => `the person who swam in lane ${value}`,
        diffGreaterDescription: (value) => `${value} lane ${basicPluralize(value, "number")} higher`,
        diffLesserDescription: (value) => `${value} lane ${basicPluralize(value, "number")} lower`,
        verb: "was",
      },
    },
    {
      values: colors,
      descriptionTemplates: {
        description: (value) => `the person wearing ${value} goggles`,
      },
    },
    {
      values: firstNames,
      descriptionTemplates: {
        description: (value) => `${value}`,
      },
    },
    {
      values: ["fly", "back", "breast", "free", "IM"],
      descriptionTemplates: {
        description: (value) => `the person who swam ${value}`,
      },
    },
  ],
  [
    {
      values: [100, 95, 90, 85, 80],
      descriptionTemplates: {
        description: (value) => `the person whose grade was ${value}`,
        diffGreaterDescription: (value) => `${value} points higher`,
        diffLesserDescription: (value) => `${value} points lower`,
        verb: "scored",
      },
    },
    {
      values: colors,
      descriptionTemplates: {
        description: (value) => `the person using ${value} ink`,
      },
    },
    {
      values: firstNames,
      descriptionTemplates: {
        description: (value) => `${value}`,
      },
    },
    {
      values: [
        "dogs",
        "bats",
        "bugs",
        "corn",
        "Mars",
        "Venus",
        "Earth",
        "Saturn",
        "Uranus",
        "Pluto",
        "Moon",
        "Sun",
        "Stars",
        "cows",
        "wealth",
        "pigs",
        "geese",
        "sports",
        "cars",
        "bread",
        "pasta",
        "art",
        "music",
        "clouds",
        "rocks",
      ],
      descriptionTemplates: {
        description: (value) => `the person who wrote about ${value}`,
      },
    },
  ],
  [
    {
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      display: (value) => `${value} ${basicPluralize(value, "s'more")}`,
      descriptionTemplates: {
        description: (value) => `the person who ate ${value} ${basicPluralize(value, "s'more")}`,
        diffGreaterDescription: (value) => `${value} more ${basicPluralize(value, "s'more")}`,
        diffLesserDescription: (value) => `${value} less ${basicPluralize(value, "s'more")}`,
        verb: "ate",
      },
    },
    {
      values: colors,
      descriptionTemplates: {
        description: (value) => `the person with the ${value} sleeping bag`,
      },
    },
    {
      values: firstNames,
      descriptionTemplates: {
        description: (value) => `${value}`,
      },
    },
    {
      values: [
        "Orion",
        "Gemini",
        "Leo",
        "Taurus",
        "Cygnus",
        "Lyra",
        "Pisces",
        "Aries",
        "Virgo",
        "Cancer",
      ],
      descriptionTemplates: {
        description: (value) => `the person who spotted ${value}`,
      },
    },
  ],
  [
    {
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      display: (value) => `${value} mi`,
      descriptionTemplates: {
        description: (value) => `the person who hiked ${value} ${basicPluralize(value, "mile")}`,
        diffGreaterDescription: (value) => `${value} more ${basicPluralize(value, "mile")}`,
        diffLesserDescription: (value) => `${value} less ${basicPluralize(value, "mile")}`,
        verb: "hiked",
      },
    },
    {
      values: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
      display: (value) => `${value} ft`,
      descriptionTemplates: {
        description: (value) =>
          `the person who gained ${value} feet in elevation`,
        diffGreaterDescription: (value) => `${value} more feet`,
        diffLesserDescription: (value) => `${value} less feet`,
        verb: "gained",
      },
    },
    {
      values: [
        "lake",
        "river",
        "copse",
        "grove",
        "gully",
        "cliff",
        "stream",
        "creek",
        "forest",
        "hill",
        "ruins",
      ],
      descriptionTemplates: {
        description: (value) => `the person who hiked to the ${value}`,
      },
    },
    {
      values: firstNames,
      descriptionTemplates: {
        description: (value) => `${value}`,
      },
    },
    {
      values: ["hat", "bottle", "poles", "glasses", "visor", "bandana"],
      descriptionTemplates: {
        description: (value) => `the person with the ${value}`,
      },
    },
  ],
  [
    {
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      display: (value) => `${value} hr`,
      descriptionTemplates: {
        description: (value) => `the person who finished in ${value} ${basicPluralize(value, "hour")}`,
        diffGreaterDescription: (value) => `${value} more ${basicPluralize(value, "hour")}`,
        diffLesserDescription: (value) => `${value} less ${basicPluralize(value, "hour")}`,
        verb: "took",
      },
    },
    {
      values: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
      display: (value) => `${value} pieces`,
      descriptionTemplates: {
        description: (value) => `the person who did the ${value} piece puzzle`,
        diffGreaterDescription: (value) => `${value} more pieces`,
        diffLesserDescription: (value) => `${value} fewer pieces`,
        verb: "assembled",
      },
    },
    {
      values: firstNames,
      descriptionTemplates: {
        description: (value) => `${value}`,
      },
    },
    {
      values: [
        "cats",
        "dogs",
        "frogs",
        "space",
        "cars",
        "cakes",
        "bread",
        "trees",
        "roses",
        "lilies",
        "horses",
        "toys",
        "cacti",
        "lilacs",
        "spices",
        "donuts",
        "candy",
        "trucks",
        "clouds",
        "clowns",
        "birds",
      ],
      descriptionTemplates: {
        description: (value) => `the person who did a puzzle of ${value}`,
      },
    },
  ],
  [
    {
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      display: (value) => `${value} ${basicPluralize(value, "tree")}`,
      descriptionTemplates: {
        description: (value) => `the house with ${value} ${basicPluralize(value, "tree")}`,
        diffGreaterDescription: (value) => `${value} more ${basicPluralize(value, "tree")}`,
        diffLesserDescription: (value) => `${value} less ${basicPluralize(value, "tree")}`,
        verb: "has",
      },
    },
    {
      values: firstNames,
      descriptionTemplates: {
        description: (value) => `${value}'s house`,
      },
    },
    {
      values: colors,
      descriptionTemplates: {
        description: (value) => `the ${value} house`,
      },
    },
    {
      values: [
        "swing",
        "dog",
        "cat",
        "fence",
        "chimney",
        "garden",
        "flag",
        "porch",
        "path",
        "tree",
      ],
      descriptionTemplates: {
        description: (value) => `the house with the ${value}`,
      },
    },
  ],
  [
    {
      values: [1, 2, 3, 4, 5],
      display: (value) => `${value} PM`,
      descriptionTemplates: {
        description: (value) => `the person who snacks at ${value} o'clock`,
        diffGreaterDescription: (value) => `${value} ${basicPluralize(value, "hour")} later`,
        diffLesserDescription: (value) => `${value} ${basicPluralize(value, "hour")} earlier`,
        verb: "snacks",
      },
    },
    {
      values: [10, 15, 20, 25, 30],
      display: (value) => `${value} min`,
      descriptionTemplates: {
        description: (value) => `the person who takes ${value} minutes`,
        diffGreaterDescription: (value) => `${value} minutes more`,
        diffLesserDescription: (value) => `${value} minutes less`,
        verb: "takes",
      },
    },
    {
      values: firstNames,
      descriptionTemplates: {
        description: (value) => `${value}`,
      },
    },
    {
      values: colors,
      descriptionTemplates: {
        description: (value) => `the person with the ${value} cup`,
      },
    },
    {
      values: ["tea", "coffee", "water", "milk", "wine", "beer", "juice"],
      descriptionTemplates: {
        description: (value) => `the person who drinks ${value}`,
      },
    },
    {
      values: ["apple", "cookie", "bun", "pear", "donut", "banana"],
      descriptionTemplates: {
        description: (value) => `the person who eats the ${value}`,
      },
    },
  ],
  [
    {
      values: [100, 150, 200, 250, 300, 350, 400, 450, 500],
      display: (value) => `$${value}`,
      descriptionTemplates: {
        description: (value) => `the jewelry that cost ${value} dollars`,
        diffGreaterDescription: (value) => `${value} dollars more`,
        diffLesserDescription: (value) => `${value} dollars less`,
        verb: "cost",
      },
    },
    {
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      display: (value) => `${value} ${basicPluralize(value, "stone")}`,
      descriptionTemplates: {
        description: (value) => `the jewelry with ${value} ${basicPluralize(value, "stone")}`,
        diffGreaterDescription: (value) => `${value} more ${basicPluralize(value, "stone")}`,
        diffLesserDescription: (value) => `${value} less ${basicPluralize(value, "stone")}`,
        verb: "has",
      },
    },
    {
      values: firstNames,
      descriptionTemplates: {
        description: (value) => `${value}'s jewelry`,
      },
    },
    {
      values: [
        "ruby",
        "emerald",
        "sapphire",
        "agate",
        "diamond",
        "opal",
        "pearl",
        "topaz",
        "garnet",
        "jade",
      ],
      descriptionTemplates: {
        description: (value) => `the jewelry with the ${value}`,
      },
    },
    {
      values: [
        "necklace",
        "brooch",
        "bracelet",
        "ring",
        "earing",
        "cufflink",
        "pendant",
      ],
      descriptionTemplates: {
        description: (value) => `the ${value}`,
      },
    },
  ],
  [
    {
      values: firstNames,
      descriptionTemplates: {
        description: (value) => `${value}`,
      },
    },
    {
      values: [10, 20, 30, 40, 50, 60],
      display: (value) => `${value} min`,
      descriptionTemplates: {
        description: (value) =>
          `the person who does their activity for ${value} minutes`,
        diffGreaterDescription: (value) => `${value} minutes more`,
        diffLesserDescription: (value) => `${value} minutes less`,
        verb: "does",
      },
    },
    {
      values: [
        "bakes",
        "runs",
        "hikes",
        "swims",
        "crafts",
        "writes",
        "reads",
        "draws",
        "bikes",
      ],
      descriptionTemplates: {
        description: (value) => `the person who ${value}`,
      },
    },
    {
      values: weekdaysAndWeekends,
      display: (value) => value.slice(0, 3),
      descriptionTemplates: {
        description: (value) =>
          `the person who does their activity on ${value}`,
      },
    },
  ],
  [
    {
      values: petNames,
      descriptionTemplates: {
        description: (value) => `${value}`,
      },
    },
    {
      values: [
        "collie",
        "labrador",
        "poodle",
        "beagle",
        "terrier",
        "spaniel",
        "corgi",
        "boxer",
        "bulldog",
        "husky",
        "whippet",
        "maltese",
      ],
      descriptionTemplates: {
        description: (value) => `the ${value}`,
      },
    },
    {
      values: [1, 2, 3, 4, 5],
      display: (value) => `${value} yr`,
      descriptionTemplates: {
        description: (value) => `the ${value} year old dog`,
        diffGreaterDescription: (value) => `${value} ${basicPluralize(value, "year")} older`,
        diffLesserDescription: (value) => `${value} ${basicPluralize(value, "year")} younger`,
      },
    },
    {
      values: colors,
      descriptionTemplates: {
        description: (value) => `the dog with the ${value} leash`,
      },
    },
  ],
  [
    {
      values: [
        "french",
        "sourdough",
        "marble",
        "rye",
        "white",
        "wheat",
        "focaccia",
        "multigrain",
        "pita",
        "ciabatta",
      ],
      descriptionTemplates: {
        description: (value) => `the sandwich on ${value} bread`,
      },
    },
    {
      values: [
        "eggplant",
        "tofu",
        "mushroom",
        "turkey",
        "ham",
        "pork",
        "beef",
        "bologna",
        "egg",
        "cheese",
      ],
      descriptionTemplates: {
        description: (value) => `the ${value} sandwich`,
      },
    },
    {
      values: [
        "mayo",
        "hot sauce",
        "soy sauce",
        "vinegar",
        "mustard",
        "bbq sauce",
        "ketchup",
        "relish",
        "salt",
        "pepper",
      ],
      descriptionTemplates: {
        description: (value) => `the sandwich flavored with ${value}`,
      },
    },
    {
      values: [8.0, 8.5, 9.0, 9.5, 10.0, 10.5],
      display: (value) => `$${value.toFixed(2)}`,
      descriptionTemplates: {
        description: (value) => `the sandwich that cost $${value.toFixed(2)}`,
        diffGreaterDescription: (value) => `$${value.toFixed(2)} more`,
        diffLesserDescription: (value) => `$${value.toFixed(2)} less`,
        verb: "costs",
      },
    },
  ],
  [
    {
      values: [
        "ghost",
        "vampire",
        "witch",
        "zombie",
        "monster",
        "troll",
        "mummy",
        "ghoul",
      ],
      descriptionTemplates: {
        description: (value) => `the person who dressed as a ${value}`,
      },
    },
    {
      values: firstNames,
      descriptionTemplates: {
        description: (value) => `${value}`,
      },
    },
    {
      values: [
        "Snickers",
        "Twix",
        "Skittles",
        "M&Ms",
        "Smarties",
        "Reeses",
        "Kit Kat",
        "Nerds",
        "Starbursts",
        "Twizzlers",
      ],
      descriptionTemplates: {
        description: (value) => `the person who favors ${value}`,
      },
    },
    {
      values: [5, 10, 15, 20, 25, 30],
      display: (value) => `${value} pieces`,
      descriptionTemplates: {
        description: (value) => `the person who got ${value} pieces of candy`,
        diffGreaterDescription: (value) => `${value} more pieces`,
        diffLesserDescription: (value) => `${value} fewer pieces`,
        verb: "got",
      },
    },
  ],
  [
    {
      values: [
        "puppy",
        "pony",
        "kitty",
        "kite",
        "plane",
        "train",
        "book",
        "toolbox",
        "bike",
        "scooter",
        "computer",
        "phone",
      ],
      descriptionTemplates: {
        description: (value) => `the person who asked Santa for a ${value}`,
      },
    },
    {
      values: firstNames,
      descriptionTemplates: {
        description: (value) => `${value}`,
      },
    },
    {
      values: ["candy", "reindeer", "Rudolph", "Santa", "sled", "snow", "elf"],
      descriptionTemplates: {
        description: (value) =>
          `the person whose gifts were wrapped in ${value} wrapping paper`,
      },
    },
    {
      values: [1, 2, 3, 4, 5],
      display: (value) => `${value} ${basicPluralize(value, "gift")}`,
      descriptionTemplates: {
        description: (value) => `the person who received ${value} ${basicPluralize(value, "gift")}`,
        diffGreaterDescription: (value) => `${value} more ${basicPluralize(value, "gift")}`,
        diffLesserDescription: (value) => `${value} less ${basicPluralize(value, "gift")}`,
        verb: "received",
      },
    },
  ],
  [
    {
      values: [
        "disease",
        "wealth",
        "war",
        "famine",
        "equality",
        "trade",
        "religion",
        "science",
      ],
      descriptionTemplates: {
        description: (value) => `the historian who studies ${value}`,
      },
    },
    {
      values: firstNames,
      descriptionTemplates: {
        description: (value) => `${value}`,
      },
    },
    {
      values: [
        "Stanford",
        "Harvard",
        "UCLA",
        "Berkeley",
        "Oxford",
        "MIT",
        "UCSD",
      ],
      descriptionTemplates: {
        description: (value) => `the historian who studies at ${value}`,
      },
    },
    {
      values: [14, 15, 16, 17, 18, 19, 20],
      display: (value) => `${value}th`,
      descriptionTemplates: {
        description: (value) =>
          `the historian who studies the ${value}th century`,
        diffGreaterDescription: (value) => `${value} centuries later`,
        diffLesserDescription: (value) => `${value} centuries earlier`,
        verb: "studies the period",
      },
    },
  ],
  [
    {
      values: [
        "fir",
        "oak",
        "willow",
        "pine",
        "maple",
        "birch",
        "spruce",
        "cedar",
        "ash",
        "beech",
        "poplar",
        "elm",
        "cypress",
        "cherry",
        "walnut",
        "sycamore",
        "olive",
        "dogwood",
        "palm",
        "ginkgo",
      ],
      descriptionTemplates: {
        description: (value) => `the ${value} tree`,
      },
    },
    {
      values: ["height", "width", "canopy", "history", "branches"],
      descriptionTemplates: {
        description: (value) => `the tree that is known for its ${value}`,
      },
    },
    {
      values: continentalUnitedStates,
      descriptionTemplates: {
        description: (value) => `the tree in ${value}`,
      },
    },
    {
      values: [10, 20, 50, 100, 150, 200],
      display: (value) => `${value} yr`,
      descriptionTemplates: {
        description: (value) => `the ${value} year old tree`,
        diffGreaterDescription: (value) => `${value} years older`,
        diffLesserDescription: (value) => `${value} years younger`,
      },
    },
  ],
  [
    {
      values: [1, 2, 3, 4, 5],
      display: (value) => appendNth(value),
      descriptionTemplates: {
        description: (value) => `the person who came in ${appendNth(value)}`,
        diffGreaterDescription: (value) => `${value} ${basicPluralize(value, "place")} worse`,
        diffLesserDescription: (value) => `${value} ${basicPluralize(value, "place")} better`,
        verb: "placed",
      },
    },
    {
      values: colors,
      descriptionTemplates: {
        description: (value) => `the person wearing the ${value} jersey`,
      },
    },
    {
      values: firstNames,
      descriptionTemplates: {
        description: (value) => value,
      },
    },
    {
      values: [50, 100, 200, 400, 1600],
      descriptionTemplates: {
        description: (value) => `the person who ran the ${value} meter race`,
        diffGreaterDescription: (value) => `${value} meters more`,
        diffLesserDescription: (value) => `${value} meters less`,
        verb: "raced",
      },
    },
  ],
  [
    {
      values: [1, 2, 3, 4, 5],
      descriptionTemplates: {
        description: (value) => `the person who vacationed for ${value} ${basicPluralize(value, "day")}`,
        diffGreaterDescription: (value) => `${value} more ${basicPluralize(value, "day")}`,
        diffLesserDescription: (value) => `${value} less ${basicPluralize(value, "day")}`,
        verb: "vacationed",
      },
    },
    {
      values: [
        "Belgium",
        "Croatia",
        "Cyprus",
        "Denmark",
        "Finland",
        "France",
        "Germany",
        "Greece",
        "Hungary",
        "Iceland",
        "Ireland",
        "Italy",
        "Norway",
        "Poland",
        "Portugal",
        "Romania",
        "Russia",
        "Spain",
        "Sweden",
        "Turkey",
        "Ukraine",
        "Argentina",
        "Chile",
        "Colombia",
        "Peru",
        "Bhutan",
        "China",
        "India",
        "Indonesia",
        "Japan",
        "Vietnam",
        "Australia",
        "Alaska",
        "Hawaii",
        "California",
        "New York",
        "Michigan",
        "Oregon",
      ],
      descriptionTemplates: {
        description: (value) => `the person who traveled to ${value}`,
      },
    },
    {
      values: [
        "Skyway",
        "Aero",
        "Horizon",
        "Stratosphere",
        "Blue",
        "JetPulse",
        "Aurora",
        "Astra",
        "Galactic",
        "Skyward",
        "AirOasis",
        "Aether",
        "Celestial",
        "Orbit",
        "Starlight",
        "SkyScribe",
        "Nimbus",
        "SkyWhisper",
        "Zephyr",
        "Voyage",
        "Pinnacle",
        "JetJ",
        "Windward",
        "AirArch",
      ],
      descriptionTemplates: {
        description: (value) => `the person who flew on ${value} airline`,
      },
    },
    {
      values: months,
      display: (value) => value.slice(0, 3),
      descriptionTemplates: {
        description: (value) => `the person who took their trip in ${value}`,
      },
    },
    {
      values: weekdaysAndWeekends,
      display: (value) => value.slice(0, 3),
      descriptionTemplates: {
        description: (value) => `the person who started their trip on ${value}`,
      },
    },
  ],
  [
    {
      values: petNames,
      descriptionTemplates: {
        description: (value) => `${value}`,
      },
    },
    {
      values: [0, 2, 4, 6, 8],
      display: (value) => convertLegCountToAnimal(value),
      descriptionTemplates: {
        description: (value) => `the pet with ${value} legs`,
        diffGreaterDescription: (value) => `${value} more legs`,
        diffLesserDescription: (value) => `${value} fewer legs`,
        verb: "has",
      },
    },
    {
      values: ["sleeping", "hiding", "resting", "eating", "staring"],
      descriptionTemplates: {
        description: (value) => `the pet that likes ${value}`,
      },
    },
    {
      values: ["metal", "glass", "mesh", "wood", "plastic"],
      descriptionTemplates: {
        description: (value) => `the pet in the ${value} cage`,
      },
    },
  ],
  [
    {
      values: colors,
      descriptionTemplates: {
        description: (value) => `the clown with the ${value} hair`,
      },
    },
    {
      values: [0, 1, 2, 3, 4],
      display: (value) => convertWheelCountToVehicle(value),
      descriptionTemplates: {
        description: (value) => `the clown on ${value} ${basicPluralize(value, "wheel")}`,
        diffGreaterDescription: (value) => `${value} more ${basicPluralize(value, "wheel")}`,
        diffLesserDescription: (value) => `${value} less ${basicPluralize(value, "wheel")}`,
        verb: "rides on",
      },
    },
    {
      values: ["juggle", "sing", "wave", "honk", "smile"],
      descriptionTemplates: {
        description: (value) => `the clown that ${value}s`,
      },
    },
    {
      values: ["flower", "hose", "chicken", "hammer", "sign"],
      descriptionTemplates: {
        description: (value) => `the clown with the ${value}`,
      },
    },
  ],
  [
    {
      values: ["tango", "swing", "salsa", "cha-cha", "waltz", "rumba", "polka"],
      descriptionTemplates: {
        description: (value) => `the ${value} dancer`,
      },
    },
    {
      values: [1, 2, 3, 4, 5],
      display: (value) => `${value} ${basicPluralize(value, "song")}`,
      descriptionTemplates: {
        description: (value) => `the dancer that performed ${value} ${basicPluralize(value, "song")}`,
        diffGreaterDescription: (value) => `${value} more ${basicPluralize(value, "song")}`,
        diffLesserDescription: (value) => `${value} less ${basicPluralize(value, "song")}`,
        verb: "performed",
      },
    },
    {
      values: [
        "pop",
        "jazz",
        "indie",
        "folk",
        "classical",
        "country",
        "rock",
        "electronic",
      ],
      descriptionTemplates: {
        description: (value) => `the dancer that performed to ${value} music`,
      },
    },
    {
      values: ["Grand", "Crystal", "Royal", "Rose", "Moonlight"],
      descriptionTemplates: {
        description: (value) =>
          `the dancer that performed in the ${value} ballroom`,
      },
    },
  ],
  [
    {
      values: ["tango", "swing", "salsa", "cha-cha", "waltz", "rumba", "polka"],
      descriptionTemplates: {
        description: (value) => `the dancer that likes ${value}`,
      },
    },
    {
      values: [7, 8, 9, 10, 11],
      display: (value) => `${value} PM`,
      descriptionTemplates: {
        description: (value) => `the dancer that danced until ${value} PM`,
        diffGreaterDescription: (value) => `${value} more ${basicPluralize(value, "hour")}`,
        diffLesserDescription: (value) => `${value} less ${basicPluralize(value, "hour")}`,
        verb: "danced",
      },
    },
    {
      values: [15, 20, 25, 30, 35],
      display: (value) => `${value} songs`,
      descriptionTemplates: {
        description: (value) => `the dancer that danced ${value} songs`,
        diffGreaterDescription: (value) => `${value} more songs`,
        diffLesserDescription: (value) => `${value} fewer songs`,
        verb: "danced",
      },
    },
    {
      values: [
        "pop",
        "jazz",
        "indie",
        "folk",
        "classical",
        "country",
        "rock",
        "electronic",
      ],
      descriptionTemplates: {
        description: (value) => `the dancer that likes ${value} music`,
      },
    },
  ],
  [
    {
      values: [
        "pepperoni",
        "cheese",
        "pepper",
        "BBQ",
        "Hawaiian",
        "pesto",
        "mushroom",
        "olive",
      ],
      descriptionTemplates: {
        description: (value) => `the person who ate ${value} pizza`,
      },
    },
    {
      values: [1, 2, 3, 4, 5],
      descriptionTemplates: {
        description: (value) => `the person who ate ${value} ${basicPluralize(value, "slice")}`,
        diffGreaterDescription: (value) => `${value} more ${basicPluralize(value, "slice")}`,
        diffLesserDescription: (value) => `${value} less ${basicPluralize(value, "slice")}`,
        verb: "ate",
      },
    },
    {
      values: firstNames,
      descriptionTemplates: {
        description: (value) => `${value}`,
      },
    },
    {
      values: ["water", "milk", "wine", "beer", "juice", "soda"],
      descriptionTemplates: {
        description: (value) => `the person who drank ${value}`,
      },
    },
  ],
  [
    {
      values: [
        "mystery",
        "romance",
        "fiction",
        "fantasy",
        "sci-fi",
        "history",
        "nonfiction",
      ],
      descriptionTemplates: {
        description: (value) => `the ${value} novel`,
      },
    },
    {
      values: [100, 150, 200, 250, 300],
      display: (value) => `${value} pages`,
      descriptionTemplates: {
        description: (value) => `the ${value} page novel`,
        diffGreaterDescription: (value) => `${value} more pages`,
        diffLesserDescription: (value) => `${value} fewer pages`,
        verb: "has",
      },
    },
    {
      values: [2020, 2015, 2010, 2005, 2000],
      descriptionTemplates: {
        description: (value) => `the novel published in ${value}`,
        diffGreaterDescription: (value) => `${value} years later`,
        diffLesserDescription: (value) => `${value} years earlier`,
        verb: "was published",
      },
    },
    {
      values: lastNames,
      descriptionTemplates: {
        description: (value) => `the novel written by ${value}`,
      },
    },
  ],
  [
    {
      values: ["Yoshi", "Mario", "Luigi", "Toad", "Bowser", "Wario"],
      descriptionTemplates: {
        description: (value) => value,
      },
    },
    {
      values: [
        "banana",
        "red shell",
        "green shell",
        "bomb",
        "star",
        "mushroom",
        "coin",
        "boomerang",
      ],
      descriptionTemplates: {
        description: (value) => `the player with the ${value}`,
      },
    },
    {
      values: [
        "red",
        "blue",
        "green",
        "pink",
        "yellow",
        "orange",
        "black",
        "purple",
      ],
      descriptionTemplates: {
        description: (value) => `the player in the ${value} kart`,
      },
    },
    {
      values: [
        "Royal Raceway",
        "Cloudtop Cruise",
        "Music Park",
        "Sweet Sweet Canyon",
        "Grumble Volcano",
        "Water Park",
        "Sherbert Land",
        "Dolphin Shoals",
        "Bone-Dry Dunes",
        "Rainbow Road",
        "Donut Plains",
        "Twisted Mansion",
        "Shy Guy Falls",
        "Cheep Cheep Beach",
        "Electrodrome",
        "Mario Kart Stadium",
        "Toad's Turnpike",
        "Tick-Tock Clock",
        "Thwomp Ruins",
        "Water",
        "Moo Moo Meadows",
        "Yoshi Valley",
        "Boswer's Castle",
        "Mario Circuit",
        "Toad Harbor",
        "Mount Wario",
        "Sunshine Airport",
        "DK Jungle",
        "Dry Dry Desert",
        "Piranha Plant Slide",
      ],
      descriptionTemplates: {
        description: (value) => `the player who likes the ${value} track`,
      },
    },
    {
      values: [
        "gliding",
        "sliding",
        "jumping",
        "boosting",
        "reversing",
        "bumping",
      ],
      descriptionTemplates: {
        description: (value) => `the player who likes ${value}`,
      },
    },
    {
      values: [1, 2, 3, 4, 5],
      display: (value) => appendNth(value),
      descriptionTemplates: {
        description: (value) => `the person who finished ${appendNth(value)}`,
        diffGreaterDescription: (value) => `${value} ${basicPluralize(value, "place")} worse`,
        diffLesserDescription: (value) => `${value} ${basicPluralize(value, "place")} better`,
        verb: "finished",
      },
    },
  ],
  [
    {
      values: firstNames,
      descriptionTemplates: {
        description: (value) => value,
      },
    },
    {
      values: colors,
      descriptionTemplates: {
        description: (value) => `the patient with the ${value} cast`,
      },
    },
    {
      values: ["foot", "ankle", "leg", "hand", "arm", "wrist"],
      descriptionTemplates: {
        description: (value) => `the patient with the broken ${value}`,
      },
    },
    {
      values: [4, 5, 6, 7, 8, 9, 10],
      display: (value) => `${value} weeks`,
      descriptionTemplates: {
        description: (value) =>
          `the patient who wore their cast for ${value} weeks`,
        diffGreaterDescription: (value) => `${value} more ${basicPluralize(value, "week")}`,
        diffLesserDescription: (value) => `${value} less ${basicPluralize(value, "week")}`,
        verb: "wore their cast for",
      },
    },
  ],
  [
    {
      values: firstNames,
      descriptionTemplates: {
        description: (value) => value,
      },
    },
    {
      values: ["saw", "drill", "hammer", "screwdriver", "wrench"],
      descriptionTemplates: {
        description: (value) => `the person who borrowed a ${value}`,
      },
    },
    {
      values: ["swing", "fence", "gate", "tree house", "chair", "cabinet"],
      descriptionTemplates: {
        description: (value) => `the person who built a ${value}`,
      },
    },
    {
      values: [1, 2, 3, 4, 5],
      display: (value) => `${value} hr`,
      descriptionTemplates: {
        description: (value) =>
          `the person who borrowed the tool for ${value} ${basicPluralize(value, "hour")}`,
        diffGreaterDescription: (value) => `${value} more ${basicPluralize(value, "hour")}`,
        diffLesserDescription: (value) => `${value} less ${basicPluralize(value, "hour")}`,
        verb: "borrowed the tool for",
      },
    },
  ],
  [
    {
      values: weekdays,
      display: (value) => value.slice(0, 3),
      descriptionTemplates: {
        description: (value) => `the student who has an exam on ${value}`,
      },
    },
    {
      values: ["biology", "chemistry", "physics", "math", "engineering"],
      descriptionTemplates: {
        description: (value) => `the student majoring in ${value}`,
      },
    },
    {
      values: ["library", "dorm", "park", "cafeteria", "lab"],
      descriptionTemplates: {
        description: (value) =>
          `the student who likes to study in the ${value}`,
      },
    },
    {
      values: [3.5, 3.6, 3.7, 3.8, 3.9, 4.0],
      display: (value) => `${value.toFixed(1)} GPA`,
      descriptionTemplates: {
        description: (value) => `the student with the ${value.toFixed(1)} GPA`,
        diffGreaterDescription: (value) => `${value} points higher`,
        diffLesserDescription: (value) => `${value} points lower`,
        verb: "has a GPA",
      },
    },
  ],
  [
    {
      values: ["impressionist", "cubist", "realist", "minimalist", "baroque"],
      descriptionTemplates: {
        description: (value) => `the ${value} painting`,
      },
    },
    {
      values: [
        "lake",
        "ballerina",
        "bird",
        "boat",
        "feast",
        "map",
        "rocket",
        "concert",
        "bouquet",
        "truck",
        "microscope",
      ],
      descriptionTemplates: {
        description: (value) => `the painting of the ${value}`,
      },
    },
    {
      values: [
        "Depths",
        "Balance",
        "Yin",
        "Float",
        "Expectations",
        "Vast",
        "Boundaries",
        "Flow",
        "Composition",
        "Movement",
        "Revelations",
      ],
      descriptionTemplates: {
        description: (value) => `the painting titled "${value}"`,
      },
    },
    {
      values: months,
      display: (value) => value.slice(0, 3),
      descriptionTemplates: {
        description: (value) =>
          `the painting that the gallery featured in ${value}`,
      },
    },
  ],
  [
    {
      values: [
        "Harry",
        "Ron",
        "Hermione",
        "Luna",
        "Neville",
        "Fred",
        "George",
        "Ginny",
        "Hagrid",
        "Dumbledore",
        "Snape",
        "Sirius",
        "Malfoy",
        "McGonagal",
        "Mr. Weasley",
        "Lupin",
        "Dobby",
      ],
      descriptionTemplates: {
        description: (value) =>
          `the person whose favorite character is ${value}`,
      },
    },
    {
      values: [
        "Hippogriff",
        "Thestral",
        "Dragon",
        "Niffler",
        "Unicorn",
        "Phoenix",
        "Grindylow",
        "Acromantula",
      ],
      descriptionTemplates: {
        description: (value) =>
          `the person whose favorite Harry Potter creature is a ${value}`,
      },
    },
    {
      values: [
        "Expelliarmus",
        "Alohomora",
        "Lumos",
        "Nox",
        "Wingardium Leviosa",
        "Petrificus Totalus",
        "Reparo",
        "Protego",
        "Stupify",
        "Accio",
      ],
      descriptionTemplates: {
        description: (value) =>
          `the person whose favorite Harry Potter spell is "${value}"`,
      },
    },
    {
      values: [
        "Hogwarts",
        "The Burrow",
        "Godric's Hollow",
        "12 Grimmauld Place",
        "Diagon Alley",
        "Gringotts",
        "Hogsmeade",
      ],
      descriptionTemplates: {
        description: (value) =>
          `the person whose Harry Potter setting is ${value}`,
      },
    },
  ],

  [
    {
      values: [
        "Italian",
        "Mexican",
        "French",
        "Japanese",
        "Chinese",
        "Thai",
        "Indian",
        "Greek",
        "American",
        "Korean",
      ],
      descriptionTemplates: {
        description: (value) => `the restaurant serving ${value} cuisine`,
      },
    },
    {
      values: ["views", "food", "music", "ambiance", "decor"],
      descriptionTemplates: {
        description: (value) => `the restaurant known for its ${value}`,
      },
    },
    {
      values: [10, 15, 20, 25, 30],
      display: (value) => `${value} min`,
      descriptionTemplates: {
        description: (value) =>
          `the restaurant that is a ${value} minute walk away`,
        diffGreaterDescription: (value) => `${value} minutes further`,
        diffLesserDescription: (value) => `${value} minutes closer`,
        verb: "is",
      },
    },
    {
      values: [1, 2, 3, 4, 5],
      display: (value) => `${value} star`,
      descriptionTemplates: {
        description: (value) =>
          `the restaurant rated ${value} ${basicPluralize(value, "star")}`,
        diffGreaterDescription: (value) =>
          `${value} ${basicPluralize(value, "star")} higher`,
        diffLesserDescription: (value) =>
          `${value} ${basicPluralize(value, "star")} lower`,
        verb: "is rated",
      },
    },
  ],
  [
    {
      values: [
        "Mom's Special",
        "Grandma's Treat",
        "Dad's Specialty",
        "Grandpa's Favorite",
        "Mystery Mush",
      ],
      descriptionTemplates: {
        description: (value) => `the dish titled "${value}"`,
      },
    },
    {
      values: ["potatoes", "okra", "spinach", "jalapenos", "tofu", "mushrooms", "nuts", "basil", "broccoli", "cabbage", "peas", "beans", "kale", "tempeh", "carrots", "eggplant", "tomatoes", "onion", "ginger"],
      descriptionTemplates: {
        description: (value) => `the dish whose key ingredient is ${value}`,
      },
    },
    {
      values: [20, 30, 40, 50, 60],
      display: (value) => `${value} min`,
      descriptionTemplates: {
        description: (value) =>
          `the dish that takes ${value} minutes to prepare`,
        diffGreaterDescription: (value) => `${value} more minutes`,
        diffLesserDescription: (value) => `${value} less minutes`,
        verb: "takes",
      },
    },
    {
      values: [1,2,3,4,5,6,7,8],
      display: (value) => `${value} servings`,
      descriptionTemplates: {
        description: (value) =>
          `the dish that serves ${value} ${value > 1 ? "people" : "person"}`,
        diffGreaterDescription: (value) =>
          `${value} more ${value > 1 ? "people" : "person"}`,
        diffLesserDescription: (value) =>
        `${value} less ${value > 1 ? "people" : "person"}`,
        verb: "serves",
      },
    },
  ],  
  [
    {
      values: [
        "pair of pants",
        "skirt",
        "dress",
        "pair of socks",
        "jacket",
        "sweater",
        "hat",
        "pair of leggings",
        "pair of shorts",
        "shirt",
        "scarf",
      ],
      display: (value) => value.replace("pair of ", ""),
      descriptionTemplates: {
        description: (value) => `the ${value}`,
      },
    },{
      values: [
        "nylon",
        "spandex",
        "cotton",
        "linen",
        "denim",
        "velvet",
        "silk",
        "flannel",
        "polyester",
        "wool",
        "fleece",
        "satin",
      ],
      descriptionTemplates: {
        description: (value) => `the ${value} item`,
      },
    },
    {
      values: colors,
      descriptionTemplates: {
        description: (value) => `the ${value} item`,
      },
    },
    {
      values: [20, 30, 40, 50, 60],
      display: (value) => `$${value}`,
      descriptionTemplates: {
        description: (value) =>
          `the item that cost $${value}`,
        diffGreaterDescription: (value) => `$${value} more`,
        diffLesserDescription: (value) => `$${value} less`,
        verb: "costs",
      },
    },
  ],
  [
    {
      values: [
        "cane",
        "hat",
        "glasses",
        "camera",
        "mug",
        "binoculars"
      ],
      descriptionTemplates: {
        description: (value) => `the page where Waldo lost his ${value}`,
      },
    },{
      values: [
        "fire breathers",
        "acrobats",
        "body builders",
        "clowns",
        "bears",
        "jugglers",
        "scientists",
        "pirates",
        "criminals",
        "boats",
        "planes",
        "artists",
        "sculptors",
        "elephants",
        "musicians",
      ],
      descriptionTemplates: {
        description: (value) => `the page where Waldo stopped to watch ${value}`,
      },
    },
    {
      values: [
        "volcano",
        "desert",
        "beach",
        "jungle",
        "zoo",
        "arctic",
        "ski slope",
        "campground",
        "train station",
        "airport",
        "stadium",
        "mall",
        "carnival"
      ],
      descriptionTemplates: {
        description: (value) => `the page where Waldo was at the ${value}`,
      },
    },
    {
      values: [2, 3, 4, 5, 6],
      descriptionTemplates: {
        description: (value) =>
          `page ${value}`,
        diffGreaterDescription: (value) => `${value} pages later`,
        diffLesserDescription: (value) => `${value} pages earlier`,
      },
    },
  ],
  [
    {
      values: [1, 2, 3, 4, 5],
      descriptionTemplates: {
        description: (value) => `the person who traveled through ${value} ${basicPluralize(value, "state")}`,
        diffGreaterDescription: (value) => `${value} more ${basicPluralize(value, "state")}`,
        diffLesserDescription: (value) => `${value} less ${basicPluralize(value, "state")}`,
        verb: "traveled through",
      },
    },
    {
      values: continentalUnitedStates,
      descriptionTemplates: {
        description: (value) => `the person who ended their road trip in ${value}`,
      },
    },
    {
      values: [
        "hotel",
        "motel",
        "Air B&B",
        "hostel",
        "campground",
        "VRBO"
      ],
      descriptionTemplates: {
        description: (value) => `the person who stayed in ${value}s`,
      },
    },
    {
      values: carModels,
      descriptionTemplates: {
        description: (value) => `the person who drove a ${value}`,
      },
    },
  ],
  [
    {
      values: [15, 20, 30, 45, 60],
      descriptionTemplates: {
        description: (value) => `the person whose commute takes ${value} minutes`,
        diffGreaterDescription: (value) => `${value} more minutes`,
        diffLesserDescription: (value) => `${value} fewer minutes`,
        verb: "commutes for",
      },
    },
        {
      values: [1,2,3,4,5],
      descriptionTemplates: {
        description: (value) => `the person who commutes ${value} ${basicPluralize(value, "day")} a week`,
        diffGreaterDescription: (value) => `${value} more ${basicPluralize(value, "day")}`,
        diffLesserDescription: (value) => `${value} less ${basicPluralize(value, "day")}`,
        verb: "commutes",
      },
    },
    {
      values: [6,7,8,9,10],
      descriptionTemplates: {
        description: (value) => `the person whose commute starts at ${value} AM`,
        diffGreaterDescription: (value) => `${value} hours later`,
        diffLesserDescription: (value) => `${value} hours earlier`,
        verb: "starts",
      },
    },
    {
      values: [
        "bike",
        "car",
        "train",
        "foot",
        "bus",
      ],
      descriptionTemplates: {
        description: (value) => `the person who commutes by ${value}`,
      },
    },
  ]
];
