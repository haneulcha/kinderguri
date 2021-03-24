import React, { Fragment } from "react";
import { gql, useQuery } from "@apollo/client";
import { RouteComponentProps } from "@reach/router";
import DropDown from "../component/dropdown";
import SearchBar from "../component/search-bar";

const GET_CHILDHOUSES = gql`
  query GetChildHousesList {
    childHouses {
      name
      type
      tel
    }
  }
`;

const GET_CHILDHOUSE_TYPES = gql`
  query GetChildHouseTypes {
    childHousesTypes
  }
`;

const queryChildHouses = () => {
  const list = useQuery(GET_CHILDHOUSES);
  const types = useQuery(GET_CHILDHOUSE_TYPES);

  return [list, types];
};

interface ChildHouseProps extends RouteComponentProps {}
const ChildHouse: React.FC<ChildHouseProps> = () => {
  const [
    { loading: loadingList, data: dataList, error: errorList },
    { loading: loadingTypes, data: dataTypes, error: errorTypes },
  ] = queryChildHouses();

  if (loadingList) return <p>Loading</p>;
  if (errorList) return <p>ERROR</p>;
  if (!dataList) return <p>Not found</p>;

  return (
    <>
      <h1>어린이집</h1>
      <SearchBar>
        <DropDown
          name="어린이집"
          list={!loadingTypes && dataTypes.childHousesTypes}
        />
      </SearchBar>
      {dataList.childHouses &&
        dataList.childHouses.map((house: any, i: number) => (
          <Fragment key={`list-${i}`}>
            <h2>{house.name}</h2>
            <p>{house.tel}</p>
          </Fragment>
        ))}
    </>
  );
};

export default ChildHouse;