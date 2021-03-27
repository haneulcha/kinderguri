import React, { Fragment, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { RouteComponentProps } from "@reach/router";
import { coordVar } from "../cache";
import ListItem from "../component/list-item";
import DropDown from "../component/dropdown";
import SearchBar from "../component/search-bar";

const GET_KINDERGARTENS = gql`
  query GetKindergartenList {
    kindergartens {
      name
      type
      tel
      location
    }
  }
`;

interface KindergartenProps extends RouteComponentProps {}

const Kindergarten: React.FC<KindergartenProps> = ({ children }) => {
  const { loading: loadingAll, data: dataAll, error: errorAll } = useQuery(
    GET_KINDERGARTENS
  );
  const [type, setType] = useState<string>("");

  const filterList = (arr: any[], type: string): any => {
    if (!type.length) return arr;
    return arr.filter((item) => item.type === type);
  };

  const extractType = (arr: any[]): any => {
    const types = arr.map((item) => item.type);
    const typesInSet = new Set([...types]);
    return Array.from(typesInSet);
  };

  if (loadingAll) return <p>Loading</p>;
  if (errorAll) return <p>ERROR</p>;
  if (!dataAll) return <p>Not found</p>;

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
          <ListItem item={kg} key={`list-${i}`} />
        ))}
      {children}
    </>
  );
};

export default Kindergarten;
