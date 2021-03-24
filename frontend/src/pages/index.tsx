import React from "react";
import { Router } from "@reach/router";
import Landing from "./landing";
import ChildHouse from "./childhouse";

export const App = () => {
  return (
    <Router>
      {/* <Landing path="/" /> */}
      <ChildHouse path="childhouse" />
      {/* <Medical path="medical" />
      <Cultural path="cultural" /> */}
    </Router>
  );
};
