import React, { Fragment, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Link, RouteComponentProps } from "@reach/router";
import { DetailContainer } from "../component";

const READ_CHILDHOUSE = gql`
  query readChildHouse {
    childHouses {
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
      facility {
        room
        playground
        cctv
        shuttle
      }
      homepage
      updated
    }
  }
`;

interface ChildHouseDetailProps extends RouteComponentProps {
  childhousename?: string;
}

const ChildHouseDetail: React.FC<ChildHouseDetailProps> = ({
  childhousename,
}) => {
  const { loading, data, error } = useQuery(READ_CHILDHOUSE);

  if (loading) return <p>Loading</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  let info = {
    facility: {
      room: 0,
      playground: 0,
      cctv: 0,
      shuttle: false,
    },
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
    updated: "",
  };

  const findChildHouse = (arr: any, name: any) => {
    return arr.find((item: any) => item.name === name);
  };

  if (data) {
    const {
      facility,
      homepage,
      location,
      name,
      personnel,
      tel,
      type,
      updated,
    } = findChildHouse(data.childHouses, childhousename);
    info = {
      facility,
      homepage,
      location,
      name,
      personnel,
      tel,
      type,
      updated,
    };
  }

  return (
    <DetailContainer>
      <p className="type">{info.type}</p>
      <h2>{info.name}</h2>
      <a href={`tel:${info.tel}`} className="tel">
        {info.tel}
      </a>
      <p className="addr">{info.location.road}</p>
      <h3>정원</h3>
      <ul className="personnel">
        <li>교직원수: {info.personnel.staff}</li>
        <li>아동정원수: {info.personnel.kid}</li>
      </ul>
      <h3>시설</h3>
      <ul className="facility">
        <li>cctv: {info.facility.cctv}</li>
        <li>놀이터: {info.facility.playground}</li>
        <li>보육실: {info.facility.room}</li>
        <li>셔틀버스: {info.facility.shuttle ? "O" : "X"}</li>
      </ul>
      <p className="updated">{info.updated} 기준</p>
      <Link to="../" className="back">
        뒤로가기
      </Link>
    </DetailContainer>
  );
};

export default ChildHouseDetail;
