import React, { useState } from "react";
import Search from "./Search";
import Map from "./Map";
import List from "./List";
import Scroll from "./Scroll";

const Main = () => {
  const [list, setList] = useState([]);
  const [mapMarking, setMapMarking] = useState();

  return (
    <div className="parent">
      <div className="header">
        <div className="header-text">
          <h1>경기도 구리시 유치원·어린이집</h1>
        </div>
      </div>
      <Search setList={setList} setMapMarking={setMapMarking} />
      <List list={list} markingFn={setMapMarking} />
      <Map list={list} markerId={mapMarking} />

      <Scroll />
    </div>
  );
};

export default Main;
