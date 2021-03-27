import React, { Fragment, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Link, RouteComponentProps } from "@reach/router";

const READ_BFTOUR = gql`
  query readBFTour {
    barrierFreeTour {
      name
      type
      tel
      class {
        large
        middle
        small
      }
      img {
        original
        thumbnail
      }
      location {
        road
        lot
      }
      updated
    }
  }
`;

interface BFTourDetailProps extends RouteComponentProps {
  bftourname?: string;
}

const BFTourDetail: React.FC<BFTourDetailProps> = ({ bftourname }) => {
  const { loading, data, error } = useQuery(READ_BFTOUR);

  if (loading) return <p>Loading</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  let info = {
    location: {
      road: "",
      lot: "",
    },
    name: "",
    tel: "",
    type: "",
    classes: {
      large: "",
      middle: "",
      small: "",
    },
    img: {
      original: "",
      thumbnail: "",
    },
    updated: "",
  };

  const findBFTour = (arr: any, name: any): any => {
    return arr.find((item: any) => item.name === name);
  };

  if (data) {
    console.log(findBFTour(data.barrierFreeTour, bftourname));
    const {
      location,
      name,
      tel,
      type,
      img,
      updated,
      class: classes,
    } = findBFTour(data.barrierFreeTour, bftourname);
    info = {
      location,
      name,
      tel,
      type,
      classes,
      img,
      updated,
    };
  }

  return (
    <Fragment>
      <h1>detail</h1>
      <span>{`${info.classes.large}/${info.classes.middle}/${info.classes.small}`}</span>
      <h2>이름: {info.name}</h2>
      <p>타입: {info.type}</p>
      <p>전화: {info.tel}</p>
      <p>주소: {info.location.road}</p>
      <img src={info.img.thumbnail} />
      <span>{info.updated} 기준</span>
      <Link to="../">뒤로가기</Link>
    </Fragment>
  );
};

export default BFTourDetail;
