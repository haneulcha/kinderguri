import React from "react";
import Search from "./Search";
import ReactDOM from "react-dom";

const App = () => {
  return (
    <div>
      <Search />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
