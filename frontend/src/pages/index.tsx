import React, { Fragment } from "react";
import { Router } from "@reach/router";
import Landing from "./landing";
import ChildHouse from "./childhouse";
import Age0ChildHouse from "./age0childhouse";
import Kindergarten from "./kindergarten";
import Cultural from "./cultural";
import Medical from "./medical";
import ChildHouseDetail from "../component/childhouse-detail";
import CulturalDetail from "../component/cultural-detail";
import MedicalDetail from "../component/medical-detail";
import KindergartenDetail from "../component/kindergarten-detail";
import Age0ChildhouseDetail from "../component/age0childhouse-detail";
import Map from "../container/map";
import PageContainer from "../component/page-container";

export const App = () => {
  return (
    <Fragment>
      <PageContainer>
        <Router>
          {/* <Landing path="/" /> */}
          <ChildHouse path="childhouse">
            <ChildHouseDetail path=":childhousename" />
          </ChildHouse>
          <Age0ChildHouse path="age0childhouse">
            <Age0ChildhouseDetail path=":age0childhousename" />
          </Age0ChildHouse>
          <Kindergarten path="kindergarten">
            <KindergartenDetail path=":kindergartenname" />
          </Kindergarten>
          <Medical path="medical">
            <MedicalDetail path=":hospitalname" />
          </Medical>
          <Cultural path="cultural">
            <CulturalDetail path=":bftourname" />
          </Cultural>
        </Router>
      </PageContainer>
      <Map />
    </Fragment>
  );
};
