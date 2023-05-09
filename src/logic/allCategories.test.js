import {allCategories} from "./allCategories";

// todo test that:
// all categories have at least 1 numeric label set (?)
// more/less text errors
// numeric categories have greater/less desc

function arrayValuesAreUniqueQ(array) {
  const uniqueArray = Array.from(new Set(array));
  return array.length === uniqueArray.length;
}

function arraysDoNotOverlapQ(...arrays) {
  // Get rid of unique values within each array before comparing
  const uniqueArrays = arrays.map((array) => Array.from(new Set(array)));
  // Combine all unique arrays
  const combinedArray = [].concat(...uniqueArrays);

  // Create a unique combined array
  const uniqueCombinedArray = Array.from(new Set(combinedArray));

  // Check if the combined array has the same length as the unique combined array
  return uniqueCombinedArray.length === combinedArray.length;
}

describe("allCategories: tests per scenario", () => {
  allCategories.forEach((scenario, index) => {
    test(`Scenario ${index} with keys ${Object.keys(
      scenario,
    )} has values that are unique across categories`, () => {
      const allValues = Object.keys(scenario).map(
        (category) => scenario[category].values,
      );
      const valuesAreUniqueAcrossCategories = arraysDoNotOverlapQ(...allValues);
      expect(valuesAreUniqueAcrossCategories).toBe(true);
    });

    test(`Scenario ${index} with keys ${Object.keys(
      scenario,
    )} has at least 4 categories`, () => {
      expect(Object.keys(scenario).length).toBeGreaterThanOrEqual(4);
    });

    for (const category in scenario) {
      test(`Scenario ${index} with keys ${Object.keys(
        scenario,
      )} for key ${category} has values that are unique within each category`, () => {
        expect(arrayValuesAreUniqueQ(scenario[category].values)).toBe(true);
      });

      test(`Scenario ${index} with keys ${Object.keys(
        scenario,
      )} for key ${category} has VALUE in every description`, () => {
        for (const template in scenario[category].descriptionTemplates) {
          if (template === "verb") continue;
          expect(scenario[category].descriptionTemplates[template]).toContain(
            "VALUE",
          );
        }
      });
    }
  });
});

describe("allCategories example text", () => {
  test("A sampling of clue text", () => {
    let descriptions = [];
    allCategories.forEach((scenario) => {
      for (const labelA in scenario) {
        const valueA = scenario[labelA].values[0];
        const templatesA = scenario[labelA].descriptionTemplates;
        for (const labelB in scenario) {
          if (labelA === labelB) continue;
          const valueB = scenario[labelB].values[0];
          const valueB2 = scenario[labelB].values[1];
          const templatesB = scenario[labelB].descriptionTemplates;
          const leadingDescription = templatesA.description.replace(
            "VALUE",
            valueA,
          );
          const trailingDescription = templatesB.description.replace(
            "VALUE",
            valueB,
          );
          const trailingDescription2 = templatesB.description.replace(
            "VALUE",
            valueB2,
          );
          descriptions = [
            ...descriptions,
            `${leadingDescription} is not ${trailingDescription}.`,
          ];
          descriptions = [
            ...descriptions,
            `${leadingDescription} is ${trailingDescription} or ${trailingDescription2}.`,
          ];
          if (typeof valueB != "number") continue;
          const numericGreaterDescription =
            templatesB.diffGreaterDescription.replace("VALUE", valueB);
          const numericLesserDescription =
            templatesB.diffLesserDescription.replace("VALUE", valueB);
          const numericSomeDescription =
            templatesB.diffGreaterDescription.replace("VALUE", "some");
          const numericComparisonVerb = templatesB.verb || "is";
          descriptions = [
            ...descriptions,
            `${leadingDescription} ${numericComparisonVerb} at least ${numericGreaterDescription} than ${trailingDescription}.`,
          ];
          descriptions = [
            ...descriptions,
            `${leadingDescription} ${numericComparisonVerb} at least ${numericLesserDescription} than ${trailingDescription}.`,
          ];
          descriptions = [
            ...descriptions,
            `${leadingDescription} ${numericComparisonVerb} ${numericSomeDescription} than ${trailingDescription}.`,
          ];
        }
      }
    });
    expect(descriptions).toMatchInlineSnapshot(`
      [
        "the 1 year old car is not the car with 10000 miles.",
        "the 1 year old car is the car with 10000 miles or the car with 20000 miles.",
        "the 1 year old car has at least 10000 more miles than the car with 10000 miles.",
        "the 1 year old car has at least 10000 less miles than the car with 10000 miles.",
        "the 1 year old car has some more miles than the car with 10000 miles.",
        "the 1 year old car is not the red car.",
        "the 1 year old car is the red car or the orange car.",
        "the 1 year old car is not Aaron's car.",
        "the 1 year old car is Aaron's car or Abby's car.",
        "the 1 year old car is not the Ford.",
        "the 1 year old car is the Ford or the BMW.",
        "the car with 10000 miles is not the 1 year old car.",
        "the car with 10000 miles is the 1 year old car or the 2 year old car.",
        "the car with 10000 miles is at least 1 years older than the 1 year old car.",
        "the car with 10000 miles is at least 1 years younger than the 1 year old car.",
        "the car with 10000 miles is some years older than the 1 year old car.",
        "the car with 10000 miles is not the red car.",
        "the car with 10000 miles is the red car or the orange car.",
        "the car with 10000 miles is not Aaron's car.",
        "the car with 10000 miles is Aaron's car or Abby's car.",
        "the car with 10000 miles is not the Ford.",
        "the car with 10000 miles is the Ford or the BMW.",
        "the red car is not the 1 year old car.",
        "the red car is the 1 year old car or the 2 year old car.",
        "the red car is at least 1 years older than the 1 year old car.",
        "the red car is at least 1 years younger than the 1 year old car.",
        "the red car is some years older than the 1 year old car.",
        "the red car is not the car with 10000 miles.",
        "the red car is the car with 10000 miles or the car with 20000 miles.",
        "the red car has at least 10000 more miles than the car with 10000 miles.",
        "the red car has at least 10000 less miles than the car with 10000 miles.",
        "the red car has some more miles than the car with 10000 miles.",
        "the red car is not Aaron's car.",
        "the red car is Aaron's car or Abby's car.",
        "the red car is not the Ford.",
        "the red car is the Ford or the BMW.",
        "Aaron's car is not the 1 year old car.",
        "Aaron's car is the 1 year old car or the 2 year old car.",
        "Aaron's car is at least 1 years older than the 1 year old car.",
        "Aaron's car is at least 1 years younger than the 1 year old car.",
        "Aaron's car is some years older than the 1 year old car.",
        "Aaron's car is not the car with 10000 miles.",
        "Aaron's car is the car with 10000 miles or the car with 20000 miles.",
        "Aaron's car has at least 10000 more miles than the car with 10000 miles.",
        "Aaron's car has at least 10000 less miles than the car with 10000 miles.",
        "Aaron's car has some more miles than the car with 10000 miles.",
        "Aaron's car is not the red car.",
        "Aaron's car is the red car or the orange car.",
        "Aaron's car is not the Ford.",
        "Aaron's car is the Ford or the BMW.",
        "the Ford is not the 1 year old car.",
        "the Ford is the 1 year old car or the 2 year old car.",
        "the Ford is at least 1 years older than the 1 year old car.",
        "the Ford is at least 1 years younger than the 1 year old car.",
        "the Ford is some years older than the 1 year old car.",
        "the Ford is not the car with 10000 miles.",
        "the Ford is the car with 10000 miles or the car with 20000 miles.",
        "the Ford has at least 10000 more miles than the car with 10000 miles.",
        "the Ford has at least 10000 less miles than the car with 10000 miles.",
        "the Ford has some more miles than the car with 10000 miles.",
        "the Ford is not the red car.",
        "the Ford is the red car or the orange car.",
        "the Ford is not Aaron's car.",
        "the Ford is Aaron's car or Abby's car.",
        "the person who swam in lane 1 is not the person wearing red goggles.",
        "the person who swam in lane 1 is the person wearing red goggles or the person wearing orange goggles.",
        "the person who swam in lane 1 is not Aaron.",
        "the person who swam in lane 1 is Aaron or Abby.",
        "the person who swam in lane 1 is not the person who swam fly.",
        "the person who swam in lane 1 is the person who swam fly or the person who swam back.",
        "the person wearing red goggles is not the person who swam in lane 1.",
        "the person wearing red goggles is the person who swam in lane 1 or the person who swam in lane 2.",
        "the person wearing red goggles was at least 1 lane numbers higher than the person who swam in lane 1.",
        "the person wearing red goggles was at least 1 lane numbers lower than the person who swam in lane 1.",
        "the person wearing red goggles was some lane numbers higher than the person who swam in lane 1.",
        "the person wearing red goggles is not Aaron.",
        "the person wearing red goggles is Aaron or Abby.",
        "the person wearing red goggles is not the person who swam fly.",
        "the person wearing red goggles is the person who swam fly or the person who swam back.",
        "Aaron is not the person who swam in lane 1.",
        "Aaron is the person who swam in lane 1 or the person who swam in lane 2.",
        "Aaron was at least 1 lane numbers higher than the person who swam in lane 1.",
        "Aaron was at least 1 lane numbers lower than the person who swam in lane 1.",
        "Aaron was some lane numbers higher than the person who swam in lane 1.",
        "Aaron is not the person wearing red goggles.",
        "Aaron is the person wearing red goggles or the person wearing orange goggles.",
        "Aaron is not the person who swam fly.",
        "Aaron is the person who swam fly or the person who swam back.",
        "the person who swam fly is not the person who swam in lane 1.",
        "the person who swam fly is the person who swam in lane 1 or the person who swam in lane 2.",
        "the person who swam fly was at least 1 lane numbers higher than the person who swam in lane 1.",
        "the person who swam fly was at least 1 lane numbers lower than the person who swam in lane 1.",
        "the person who swam fly was some lane numbers higher than the person who swam in lane 1.",
        "the person who swam fly is not the person wearing red goggles.",
        "the person who swam fly is the person wearing red goggles or the person wearing orange goggles.",
        "the person who swam fly is not Aaron.",
        "the person who swam fly is Aaron or Abby.",
        "the person whose grade was 100 is not the person using red ink.",
        "the person whose grade was 100 is the person using red ink or the person using orange ink.",
        "the person whose grade was 100 is not Aaron.",
        "the person whose grade was 100 is Aaron or Abby.",
        "the person whose grade was 100 is not the person who wrote about dogs.",
        "the person whose grade was 100 is the person who wrote about dogs or the person who wrote about bats.",
        "the person using red ink is not the person whose grade was 100.",
        "the person using red ink is the person whose grade was 100 or the person whose grade was 95.",
        "the person using red ink scored at least 100 points higher than the person whose grade was 100.",
        "the person using red ink scored at least 100 points lower than the person whose grade was 100.",
        "the person using red ink scored some points higher than the person whose grade was 100.",
        "the person using red ink is not Aaron.",
        "the person using red ink is Aaron or Abby.",
        "the person using red ink is not the person who wrote about dogs.",
        "the person using red ink is the person who wrote about dogs or the person who wrote about bats.",
        "Aaron is not the person whose grade was 100.",
        "Aaron is the person whose grade was 100 or the person whose grade was 95.",
        "Aaron scored at least 100 points higher than the person whose grade was 100.",
        "Aaron scored at least 100 points lower than the person whose grade was 100.",
        "Aaron scored some points higher than the person whose grade was 100.",
        "Aaron is not the person using red ink.",
        "Aaron is the person using red ink or the person using orange ink.",
        "Aaron is not the person who wrote about dogs.",
        "Aaron is the person who wrote about dogs or the person who wrote about bats.",
        "the person who wrote about dogs is not the person whose grade was 100.",
        "the person who wrote about dogs is the person whose grade was 100 or the person whose grade was 95.",
        "the person who wrote about dogs scored at least 100 points higher than the person whose grade was 100.",
        "the person who wrote about dogs scored at least 100 points lower than the person whose grade was 100.",
        "the person who wrote about dogs scored some points higher than the person whose grade was 100.",
        "the person who wrote about dogs is not the person using red ink.",
        "the person who wrote about dogs is the person using red ink or the person using orange ink.",
        "the person who wrote about dogs is not Aaron.",
        "the person who wrote about dogs is Aaron or Abby.",
        "the person who ate 1 s'mores is not the person with the red sleeping bag.",
        "the person who ate 1 s'mores is the person with the red sleeping bag or the person with the orange sleeping bag.",
        "the person who ate 1 s'mores is not Aaron.",
        "the person who ate 1 s'mores is Aaron or Abby.",
        "the person who ate 1 s'mores is not the person who spotted Orion.",
        "the person who ate 1 s'mores is the person who spotted Orion or the person who spotted Gemini.",
        "the person with the red sleeping bag is not the person who ate 1 s'mores.",
        "the person with the red sleeping bag is the person who ate 1 s'mores or the person who ate 2 s'mores.",
        "the person with the red sleeping bag ate at least 1 more s'mores than the person who ate 1 s'mores.",
        "the person with the red sleeping bag ate at least 1 less s'mores than the person who ate 1 s'mores.",
        "the person with the red sleeping bag ate some more s'mores than the person who ate 1 s'mores.",
        "the person with the red sleeping bag is not Aaron.",
        "the person with the red sleeping bag is Aaron or Abby.",
        "the person with the red sleeping bag is not the person who spotted Orion.",
        "the person with the red sleeping bag is the person who spotted Orion or the person who spotted Gemini.",
        "Aaron is not the person who ate 1 s'mores.",
        "Aaron is the person who ate 1 s'mores or the person who ate 2 s'mores.",
        "Aaron ate at least 1 more s'mores than the person who ate 1 s'mores.",
        "Aaron ate at least 1 less s'mores than the person who ate 1 s'mores.",
        "Aaron ate some more s'mores than the person who ate 1 s'mores.",
        "Aaron is not the person with the red sleeping bag.",
        "Aaron is the person with the red sleeping bag or the person with the orange sleeping bag.",
        "Aaron is not the person who spotted Orion.",
        "Aaron is the person who spotted Orion or the person who spotted Gemini.",
        "the person who spotted Orion is not the person who ate 1 s'mores.",
        "the person who spotted Orion is the person who ate 1 s'mores or the person who ate 2 s'mores.",
        "the person who spotted Orion ate at least 1 more s'mores than the person who ate 1 s'mores.",
        "the person who spotted Orion ate at least 1 less s'mores than the person who ate 1 s'mores.",
        "the person who spotted Orion ate some more s'mores than the person who ate 1 s'mores.",
        "the person who spotted Orion is not the person with the red sleeping bag.",
        "the person who spotted Orion is the person with the red sleeping bag or the person with the orange sleeping bag.",
        "the person who spotted Orion is not Aaron.",
        "the person who spotted Orion is Aaron or Abby.",
        "the person who hiked 1 miles is not the person who gained 100 feet in elevation.",
        "the person who hiked 1 miles is the person who gained 100 feet in elevation or the person who gained 200 feet in elevation.",
        "the person who hiked 1 miles gained at least 100 more feet than the person who gained 100 feet in elevation.",
        "the person who hiked 1 miles gained at least 100 less feet than the person who gained 100 feet in elevation.",
        "the person who hiked 1 miles gained some more feet than the person who gained 100 feet in elevation.",
        "the person who hiked 1 miles is not the person who hiked to the lake.",
        "the person who hiked 1 miles is the person who hiked to the lake or the person who hiked to the river.",
        "the person who hiked 1 miles is not Aaron.",
        "the person who hiked 1 miles is Aaron or Abby.",
        "the person who hiked 1 miles is not the person with the hat.",
        "the person who hiked 1 miles is the person with the hat or the person with the bottle.",
        "the person who gained 100 feet in elevation is not the person who hiked 1 miles.",
        "the person who gained 100 feet in elevation is the person who hiked 1 miles or the person who hiked 2 miles.",
        "the person who gained 100 feet in elevation hiked at least 1 more miles than the person who hiked 1 miles.",
        "the person who gained 100 feet in elevation hiked at least 1 less miles than the person who hiked 1 miles.",
        "the person who gained 100 feet in elevation hiked some more miles than the person who hiked 1 miles.",
        "the person who gained 100 feet in elevation is not the person who hiked to the lake.",
        "the person who gained 100 feet in elevation is the person who hiked to the lake or the person who hiked to the river.",
        "the person who gained 100 feet in elevation is not Aaron.",
        "the person who gained 100 feet in elevation is Aaron or Abby.",
        "the person who gained 100 feet in elevation is not the person with the hat.",
        "the person who gained 100 feet in elevation is the person with the hat or the person with the bottle.",
        "the person who hiked to the lake is not the person who hiked 1 miles.",
        "the person who hiked to the lake is the person who hiked 1 miles or the person who hiked 2 miles.",
        "the person who hiked to the lake hiked at least 1 more miles than the person who hiked 1 miles.",
        "the person who hiked to the lake hiked at least 1 less miles than the person who hiked 1 miles.",
        "the person who hiked to the lake hiked some more miles than the person who hiked 1 miles.",
        "the person who hiked to the lake is not the person who gained 100 feet in elevation.",
        "the person who hiked to the lake is the person who gained 100 feet in elevation or the person who gained 200 feet in elevation.",
        "the person who hiked to the lake gained at least 100 more feet than the person who gained 100 feet in elevation.",
        "the person who hiked to the lake gained at least 100 less feet than the person who gained 100 feet in elevation.",
        "the person who hiked to the lake gained some more feet than the person who gained 100 feet in elevation.",
        "the person who hiked to the lake is not Aaron.",
        "the person who hiked to the lake is Aaron or Abby.",
        "the person who hiked to the lake is not the person with the hat.",
        "the person who hiked to the lake is the person with the hat or the person with the bottle.",
        "Aaron is not the person who hiked 1 miles.",
        "Aaron is the person who hiked 1 miles or the person who hiked 2 miles.",
        "Aaron hiked at least 1 more miles than the person who hiked 1 miles.",
        "Aaron hiked at least 1 less miles than the person who hiked 1 miles.",
        "Aaron hiked some more miles than the person who hiked 1 miles.",
        "Aaron is not the person who gained 100 feet in elevation.",
        "Aaron is the person who gained 100 feet in elevation or the person who gained 200 feet in elevation.",
        "Aaron gained at least 100 more feet than the person who gained 100 feet in elevation.",
        "Aaron gained at least 100 less feet than the person who gained 100 feet in elevation.",
        "Aaron gained some more feet than the person who gained 100 feet in elevation.",
        "Aaron is not the person who hiked to the lake.",
        "Aaron is the person who hiked to the lake or the person who hiked to the river.",
        "Aaron is not the person with the hat.",
        "Aaron is the person with the hat or the person with the bottle.",
        "the person with the hat is not the person who hiked 1 miles.",
        "the person with the hat is the person who hiked 1 miles or the person who hiked 2 miles.",
        "the person with the hat hiked at least 1 more miles than the person who hiked 1 miles.",
        "the person with the hat hiked at least 1 less miles than the person who hiked 1 miles.",
        "the person with the hat hiked some more miles than the person who hiked 1 miles.",
        "the person with the hat is not the person who gained 100 feet in elevation.",
        "the person with the hat is the person who gained 100 feet in elevation or the person who gained 200 feet in elevation.",
        "the person with the hat gained at least 100 more feet than the person who gained 100 feet in elevation.",
        "the person with the hat gained at least 100 less feet than the person who gained 100 feet in elevation.",
        "the person with the hat gained some more feet than the person who gained 100 feet in elevation.",
        "the person with the hat is not the person who hiked to the lake.",
        "the person with the hat is the person who hiked to the lake or the person who hiked to the river.",
        "the person with the hat is not Aaron.",
        "the person with the hat is Aaron or Abby.",
        "the person who finished in 1 hours is not the person who did the 100 piece puzzle.",
        "the person who finished in 1 hours is the person who did the 100 piece puzzle or the person who did the 200 piece puzzle.",
        "the person who finished in 1 hours assembled at least 100 more pieces than the person who did the 100 piece puzzle.",
        "the person who finished in 1 hours assembled at least 100 less pieces than the person who did the 100 piece puzzle.",
        "the person who finished in 1 hours assembled some more pieces than the person who did the 100 piece puzzle.",
        "the person who finished in 1 hours is not Aaron.",
        "the person who finished in 1 hours is Aaron or Abby.",
        "the person who finished in 1 hours is not the person who did a puzzle of cats.",
        "the person who finished in 1 hours is the person who did a puzzle of cats or the person who did a puzzle of dogs.",
        "the person who did the 100 piece puzzle is not the person who finished in 1 hours.",
        "the person who did the 100 piece puzzle is the person who finished in 1 hours or the person who finished in 2 hours.",
        "the person who did the 100 piece puzzle took at least 1 more hours than the person who finished in 1 hours.",
        "the person who did the 100 piece puzzle took at least 1 less hours than the person who finished in 1 hours.",
        "the person who did the 100 piece puzzle took some more hours than the person who finished in 1 hours.",
        "the person who did the 100 piece puzzle is not Aaron.",
        "the person who did the 100 piece puzzle is Aaron or Abby.",
        "the person who did the 100 piece puzzle is not the person who did a puzzle of cats.",
        "the person who did the 100 piece puzzle is the person who did a puzzle of cats or the person who did a puzzle of dogs.",
        "Aaron is not the person who finished in 1 hours.",
        "Aaron is the person who finished in 1 hours or the person who finished in 2 hours.",
        "Aaron took at least 1 more hours than the person who finished in 1 hours.",
        "Aaron took at least 1 less hours than the person who finished in 1 hours.",
        "Aaron took some more hours than the person who finished in 1 hours.",
        "Aaron is not the person who did the 100 piece puzzle.",
        "Aaron is the person who did the 100 piece puzzle or the person who did the 200 piece puzzle.",
        "Aaron assembled at least 100 more pieces than the person who did the 100 piece puzzle.",
        "Aaron assembled at least 100 less pieces than the person who did the 100 piece puzzle.",
        "Aaron assembled some more pieces than the person who did the 100 piece puzzle.",
        "Aaron is not the person who did a puzzle of cats.",
        "Aaron is the person who did a puzzle of cats or the person who did a puzzle of dogs.",
        "the person who did a puzzle of cats is not the person who finished in 1 hours.",
        "the person who did a puzzle of cats is the person who finished in 1 hours or the person who finished in 2 hours.",
        "the person who did a puzzle of cats took at least 1 more hours than the person who finished in 1 hours.",
        "the person who did a puzzle of cats took at least 1 less hours than the person who finished in 1 hours.",
        "the person who did a puzzle of cats took some more hours than the person who finished in 1 hours.",
        "the person who did a puzzle of cats is not the person who did the 100 piece puzzle.",
        "the person who did a puzzle of cats is the person who did the 100 piece puzzle or the person who did the 200 piece puzzle.",
        "the person who did a puzzle of cats assembled at least 100 more pieces than the person who did the 100 piece puzzle.",
        "the person who did a puzzle of cats assembled at least 100 less pieces than the person who did the 100 piece puzzle.",
        "the person who did a puzzle of cats assembled some more pieces than the person who did the 100 piece puzzle.",
        "the person who did a puzzle of cats is not Aaron.",
        "the person who did a puzzle of cats is Aaron or Abby.",
        "the house with 1 trees is not Aaron's house.",
        "the house with 1 trees is Aaron's house or Abby's house.",
        "the house with 1 trees is not the red house.",
        "the house with 1 trees is the red house or the orange house.",
        "the house with 1 trees is not the house with the swing.",
        "the house with 1 trees is the house with the swing or the house with the dog.",
        "Aaron's house is not the house with 1 trees.",
        "Aaron's house is the house with 1 trees or the house with 2 trees.",
        "Aaron's house has at least 1 more trees than the house with 1 trees.",
        "Aaron's house has at least 1 less trees than the house with 1 trees.",
        "Aaron's house has some more trees than the house with 1 trees.",
        "Aaron's house is not the red house.",
        "Aaron's house is the red house or the orange house.",
        "Aaron's house is not the house with the swing.",
        "Aaron's house is the house with the swing or the house with the dog.",
        "the red house is not the house with 1 trees.",
        "the red house is the house with 1 trees or the house with 2 trees.",
        "the red house has at least 1 more trees than the house with 1 trees.",
        "the red house has at least 1 less trees than the house with 1 trees.",
        "the red house has some more trees than the house with 1 trees.",
        "the red house is not Aaron's house.",
        "the red house is Aaron's house or Abby's house.",
        "the red house is not the house with the swing.",
        "the red house is the house with the swing or the house with the dog.",
        "the house with the swing is not the house with 1 trees.",
        "the house with the swing is the house with 1 trees or the house with 2 trees.",
        "the house with the swing has at least 1 more trees than the house with 1 trees.",
        "the house with the swing has at least 1 less trees than the house with 1 trees.",
        "the house with the swing has some more trees than the house with 1 trees.",
        "the house with the swing is not Aaron's house.",
        "the house with the swing is Aaron's house or Abby's house.",
        "the house with the swing is not the red house.",
        "the house with the swing is the red house or the orange house.",
        "the person who snacks at 1 o'clock is not the person who takes 10 minutes.",
        "the person who snacks at 1 o'clock is the person who takes 10 minutes or the person who takes 15 minutes.",
        "the person who snacks at 1 o'clock takes at least 10 minutes more than the person who takes 10 minutes.",
        "the person who snacks at 1 o'clock takes at least 10 minutes less than the person who takes 10 minutes.",
        "the person who snacks at 1 o'clock takes some minutes more than the person who takes 10 minutes.",
        "the person who snacks at 1 o'clock is not Aaron.",
        "the person who snacks at 1 o'clock is Aaron or Abby.",
        "the person who snacks at 1 o'clock is not the person with the red cup.",
        "the person who snacks at 1 o'clock is the person with the red cup or the person with the orange cup.",
        "the person who snacks at 1 o'clock is not the person who drinks tea.",
        "the person who snacks at 1 o'clock is the person who drinks tea or the person who drinks coffee.",
        "the person who snacks at 1 o'clock is not the person who eats the apple.",
        "the person who snacks at 1 o'clock is the person who eats the apple or the person who eats the cookie.",
        "the person who takes 10 minutes is not the person who snacks at 1 o'clock.",
        "the person who takes 10 minutes is the person who snacks at 1 o'clock or the person who snacks at 2 o'clock.",
        "the person who takes 10 minutes snacks at least 1 hours earlier than the person who snacks at 1 o'clock.",
        "the person who takes 10 minutes snacks at least 1 hours later than the person who snacks at 1 o'clock.",
        "the person who takes 10 minutes snacks some hours earlier than the person who snacks at 1 o'clock.",
        "the person who takes 10 minutes is not Aaron.",
        "the person who takes 10 minutes is Aaron or Abby.",
        "the person who takes 10 minutes is not the person with the red cup.",
        "the person who takes 10 minutes is the person with the red cup or the person with the orange cup.",
        "the person who takes 10 minutes is not the person who drinks tea.",
        "the person who takes 10 minutes is the person who drinks tea or the person who drinks coffee.",
        "the person who takes 10 minutes is not the person who eats the apple.",
        "the person who takes 10 minutes is the person who eats the apple or the person who eats the cookie.",
        "Aaron is not the person who snacks at 1 o'clock.",
        "Aaron is the person who snacks at 1 o'clock or the person who snacks at 2 o'clock.",
        "Aaron snacks at least 1 hours earlier than the person who snacks at 1 o'clock.",
        "Aaron snacks at least 1 hours later than the person who snacks at 1 o'clock.",
        "Aaron snacks some hours earlier than the person who snacks at 1 o'clock.",
        "Aaron is not the person who takes 10 minutes.",
        "Aaron is the person who takes 10 minutes or the person who takes 15 minutes.",
        "Aaron takes at least 10 minutes more than the person who takes 10 minutes.",
        "Aaron takes at least 10 minutes less than the person who takes 10 minutes.",
        "Aaron takes some minutes more than the person who takes 10 minutes.",
        "Aaron is not the person with the red cup.",
        "Aaron is the person with the red cup or the person with the orange cup.",
        "Aaron is not the person who drinks tea.",
        "Aaron is the person who drinks tea or the person who drinks coffee.",
        "Aaron is not the person who eats the apple.",
        "Aaron is the person who eats the apple or the person who eats the cookie.",
        "the person with the red cup is not the person who snacks at 1 o'clock.",
        "the person with the red cup is the person who snacks at 1 o'clock or the person who snacks at 2 o'clock.",
        "the person with the red cup snacks at least 1 hours earlier than the person who snacks at 1 o'clock.",
        "the person with the red cup snacks at least 1 hours later than the person who snacks at 1 o'clock.",
        "the person with the red cup snacks some hours earlier than the person who snacks at 1 o'clock.",
        "the person with the red cup is not the person who takes 10 minutes.",
        "the person with the red cup is the person who takes 10 minutes or the person who takes 15 minutes.",
        "the person with the red cup takes at least 10 minutes more than the person who takes 10 minutes.",
        "the person with the red cup takes at least 10 minutes less than the person who takes 10 minutes.",
        "the person with the red cup takes some minutes more than the person who takes 10 minutes.",
        "the person with the red cup is not Aaron.",
        "the person with the red cup is Aaron or Abby.",
        "the person with the red cup is not the person who drinks tea.",
        "the person with the red cup is the person who drinks tea or the person who drinks coffee.",
        "the person with the red cup is not the person who eats the apple.",
        "the person with the red cup is the person who eats the apple or the person who eats the cookie.",
        "the person who drinks tea is not the person who snacks at 1 o'clock.",
        "the person who drinks tea is the person who snacks at 1 o'clock or the person who snacks at 2 o'clock.",
        "the person who drinks tea snacks at least 1 hours earlier than the person who snacks at 1 o'clock.",
        "the person who drinks tea snacks at least 1 hours later than the person who snacks at 1 o'clock.",
        "the person who drinks tea snacks some hours earlier than the person who snacks at 1 o'clock.",
        "the person who drinks tea is not the person who takes 10 minutes.",
        "the person who drinks tea is the person who takes 10 minutes or the person who takes 15 minutes.",
        "the person who drinks tea takes at least 10 minutes more than the person who takes 10 minutes.",
        "the person who drinks tea takes at least 10 minutes less than the person who takes 10 minutes.",
        "the person who drinks tea takes some minutes more than the person who takes 10 minutes.",
        "the person who drinks tea is not Aaron.",
        "the person who drinks tea is Aaron or Abby.",
        "the person who drinks tea is not the person with the red cup.",
        "the person who drinks tea is the person with the red cup or the person with the orange cup.",
        "the person who drinks tea is not the person who eats the apple.",
        "the person who drinks tea is the person who eats the apple or the person who eats the cookie.",
        "the person who eats the apple is not the person who snacks at 1 o'clock.",
        "the person who eats the apple is the person who snacks at 1 o'clock or the person who snacks at 2 o'clock.",
        "the person who eats the apple snacks at least 1 hours earlier than the person who snacks at 1 o'clock.",
        "the person who eats the apple snacks at least 1 hours later than the person who snacks at 1 o'clock.",
        "the person who eats the apple snacks some hours earlier than the person who snacks at 1 o'clock.",
        "the person who eats the apple is not the person who takes 10 minutes.",
        "the person who eats the apple is the person who takes 10 minutes or the person who takes 15 minutes.",
        "the person who eats the apple takes at least 10 minutes more than the person who takes 10 minutes.",
        "the person who eats the apple takes at least 10 minutes less than the person who takes 10 minutes.",
        "the person who eats the apple takes some minutes more than the person who takes 10 minutes.",
        "the person who eats the apple is not Aaron.",
        "the person who eats the apple is Aaron or Abby.",
        "the person who eats the apple is not the person with the red cup.",
        "the person who eats the apple is the person with the red cup or the person with the orange cup.",
        "the person who eats the apple is not the person who drinks tea.",
        "the person who eats the apple is the person who drinks tea or the person who drinks coffee.",
      ]
    `);
  });
});
