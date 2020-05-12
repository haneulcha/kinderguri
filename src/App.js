import React, { useState } from "react";
import Search from "./Search";
import Map from "./Map";
import List from "./List";
import ReactDOM from "react-dom";

const App = () => {
  const [list, setList] = useState([]);
  const [mapMarking, setMapMarking] = useState();

  return (
    <div className="parent">
      <div className="except-map">
        <div className="div1 container">
          <div className="header-text">
            <h1>경기도 구리시 유치원·어린이집</h1>
          </div>
        </div>

        <Search setList={setList} setMapMarking={setMapMarking} />
        <List list={list} markingFn={setMapMarking} />
      </div>
      <Map list={list} markerId={mapMarking} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
