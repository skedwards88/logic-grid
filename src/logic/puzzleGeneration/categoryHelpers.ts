export function appendNth(number: number): string {
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

export function convertLegCountToAnimal(number: number): string {
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
      return `${number}-legged creature`;
  }
}

export function convertWheelCountToVehicle(number: number): string {
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
      return `${number}-wheeled vehicle`;
  }
}

export function basicPluralize(value: number, word: string): string {
  // adds an "s" if the value is > 1
  // Does not do more complex pluralization

  return `${word}${value > 1 ? "s" : ""}`;
}
