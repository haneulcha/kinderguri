import React, { Fragment } from "react";
import { gql, useQuery } from "@apollo/client";
import { Link, RouteComponentProps } from "@reach/router";

const READ_HOSPITAL_AT_NIGHT = gql`
  query readHospitalAtNight {
    hospitalsAtNight {
      name
      type
      tel
      location {
        road
        lot
      }
      homepage
    }
  }
`;

interface HospitalDetailProps extends RouteComponentProps {
  hospitalname?: string;
}

const MedicalDetail: React.FC<HospitalDetailProps> = ({ hospitalname }) => {
  const { loading, data, error } = useQuery(READ_HOSPITAL_AT_NIGHT);

  if (loading) return <p>Loading</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  let info = {
    name: "",
    type: "",
    tel: "",
    location: {
      road: "",
      lot: "",
    },
    homepage: "",
  };

  const findHospital = (arr: any, name: any) => {
    return arr.find((item: any) => item.name === name);
  };

  if (data) {
    const { name, type, tel, location, homepage } = findHospital(
      data.hospitalsAtNight,
      hospitalname
    );

    info = {
      name,
      type,
      tel,
      location,
      homepage,
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
      <Link to="../">뒤로가기</Link>
    </Fragment>
  );
};

export default MedicalDetail;
