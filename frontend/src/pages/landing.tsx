import React from "react";
import { RouteComponentProps } from "@reach/router";

import { NavBar } from "../component";

interface LandingProps extends RouteComponentProps {
  children?: any;
}
const Landing: React.FC<LandingProps> = ({ children }) => {
  return <NavBar main />;
};

export default Landing;
