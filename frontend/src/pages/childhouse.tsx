import React, { Fragment, useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { RouteComponentProps } from "@reach/router";
import { ListContainer, SearchBar } from "../component";
import { ListItem, DropDown, SearchInput } from "../container";
import { coordVar } from "../cache";
import { filterByType, findMatches } from "../util";
import Loader from "react-loader-spinner";

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
  const [keyword, setKeyword] = useState<string>("");

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

  useEffect(() => {
    if (keyword.length) {
      const filteredArray = findMatches(dataAll.childHouses, keyword).map(
        (item: any) => {
          return {
            name: item.name,
            location: { long: item.location.long, lat: item.location.lat },
          };
        }
      );
      coordVar([...filteredArray]);
    }
  }, [keyword]);

  if (loadingAll)
    return (
      <div className="loading">
        <Loader type="Rings" color="#343c5a" height={80} width={80} />
      </div>
    );
  if (errorAll) return <p>ERROR</p>;
  if (!dataAll) return <p>Not found</p>;

  return (
    <>
      <h2>어린이집</h2>
      <SearchBar>
        <DropDown
          name="어린이집"
          list={!loadingAll && dataAll.childHouses}
          setOption={setType}
        />
        <SearchInput setKeyword={setKeyword} />
      </SearchBar>
      <ListContainer>
        {keyword.length > 0 &&
          findMatches(
            dataAll.childHouses,
            keyword
          ).map((item: any, i: number) => (
            <ListItem item={item} key={`list-${i}`} />
          ))}
        {dataAll.childHouses &&
          !keyword.length &&
          filterByType(
            dataAll.childHouses,
            type
          ).map((item: any, i: number) => (
            <ListItem item={item} key={`list-${i}`} />
          ))}
      </ListContainer>
      {children}
    </>
  );
};

export default ChildHouse;
