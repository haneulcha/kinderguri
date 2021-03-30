import React, { Fragment, useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { RouteComponentProps } from "@reach/router";
import { filterByType } from "../util";
import ListItem from "../component/list-item";
import DropDown from "../component/dropdown";
import SearchBar from "../component/search-bar";
import { coordVar } from "../cache";

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

interface ChildHouseProps extends RouteComponentProps {
  children: any;
}

const ChildHouse: React.FC<ChildHouseProps> = ({ children }) => {
  const { loading: loadingAll, data: dataAll, error: errorAll } = useQuery(
    GET_CHILDHOUSES
  );
  const [type, setType] = useState<string>("");

  useEffect(() => {
    if (dataAll) {
      const filteredArray = filterByType(dataAll.childHouses, type).map(
        (item: any) => {
          return {
            name: item.name,
            location: { long: item.location.long, lat: item.location.lat },
          };
        }
      );
      coordVar([...filteredArray]);
    }
  }, [dataAll, type]);

  if (loadingAll) return <p>Loading</p>;
  if (errorAll) return <p>ERROR</p>;
  if (!dataAll) return <p>Not found</p>;

  return (
    <>
      <h1>어린이집</h1>
      <SearchBar>
        <DropDown
          name="어린이집"
          list={!loadingAll && dataAll.childHouses}
          setOption={setType}
        />
      </SearchBar>
      {dataAll.childHouses &&
        filterByType(dataAll.childHouses, type).map((house: any, i: number) => (
          <ListItem item={house} key={`list-${i}`} />
        ))}
      {children}
    </>
  );
};

export default ChildHouse;
