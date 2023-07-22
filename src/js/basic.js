export function orderByProps(obj, firstProps) {
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
  allPairs.filter((pair) => firstProps.every((prop) => pair.key !== prop))
    .forEach((pair) => pairs.push(pair));
  return pairs;
}

export function destructureSpecial(obj) {
  if (obj == null) {
    throw new Error('null argument');
  }
  const { special, ...rest } = obj;
  if (special == null) {
    throw new Error('no "special" prop');
  }
  console.log(rest);
  const mappedSpecial = [];

  special.forEach((element) => {
    const {
      id, name, icon, description = 'Описание недоступно',
    } = element;
    mappedSpecial.push({
      id, name, icon, description,
    });
  });
  return mappedSpecial;
}
