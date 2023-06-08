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

export const allCategories = [
  {
    CAR_AGE: {
      values: [1, 2, 3, 4, 5],
      display: (value) => `${value} yr`,
      descriptionTemplates: {
        description: "the VALUE year old car",
        diffGreaterDescription: "VALUE years older",
        diffLesserDescription: "VALUE years younger",
      },
    },
    CAR_MILES: {
      values: [10000, 20000, 30000, 40000, 50000],
      display: (value) => `${value} mi`,
      descriptionTemplates: {
        description: "the car with VALUE miles",
        diffGreaterDescription: "VALUE more miles",
        diffLesserDescription: "VALUE less miles",
        verb: "has",
      },
    },
    CAR_COLOR: {
      values: colors,
      descriptionTemplates: {
        description: "the VALUE car",
      },
    },
    NAME: {
      values: firstNames,
      descriptionTemplates: {
        description: "VALUE's car",
      },
    },
    CAR_MODEL: {
      values: ["Ford", "BMW", "Honda", "Mercedes", "Kia"],
      descriptionTemplates: {
        description: "the VALUE",
      },
    },
  },
  {
    LANE: {
      values: [1, 2, 3, 4, 5, 6],
      display: (value) => `lane ${value}`,
      descriptionTemplates: {
        description: "the person who swam in lane VALUE",
        diffGreaterDescription: "VALUE lane numbers higher",
        diffLesserDescription: "VALUE lane numbers lower",
        verb: "was",
      },
    },
    COLOR: {
      values: colors,
      descriptionTemplates: {
        description: "the person wearing VALUE goggles",
      },
    },
    NAME: {
      values: firstNames,
      descriptionTemplates: {
        description: "VALUE",
      },
    },
    STROKE: {
      values: ["fly", "back", "breast", "free", "IM"],
      descriptionTemplates: {
        description: "the person who swam VALUE",
      },
    },
  },
  {
    SCORE: {
      values: [100, 95, 90, 85, 80],
      descriptionTemplates: {
        description: "the person whose grade was VALUE",
        diffGreaterDescription: "VALUE points higher",
        diffLesserDescription: "VALUE points lower",
        verb: "scored",
      },
    },
    COLOR: {
      values: colors,
      descriptionTemplates: {
        description: "the person using VALUE ink",
      },
    },
    NAME: {
      values: firstNames,
      descriptionTemplates: {
        description: "VALUE",
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
        description: "the person who wrote about VALUE",
      },
    },
  },
  {
    NUMBER: {
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      display: (value) => `${value} s'mores`,
      descriptionTemplates: {
        description: "the person who ate VALUE s'mores",
        diffGreaterDescription: "VALUE more s'mores",
        diffLesserDescription: "VALUE less s'mores",
        verb: "ate",
      },
    },
    COLOR: {
      values: colors,
      descriptionTemplates: {
        description: "the person with the VALUE sleeping bag",
      },
    },
    NAME: {
      values: firstNames,
      descriptionTemplates: {
        description: "VALUE",
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
        description: "the person who spotted VALUE",
      },
    },
  },
  {
    NUMBER: {
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      display: (value) => `${value} mi`,
      descriptionTemplates: {
        description: "the person who hiked VALUE miles",
        diffGreaterDescription: "VALUE more miles",
        diffLesserDescription: "VALUE less miles",
        verb: "hiked",
      },
    },
    ELEVATION: {
      values: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
      display: (value) => `${value} ft`,
      descriptionTemplates: {
        description: "the person who gained VALUE feet in elevation",
        diffGreaterDescription: "VALUE more feet",
        diffLesserDescription: "VALUE less feet",
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
        description: "the person who hiked to the VALUE",
      },
    },
    NAME: {
      values: firstNames,
      descriptionTemplates: {
        description: "VALUE",
      },
    },
    ACCESSORY: {
      values: ["hat", "bottle", "poles", "glasses", "visor", "bandana"],
      descriptionTemplates: {
        description: "the person with the VALUE",
      },
    },
  },
  {
    HOURS: {
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      display: (value) => `${value} hr`,
      descriptionTemplates: {
        description: "the person who finished in VALUE hours",
        diffGreaterDescription: "VALUE more hours",
        diffLesserDescription: "VALUE less hours",
        verb: "took",
      },
    },
    PIECES: {
      values: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
      display: (value) => `${value} pi`,
      descriptionTemplates: {
        description: "the person who did the VALUE piece puzzle",
        diffGreaterDescription: "VALUE more pieces",
        diffLesserDescription: "VALUE less pieces",
        verb: "assembled",
      },
    },
    NAME: {
      values: firstNames,
      descriptionTemplates: {
        description: "VALUE",
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
        description: "the person who did a puzzle of VALUE",
      },
    },
  },
  {
    TREES: {
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      display: (value) => `${value} trees`,
      descriptionTemplates: {
        description: "the house with VALUE trees",
        diffGreaterDescription: "VALUE more trees",
        diffLesserDescription: "VALUE less trees",
        verb: "has",
      },
    },
    NAME: {
      values: firstNames,
      descriptionTemplates: {
        description: "VALUE's house",
      },
    },
    COLOR: {
      values: colors,
      descriptionTemplates: {
        description: "the VALUE house",
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
        description: "the house with the VALUE",
      },
    },
  },
  {
    TIME: {
      values: [1, 2, 3, 4, 5],
      display: (value) => `${value} PM`,
      descriptionTemplates: {
        description: "the person who snacks at VALUE o'clock",
        diffGreaterDescription: "VALUE hours later",
        diffLesserDescription: "VALUE hours earlier",
        verb: "snacks",
      },
    },
    DURATION: {
      values: [10, 15, 20, 25, 30],
      display: (value) => `${value} min`,
      descriptionTemplates: {
        description: "the person who takes VALUE minutes",
        diffGreaterDescription: "VALUE minutes more",
        diffLesserDescription: "VALUE minutes less",
        verb: "takes",
      },
    },
    NAME: {
      values: firstNames,
      descriptionTemplates: {
        description: "VALUE",
      },
    },
    COLOR: {
      values: colors,
      descriptionTemplates: {
        description: "the person with the VALUE cup",
      },
    },
    DRINK: {
      values: ["tea", "coffee", "water", "milk", "wine", "beer", "juice"],
      descriptionTemplates: {
        description: "the person who drinks VALUE",
      },
    },
    SNACK: {
      values: ["apple", "cookie", "bun", "pear", "donut", "banana"],
      descriptionTemplates: {
        description: "the person who eats the VALUE",
      },
    },
  },
  {
    COST: {
      values: [100, 150, 200, 250, 300, 350, 400, 450, 500],
      display: (value) => `$${value}`,
      descriptionTemplates: {
        description: "the jewelry that cost VALUE dollars",
        diffGreaterDescription: "VALUE dollars more",
        diffLesserDescription: "VALUE dollars less",
        verb: "cost",
      },
    },
    NUMBER: {
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      display: (value) => `${value} stones`,
      descriptionTemplates: {
        description: "the jewelry with VALUE stones",
        diffGreaterDescription: "VALUE more stones",
        diffLesserDescription: "VALUE less stones",
        verb: "has",
      },
    },
    NAME: {
      values: firstNames,
      descriptionTemplates: {
        description: "VALUE's jewelry",
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
        description: "the jewelry with the VALUE",
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
        description: "the VALUE",
      },
    },
  },
  {
    NAME: {
      values: firstNames,
      descriptionTemplates: {
        description: "VALUE",
      },
    },
    DURATION: {
      values: [10, 20, 30, 40, 50, 60],
      display: (value) => `${value} min`,
      descriptionTemplates: {
        description: "the person who does their activity for VALUE minutes",
        diffGreaterDescription: "VALUE minutes more",
        diffLesserDescription: "VALUE minutes less",
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
        description: "the person who VALUE",
      },
    },
    DAY: {
      values: weekdaysAndWeekends,
      descriptionTemplates: {
        description: "the person who does their activity on VALUE",
      },
    },
  },
  {
    NAME: {
      values: petNames,
      descriptionTemplates: {
        description: "VALUE",
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
        description: "the VALUE",
      },
    },
    AGE: {
      values: [1, 2, 3, 4, 5],
      display: (value) => `${value} yr`,
      descriptionTemplates: {
        description: "the VALUE year old dog",
        diffGreaterDescription: "VALUE years older",
        diffLesserDescription: "VALUE years younger",
      },
    },
    COLOR: {
      values: colors,
      descriptionTemplates: {
        description: "the dog with the VALUE leash",
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
        description: "the sandwich on VALUE bread",
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
        description: "the VALUE sandwich",
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
        description: "the sandwich flavored with VALUE",
      },
    },
    COST: {
      values: [7, 8, 9, 10, 11, 12, 13],
      display: (value) => `$${value}`,
      descriptionTemplates: {
        description: "the sandwich that cost $VALUE",
        diffGreaterDescription: "VALUE dollars more",
        diffLesserDescription: "VALUE dollars less",
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
        description: "the person who dressed as a VALUE",
      },
    },
    NAME: {
      values: firstNames,
      descriptionTemplates: {
        description: "VALUE",
      },
    },
    CANDY: {
      values: [
        "snickers",
        "twix",
        "skittles",
        "m&ms",
        "smarties",
        "resses",
        "kit kat",
        "nerds",
        "starbursts",
        "twizzlers",
      ],
      descriptionTemplates: {
        description: "the person who favors VALUE",
      },
    },
    COST: {
      values: [5, 10, 15, 20, 25, 30],
      display: (value) => `${value} pi`,
      descriptionTemplates: {
        description: "the person who got VALUE pieces of candy",
        diffGreaterDescription: "VALUE more pieces",
        diffLesserDescription: "VALUE fewer pieces",
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
        description: "the person who asked Santa for a VALUE",
      },
    },
    NAME: {
      values: firstNames,
      descriptionTemplates: {
        description: "VALUE",
      },
    },
    PAPER: {
      values: ["candy", "reindeer", "Rudolph", "Santa", "sled", "snow", "elf"],
      descriptionTemplates: {
        description:
          "the person whose gifts were wrapped in VALUE wrapping paper",
      },
    },
    NUMBER: {
      values: [1, 2, 3, 4, 5],
      display: (value) => `${value} gifts`,
      descriptionTemplates: {
        description: "the person who received VALUE gifts",
        diffGreaterDescription: "VALUE more gifts",
        diffLesserDescription: "VALUE fewer gifts",
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
        description: "the historian who studies VALUE",
      },
    },
    NAME: {
      values: firstNames,
      descriptionTemplates: {
        description: "VALUE",
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
        description: "the historian who studies at VALUE",
      },
    },
    CENTURY: {
      values: [14, 15, 16, 17, 18, 19, 20],
      display: (value) => `${value}th`,
      descriptionTemplates: {
        description: "the historian who studies the VALUEth century",
        diffGreaterDescription: "VALUE centuries later",
        diffLesserDescription: "VALUE centuries earlier",
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
        description: "the VALUE tree",
      },
    },
    TRAIT: {
      values: ["height", "width", "canopy", "history", "branches"],
      descriptionTemplates: {
        description: "the tree that is known for its VALUE",
      },
    },
    STATE: {
      values: [
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
      ],
      descriptionTemplates: {
        description: "the tree in VALUE",
      },
    },
    AGE: {
      values: [10, 20, 50, 100, 150, 200],
      display: (value) => `${value} yr`,
      descriptionTemplates: {
        description: "the VALUE year old tree",
        diffGreaterDescription: "VALUE years older",
        diffLesserDescription: "VALUE years younger",
      },
    },
  },
];
