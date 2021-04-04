export const filterByType = (arr: any[], type: string): any => {
  if (!type.length) return arr;
  return arr.filter((item) => item.type === type);
};

export const extractTypes = (arr: any[]): any => {
  const types = arr.map((item) => item.type);
  const typesInSet = new Set([...types]);
  return Array.from(typesInSet);
};

export const findMatches = (items: any[], value: string) => {
  return items.filter((item) => {
    const regex = new RegExp(value, "gi");
    return item.name.match(regex);
  });
};
