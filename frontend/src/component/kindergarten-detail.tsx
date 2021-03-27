import React, { Fragment, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Link, RouteComponentProps } from "@reach/router";

const READ_KINDERGARTEN = gql`
  query readKindergarten {
    kindergartens {
      name
      type
      tel
      location {
        road
        lot
      }
      homepage
      updated
    }
  }
`;

interface KindergartenDetailProps extends RouteComponentProps {
  kindergartenname?: string;
}

const KindergartenDetail: React.FC<KindergartenDetailProps> = ({
  kindergartenname,
}) => {
  const { loading, data, error } = useQuery(READ_KINDERGARTEN);

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
    tel: "",
    type: "",
    updated: "",
  };

  const findKindergarten = (arr: any, name: any) => {
    return arr.find((item: any) => item.name === name);
  };

  if (data) {
    console.log(findKindergarten(data.kindergartens, kindergartenname));
    const {
      homepage,
      location,
      name,

      tel,
      type,
      updated,
    } = findKindergarten(data.kindergartens, kindergartenname);

    info = {
      homepage,
      location,
      name,
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
      <p>주소: {info.location.lot}</p>
      <p>{info.homepage}</p>
      <span>{info.updated} 기준</span>
      <Link to="../">뒤로가기</Link>
    </Fragment>
  );
};

export default KindergartenDetail;
