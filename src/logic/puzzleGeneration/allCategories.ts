import {
  firstNames,
  lastNames,
  petNames,
  colors,
  continentalUnitedStates,
  carModels,
  months,
  weekdays,
  weekdaysAndWeekends,
} from "./commonLists";
import {
  appendNth,
  convertLegCountToAnimal,
  convertWheelCountToVehicle,
  basicPluralize,
} from "./categoryHelpers";
import {type NumberAxis, type StringAxis} from "./buildEmptyMatrix";

export type NumberCategory = {
  kind: "number";
  values: number[];
  generateDisplayLabels?: (value: number) => string;
  templates: NumberAxis["templates"];
};

export type StringCategory = {
  kind: "string";
  values: string[];
  generateDisplayLabels?: (value: string) => string;
  templates: StringAxis["templates"];
};

export const allCategories: (NumberCategory | StringCategory)[][] = [
  [
    {
      kind: "number",
      values: [1, 2, 3, 4, 5],
      generateDisplayLabels: (value) => `${value} yr`,
      templates: {
        generateDescription: (value) => `the ${value} year old car`,
        generateDiffGreaterDescription: (value) =>
          `${value} ${basicPluralize(value, "year")} older`,
        generateDiffLesserDescription: (value) =>
          `${value} ${basicPluralize(value, "year")} younger`,
      },
    },
    {
      kind: "number",
      values: [10000, 20000, 30000, 40000, 50000],
      generateDisplayLabels: (value) => `${value} mi`,
      templates: {
        generateDescription: (value) => `the car with ${value} miles`,
        generateDiffGreaterDescription: (value) => `${value} more miles`,
        generateDiffLesserDescription: (value) => `${value} fewer miles`,
        verb: "has",
      },
    },
    {
      kind: "string",
      values: colors,
      templates: {
        generateDescription: (value) => `the ${value} car`,
      },
    },
    {
      kind: "string",
      values: carModels,
      templates: {
        generateDescription: (value) => `the ${value}`,
      },
    },
  ],
  [
    {
      kind: "number",
      values: [1, 2, 3, 4, 5, 6],
      generateDisplayLabels: (value) => `lane ${value}`,
      templates: {
        generateDescription: (value) => `the person who swam in lane ${value}`,
        generateDiffGreaterDescription: (value) =>
          `${value} lane ${basicPluralize(value, "number")} higher`,
        generateDiffLesserDescription: (value) =>
          `${value} lane ${basicPluralize(value, "number")} lower`,
        verb: "was",
      },
    },
    {
      kind: "string",
      values: colors,
      templates: {
        generateDescription: (value) => `the person wearing ${value} goggles`,
      },
    },
    {
      kind: "string",
      values: firstNames,
      templates: {
        generateDescription: (value) => `${value}`,
      },
    },
    {
      kind: "string",
      values: ["fly", "back", "breast", "free", "IM"],
      templates: {
        generateDescription: (value) => `the person who swam ${value}`,
      },
    },
  ],
  [
    {
      kind: "number",
      values: [100, 95, 90, 85, 80],
      templates: {
        generateDescription: (value) => `the person whose grade was ${value}`,
        generateDiffGreaterDescription: (value) => `${value} points higher`,
        generateDiffLesserDescription: (value) => `${value} points lower`,
        verb: "scored",
      },
    },
    {
      kind: "string",
      values: colors,
      templates: {
        generateDescription: (value) => `the person using ${value} ink`,
      },
    },
    {
      kind: "string",
      values: firstNames,
      templates: {
        generateDescription: (value) => `${value}`,
      },
    },
    {
      kind: "string",
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
      templates: {
        generateDescription: (value) => `the person who wrote about ${value}`,
      },
    },
  ],
  [
    {
      kind: "number",
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      generateDisplayLabels: (value) =>
        `${value} ${basicPluralize(value, "s'more")}`,
      templates: {
        generateDescription: (value) =>
          `the person who ate ${value} ${basicPluralize(value, "s'more")}`,
        generateDiffGreaterDescription: (value) =>
          `${value} more ${basicPluralize(value, "s'more")}`,
        generateDiffLesserDescription: (value) =>
          `${value} less ${basicPluralize(value, "s'more")}`,
        verb: "ate",
      },
    },
    {
      kind: "string",
      values: colors,
      templates: {
        generateDescription: (value) =>
          `the person with the ${value} sleeping bag`,
      },
    },
    {
      kind: "string",
      values: firstNames,
      templates: {
        generateDescription: (value) => `${value}`,
      },
    },
    {
      kind: "string",
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
      templates: {
        generateDescription: (value) => `the person who spotted ${value}`,
      },
    },
  ],
  [
    {
      kind: "number",
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      generateDisplayLabels: (value) => `${value} mi`,
      templates: {
        generateDescription: (value) =>
          `the person who hiked ${value} ${basicPluralize(value, "mile")}`,
        generateDiffGreaterDescription: (value) =>
          `${value} more ${basicPluralize(value, "mile")}`,
        generateDiffLesserDescription: (value) =>
          `${value} less ${basicPluralize(value, "mile")}`,
        verb: "hiked",
      },
    },
    {
      kind: "number",
      values: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
      generateDisplayLabels: (value) => `${value} ft`,
      templates: {
        generateDescription: (value) =>
          `the person who gained ${value} feet in elevation`,
        generateDiffGreaterDescription: (value) => `${value} more feet`,
        generateDiffLesserDescription: (value) => `${value} less feet`,
        verb: "gained",
      },
    },
    {
      kind: "string",
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
      templates: {
        generateDescription: (value) => `the person who hiked to the ${value}`,
      },
    },
    {
      kind: "string",
      values: ["hat", "bottle", "poles", "sunglasses", "visor", "bandana"],
      templates: {
        generateDescription: (value) => `the person with the ${value}`,
      },
    },
  ],
  [
    {
      kind: "number",
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      generateDisplayLabels: (value) => `${value} hr`,
      templates: {
        generateDescription: (value) =>
          `the person who finished in ${value} ${basicPluralize(
            value,
            "hour",
          )}`,
        generateDiffGreaterDescription: (value) =>
          `${value} more ${basicPluralize(value, "hour")}`,
        generateDiffLesserDescription: (value) =>
          `${value} less ${basicPluralize(value, "hour")}`,
        verb: "took",
      },
    },
    {
      kind: "number",
      values: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
      generateDisplayLabels: (value) => `${value} pieces`,
      templates: {
        generateDescription: (value) =>
          `the person who did the ${value} piece puzzle`,
        generateDiffGreaterDescription: (value) => `${value} more pieces`,
        generateDiffLesserDescription: (value) => `${value} fewer pieces`,
        verb: "assembled",
      },
    },
    {
      kind: "string",
      values: firstNames,
      templates: {
        generateDescription: (value) => `${value}`,
      },
    },
    {
      kind: "string",
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
      templates: {
        generateDescription: (value) =>
          `the person who did a puzzle of ${value}`,
      },
    },
  ],
  [
    {
      kind: "number",
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      generateDisplayLabels: (value) =>
        `${value} ${basicPluralize(value, "tree")}`,
      templates: {
        generateDescription: (value) =>
          `the house with ${value} ${basicPluralize(value, "tree")}`,
        generateDiffGreaterDescription: (value) =>
          `${value} more ${basicPluralize(value, "tree")}`,
        generateDiffLesserDescription: (value) =>
          `${value} less ${basicPluralize(value, "tree")}`,
        verb: "has",
      },
    },
    {
      kind: "string",
      values: firstNames,
      templates: {
        generateDescription: (value) => `${value}'s house`,
      },
    },
    {
      kind: "string",
      values: colors,
      templates: {
        generateDescription: (value) => `the ${value} house`,
      },
    },
    {
      kind: "string",
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
      templates: {
        generateDescription: (value) => `the house with the ${value}`,
      },
    },
  ],
  [
    {
      kind: "number",
      values: [1, 2, 3, 4, 5],
      generateDisplayLabels: (value) => `${value} PM`,
      templates: {
        generateDescription: (value) =>
          `the person who snacks at ${value} o'clock`,
        generateDiffGreaterDescription: (value) =>
          `${value} ${basicPluralize(value, "hour")} later`,
        generateDiffLesserDescription: (value) =>
          `${value} ${basicPluralize(value, "hour")} earlier`,
        verb: "snacks",
      },
    },
    {
      kind: "number",
      values: [10, 15, 20, 25, 30],
      generateDisplayLabels: (value) => `${value} min`,
      templates: {
        generateDescription: (value) => `the person who takes ${value} minutes`,
        generateDiffGreaterDescription: (value) => `${value} minutes more`,
        generateDiffLesserDescription: (value) => `${value} minutes less`,
        verb: "takes",
      },
    },
    {
      kind: "string",
      values: colors,
      templates: {
        generateDescription: (value) => `the person with the ${value} cup`,
      },
    },
    {
      kind: "string",
      values: ["tea", "coffee", "water", "milk", "wine", "beer", "juice"],
      templates: {
        generateDescription: (value) => `the person who drinks ${value}`,
      },
    },
    {
      kind: "string",
      values: ["apple", "cookie", "bun", "pear", "donut", "banana"],
      templates: {
        generateDescription: (value) => `the person who eats the ${value}`,
      },
    },
  ],
  [
    {
      kind: "number",
      values: [100, 150, 200, 250, 300, 350, 400, 450, 500],
      generateDisplayLabels: (value) => `$${value}`,
      templates: {
        generateDescription: (value) =>
          `the jewelry that cost ${value} dollars`,
        generateDiffGreaterDescription: (value) => `${value} dollars more`,
        generateDiffLesserDescription: (value) => `${value} dollars less`,
        verb: "cost",
      },
    },
    {
      kind: "number",
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      generateDisplayLabels: (value) =>
        `${value} ${basicPluralize(value, "stone")}`,
      templates: {
        generateDescription: (value) =>
          `the jewelry with ${value} ${basicPluralize(value, "stone")}`,
        generateDiffGreaterDescription: (value) =>
          `${value} more ${basicPluralize(value, "stone")}`,
        generateDiffLesserDescription: (value) =>
          `${value} less ${basicPluralize(value, "stone")}`,
        verb: "has",
      },
    },
    {
      kind: "string",
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
      templates: {
        generateDescription: (value) => `the jewelry with the ${value}`,
      },
    },
    {
      kind: "string",
      values: [
        "necklace",
        "brooch",
        "bracelet",
        "ring",
        "earing",
        "cufflink",
        "pendant",
      ],
      templates: {
        generateDescription: (value) => `the ${value}`,
      },
    },
  ],
  [
    {
      kind: "string",
      values: firstNames,
      templates: {
        generateDescription: (value) => `${value}`,
      },
    },
    {
      kind: "number",
      values: [10, 20, 30, 40, 50, 60],
      generateDisplayLabels: (value) => `${value} min`,
      templates: {
        generateDescription: (value) =>
          `the person who does their activity for ${value} minutes`,
        generateDiffGreaterDescription: (value) => `${value} minutes more`,
        generateDiffLesserDescription: (value) => `${value} minutes less`,
        verb: "does",
      },
    },
    {
      kind: "string",
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
      templates: {
        generateDescription: (value) => `the person who ${value}`,
      },
    },
    {
      kind: "string",
      values: weekdaysAndWeekends,
      generateDisplayLabels: (value) => value.slice(0, 3),
      templates: {
        generateDescription: (value) =>
          `the person who does their activity on ${value}`,
      },
    },
  ],
  [
    {
      kind: "string",
      values: petNames,
      templates: {
        generateDescription: (value) => `${value}`,
      },
    },
    {
      kind: "string",
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
      templates: {
        generateDescription: (value) => `the ${value}`,
      },
    },
    {
      kind: "number",
      values: [1, 2, 3, 4, 5],
      generateDisplayLabels: (value) => `${value} yr`,
      templates: {
        generateDescription: (value) => `the ${value} year old dog`,
        generateDiffGreaterDescription: (value) =>
          `${value} ${basicPluralize(value, "year")} older`,
        generateDiffLesserDescription: (value) =>
          `${value} ${basicPluralize(value, "year")} younger`,
      },
    },
    {
      kind: "string",
      values: colors,
      templates: {
        generateDescription: (value) => `the dog with the ${value} leash`,
      },
    },
  ],
  [
    {
      kind: "string",
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
      templates: {
        generateDescription: (value) => `the sandwich on ${value} bread`,
      },
    },
    {
      kind: "string",
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
      templates: {
        generateDescription: (value) => `the ${value} sandwich`,
      },
    },
    {
      kind: "string",
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
      templates: {
        generateDescription: (value) => `the sandwich flavored with ${value}`,
      },
    },
    {
      kind: "number",
      values: [8.0, 8.5, 9.0, 9.5, 10.0, 10.5],
      generateDisplayLabels: (value) => `$${value.toFixed(2)}`,
      templates: {
        generateDescription: (value) =>
          `the sandwich that cost $${value.toFixed(2)}`,
        generateDiffGreaterDescription: (value) => `$${value.toFixed(2)} more`,
        generateDiffLesserDescription: (value) => `$${value.toFixed(2)} less`,
        verb: "costs",
      },
    },
  ],
  [
    {
      kind: "string",
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
      templates: {
        generateDescription: (value) => `the person who dressed as a ${value}`,
      },
    },
    {
      kind: "string",
      values: firstNames,
      templates: {
        generateDescription: (value) => `${value}`,
      },
    },
    {
      kind: "string",
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
      templates: {
        generateDescription: (value) => `the person who favors ${value}`,
      },
    },
    {
      kind: "number",
      values: [5, 10, 15, 20, 25, 30],
      generateDisplayLabels: (value) => `${value} pieces`,
      templates: {
        generateDescription: (value) =>
          `the person who got ${value} pieces of candy`,
        generateDiffGreaterDescription: (value) => `${value} more pieces`,
        generateDiffLesserDescription: (value) => `${value} fewer pieces`,
        verb: "got",
      },
    },
  ],
  [
    {
      kind: "string",
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
      templates: {
        generateDescription: (value) =>
          `the person who asked Santa for a ${value}`,
      },
    },
    {
      kind: "string",
      values: firstNames,
      templates: {
        generateDescription: (value) => `${value}`,
      },
    },
    {
      kind: "string",
      values: ["candy", "reindeer", "Rudolph", "Santa", "sled", "snow", "elf"],
      templates: {
        generateDescription: (value) =>
          `the person whose gifts were wrapped in ${value} wrapping paper`,
      },
    },
    {
      kind: "number",
      values: [1, 2, 3, 4, 5],
      generateDisplayLabels: (value) =>
        `${value} ${basicPluralize(value, "gift")}`,
      templates: {
        generateDescription: (value) =>
          `the person who received ${value} ${basicPluralize(value, "gift")}`,
        generateDiffGreaterDescription: (value) =>
          `${value} more ${basicPluralize(value, "gift")}`,
        generateDiffLesserDescription: (value) =>
          `${value} less ${basicPluralize(value, "gift")}`,
        verb: "received",
      },
    },
  ],
  [
    {
      kind: "string",
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
      templates: {
        generateDescription: (value) => `the historian who studies ${value}`,
      },
    },
    {
      kind: "string",
      values: firstNames,
      templates: {
        generateDescription: (value) => `${value}`,
      },
    },
    {
      kind: "string",
      values: [
        "Stanford",
        "Harvard",
        "UCLA",
        "Berkeley",
        "Oxford",
        "MIT",
        "UCSD",
      ],
      templates: {
        generateDescription: (value) => `the historian who studies at ${value}`,
      },
    },
    {
      kind: "number",
      values: [14, 15, 16, 17, 18, 19, 20],
      generateDisplayLabels: (value) => `${value}th`,
      templates: {
        generateDescription: (value) =>
          `the historian who studies the ${value}th century`,
        generateDiffGreaterDescription: (value) => `${value} centuries later`,
        generateDiffLesserDescription: (value) => `${value} centuries earlier`,
        verb: "studies the period",
      },
    },
  ],
  [
    {
      kind: "string",
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
      templates: {
        generateDescription: (value) => `the ${value} tree`,
      },
    },
    {
      kind: "string",
      values: ["height", "width", "canopy", "history", "branches"],
      templates: {
        generateDescription: (value) =>
          `the tree that is known for its ${value}`,
      },
    },
    {
      kind: "string",
      values: continentalUnitedStates,
      templates: {
        generateDescription: (value) => `the tree in ${value}`,
      },
    },
    {
      kind: "number",
      values: [10, 20, 50, 100, 150, 200],
      generateDisplayLabels: (value) => `${value} yr`,
      templates: {
        generateDescription: (value) => `the ${value} year old tree`,
        generateDiffGreaterDescription: (value) => `${value} years older`,
        generateDiffLesserDescription: (value) => `${value} years younger`,
      },
    },
  ],
  [
    {
      kind: "number",
      values: [1, 2, 3, 4, 5],
      generateDisplayLabels: (value) => appendNth(value),
      templates: {
        generateDescription: (value) =>
          `the person who came in ${appendNth(value)}`,
        generateDiffGreaterDescription: (value) =>
          `${value} ${basicPluralize(value, "place")} worse`,
        generateDiffLesserDescription: (value) =>
          `${value} ${basicPluralize(value, "place")} better`,
        verb: "placed",
      },
    },
    {
      kind: "string",
      values: colors,
      templates: {
        generateDescription: (value) =>
          `the person wearing the ${value} jersey`,
      },
    },
    {
      kind: "string",
      values: firstNames,
      templates: {
        generateDescription: (value) => value,
      },
    },
    {
      kind: "number",
      values: [50, 100, 200, 400, 1600],
      generateDisplayLabels: (value) => `${value} m`,
      templates: {
        generateDescription: (value) =>
          `the person who ran the ${value} meter race`,
        generateDiffGreaterDescription: (value) => `${value} meters more`,
        generateDiffLesserDescription: (value) => `${value} meters less`,
        verb: "raced",
      },
    },
  ],
  [
    {
      kind: "number",
      values: [1, 2, 3, 4, 5],
      generateDisplayLabels: (value) =>
        `${value} ${basicPluralize(value, "day")}`,
      templates: {
        generateDescription: (value) =>
          `the person who vacationed for ${value} ${basicPluralize(
            value,
            "day",
          )}`,
        generateDiffGreaterDescription: (value) =>
          `${value} more ${basicPluralize(value, "day")}`,
        generateDiffLesserDescription: (value) =>
          `${value} less ${basicPluralize(value, "day")}`,
        verb: "vacationed",
      },
    },
    {
      kind: "string",
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
      templates: {
        generateDescription: (value) => `the person who traveled to ${value}`,
      },
    },
    {
      kind: "string",
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
      templates: {
        generateDescription: (value) =>
          `the person who flew on ${value} airline`,
      },
    },
    {
      kind: "string",
      values: months,
      generateDisplayLabels: (value) => value.slice(0, 3),
      templates: {
        generateDescription: (value) =>
          `the person who took their trip in ${value}`,
      },
    },
    {
      kind: "string",
      values: weekdaysAndWeekends,
      generateDisplayLabels: (value) => value.slice(0, 3),
      templates: {
        generateDescription: (value) =>
          `the person who started their trip on ${value}`,
      },
    },
  ],
  [
    {
      kind: "string",
      values: petNames,
      templates: {
        generateDescription: (value) => `${value}`,
      },
    },
    {
      kind: "number",
      values: [0, 2, 4, 6, 8],
      generateDisplayLabels: (value) => convertLegCountToAnimal(value),
      templates: {
        generateDescription: (value) => `the pet with ${value} legs`,
        generateDiffGreaterDescription: (value) => `${value} more legs`,
        generateDiffLesserDescription: (value) => `${value} fewer legs`,
        verb: "has",
      },
    },
    {
      kind: "string",
      values: ["sleeping", "hiding", "resting", "eating", "staring"],
      templates: {
        generateDescription: (value) => `the pet that likes ${value}`,
      },
    },
    {
      kind: "string",
      values: ["metal", "glass", "mesh", "wood", "plastic"],
      templates: {
        generateDescription: (value) => `the pet in the ${value} cage`,
      },
    },
  ],
  [
    {
      kind: "string",
      values: colors,
      templates: {
        generateDescription: (value) => `the clown with the ${value} hair`,
      },
    },
    {
      kind: "number",
      values: [0, 1, 2, 3, 4],
      generateDisplayLabels: (value) => convertWheelCountToVehicle(value),
      templates: {
        generateDescription: (value) =>
          `the clown on ${value} ${basicPluralize(value, "wheel")}`,
        generateDiffGreaterDescription: (value) =>
          `${value} more ${basicPluralize(value, "wheel")}`,
        generateDiffLesserDescription: (value) =>
          `${value} less ${basicPluralize(value, "wheel")}`,
        verb: "rides on",
      },
    },
    {
      kind: "string",
      values: ["juggle", "sing", "wave", "honk", "smile"],
      templates: {
        generateDescription: (value) => `the clown that ${value}s`,
      },
    },
    {
      kind: "string",
      values: ["flower", "hose", "chicken", "hammer", "sign"],
      templates: {
        generateDescription: (value) => `the clown with the ${value}`,
      },
    },
  ],
  [
    {
      kind: "string",
      values: ["tango", "swing", "salsa", "cha-cha", "waltz", "rumba", "polka"],
      templates: {
        generateDescription: (value) => `the ${value} dancer`,
      },
    },
    {
      kind: "number",
      values: [1, 2, 3, 4, 5],
      generateDisplayLabels: (value) =>
        `${value} ${basicPluralize(value, "song")}`,
      templates: {
        generateDescription: (value) =>
          `the dancer that performed ${value} ${basicPluralize(value, "song")}`,
        generateDiffGreaterDescription: (value) =>
          `${value} more ${basicPluralize(value, "song")}`,
        generateDiffLesserDescription: (value) =>
          `${value} less ${basicPluralize(value, "song")}`,
        verb: "performed",
      },
    },
    {
      kind: "string",
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
      templates: {
        generateDescription: (value) =>
          `the dancer that performed to ${value} music`,
      },
    },
    {
      kind: "string",
      values: ["Grand", "Crystal", "Royal", "Rose", "Moonlight"],
      templates: {
        generateDescription: (value) =>
          `the dancer that performed in the ${value} ballroom`,
      },
    },
  ],
  [
    {
      kind: "string",
      values: ["tango", "swing", "salsa", "cha-cha", "waltz", "rumba", "polka"],
      templates: {
        generateDescription: (value) => `the dancer that likes ${value}`,
      },
    },
    {
      kind: "number",
      values: [7, 8, 9, 10, 11],
      generateDisplayLabels: (value) => `${value} PM`,
      templates: {
        generateDescription: (value) =>
          `the dancer that danced until ${value} PM`,
        generateDiffGreaterDescription: (value) =>
          `${value} more ${basicPluralize(value, "hour")}`,
        generateDiffLesserDescription: (value) =>
          `${value} less ${basicPluralize(value, "hour")}`,
        verb: "danced",
      },
    },
    {
      kind: "number",
      values: [15, 20, 25, 30, 35],
      generateDisplayLabels: (value) => `${value} songs`,
      templates: {
        generateDescription: (value) => `the dancer that danced ${value} songs`,
        generateDiffGreaterDescription: (value) => `${value} more songs`,
        generateDiffLesserDescription: (value) => `${value} fewer songs`,
        verb: "danced",
      },
    },
    {
      kind: "string",
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
      templates: {
        generateDescription: (value) => `the dancer that likes ${value} music`,
      },
    },
  ],
  [
    {
      kind: "string",
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
      templates: {
        generateDescription: (value) => `the person who ate ${value} pizza`,
      },
    },
    {
      kind: "number",
      values: [1, 2, 3, 4, 5],
      generateDisplayLabels: (value) =>
        `${value} ${basicPluralize(value, "slice")}`,
      templates: {
        generateDescription: (value) =>
          `the person who ate ${value} ${basicPluralize(value, "slice")}`,
        generateDiffGreaterDescription: (value) =>
          `${value} more ${basicPluralize(value, "slice")}`,
        generateDiffLesserDescription: (value) =>
          `${value} less ${basicPluralize(value, "slice")}`,
        verb: "ate",
      },
    },
    {
      kind: "string",
      values: firstNames,
      templates: {
        generateDescription: (value) => `${value}`,
      },
    },
    {
      kind: "string",
      values: ["water", "milk", "wine", "beer", "juice", "soda"],
      templates: {
        generateDescription: (value) => `the person who drank ${value}`,
      },
    },
  ],
  [
    {
      kind: "string",
      values: [
        "mystery",
        "romance",
        "fiction",
        "fantasy",
        "sci-fi",
        "history",
        "nonfiction",
      ],
      templates: {
        generateDescription: (value) => `the ${value} novel`,
      },
    },
    {
      kind: "number",
      values: [100, 150, 200, 250, 300],
      generateDisplayLabels: (value) => `${value} pages`,
      templates: {
        generateDescription: (value) => `the ${value} page novel`,
        generateDiffGreaterDescription: (value) => `${value} more pages`,
        generateDiffLesserDescription: (value) => `${value} fewer pages`,
        verb: "has",
      },
    },
    {
      kind: "number",
      values: [2020, 2015, 2010, 2005, 2000],
      templates: {
        generateDescription: (value) => `the novel published in ${value}`,
        generateDiffGreaterDescription: (value) => `${value} years later`,
        generateDiffLesserDescription: (value) => `${value} years earlier`,
        verb: "was published",
      },
    },
    {
      kind: "string",
      values: lastNames,
      templates: {
        generateDescription: (value) => `the novel written by ${value}`,
      },
    },
  ],
  [
    {
      kind: "string",
      values: ["Yoshi", "Mario", "Luigi", "Toad", "Bowser", "Wario"],
      templates: {
        generateDescription: (value) => value,
      },
    },
    {
      kind: "string",
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
      templates: {
        generateDescription: (value) => `the player with the ${value}`,
      },
    },
    {
      kind: "string",
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
      templates: {
        generateDescription: (value) => `the player in the ${value} kart`,
      },
    },
    {
      kind: "string",
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
      templates: {
        generateDescription: (value) =>
          `the player who likes the ${value} track`,
      },
    },
    {
      kind: "string",
      values: [
        "gliding",
        "sliding",
        "jumping",
        "boosting",
        "reversing",
        "bumping",
      ],
      templates: {
        generateDescription: (value) => `the player who likes ${value}`,
      },
    },
    {
      kind: "number",
      values: [1, 2, 3, 4, 5],
      generateDisplayLabels: (value) => appendNth(value),
      templates: {
        generateDescription: (value) =>
          `the person who finished ${appendNth(value)}`,
        generateDiffGreaterDescription: (value) =>
          `${value} ${basicPluralize(value, "place")} worse`,
        generateDiffLesserDescription: (value) =>
          `${value} ${basicPluralize(value, "place")} better`,
        verb: "finished",
      },
    },
  ],
  [
    {
      kind: "string",
      values: firstNames,
      templates: {
        generateDescription: (value) => value,
      },
    },
    {
      kind: "string",
      values: colors,
      templates: {
        generateDescription: (value) => `the patient with the ${value} cast`,
      },
    },
    {
      kind: "string",
      values: ["foot", "ankle", "leg", "hand", "arm", "wrist"],
      templates: {
        generateDescription: (value) => `the patient with the broken ${value}`,
      },
    },
    {
      kind: "number",
      values: [4, 5, 6, 7, 8, 9, 10],
      generateDisplayLabels: (value) => `${value} weeks`,
      templates: {
        generateDescription: (value) =>
          `the patient who wore their cast for ${value} weeks`,
        generateDiffGreaterDescription: (value) =>
          `${value} more ${basicPluralize(value, "week")}`,
        generateDiffLesserDescription: (value) =>
          `${value} less ${basicPluralize(value, "week")}`,
        verb: "wore their cast for",
      },
    },
  ],
  [
    {
      kind: "string",
      values: firstNames,
      templates: {
        generateDescription: (value) => value,
      },
    },
    {
      kind: "string",
      values: ["saw", "drill", "hammer", "screwdriver", "wrench"],
      templates: {
        generateDescription: (value) => `the person who borrowed a ${value}`,
      },
    },
    {
      kind: "string",
      values: ["swing", "fence", "gate", "tree house", "chair", "cabinet"],
      templates: {
        generateDescription: (value) => `the person who built a ${value}`,
      },
    },
    {
      kind: "number",
      values: [1, 2, 3, 4, 5],
      generateDisplayLabels: (value) => `${value} hr`,
      templates: {
        generateDescription: (value) =>
          `the person who borrowed the tool for ${value} ${basicPluralize(
            value,
            "hour",
          )}`,
        generateDiffGreaterDescription: (value) =>
          `${value} more ${basicPluralize(value, "hour")}`,
        generateDiffLesserDescription: (value) =>
          `${value} less ${basicPluralize(value, "hour")}`,
        verb: "borrowed the tool for",
      },
    },
  ],
  [
    {
      kind: "string",
      values: weekdays,
      generateDisplayLabels: (value) => value.slice(0, 3),
      templates: {
        generateDescription: (value) =>
          `the student who has an exam on ${value}`,
      },
    },
    {
      kind: "string",
      values: ["biology", "chemistry", "physics", "math", "engineering"],
      templates: {
        generateDescription: (value) => `the student majoring in ${value}`,
      },
    },
    {
      kind: "string",
      values: ["library", "dorm", "park", "cafeteria", "lab"],
      templates: {
        generateDescription: (value) =>
          `the student who likes to study in the ${value}`,
      },
    },
    {
      kind: "number",
      values: [3.5, 3.6, 3.7, 3.8, 3.9, 4.0],
      generateDisplayLabels: (value) => `${value.toFixed(1)} GPA`,
      templates: {
        generateDescription: (value) =>
          `the student with the ${value.toFixed(1)} GPA`,
        generateDiffGreaterDescription: (value) => `${value} points higher`,
        generateDiffLesserDescription: (value) => `${value} points lower`,
        verb: "has a GPA",
      },
    },
  ],
  [
    {
      kind: "string",
      values: ["impressionist", "cubist", "realist", "minimalist", "baroque"],
      templates: {
        generateDescription: (value) => `the ${value} painting`,
      },
    },
    {
      kind: "string",
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
      templates: {
        generateDescription: (value) => `the painting of the ${value}`,
      },
    },
    {
      kind: "string",
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
      templates: {
        generateDescription: (value) => `the painting titled "${value}"`,
      },
    },
    {
      kind: "string",
      values: months,
      generateDisplayLabels: (value) => value.slice(0, 3),
      templates: {
        generateDescription: (value) =>
          `the painting that the gallery featured in ${value}`,
      },
    },
  ],
  [
    {
      kind: "string",
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
      templates: {
        generateDescription: (value) =>
          `the person whose favorite character is ${value}`,
      },
    },
    {
      kind: "string",
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
      templates: {
        generateDescription: (value) =>
          `the person whose favorite Harry Potter creature is a ${value}`,
      },
    },
    {
      kind: "string",
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
      templates: {
        generateDescription: (value) =>
          `the person whose favorite Harry Potter spell is "${value}"`,
      },
    },
    {
      kind: "string",
      values: [
        "Hogwarts",
        "The Burrow",
        "Godric's Hollow",
        "12 Grimmauld Place",
        "Diagon Alley",
        "Gringotts",
        "Hogsmeade",
      ],
      templates: {
        generateDescription: (value) =>
          `the person whose Harry Potter setting is ${value}`,
      },
    },
  ],

  [
    {
      kind: "string",
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
      templates: {
        generateDescription: (value) =>
          `the restaurant serving ${value} cuisine`,
      },
    },
    {
      kind: "string",
      values: ["views", "food", "music", "ambiance", "decor"],
      templates: {
        generateDescription: (value) => `the restaurant known for its ${value}`,
      },
    },
    {
      kind: "number",
      values: [10, 15, 20, 25, 30],
      generateDisplayLabels: (value) => `${value} min`,
      templates: {
        generateDescription: (value) =>
          `the restaurant that is a ${value} minute walk away`,
        generateDiffGreaterDescription: (value) => `${value} minutes further`,
        generateDiffLesserDescription: (value) => `${value} minutes closer`,
        verb: "is",
      },
    },
    {
      kind: "number",
      values: [1, 2, 3, 4, 5],
      generateDisplayLabels: (value) => `${value} star`,
      templates: {
        generateDescription: (value) =>
          `the restaurant rated ${value} ${basicPluralize(value, "star")}`,
        generateDiffGreaterDescription: (value) =>
          `${value} ${basicPluralize(value, "star")} higher`,
        generateDiffLesserDescription: (value) =>
          `${value} ${basicPluralize(value, "star")} lower`,
        verb: "is rated",
      },
    },
  ],
  [
    {
      kind: "string",
      values: [
        "Mom's Special",
        "Grandma's Treat",
        "Dad's Specialty",
        "Grandpa's Favorite",
        "Mystery Mush",
      ],
      templates: {
        generateDescription: (value) => `the dish titled "${value}"`,
      },
    },
    {
      kind: "string",
      values: [
        "potatoes",
        "okra",
        "spinach",
        "jalapenos",
        "tofu",
        "mushrooms",
        "nuts",
        "basil",
        "broccoli",
        "cabbage",
        "peas",
        "beans",
        "kale",
        "tempeh",
        "carrots",
        "eggplant",
        "tomatoes",
        "onion",
        "ginger",
      ],
      templates: {
        generateDescription: (value) =>
          `the dish whose key ingredient is ${value}`,
      },
    },
    {
      kind: "number",
      values: [20, 30, 40, 50, 60],
      generateDisplayLabels: (value) => `${value} min`,
      templates: {
        generateDescription: (value) =>
          `the dish that takes ${value} minutes to prepare`,
        generateDiffGreaterDescription: (value) => `${value} more minutes`,
        generateDiffLesserDescription: (value) => `${value} less minutes`,
        verb: "takes",
      },
    },
    {
      kind: "number",
      values: [1, 2, 3, 4, 5, 6, 7, 8],
      generateDisplayLabels: (value) => `${value} servings`,
      templates: {
        generateDescription: (value) =>
          `the dish that serves ${value} ${value > 1 ? "people" : "person"}`,
        generateDiffGreaterDescription: (value) =>
          `${value} more ${value > 1 ? "people" : "person"}`,
        generateDiffLesserDescription: (value) =>
          `${value} less ${value > 1 ? "people" : "person"}`,
        verb: "serves",
      },
    },
  ],
  [
    {
      kind: "string",
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
      generateDisplayLabels: (value) => value.replace("pair of ", ""),
      templates: {
        generateDescription: (value) => `the ${value}`,
      },
    },
    {
      kind: "string",
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
      templates: {
        generateDescription: (value) => `the ${value} item`,
      },
    },
    {
      kind: "string",
      values: colors,
      templates: {
        generateDescription: (value) => `the ${value} item`,
      },
    },
    {
      kind: "number",
      values: [20, 30, 40, 50, 60],
      generateDisplayLabels: (value) => `$${value}`,
      templates: {
        generateDescription: (value) => `the item that cost $${value}`,
        generateDiffGreaterDescription: (value) => `$${value} more`,
        generateDiffLesserDescription: (value) => `$${value} less`,
        verb: "costs",
      },
    },
  ],
  [
    {
      kind: "string",
      values: ["cane", "hat", "glasses", "camera", "mug", "binoculars"],
      templates: {
        generateDescription: (value) =>
          `the page where Waldo lost his ${value}`,
      },
    },
    {
      kind: "string",
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
      templates: {
        generateDescription: (value) =>
          `the page where Waldo stopped to watch ${value}`,
      },
    },
    {
      kind: "string",
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
        "carnival",
      ],
      templates: {
        generateDescription: (value) =>
          `the page where Waldo was at the ${value}`,
      },
    },
    {
      kind: "number",
      values: [2, 3, 4, 5, 6],
      generateDisplayLabels: (value) => `page ${value}`,
      templates: {
        generateDescription: (value) => `page ${value}`,
        generateDiffGreaterDescription: (value) => `${value} pages later`,
        generateDiffLesserDescription: (value) => `${value} pages earlier`,
      },
    },
  ],
  [
    {
      kind: "number",
      values: [1, 2, 3, 4, 5],
      generateDisplayLabels: (value) =>
        `${value} ${basicPluralize(value, "state")}`,
      templates: {
        generateDescription: (value) =>
          `the person who traveled through ${value} ${basicPluralize(
            value,
            "state",
          )}`,
        generateDiffGreaterDescription: (value) =>
          `${value} more ${basicPluralize(value, "state")}`,
        generateDiffLesserDescription: (value) =>
          `${value} less ${basicPluralize(value, "state")}`,
        verb: "traveled through",
      },
    },
    {
      kind: "string",
      values: continentalUnitedStates,
      templates: {
        generateDescription: (value) =>
          `the person who ended their road trip in ${value}`,
      },
    },
    {
      kind: "string",
      values: ["hotel", "motel", "Air B&B", "hostel", "campground", "VRBO"],
      templates: {
        generateDescription: (value) => `the person who stayed in ${value}s`,
      },
    },
    {
      kind: "string",
      values: carModels,
      templates: {
        generateDescription: (value) => `the person who drove a ${value}`,
      },
    },
  ],
  [
    {
      kind: "number",
      values: [5, 10, 15, 20, 25],
      generateDisplayLabels: (value) => `${value} min`,
      templates: {
        generateDescription: (value) =>
          `the person who cleaned for ${value} minutes`,
        generateDiffGreaterDescription: (value) => `${value} more minutes`,
        generateDiffLesserDescription: (value) => `${value} less minutes`,
        verb: "cleaned for",
      },
    },
    {
      kind: "string",
      values: ["broom", "vacuum", "mop", "sponge", "rag", "duster"],
      templates: {
        generateDescription: (value) =>
          `the person who cleaned with a ${value}`,
      },
    },
    {
      kind: "string",
      values: [
        "kitchen",
        "bathroom",
        "bedroom",
        "dining room",
        "living room",
        "basement",
        "attic",
      ],
      templates: {
        generateDescription: (value) => `the person who cleaned the ${value}`,
      },
    },
    {
      kind: "string",
      values: firstNames,
      templates: {
        generateDescription: (value) => `${value}`,
      },
    },
  ],
  [
    {
      kind: "number",
      values: [15, 20, 30, 45, 60],
      generateDisplayLabels: (value) => `${value} min`,
      templates: {
        generateDescription: (value) =>
          `the person whose commute takes ${value} minutes`,
        generateDiffGreaterDescription: (value) => `${value} more minutes`,
        generateDiffLesserDescription: (value) => `${value} fewer minutes`,
        verb: "commutes for",
      },
    },
    {
      kind: "number",
      values: [1, 2, 3, 4, 5],
      generateDisplayLabels: (value) =>
        `${value} ${basicPluralize(value, "day")}`,
      templates: {
        generateDescription: (value) =>
          `the person who commutes ${value} ${basicPluralize(
            value,
            "day",
          )} a week`,
        generateDiffGreaterDescription: (value) =>
          `${value} more ${basicPluralize(value, "day")}`,
        generateDiffLesserDescription: (value) =>
          `${value} less ${basicPluralize(value, "day")}`,
        verb: "commutes",
      },
    },
    {
      kind: "number",
      values: [6, 7, 8, 9, 10],
      generateDisplayLabels: (value) => `${value} AM`,
      templates: {
        generateDescription: (value) =>
          `the person whose commute starts at ${value} AM`,
        generateDiffGreaterDescription: (value) => `${value} hours later`,
        generateDiffLesserDescription: (value) => `${value} hours earlier`,
        verb: "starts",
      },
    },
    {
      kind: "string",
      values: ["bike", "car", "train", "foot", "bus"],
      templates: {
        generateDescription: (value) => `the person who commutes by ${value}`,
      },
    },
  ],
  [
    {
      kind: "number",
      values: [2, 4, 6, 8, 10],
      generateDisplayLabels: (value) => `${value} eggs`,
      templates: {
        generateDescription: (value) =>
          `the person who found ${value} Easter eggs`,
        generateDiffGreaterDescription: (value) => `${value} more eggs`,
        generateDiffLesserDescription: (value) => `${value} fewer eggs`,
        verb: "found",
      },
    },
    {
      kind: "string",
      values: ["M&Ms", "Robin eggs", "Jelly beans", "Hershey kisses", "Reeses"],
      templates: {
        generateDescription: (value) => `the person who prefers ${value}`,
      },
    },
    {
      kind: "string",
      values: ["pink", "yellow", "green", "blue", "orange", "purple"],
      templates: {
        generateDescription: (value) =>
          `the person who dyed their Easter eggs ${value}`,
      },
    },
    {
      kind: "string",
      values: firstNames,
      templates: {
        generateDescription: (value) => `${value}`,
      },
    },
  ],
  [
    {
      kind: "number",
      values: [2, 4, 6, 8, 10],
      generateDisplayLabels: (value) => `${value} cm`,
      templates: {
        generateDescription: (value) =>
          `the person with the ${value} centimeter wide tattoo`,
        generateDiffGreaterDescription: (value) =>
          `${value} centimeters larger`,
        generateDiffLesserDescription: (value) =>
          `${value} centimeters smaller`,
        verb: "has a tattoo that is",
      },
    },
    {
      kind: "string",
      values: [
        "firefly",
        "tiger",
        "butterfly",
        "tree",
        "globe",
        "sun",
        "moon",
        "snake",
        "bee",
      ],
      templates: {
        generateDescription: (value) =>
          `the person with the tattoo of the ${value}`,
      },
    },
    {
      kind: "string",
      values: ["wrist", "calf", "thigh", "shoulder", "back", "chest"],
      templates: {
        generateDescription: (value) =>
          `the person with the tattoo on their ${value}`,
      },
    },
    {
      kind: "string",
      values: firstNames,
      templates: {
        generateDescription: (value) => `${value}`,
      },
    },
  ],
  [
    {
      kind: "string",
      values: [
        "Christmas",
        "Thanksgiving",
        "Easter",
        "New Years",
        "Valentines Day",
        "St. Patrick's Day",
        "Halloween",
      ],
      templates: {
        generateDescription: (value) => `the person who celebrates ${value}`,
      },
    },
    {
      kind: "string",
      values: ["food", "drink", "music", "dance", "nature"],
      templates: {
        generateDescription: (value) =>
          `the person who has a tradition involving ${value}`,
      },
    },
    {
      kind: "string",
      values: ["alone", "friends", "partner", "parents", "cousins"],
      templates: {
        generateDescription: (value) =>
          `the person who likes to spend the holiday ${
            value === "alone" ? "alone" : `with their ${value}`
          }`,
      },
    },
    {
      kind: "string",
      values: firstNames,
      templates: {
        generateDescription: (value) => `${value}`,
      },
    },
  ],
  [
    {
      kind: "string",
      values: ["bean salad", "brownies", "fruit platter", "sliders", "tacos"],
      templates: {
        generateDescription: (value) =>
          `the person who contributed the ${value} to the potluck`,
      },
    },
    {
      kind: "string",
      values: [
        "location",
        "time",
        "guest list",
        "activities",
        "transportation",
      ],
      templates: {
        generateDescription: (value) =>
          `the person who organized the ${value} for the potluck`,
      },
    },
    {
      kind: "number",
      values: [5, 10, 15, 20, 25],
      generateDisplayLabels: (value) => `${value} min`,
      templates: {
        generateDescription: (value) =>
          `the person who arrived to the potluck ${value} minutes late`,
        generateDiffGreaterDescription: (value) => `${value} minutes later`,
        generateDiffLesserDescription: (value) => `${value} minutes earlier`,
        verb: "arrived",
      },
    },
    {
      kind: "string",
      values: firstNames,
      templates: {
        generateDescription: (value) => `${value}`,
      },
    },
  ],
  [
    {
      kind: "string",
      values: ["RV", "tent", "campervan", "yurt", "hammock"],
      templates: {
        generateDescription: (value) => `the person who camped in the ${value}`,
      },
    },
    {
      kind: "string",
      values: ["beach", "lake", "mountains", "forest", "creek", "desert"],
      templates: {
        generateDescription: (value) => `the person who camped by the ${value}`,
      },
    },
    {
      kind: "string",
      values: ["stars", "solitude", "clean air", "flowers", "wildlife"],
      templates: {
        generateDescription: (value) =>
          `the person who appreciated the ${value}`,
      },
    },
    {
      kind: "string",
      values: ["bugs", "generator", "music", "smoke", "kids"],
      templates: {
        generateDescription: (value) =>
          `the person who was annoyed by the neighboring ${value}`,
      },
    },
  ],
  [
    {
      kind: "string",
      values: ["guitar", "piano", "violin", "cello", "oboe"],
      templates: {
        generateDescription: (value) => `the person who plays the the ${value}`,
      },
    },
    {
      kind: "string",
      values: [
        "Bach",
        "Mozart",
        "Chopin",
        "Beethoven",
        "Tchaikovsky",
        "Handel",
        "Verdi",
      ],
      templates: {
        generateDescription: (value) =>
          `the person who plays music inspired by ${value}`,
      },
    },
    {
      kind: "string",
      values: ["folk", "rock", "jazz", "country", "electronic", "blues"],
      templates: {
        generateDescription: (value) =>
          `the person who plays ${value}-style music`,
      },
    },
    {
      kind: "string",
      values: firstNames,
      templates: {
        generateDescription: (value) => `${value}`,
      },
    },
  ],
  [
    {
      kind: "string",
      values: [
        "mystery",
        "romance",
        "fiction",
        "fantasy",
        "sci-fi",
        "history",
        "nonfiction",
      ],
      templates: {
        generateDescription: (value) =>
          `the person who likes to read ${value} novels`,
      },
    },
    {
      kind: "string",
      values: [
        "happy",
        "sad",
        "scared",
        "relaxed",
        "inspired",
        "energized",
        "contemplative",
      ],
      templates: {
        generateDescription: (value) =>
          `the person who likes novels that make them feel ${value}`,
      },
    },
    {
      kind: "number",
      values: [1, 2, 3, 4, 5],
      generateDisplayLabels: (value) => `${value} books`,
      templates: {
        generateDescription: (value) =>
          `the person who reads ${value} ${basicPluralize(
            value,
            "book",
          )} a month`,
        generateDiffGreaterDescription: (value) =>
          `${value} more ${basicPluralize(value, "book")}`,
        generateDiffLesserDescription: (value) =>
          `${value} less ${basicPluralize(value, "book")}`,
        verb: "reads",
      },
    },
    {
      kind: "string",
      values: firstNames,
      templates: {
        generateDescription: (value) => `${value}`,
      },
    },
  ],
  [
    {
      kind: "string",
      values: ["arugula", "spinach", "kale", "lettuce", "bok choy", "fennel"],
      templates: {
        generateDescription: (value) => `the salad made on a base of ${value}`,
      },
    },
    {
      kind: "string",
      values: [
        "walnuts",
        "sunflower seeds",
        "sesame seeds",
        "pumpkin seeds",
        "almonds",
        "pecans",
      ],
      templates: {
        generateDescription: (value) => `the salad topped with ${value}`,
      },
    },
    {
      kind: "string",
      values: ["pear", "apple", "fig", "orange", "strawberries"],
      templates: {
        generateDescription: (value) => `the salad sweetened with ${value}`,
      },
    },
    {
      kind: "string",
      values: ["tumeric", "balsamic", "pepper", "salt", "soy sauce"],
      templates: {
        generateDescription: (value) => `the salad flavored with ${value}`,
      },
    },
  ],
  [
    {
      kind: "string",
      values: [
        "Dracula",
        "Carmilla",
        "Vladimir",
        "Claudia",
        "Guillermo",
        "Drusilla",
        "Lilath",
        "Edward",
        "Nandor",
        "Laszlo",
        "Nadja",
        "Colin",
      ],
      templates: {
        generateDescription: (value) => `the vampire named ${value}`,
      },
    },
    {
      kind: "string",
      values: [
        "Transylvania",
        "Vienna",
        "Budapest",
        "Prague",
        "Kyiv",
        "St. Petersburg",
      ],
      templates: {
        generateDescription: (value) => `the vampire from ${value}`,
      },
    },
    {
      kind: "string",
      values: ["scarlet", "maroon", "crimson", "burgundy", "vermilion"],
      templates: {
        generateDescription: (value) =>
          `the vampire whose favorite color is ${value}`,
      },
    },
    {
      kind: "string",
      values: [
        "sunlight",
        "garlic",
        "stake",
        "silver bullet",
        "holy water",
        "crucifix",
      ],
      templates: {
        generateDescription: (value) => `the vampire killed by ${value}`,
      },
    },
  ],
  [
    {
      kind: "string",
      values: ["roses", "daisies", "carnations", "lilies", "tulips", "dahlias"],
      templates: {
        generateDescription: (value) => `the bouquet of ${value}`,
      },
    },
    {
      kind: "string",
      values: colors,
      templates: {
        generateDescription: (value) => `the bouquet tied with ${value} ribbon`,
      },
    },
    {
      kind: "number",
      values: [4, 5, 6, 7, 8],
      generateDisplayLabels: (value) => `${value} flowers`,
      templates: {
        generateDescription: (value) => `the bouquet of ${value} flowers`,
        generateDiffGreaterDescription: (value) =>
          `${value} more ${basicPluralize(value, "flower")}`,
        generateDiffLesserDescription: (value) =>
          `${value} less ${basicPluralize(value, "flower")}`,
        verb: "has",
      },
    },
    {
      kind: "string",
      values: ["birthday", "anniversary", "wedding", "graduation", "recital"],
      templates: {
        generateDescription: (value) => `the bouquet for the ${value}`,
      },
    },
  ],
];
