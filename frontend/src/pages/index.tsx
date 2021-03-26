import React from "react";
import { Router } from "@reach/router";
import Landing from "./landing";
import ChildHouse from "./childhouse";
import Kindergarten from "./kindergarten";
import Cultural from "./cultural";
import Medical from "./medical";
import ChildHouseDetail from "../component/childhouse-detail";

export const App = () => {
  return (
    <Router>
      {/* <Landing path="/" /> */}
      <ChildHouse path="childhouse">
        <ChildHouseDetail path=":childhousename" />
      </ChildHouse>
      <Kindergarten path="kindergarten" />
      <Medical path="medical" />
      <Cultural path="cultural" />
    </Router>
  );
};
