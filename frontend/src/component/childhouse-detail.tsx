import React, { Fragment, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Link, RouteComponentProps } from "@reach/router";

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

const READ_AGE0CHILDHOUSE = gql`
  query readAge0Childhouse {
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
      shuttle: 0,
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

  const findChildHouse = (arr: any) => {
    return arr.find((item: any) => item.name === childhousename);
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
    } = findChildHouse(data.childHouses);
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
    <Fragment>
      <h1>detail</h1>
      <h2>이름: {info.name}</h2>
      <p>타입: {info.type}</p>
      <p>전화: {info.tel}</p>

      <ul>
        <li>cctv: {info.facility.cctv}</li>
        <li>놀이터: {info.facility.playground}</li>
        <li>보육실: {info.facility.room}</li>
        <li>셔틀버스: {info.facility.shuttle}</li>
      </ul>

      <span>{info.updated} 기준</span>
      <Link to="../">뒤로가기</Link>
    </Fragment>
  );
};

export default ChildHouseDetail;
