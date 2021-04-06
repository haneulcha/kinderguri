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

export const setInLS = (key: string, value: any) => {
  const stringified = JSON.stringify(value);
  localStorage.setItem(key, stringified);
  console.log(stringified);
};

export const getFromLS = (key: string) => {
  const value = localStorage.getItem(key) || "";
  return JSON.parse(value);
};
