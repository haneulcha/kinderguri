import React from "react";
import styled from "@emotion/styled";
import { unit, colors, glass } from "../styles";

function Header(props: any) {
  return (
    <HeaderContainer>
      <h1>Kinderguri | 킨더구리</h1>
      <h2>경기도 구리시 보육 정보</h2>
    </HeaderContainer>
  );
}

const HeaderContainer = styled("header")({
  display: "flex",
  alignItems: "baseline",
  width: "100%",
  padding: unit * 1.5,
  backgroundColor: colors.secondary,
  color: colors.text,
  h2: {
    display: "inline",
    marginLeft: unit * 1,
    fontSize: unit * 2,
  },
});

export default Header;
