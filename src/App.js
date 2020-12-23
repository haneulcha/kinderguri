import React from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";
import Landing from './landing'

const App = () => {
  return (
    <Router>
      <Landing path="/" />
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
