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
const space = [
  "Mars",
  "Venus",
  "Earth",
  "Saturn",
  "Uranus",
  "Pluto",
  "Moon",
  "Sun",
  "Stars",
];
const farmAnimals = [
  "cow",
  "horse",
  "donkey",
  "duck",
  "pig",
  "mule",
  "sheep",
  "lamb",
  "colt",
  "calf",
  "chicken",
  "goat",
];
const petAnimals = [
  "dog",
  "cat",
  "fish",
  "snake",
  "lizard",
  "turtle",
  "parrot",
  "mouse",
  "rat",
  "toad",
];

const unitedStates = [
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
const weekdaysAndWeekends = [...weekdays, "Saturday", " Sunday"];

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

export const allCategories = [
  {
    CAR_AGE: {
      values: [1, 2, 3, 4, 5],
      display: (value) => `${value} yr`,
      descriptionTemplates: {
        description: (value) => `the ${value} year old car`,
        diffGreaterDescription: (value) => `${value} years older`,
        diffLesserDescription: (value) => `${value} years younger`,
      },
    },
    CAR_MILES: {
      values: [10000, 20000, 30000, 40000, 50000],
      display: (value) => `${value} mi`,
      descriptionTemplates: {
        description: (value) => `the car with ${value} miles`,
        diffGreaterDescription: (value) => `${value} more miles`,
        diffLesserDescription: (value) => `${value} less miles`,
        verb: "has",
      },
    },
    CAR_COLOR: {
      values: colors,
      descriptionTemplates: {
        description: (value) => `the ${value} car`,
      },
    },
    NAME: {
      values: firstNames,
      descriptionTemplates: {
        description: (value) => `${value}'s car`,
      },
    },
    CAR_MODEL: {
      values: ["Ford", "BMW", "Honda", "Mercedes", "Kia"],
      descriptionTemplates: {
        description: (value) => `the ${value}`,
      },
    },
  },
  {
    LANE: {
      values: [1, 2, 3, 4, 5, 6],
      display: (value) => `lane ${value}`,
      descriptionTemplates: {
        description: (value) => `the person who swam in lane ${value}`,
        diffGreaterDescription: (value) => `${value} lane numbers higher`,
        diffLesserDescription: (value) => `${value} lane numbers lower`,
        verb: "was",
      },
    },
    COLOR: {
      values: colors,
      descriptionTemplates: {
        description: (value) => `the person wearing ${value} goggles`,
      },
    },
    NAME: {
      values: firstNames,
      descriptionTemplates: {
        description: (value) => `${value}`,
      },
    },
    STROKE: {
      values: ["fly", "back", "breast", "free", "IM"],
      descriptionTemplates: {
        description: (value) => `the person who swam ${value}`,
      },
    },
  },
  {
    SCORE: {
      values: [100, 95, 90, 85, 80],
      descriptionTemplates: {
        description: (value) => `the person whose grade was ${value}`,
        diffGreaterDescription: (value) => `${value} points higher`,
        diffLesserDescription: (value) => `${value} points lower`,
        verb: "scored",
      },
    },
    COLOR: {
      values: colors,
      descriptionTemplates: {
        description: (value) => `the person using ${value} ink`,
      },
    },
    NAME: {
      values: firstNames,
      descriptionTemplates: {
        description: (value) => `${value}`,
      },
    },
    SUBJECT: {
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
  },
  {
    NUMBER: {
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      display: (value) => `${value} s'mores`,
      descriptionTemplates: {
        description: (value) => `the person who ate ${value} s'mores`,
        diffGreaterDescription: (value) => `${value} more s'mores`,
        diffLesserDescription: (value) => `${value} less s'mores`,
        verb: "ate",
      },
    },
    COLOR: {
      values: colors,
      descriptionTemplates: {
        description: (value) => `the person with the ${value} sleeping bag`,
      },
    },
    NAME: {
      values: firstNames,
      descriptionTemplates: {
        description: (value) => `${value}`,
      },
    },
    CONSTELLATION: {
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
  },
  {
    NUMBER: {
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      display: (value) => `${value} mi`,
      descriptionTemplates: {
        description: (value) => `the person who hiked ${value} miles`,
        diffGreaterDescription: (value) => `${value} more miles`,
        diffLesserDescription: (value) => `${value} less miles`,
        verb: "hiked",
      },
    },
    ELEVATION: {
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
    DESTINATION: {
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
    NAME: {
      values: firstNames,
      descriptionTemplates: {
        description: (value) => `${value}`,
      },
    },
    ACCESSORY: {
      values: ["hat", "bottle", "poles", "glasses", "visor", "bandana"],
      descriptionTemplates: {
        description: (value) => `the person with the ${value}`,
      },
    },
  },
  {
    HOURS: {
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      display: (value) => `${value} hr`,
      descriptionTemplates: {
        description: (value) => `the person who finished in ${value} hours`,
        diffGreaterDescription: (value) => `${value} more hours`,
        diffLesserDescription: (value) => `${value} less hours`,
        verb: "took",
      },
    },
    PIECES: {
      values: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
      display: (value) => `${value} pi`,
      descriptionTemplates: {
        description: (value) => `the person who did the ${value} piece puzzle`,
        diffGreaterDescription: (value) => `${value} more pieces`,
        diffLesserDescription: (value) => `${value} less pieces`,
        verb: "assembled",
      },
    },
    NAME: {
      values: firstNames,
      descriptionTemplates: {
        description: (value) => `${value}`,
      },
    },
    SUBJECT: {
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
  },
  {
    TREES: {
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      display: (value) => `${value} trees`,
      descriptionTemplates: {
        description: (value) => `the house with ${value} trees`,
        diffGreaterDescription: (value) => `${value} more trees`,
        diffLesserDescription: (value) => `${value} less trees`,
        verb: "has",
      },
    },
    NAME: {
      values: firstNames,
      descriptionTemplates: {
        description: (value) => `${value}'s house`,
      },
    },
    COLOR: {
      values: colors,
      descriptionTemplates: {
        description: (value) => `the ${value} house`,
      },
    },
    ACCESSORY: {
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
  },
  {
    TIME: {
      values: [1, 2, 3, 4, 5],
      display: (value) => `${value} PM`,
      descriptionTemplates: {
        description: (value) => `the person who snacks at ${value} o'clock`,
        diffGreaterDescription: (value) => `${value} hours later`,
        diffLesserDescription: (value) => `${value} hours earlier`,
        verb: "snacks",
      },
    },
    DURATION: {
      values: [10, 15, 20, 25, 30],
      display: (value) => `${value} min`,
      descriptionTemplates: {
        description: (value) => `the person who takes ${value} minutes`,
        diffGreaterDescription: (value) => `${value} minutes more`,
        diffLesserDescription: (value) => `${value} minutes less`,
        verb: "takes",
      },
    },
    NAME: {
      values: firstNames,
      descriptionTemplates: {
        description: (value) => `${value}`,
      },
    },
    COLOR: {
      values: colors,
      descriptionTemplates: {
        description: (value) => `the person with the ${value} cup`,
      },
    },
    DRINK: {
      values: ["tea", "coffee", "water", "milk", "wine", "beer", "juice"],
      descriptionTemplates: {
        description: (value) => `the person who drinks ${value}`,
      },
    },
    SNACK: {
      values: ["apple", "cookie", "bun", "pear", "donut", "banana"],
      descriptionTemplates: {
        description: (value) => `the person who eats the ${value}`,
      },
    },
  },
  {
    COST: {
      values: [100, 150, 200, 250, 300, 350, 400, 450, 500],
      display: (value) => `$${value}`,
      descriptionTemplates: {
        description: (value) => `the jewelry that cost ${value} dollars`,
        diffGreaterDescription: (value) => `${value} dollars more`,
        diffLesserDescription: (value) => `${value} dollars less`,
        verb: "cost",
      },
    },
    NUMBER: {
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      display: (value) => `${value} stones`,
      descriptionTemplates: {
        description: (value) => `the jewelry with ${value} stones`,
        diffGreaterDescription: (value) => `${value} more stones`,
        diffLesserDescription: (value) => `${value} less stones`,
        verb: "has",
      },
    },
    NAME: {
      values: firstNames,
      descriptionTemplates: {
        description: (value) => `${value}'s jewelry`,
      },
    },
    STONE: {
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
    JEWELRY: {
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
  },
  {
    NAME: {
      values: firstNames,
      descriptionTemplates: {
        description: (value) => `${value}`,
      },
    },
    DURATION: {
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
    ACTIVITY: {
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
    DAY: {
      values: weekdaysAndWeekends,
      display: (value) => value.slice(0, 3),
      descriptionTemplates: {
        description: (value) =>
          `the person who does their activity on ${value}`,
      },
    },
  },
  {
    NAME: {
      values: petNames,
      descriptionTemplates: {
        description: (value) => `${value}`,
      },
    },
    BREED: {
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
    AGE: {
      values: [1, 2, 3, 4, 5],
      display: (value) => `${value} yr`,
      descriptionTemplates: {
        description: (value) => `the ${value} year old dog`,
        diffGreaterDescription: (value) => `${value} years older`,
        diffLesserDescription: (value) => `${value} years younger`,
      },
    },
    COLOR: {
      values: colors,
      descriptionTemplates: {
        description: (value) => `the dog with the ${value} leash`,
      },
    },
  },
  {
    BREAD: {
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
    FILLING: {
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
    CONDIMENT: {
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
    COST: {
      values: [7, 8, 9, 10, 11, 12, 13],
      display: (value) => `$${value}`,
      descriptionTemplates: {
        description: (value) => `the sandwich that cost $${value}`,
        diffGreaterDescription: (value) => `${value} dollars more`,
        diffLesserDescription: (value) => `${value} dollars less`,
        verb: "costs",
      },
    },
  },
  {
    COSTUME: {
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
    NAME: {
      values: firstNames,
      descriptionTemplates: {
        description: (value) => `${value}`,
      },
    },
    CANDY: {
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
    COST: {
      values: [5, 10, 15, 20, 25, 30],
      display: (value) => `${value} pi`,
      descriptionTemplates: {
        description: (value) => `the person who got ${value} pieces of candy`,
        diffGreaterDescription: (value) => `${value} more pieces`,
        diffLesserDescription: (value) => `${value} fewer pieces`,
        verb: "got",
      },
    },
  },
  {
    GIFT: {
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
    NAME: {
      values: firstNames,
      descriptionTemplates: {
        description: (value) => `${value}`,
      },
    },
    PAPER: {
      values: ["candy", "reindeer", "Rudolph", "Santa", "sled", "snow", "elf"],
      descriptionTemplates: {
        description: (value) =>
          `the person whose gifts were wrapped in ${value} wrapping paper`,
      },
    },
    NUMBER: {
      values: [1, 2, 3, 4, 5],
      display: (value) => `${value} gifts`,
      descriptionTemplates: {
        description: (value) => `the person who received ${value} gifts`,
        diffGreaterDescription: (value) => `${value} more gifts`,
        diffLesserDescription: (value) => `${value} fewer gifts`,
        verb: "received",
      },
    },
  },
  {
    TOPIC: {
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
    NAME: {
      values: firstNames,
      descriptionTemplates: {
        description: (value) => `${value}`,
      },
    },
    UNIVERSITY: {
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
    CENTURY: {
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
  },
  {
    SPECIES: {
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
    TRAIT: {
      values: ["height", "width", "canopy", "history", "branches"],
      descriptionTemplates: {
        description: (value) => `the tree that is known for its ${value}`,
      },
    },
    STATE: {
      values: unitedStates,
      descriptionTemplates: {
        description: (value) => `the tree in ${value}`,
      },
    },
    AGE: {
      values: [10, 20, 50, 100, 150, 200],
      display: (value) => `${value} yr`,
      descriptionTemplates: {
        description: (value) => `the ${value} year old tree`,
        diffGreaterDescription: (value) => `${value} years older`,
        diffLesserDescription: (value) => `${value} years younger`,
      },
    },
  },
  {
    PLACE: {
      values: [1, 2, 3, 4, 5],
      display: (value) => appendNth(value),
      descriptionTemplates: {
        description: (value) => `the person who came in ${appendNth(value)}`,
        diffGreaterDescription: (value) => `${value} places worse`,
        diffLesserDescription: (value) => `${value} places better`,
        verb: "placed",
      },
    },
    COLOR: {
      values: colors,
      descriptionTemplates: {
        description: (value) => `the person wearing the ${value} jersey`,
      },
    },
    NAME: {
      values: firstNames,
      descriptionTemplates: {
        description: (value) => value,
      },
    },
    RACE: {
      values: [50, 100, 200, 400, 1600],
      descriptionTemplates: {
        description: (value) => `the person who ran the ${value} meter race`,
        diffGreaterDescription: (value) => `${value} meters more`,
        diffLesserDescription: (value) => `${value} meters less`,
        verb: "raced",
      },
    },
  },
  {
    DAYS: {
      values: [1, 2, 3, 4, 5],
      display: (value) => appendNth(value),
      descriptionTemplates: {
        description: (value) => `the person vacationed for ${value} days`,
        diffGreaterDescription: (value) => `${value} more days`,
        diffLesserDescription: (value) => `${value} less days`,
        verb: "vacationed",
      },
    },
    DESTINATION: {
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
    AIRLINE: {
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
    MONTH: {
      values: months,
      display: (value) => value.slice(0, 3),
      descriptionTemplates: {
        description: (value) => `the person who took their trip in ${value}`,
      },
    },
    DAY: {
      values: weekdaysAndWeekends,
      display: (value) => value.slice(0, 3),
      descriptionTemplates: {
        description: (value) => `the person who started their trip on ${value}`,
      },
    },
  },
  {
    NAME: {
      values: petNames,
      descriptionTemplates: {
        description: (value) => `${value}`,
      },
    },
    LEGS: {
      values: [0, 2, 4, 6, 8],
      display: (value) => convertLegCountToAnimal(value),
      descriptionTemplates: {
        description: (value) => `the pet with ${value} legs`,
        diffGreaterDescription: (value) => `${value} more legs`,
        diffLesserDescription: (value) => `${value} fewer legs`,
        verb: "has",
      },
    },
    ACTIVITY: {
      values: ["sleeping", "hiding", "resting", "eating", "staring"],
      descriptionTemplates: {
        description: (value) => `the pet that likes ${value}`,
      },
    },
    CAGE: {
      values: ["metal", "glass", "mesh", "wood", "plastic"],
      descriptionTemplates: {
        description: (value) => `the pet in the ${value} cage`,
      },
    },
  },
  {
    COLOR: {
      values: colors,
      descriptionTemplates: {
        description: (value) => `the clown with the ${value} hair`,
      },
    },
    WHEELS: {
      values: [0, 1, 2, 3, 4],
      display: (value) => convertWheelCountToVehicle(value),
      descriptionTemplates: {
        description: (value) => `the clown on ${value} wheels`,
        diffGreaterDescription: (value) => `${value} more wheels`,
        diffLesserDescription: (value) => `${value} fewer wheels`,
        verb: "used",
      },
    },
    ACTIVITY: {
      values: ["juggling", "singing", "waving", "rapping", "smiling"],
      descriptionTemplates: {
        description: (value) => `the clown that was ${value}`,
      },
    },
    CAGE: {
      values: ["flower", "hose", "chicken", "hammer", "sign"],
      descriptionTemplates: {
        description: (value) => `the clown with the ${value}`,
      },
    },
  },
];
