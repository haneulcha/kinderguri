export const callApiForChild = async () => {
  return fetch(
    "https://openapi.gg.go.kr/ChildHouse?KEY=a20828a121fc4d459618a24b3c9c3c31&Type=json&pIndex=1&pSize=200&SIGUN_NM=구리시"
  )
    .then((response) => response.json())
    .then((json) => json.ChildHouse[1].row)
    .catch((err) => console.log(err));
};

export const callApiForKinder = async () => {
  return fetch(
    "https://openapi.gg.go.kr/Kndrgrschoolstus?KEY=a20828a121fc4d459618a24b3c9c3c31&Type=json&pIndex=1&pSize=200&SIGUN_NM=구리시"
  )
    .then((response) => response.json())
    .then((json) => json.Kndrgrschoolstus[1].row)
    .catch((err) => console.log(err));
};
