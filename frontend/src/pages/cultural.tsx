import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { RouteComponentProps } from "@reach/router";
import { ListContainer, SearchBar } from "../component";
import { ListItem, DropDown, SearchInput } from "../container";
import { coordVar } from "../cache";
import { filterByType, findMatches } from "../util";
import Loader from "react-loader-spinner";

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
  const [keyword, setKeyword] = useState<string>("");

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

  useEffect(() => {
    if (keyword.length) {
      const filteredArray = findMatches(dataAll.barrierFreeTour, keyword).map(
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
      <h2>구리 인근 무장애 여행</h2>
      <SearchBar>
        <DropDown
          name="무장애(Barrier-free) 여행"
          list={!loadingAll && dataAll.barrierFreeTour}
          setOption={setType}
        />
        <SearchInput setKeyword={setKeyword} />
      </SearchBar>
      <ListContainer>
        {keyword.length > 0 &&
          findMatches(
            dataAll.barrierFreeTour,
            keyword
          ).map((hitem: any, i: number) => (
            <ListItem item={hitem} key={`list-${i}`} />
          ))}
        {dataAll.barrierFreeTour &&
          !keyword.length &&
          filterByType(
            dataAll.barrierFreeTour,
            type
          ).map((item: any, i: number) => (
            <ListItem item={item} key={`list-${i}`} />
          ))}
      </ListContainer>
      {children}
    </>
  );
};

export default Cultural;
