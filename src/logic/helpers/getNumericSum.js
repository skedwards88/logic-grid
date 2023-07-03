export function getNumericSum(numberA, numberB) {
  // Addition that handles floating point numbers
  const decimalsA = (numberA.toString().split(".")[1] || "").length;
  const decimalsB = (numberB.toString().split(".")[1] || "").length;

  if (!decimalsA && !decimalsB) {
    // If no decimals, just do normal sum
    return numberA + numberB;
  }

  // Otherwise, multiply by powers of 10 to get rid of the decimals,
  // add, then divide by the same power of 10
  const maxDecimals = Math.max(decimalsA, decimalsB);
  return (Math.round(Math.pow(10, maxDecimals) * numberA) +
      Math.round(Math.pow(10, maxDecimals) * numberB)) /
      Math.pow(10, maxDecimals);
}