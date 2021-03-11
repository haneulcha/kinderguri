import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import {filterForChild, filterForKinder} from "../util/filter";
import useDropdown from "../util/useDropdown";
import { callApiForChild, callApiForKinder } from "../util/fetch";

const Search = ({ setList }) => {
  const [institute, InstituteDropdown] = useDropdown("영/유아", "", [
    "어린이집",
    "유치원",
  ]);
  const [options, setOptions] = useState([]);
  const [type, TypeDropdown] = useDropdown("유형", "", options);
 
  const childHouseType = ["가정", "국공립", "민간", "법인·단체", "직장"];
  const kindergartenType = ["공립", "사립"];

  async function requestPlaces(institute) {
    if (institute === "어린이집") {
      const loadedChild = await callApiForChild();      
      const final = filterForChild(loadedChild, type)      
      setList(final)      

    } else if (institute === "유치원") {
      const loadedKinder = await callApiForKinder();
      const final = filterForKinder(loadedKinder, type)
      setList(final)      

    } else setList([]);
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
          requestPlaces(institute);
        }}
      >
        <InstituteDropdown />
        <TypeDropdown />
        <Button type="submit" variant="outlined" color="default" size="small">
          찾기
        </Button>
      </form>
      
    </section>
  );
};

export default Search;
