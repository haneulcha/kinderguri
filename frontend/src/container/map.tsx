import React from "react";
import { gql, useQuery } from "@apollo/client";
import { RouteComponentProps } from "@reach/router";

const GET_COORDS = gql`
  query GetCoords {
    coord @client
  }
`;

interface MapProps extends RouteComponentProps {}

const Map: React.FC<MapProps> = () => {
  const { data, loading, error } = useQuery(GET_COORDS);

  if (loading) return <p>LOADING</p>;
  if (error) return <p>ERROR: {error.message}</p>;
  if (data) {
    console.log("coord", data);
  }
  return <h1>map</h1>;
};

export default Map;
