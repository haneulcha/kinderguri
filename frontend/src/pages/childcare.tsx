import React, { Fragment } from "react";
import { gql, useQuery } from "@apollo/client";
import { RouteComponentProps } from "@reach/router";

const GET_CHILDCARES = gql`
  query GetChildCareList {
    childHouses {
      name
      type
      tel
    }
  }
`;

interface ChildCareProps extends RouteComponentProps {}
const ChildCare: React.FC<ChildCareProps> = () => {
  const { data, loading, error } = useQuery(GET_CHILDCARES);

  if (loading) return <p>Loading</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  return (
    <>
      <h1>보육시설</h1>
      {data.childHouses &&
        data.childHouses.map((house: any) => (
          <>
            <h2>{house.name}</h2>
            <p>{house.tel}</p>
          </>
        ))}
    </>
  );
};

export default ChildCare;
