import React, { Fragment, useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { RouteComponentProps } from "@reach/router";
import Loader from "react-loader-spinner";
import { ListContainer, SearchBar } from "../component";
import { ListItem, DropDown } from "../container";
import { coordVar } from "../cache";
import { filterByType } from "../util";

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
      <h1>어린이집</h1>
      <SearchBar>
        <DropDown
          name="어린이집"
          list={!loadingAll && dataAll.childHouses}
          setOption={setType}
        />
      </SearchBar>
      <ListContainer>
        {dataAll.childHouses &&
          filterByType(
            dataAll.childHouses,
            type
          ).map((house: any, i: number) => (
            <ListItem item={house} key={`list-${i}`} />
          ))}
      </ListContainer>
      {children}
    </>
  );
};

export default ChildHouse;
