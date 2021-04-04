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
        <Link to={item.path} key={`nav-${i}`}>
          <NavButton>{item.title}</NavButton>
        </Link>
      ))}
    </Container>
  ) : (
    <MainContainer>
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
  top: unit * 10,
  left: -140,
  fontWeight: "bold",
  zIndex: 1,
  transition: "left .5s ease",
  "&:hover": {
    left: 0,
  },
});

const MainContainer = styled("nav")({
  position: "absolute",
  top: "50%",
  left: "50%",
  right: "auto",
  bottom: "auto",
  marginRight: "-50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  fontWeight: "bold",
  zIndex: 1,
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

export default NavBar;
