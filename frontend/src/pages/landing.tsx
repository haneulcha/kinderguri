import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "@reach/router";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import { NavBar } from "../component";

interface LandingProps extends RouteComponentProps {
  children?: any;
}
const Landing: React.FC<LandingProps> = ({ children }) => {
  return (
    <div>
      <NavBar main />
      {/* <header>
          <h1>Kinderguri</h1>
          <h2>구리시 소재 유치원·어린이집</h2>
        </header> */}
      {/* <Search setList={setList} />
        <List list={list} markingFn={setMapMarking} />
        <div className="contact">
          <a href="http://haneulcha.com" target="_blank">
            <ContactSupportIcon />
          </a>
        </div> */}
    </div>
  );
};

export default Landing;
