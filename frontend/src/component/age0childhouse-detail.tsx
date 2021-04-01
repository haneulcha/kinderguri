import React, { Fragment } from "react";
import { gql, useQuery } from "@apollo/client";
import { Link, RouteComponentProps } from "@reach/router";
import { DetailContainer } from "./";

const READ_AGE0CHILDHOUSE = gql`
  query readAge0Childhouse {
    age0Kindergartens {
      name
      type
      tel
      location {
        road
        lot
      }
      personnel {
        staff
        kid
      }
      timeExt
      homepage
      updated
    }
  }
`;

interface ChildHouseDetailProps extends RouteComponentProps {
  age0childhousename?: string;
}

const ChildHouseDetail: React.FC<ChildHouseDetailProps> = ({
  age0childhousename,
}) => {
  const { loading, data, error } = useQuery(READ_AGE0CHILDHOUSE);

  if (loading) return <p>Loading</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  let info = {
    homepage: "",
    location: {
      road: "",
      lot: "",
    },
    name: "",
    personnel: {
      staff: 0,
      kid: 0,
    },
    tel: "",
    type: "",
    timeExt: "",
    updated: "",
  };

  const findChildHouse = (arr: any, name: any) => {
    return arr.find((item: any) => item.name === name);
  };

  if (data) {
    const {
      timeExt,
      homepage,
      location,
      name,
      personnel,
      tel,
      type,
      updated,
    } = findChildHouse(data.age0Kindergartens, age0childhousename);
    info = {
      homepage,
      location,
      name,
      personnel,
      tel,
      type,
      timeExt,
      updated,
    };
    console.log(info);
  }

  return (
    <DetailContainer>
      <p className="type">{info.type}</p>
      <h2>{info.name}</h2>
      <a href={`tel:${info.tel}`} className="tel">
        {info.tel}
      </a>
      <p className="addr">{info.location.road}</p>
      <a href={info.homepage} target="_blank">
        {info.homepage}
      </a>
      <h3>정원</h3>
      <ul className="personnel">
        <li>교직원수: {info.personnel.staff}</li>
        <li>아동정원수: {info.personnel.kid}</li>
      </ul>
      <h3>시간 연장 여부</h3>
      <p>{info.timeExt ? "O" : "X"}</p>
      <p className="updated">{info.updated} 기준</p>
      <Link to="../" className="back">
        뒤로가기
      </Link>
    </DetailContainer>
  );
};

export default ChildHouseDetail;
