import React from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";
import Main from "./Main";

const App = () => {
  return (
    <Router>
      <Main path="/" />
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
