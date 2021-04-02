import React from "react";
import { Link } from "@reach/router";
import styled from "@emotion/styled";
import { unit, colors, glass } from "../styles";

function NavBar(props: any) {
  const pathList = [
    { title: "0세 전용 어린이집", path: "age0childhouse" },
    { title: "어린이집", path: "childhouse" },
    { title: "유치원", path: "kindergarten" },
    { title: "소아 야간진료 병원", path: "medical" },
    { title: "무장애 여행", path: "cultural" },
  ];

  return !props.main ? (
    <Container>
      {pathList.map((item: any, i) => (
        <NavButton key={`nav-${i}`}>
          <Link to={item.path}>{item.title}</Link>
        </NavButton>
      ))}
    </Container>
  ) : (
    <MainContainer>
      {pathList.map((item: any, i) => (
        <NavButton key={`nav-${i}`}>
          <Link to={item.path}>{item.title}</Link>
        </NavButton>
      ))}
    </MainContainer>
  );
}

const Container = styled("nav")({
  position: "fixed",
  top: unit * 10,
  left: -140,
  zIndex: 1,
  transition: "left .5s ease",
  "&:hover": {
    left: 0,
  },
});

const MainContainer = styled("nav")({
  zIndex: 1,
});

const NavButton = styled("div")({
  backgroundColor: colors.primary,
  color: colors.background,
  padding: `${unit * 1.5}px ${unit * 3}px ${unit * 1.5}px ${unit * 2}px`,
  textAlign: "center",
  borderRadius: `0 ${unit * 2}px ${unit * 2}px 0`,
  marginBottom: unit * 1,
  a: {
    textDecoration: "none",
  },
  "&:hover": {
    backgroundColor: colors.secondary,
  },
});

export default NavBar;
