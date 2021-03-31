import React, { Fragment, useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { RouteComponentProps } from "@reach/router";
import { ListContainer, ListItem, DropDown, SearchBar } from "../component";
import { coordVar } from "../cache";
import { filterByType } from "../util";

const GET_BARREIRFREE = gql`
  query GetBarrierFreeList {
    barrierFreeTour {
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

interface CulturalProps extends RouteComponentProps {
  children: any;
}

const Cultural: React.FC<CulturalProps> = ({ children }) => {
  const { loading: loadingAll, data: dataAll, error: errorAll } = useQuery(
    GET_BARREIRFREE
  );
  const [type, setType] = useState<string>("");

  useEffect(() => {
    if (dataAll) {
      const filteredArray = filterByType(dataAll.barrierFreeTour, type).map(
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
      <h1>구리 인근 무장애 여행</h1>
      <SearchBar>
        <DropDown
          name="무장애(Barrier-free) 여행"
          list={!loadingAll && dataAll.barrierFreeTour}
          setOption={setType}
        />
      </SearchBar>
      <ListContainer>
        {dataAll.barrierFreeTour &&
          filterByType(
            dataAll.barrierFreeTour,
            type
          ).map((tour: any, i: number) => (
            <ListItem item={tour} key={`list-${i}`} />
          ))}
      </ListContainer>
      {children}
    </>
  );
};

export default Cultural;
