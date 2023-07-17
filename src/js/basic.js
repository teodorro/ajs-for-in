export default function orderByProps(obj, firstProps) {
  if (obj == null) {
    throw new Error('null argument');
  }
  if (firstProps != null
    && !firstProps.every((prop) => Object.keys(obj).some((key) => prop === key))) {
    throw new Error('not existing property');
  }
  const allPairs = [];
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      allPairs.push({
        key: prop,
        value: obj[prop],
      });
    }
  }
  if (firstProps == null) {
    return allPairs;
  }
  const firstPairs = Array.from(
    firstProps
      .filter((prop) => firstProps.some((firstProp) => firstProp === prop))
      .map((prop) => ({
        key: prop,
        value: obj[prop],
      })),
  );
  const pairs = [];
  firstPairs.forEach((pair) => pairs.push(pair));
  allPairs.filter((pair) => !firstProps.some((prop) => pair.key === prop))
    .forEach((pair) => pairs.push(pair));
  return pairs;
}
