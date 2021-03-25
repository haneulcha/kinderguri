import React, { Fragment, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { RouteComponentProps } from "@reach/router";
import DropDown from "../component/dropdown";
import SearchBar from "../component/search-bar";

const GET_KINDERGARTENS = gql`
  query GetKindergartenList {
    kindergartens {
      name
      type
      tel
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

const queryKindergarten = () => {
  const all = useQuery(GET_KINDERGARTENS);
  const age0 = useQuery(GET_AGE0KINDERGARTENS);

  return [all, age0];
};

interface KindergartenProps extends RouteComponentProps {}

const Kindergarten: React.FC<KindergartenProps> = () => {
  const [
    { loading: loadingAll, data: dataAll, error: errorAll },
    { loading: loadingAge0, data: dataAge0, error: errorAge0 },
  ] = queryKindergarten();
  const [type, setType] = useState<string>("");

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
      <h1>유치원</h1>
      <SearchBar>
        <DropDown
          name="유치원"
          list={!loadingAll && extractType(dataAll.kindergartens)}
          setOption={setType}
        />
      </SearchBar>
      {dataAll.kindergartens &&
        filterList(dataAll.kindergartens, type).map((kg: any, i: number) => (
          <Fragment key={`list-${i}`}>
            <h2>{kg.name}</h2>
            <p>{kg.type}</p>
            <p>{kg.tel}</p>
          </Fragment>
        ))}
    </>
  );
};

export default Kindergarten;
