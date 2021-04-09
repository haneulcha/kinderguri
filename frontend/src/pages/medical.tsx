import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { RouteComponentProps } from "@reach/router";
import { ListContainer, SearchBar } from "../component";
import { ListItem, DropDown, SearchInput } from "../container";
import { coordVar } from "../cache";
import { filterByType, findMatches } from "../util";
import Loader from "react-loader-spinner";

const GET_HOPITAL_AT_NIGHT = gql`
  query GetHospitalAtNightList {
    hospitalsAtNight {
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

interface MedicalProps extends RouteComponentProps {}

const Medical: React.FC<MedicalProps> = ({ children }) => {
  const { loading: loadingAll, data: dataAll, error: errorAll } = useQuery(
    GET_HOPITAL_AT_NIGHT
  );
  const [type, setType] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");

  useEffect(() => {
    if (dataAll) {
      const filteredArray = filterByType(dataAll.hospitalsAtNight, type).map(
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
      const filteredArray = findMatches(dataAll.hospitalsAtNight, keyword).map(
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
      <h2>소아 야간진료 병원</h2>
      <SearchBar>
        <DropDown
          name="소아 야간진료 병원"
          list={!loadingAll && dataAll.hospitalsAtNight}
          setOption={setType}
        />
        <SearchInput setKeyword={setKeyword} />
      </SearchBar>
      <ListContainer>
        {keyword.length > 0 &&
          findMatches(
            dataAll.hospitalsAtNight,
            keyword
          ).map((item: any, i: number) => (
            <ListItem item={item} key={`list-${i}`} />
          ))}
        {dataAll.hospitalsAtNight &&
          !keyword.length &&
          filterByType(
            dataAll.hospitalsAtNight,
            type
          ).map((item: any, i: number) => (
            <ListItem item={item} key={`list-${i}`} />
          ))}
      </ListContainer>
      {children}
    </>
  );
};

export default Medical;
