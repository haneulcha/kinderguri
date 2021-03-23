import React, { useState, useEffect } from "react";
import Search from "../component/Search";
import Map from "../component/Map";
import List from "../component/List";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";

const Landing = () => {
  const [list, setList] = useState([]);
  const [mapMarking, setMapMarking] = useState();

  useEffect(() => {
    setMapMarking();
  }, [list]);

  return (
    <>
      <div className="content">
        <header>
          <h1>Kinderguri</h1>
          <h2>구리시 소재 유치원·어린이집</h2>
        </header>
        {/* <Search setList={setList} />
        <List list={list} markingFn={setMapMarking} />
        <div className="contact">
          <a href="http://haneulcha.com" target="_blank">
            <ContactSupportIcon />
          </a>
        </div> */}
      </div>
      {/* <Map list={list} markerId={mapMarking} /> */}
    </>
  );
};

export default Landing;
