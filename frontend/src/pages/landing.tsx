import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "@reach/router";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import { NavBar } from "../component";

interface LandingProps extends RouteComponentProps {
  children?: any;
}
const Landing: React.FC<LandingProps> = ({ children }) => {
  return (
    <>
      <NavBar main />
      {/* 
        
        <div className="contact">
          <a href="http://haneulcha.com" target="_blank">
            <ContactSupportIcon />
          </a>
        </div> */}
    </>
  );
};

export default Landing;
