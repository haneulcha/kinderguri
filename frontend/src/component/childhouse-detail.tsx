import React, { Fragment, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Link, RouteComponentProps } from "@reach/router";

interface ChildHouseDetailProps extends RouteComponentProps {
  name?: string;
}

const ChildHouseDetail: React.FC<ChildHouseDetailProps> = ({ name }) => {
  console.log(name);
  return (
    <Fragment>
      <h1>detail</h1>
      <Link to="../">뒤로가기</Link>
    </Fragment>
  );
};

export default ChildHouseDetail;
