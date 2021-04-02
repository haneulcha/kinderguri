import React, { Fragment, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Link, RouteComponentProps } from "@reach/router";
import { DetailContainer } from "./";

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
    <DetailContainer>
      <p className="type">{info.type}</p>
      <h2>{info.name}</h2>
      <a href={`tel:${info.tel}`} className="tel">
        {info.tel}
      </a>
      <p className="addr">{info.location.road}</p>
      {info.homepage !== "X" && (
        <a href={info.homepage} target="_blank" className="homepage">
          {info.homepage}
        </a>
      )}
      <p className="updated">{info.updated} 기준</p>
      <Link to="../" className="back">
        뒤로가기
      </Link>
    </DetailContainer>
  );
};

export default KindergartenDetail;
