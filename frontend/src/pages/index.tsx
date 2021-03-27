import React from "react";
import { Router } from "@reach/router";
import Landing from "./landing";
import ChildHouse from "./childhouse";
import Kindergarten from "./kindergarten";
import Cultural from "./cultural";
import Medical from "./medical";
import ChildHouseDetail from "../component/childhouse-detail";
import CulturalDetail from "../component/cultural-detail";
import MedicalDetail from "../component/medical-detail";
import KindergartenDetail from "../component/kindergarten-detail";

export const App = () => {
  return (
    <Router>
      {/* <Landing path="/" /> */}
      <ChildHouse path="childhouse">
        <ChildHouseDetail path=":childhousename" />
      </ChildHouse>
      <Kindergarten path="kindergarten">
        <KindergartenDetail path=":kindergartenname" />
      </Kindergarten>
      <Medical path="medical">
        <MedicalDetail path=":hospitalname" />
      </Medical>
      <Cultural path="cultural">
        <CulturalDetail path=":bftourname" />
      </Cultural>
    </Router>
  );
};
