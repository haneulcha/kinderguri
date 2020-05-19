import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";

import Filter from "./Filter";
import useDropdown from "./useDropdown";

const Search = (props) => {
  const [institute, InstituteDropdown] = useDropdown("영/유아", "", [
    "어린이집",
    "유치원",
  ]);
  const [options, setOptions] = useState([]);
  const [type, SetDropdown] = useDropdown("유형", "", options);
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
    <div className="search">
      <form
        className="form-container"
        onSubmit={(e) => {
          e.preventDefault();
          requestPlaces();
        }}
      >
        <InstituteDropdown />
        <SetDropdown />
        <Button type="submit" variant="outlined" color="default">
          찾기
        </Button>
      </form>
      <Filter
        institute={institute}
        type={type}
        places={places}
        setList={props.setList}
        setMapMarking={props.setMapMarking}
      />
    </div>
  );
};

export default Search;
