import React, { useState } from "react";
import Search from "./Search";
import Map from "./Map";
import List from "./List";
// import Scroll from "./Scroll";

const Landing = () => {
  const [list, setList] = useState([]);
  const [mapMarking, setMapMarking] = useState();

  return (
    <>
    <div className="parent">
      <header>
        
          <h1>Kinderguri</h1>
          <h2>구리시 소재 유치원·어린이집</h2>
        
      </header>
      <Search setList={setList} setMapMarking={setMapMarking} />    
      
      <List list={list} markingFn={setMapMarking} />

      {/* <Scroll /> */}
    </div>
    <Map list={list} markerId={mapMarking} />
    </>
  );
};

export default Landing;
