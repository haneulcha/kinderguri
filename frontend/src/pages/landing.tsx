import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { RouteComponentProps } from "@reach/router";
import { NavBar } from "../component";
import { homeCoordVar } from "../cache";
import { setInLS } from "../util";

const GET_HOME = gql`
  query GetHome {
    homeCoord @client
  }
`;

interface LandingProps extends RouteComponentProps {
  children?: any;
}
const Landing: React.FC<LandingProps> = ({ children }) => {
  const { data: myhome } = useQuery(GET_HOME);
  useEffect(() => {
    if (myhome.homeCoord) return;
    if (navigator.geolocation) {
      const error = () => {
        console.log("no coords");
      };
      const success = (position: any) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;

        homeCoordVar({ lat, long });
        setInLS("home", { lat, long });
      };
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, []);
  return (
    <>
      <NavBar main />
      <p>Tip🏡! 오른쪽 버튼을 클릭하면 내 위치(집)을 설정할 수 있습니다.</p>
    </>
  );
};

export default Landing;
