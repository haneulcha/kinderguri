import React from "react";
import { Link } from "@reach/router";
import styled from "@emotion/styled";
import { unit, colors, glass } from "../styles";

export default function NavBar(props: any) {
  const pathList = [
    { title: "0세 전용 어린이집", path: "age0childhouse" },
    { title: "어린이집", path: "childhouse" },
    { title: "유치원", path: "kindergarten" },
    { title: "소아 야간진료 병원", path: "medical" },
    { title: "무장애 여행", path: "cultural" },
  ];

  return !props.main ? (
    <Container>
      <svg height="40px" id="menu-btn" className="open" viewBox="0 0 32 32">
        <path
          fill="#db2b39"
          d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"
        />
      </svg>
      {pathList.map((item: any, i) => (
        <Link to={item.path} key={`nav-${i}`}>
          <NavButton>{item.title}</NavButton>
        </Link>
      ))}
    </Container>
  ) : (
    <MainContainer className="main">
      {pathList.map((item: any, i) => (
        <Link to={item.path} key={`nav-${i}`}>
          <NavButton main>{item.title}</NavButton>
        </Link>
      ))}
    </MainContainer>
  );
}

type MainContainerProps = {
  main?: Boolean;
};
const Container = styled("nav")({
  position: "fixed",
  top: "7.5vh",
  left: -140,
  fontWeight: "bold",
  zIndex: 1,
  transition: "left .5s ease",
  "&:hover": {
    left: 0,
  },
});

const MainContainer = styled("nav")({
  width: "100%",
  margin: "2vh 0",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "bold",
  zIndex: 1,
  a: {
    width: "80%",
    textDecoration: "none",
  },
  "@media (max-width: 400px)": {
    height: "7.5vh",
    flexDirection: "row",
  },
});

const NavButton = styled.div<MainContainerProps>(
  {
    textAlign: "center",
    marginBottom: unit * 1,
    "&:hover": {
      color: colors.text,
      backgroundColor: colors.secondary,
    },
  },
  (props) => ({
    color: props.main ? colors.text : colors.background,
    backgroundColor: props.main ? glass.glassBg : colors.text,
    padding: props.main
      ? unit * 2
      : `${unit * 1.5}px ${unit * 3}px ${unit * 1.5}px ${unit * 2}px`,
    borderRadius: props.main
      ? `${unit * 2}px`
      : `0 ${unit * 2}px ${unit * 2}px 0`,
  })
);
