import React from "react";
import { Router } from "@reach/router";
import Landing from "./landing";
import ChildHouse from "./childhouse";
import Kindergarten from "./kindergarten";

export const App = () => {
  return (
    <Router>
      {/* <Landing path="/" /> */}
      <ChildHouse path="childhouse" />
      <Kindergarten path="kindergarten" />
      {/* <Medical path="medical" />
      <Cultural path="cultural" /> */}
    </Router>
  );
};
