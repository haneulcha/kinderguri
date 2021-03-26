import React, { Fragment, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { RouteComponentProps } from "@reach/router";
import ListItem from "../component/list-item";
import DropDown from "../component/dropdown";
import SearchBar from "../component/search-bar";

const GET_CHILDHOUSES = gql`
  query GetChildHousesList {
    childHouses {
      name
      type
      tel
      location {
        lat
        long
      }
    }
  }
`;

const GET_AGE0KINDERGARTENS = gql`
  query GetAge0KindergartenList {
    age0Kindergartens {
      name
      type
      tel
    }
  }
`;

const queryChildHouses = () => {
  const all = useQuery(GET_CHILDHOUSES);
  const age0 = useQuery(GET_AGE0KINDERGARTENS);
  return [all, age0];
};

interface ChildHouseProps extends RouteComponentProps {
  children: any;
}

const ChildHouse: React.FC<ChildHouseProps> = ({ children }) => {
  const [
    { loading: loadingAll, data: dataAll, error: errorAll },
    { loading: loadingAge0, data: dataAge0, error: errorAge0 },
  ] = queryChildHouses();
  const [type, setType] = useState<string>("");

  // TODO: 함수형으로. dataAge0 제어
  const filterList = (arr: any[], type: string): any => {
    if (!type.length) return arr.concat(dataAge0.age0Kindergartens);
    if (type === "0세 전용") return dataAge0.age0Kindergartens;
    return arr.filter((item) => item.type === type);
  };

  const extractType = (arr: any[]): any => {
    const types = arr.map((item) => item.type);
    const typesInSet = new Set([...types]);
    const typesArray = Array.from(typesInSet);
    return typesArray.concat(["0세 전용"]);
  };

  if (loadingAll || loadingAge0) return <p>Loading</p>;
  if (errorAll || errorAge0) return <p>ERROR</p>;
  if (!dataAll || !dataAge0) return <p>Not found</p>;

  return (
    <>
      <h1>어린이집</h1>
      <SearchBar>
        <DropDown
          name="어린이집"
          list={!loadingAll && !loadingAge0 && extractType(dataAll.childHouses)}
          setOption={setType}
        />
      </SearchBar>
      {dataAll.childHouses &&
        filterList(dataAll.childHouses, type).map((house: any, i: number) => (
          <ListItem item={house} key={`list-${i}`} />
          // <Fragment key={`list-${i}`}>
          //   <h2>{house.name}</h2>
          //   <p>{house.type}</p>
          //   <p>{house.tel}</p>
          // </Fragment>
        ))}
      {children}
    </>
  );
};

export default ChildHouse;
