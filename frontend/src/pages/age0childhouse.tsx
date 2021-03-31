import React, { Fragment, useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { RouteComponentProps } from "@reach/router";
import Loader from "react-loader-spinner";
import { ListContainer, ListItem, DropDown, SearchBar } from "../component";
import { coordVar } from "../cache";
import { filterByType } from "../util";

const GET_AGE0KINDERGARTENS = gql`
  query GetAge0KindergartenList {
    age0Kindergartens {
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

interface Age0ChildhouseProps extends RouteComponentProps {
  children: any;
}

const Age0Childhouse: React.FC<Age0ChildhouseProps> = ({ children }) => {
  const { loading: loadingAll, data: dataAll, error: errorAll } = useQuery(
    GET_AGE0KINDERGARTENS
  );
  const [type, setType] = useState<string>("");

  useEffect(() => {
    if (dataAll) {
      const filteredArray = filterByType(dataAll.age0Kindergartens, type).map(
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
      <h1>0세 전용 어린이집</h1>
      <SearchBar>
        <DropDown
          name="0세 전용 어린이집"
          list={!loadingAll && dataAll.age0Kindergartens}
          setOption={setType}
        />
      </SearchBar>
      <ListContainer>
        {dataAll.age0Kindergartens &&
          filterByType(
            dataAll.age0Kindergartens,
            type
          ).map((house: any, i: number) => (
            <ListItem item={house} key={`list-${i}`} />
          ))}
      </ListContainer>
      {children}
    </>
  );
};

export default Age0Childhouse;
