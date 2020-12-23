import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import Filter from "./filter";
import useDropdown from "./useDropdown";
import { callApiForChild, callApiForKinder } from './fetch'

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
    <section className="search">
      <form        
        onSubmit={(e) => {
          e.preventDefault();
          requestPlaces();
        }}
      >
        <InstituteDropdown />
        <SetDropdown />
        <Button type="submit" variant="outlined" color="default" size="small">
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
    </section>
  );
};

export default Search;
