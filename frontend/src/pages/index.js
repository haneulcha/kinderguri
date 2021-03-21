import React from "react";
import { Router } from "@reach/router";
import "./style.css";
import Landing from "./landing";

export const App = () => {
  return (
    <Router>
      <Landing path="/" />
    </Router>
  );
};
