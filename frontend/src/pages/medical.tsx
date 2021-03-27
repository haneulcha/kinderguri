import React, { Fragment, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { RouteComponentProps } from "@reach/router";
import DropDown from "../component/dropdown";
import SearchBar from "../component/search-bar";
import ListItem from "../component/list-item";

const GET_HOPITAL_AT_NIGHT = gql`
  query GetHospitalAtNightList {
    hospitalsAtNight {
      name
      type
      tel
    }
  }
`;

interface MedicalProps extends RouteComponentProps {}

const Medical: React.FC<MedicalProps> = ({ children }) => {
  const { loading: loadingHaN, data: dataHaN, error: errorHaN } = useQuery(
    GET_HOPITAL_AT_NIGHT
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

  if (loadingHaN) return <p>Loading</p>;
  if (errorHaN) return <p>ERROR</p>;
  if (!dataHaN) return <p>Not found</p>;

  return (
    <>
      <h1>구리 인근 소아 야간진료 병원</h1>
      <SearchBar>
        <DropDown
          name="소아 야간진료 병원"
          list={!loadingHaN && extractType(dataHaN.hospitalsAtNight)}
          setOption={setType}
        />
      </SearchBar>
      {dataHaN.hospitalsAtNight &&
        filterList(
          dataHaN.hospitalsAtNight,
          type
        ).map((item: any, i: number) => (
          <ListItem item={item} key={`list-${i}`} />
        ))}
      {children}
    </>
  );
};

export default Medical;
