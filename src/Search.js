import React, { useState, useEffect } from "react";

import Filter from "./Filter";

const Search = () => {
  const [institute, setInstitute] = useState("");
  const [options, setOptions] = useState([]);
  const [type, setType] = useState("");
  const [places, setPlaces] = useState([]);

  const childHouseType = ["가정", "국공립", "민간", "법인·단체", "직장"];
  const kindergartenType = ["공립", "사립"];

  async function requestPlaces() {
    if (institute === "어린이집") {
      const loadedChildArray = await callApiForChild();
      setPlaces(loadedChildArray || []);
    } else if (institute === "유치원") {
      const loadedKinderArray = await callApiForKinder();
      setPlaces(loadedKinderArray || []);
    } else setPlaces([]);
  }

  const callApiForChild = () => {
    return fetch(
      "https://openapi.gg.go.kr/ChildHouse?KEY=a20828a121fc4d459618a24b3c9c3c31&Type=json&pIndex=1&pSize=200&SIGUN_NM=구리시"
    )
      .then((response) => response.json())
      .then((json) => json.ChildHouse[1].row)
      .catch((err) => console.log(err));
  };

  const callApiForKinder = () => {
    return fetch(
      "https://openapi.gg.go.kr/Kndrgrschoolstus?KEY=a20828a121fc4d459618a24b3c9c3c31&Type=json&pIndex=1&pSize=200&SIGUN_NM=구리시"
    )
      .then((response) => response.json())
      .then((json) => json.Kndrgrschoolstus[1].row)
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (institute === "어린이집") {
      setOptions(childHouseType);
    } else if (institute === "유치원") {
      setOptions(kindergartenType);
    } else {
      setOptions([]);
    }
  }, [institute]);

  return (
    <div>
      <form
        className="form-container"
        onSubmit={(e) => {
          e.preventDefault();
          requestPlaces();
        }}
      >
        <label className="form-label">
          영아/유아
          <select
            value={institute}
            onChange={(e) => setInstitute(e.target.value)}
          >
            <option>---------선택--------</option>
            <option key={"어린이집"} value="어린이집">
              어린이집
            </option>
            <option key={"유치원"} value="유치원">
              유치원
            </option>
          </select>
        </label>

        <label className="form-label">
          유형
          <select
            disabled={!options.length}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option />
            {options.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <button className="form-btn">찾기</button>
      </form>
      <Filter institute={institute} type={type} places={places} />
    </div>
  );
};

export default Search;
