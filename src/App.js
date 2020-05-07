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
      <div className="div1">
        <h4>경기도 구리시 소재</h4>
        <h2>유치원·어린이집 👶🧒👦</h2>
      </div>

      <Search setList={setList} setMapMarking={setMapMarking} />
      <List list={list} markingFn={setMapMarking} />
      <Map list={list} markerId={mapMarking} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
