import React from "react";
import { Router } from "@reach/router";
import Landing from "./landing";
import ChildCare from "./childcare";

export const App = () => {
  return (
    <Router>
      {/* <Landing path="/" /> */}
      <ChildCare path="childcare" />
      {/* <Medical path="medical" />
      <Cultural path="cultural" /> */}
    </Router>
  );
};
