import React from "react";
import styled from "@emotion/styled";
import { unit, colors } from "../styles";
import { Link } from "@reach/router";

export default function Header(props: any) {
  return (
    <HeaderContainer>
      <Link to="/">
        <h1>Kinderguri | 킨더구리</h1>
      </Link>
      <h2>경기도 구리시 보육 정보</h2>
    </HeaderContainer>
  );
}

const HeaderContainer = styled("header")({
  top: 0,
  left: 0,
  display: "flex",
  alignItems: "baseline",
  width: "100%",
  height: "6.5vh",
  padding: unit * 1.5,
  backgroundColor: colors.secondary,
  color: colors.text,
  zIndex: 2,
  "& h2": {
    marginLeft: "0.5rem",
    fontSize: "1.2rem",
  },
  "@media (max-width: 400px)": {
    height: "7.5vh",
    alignItems: "center",
    "& h2": {
      marginLeft: "0.5rem",
      fontSize: "0.75rem",
    },
  },
});
