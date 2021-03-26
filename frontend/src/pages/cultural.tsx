import React, { Fragment, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { RouteComponentProps } from "@reach/router";
import DropDown from "../component/dropdown";
import SearchBar from "../component/search-bar";

const GET_BARREIRFREE = gql`
  query GetBarrierFreeList {
    barrierFreeTour {
      name
      type
      tel
    }
  }
`;

interface CulturalProps extends RouteComponentProps {}

const Cultural: React.FC<CulturalProps> = () => {
  const { loading: loadingBf, data: dataBf, error: errorBf } = useQuery(
    GET_BARREIRFREE
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

  if (loadingBf) return <p>Loading</p>;
  if (errorBf) return <p>ERROR</p>;
  if (!dataBf) return <p>Not found</p>;

  return (
    <>
      <h1>구리 인근 무장애 여행</h1>
      <SearchBar>
        <DropDown
          name="무장애 여행"
          list={!loadingBf && extractType(dataBf.barrierFreeTour)}
          setOption={setType}
        />
      </SearchBar>
      {dataBf.barrierFreeTour &&
        filterList(dataBf.barrierFreeTour, type).map((tour: any, i: number) => (
          <Fragment key={`list-${i}`}>
            <h2>{tour.name}</h2>
            <p>{tour.type}</p>
            <p>{tour.tel}</p>
          </Fragment>
        ))}
    </>
  );
};

export default Cultural;
