import React, { Fragment } from "react";
import { gql, useQuery } from "@apollo/client";
import { Link, RouteComponentProps } from "@reach/router";
import { DetailContainer } from "../component";

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

  if (loading)
    return (
      <DetailContainer>
        <p>Loading</p>
      </DetailContainer>
    );
  if (error)
    return (
      <DetailContainer>
        <p>ERROR</p>
      </DetailContainer>
    );
  if (!data)
    return (
      <DetailContainer>
        <p>Not found</p>
      </DetailContainer>
    );

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
      <Link to="../" className="back">
        뒤로가기
      </Link>
    </DetailContainer>
  );
};

export default MedicalDetail;
