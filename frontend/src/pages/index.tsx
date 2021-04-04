import React, { Fragment } from "react";
import { Router } from "@reach/router";
import Landing from "./landing";
import ChildHouse from "./childhouse";
import Age0ChildHouse from "./age0childhouse";
import Kindergarten from "./kindergarten";
import Cultural from "./cultural";
import Medical from "./medical";
import {
  ChildHouseDetail,
  CulturalDetail,
  MedicalDetail,
  KindergartenDetail,
  Age0ChildhouseDetail,
  Map,
} from "../container";
import { Header, Footer, NavBar, PageContainer } from "../component";

export const App = () => {
  return (
    <Fragment>
      <Header />
      <NavBar />
      <PageContainer>
        <Router>
          <Landing path="/" />
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
      <Footer />
      <Map />
    </Fragment>
  );
};
