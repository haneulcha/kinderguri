import React, { useState } from "react";
import { Link } from "@reach/router";
import styled from "@emotion/styled";
import { unit, colors, glass } from "../styles";

export default function NavBar(props: any) {
  const [open, setOpen] = useState(false);
  const pathList = [
    { title: "0세 전용 어린이집", path: "age0childhouse" },
    { title: "어린이집", path: "childhouse" },
    { title: "유치원", path: "kindergarten" },
    { title: "소아 야간진료 병원", path: "medical" },
    { title: "무장애 여행", path: "cultural" },
  ];

  const navOpen = () => {
    setOpen(true);
  };

  const navClose = () => {
    setOpen(false);
  };

  return !props.main ? (
    <Container>
      <div className="nav-btn">
        <svg
          height="40px"
          viewBox="0 0 32 32"
          className={open ? "close" : "open"}
          onClick={navOpen}
        >
          <path
            fill="#0D3B66"
            d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"
          />
        </svg>
        <svg
          viewBox="0 0 24 24"
          className={open ? "open" : "close"}
          onClick={navClose}
        >
          <path
            id="exit"
            fill="#0D3B66"
            d="M14.8,12l3.6-3.6c0.8-0.8,0.8-2,0-2.8c-0.8-0.8-2-0.8-2.8,0L12,9.2L8.4,5.6c-0.8-0.8-2-0.8-2.8,0   c-0.8,0.8-0.8,2,0,2.8L9.2,12l-3.6,3.6c-0.8,0.8-0.8,2,0,2.8C6,18.8,6.5,19,7,19s1-0.2,1.4-0.6l3.6-3.6l3.6,3.6   C16,18.8,16.5,19,17,19s1-0.2,1.4-0.6c0.8-0.8,0.8-2,0-2.8L14.8,12z"
          />
        </svg>
      </div>
      <div className={`nav-bar ${open ? "open" : "close"}`}>
        {pathList.map((item: any, i) => (
          <Link to={item.path} key={`nav-${i}`}>
            <NavButton>{item.title}</NavButton>
          </Link>
        ))}
      </div>
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
  "& .nav-btn": {
    display: "none",
  },
  "&:hover": {
    left: 0,
  },
  "@media (max-width: 400px)": {
    left: "unset",
    width: "45%",
    right: 0,
    fontSize: "0.85rem",
    fontWeight: "normal",

    "& .nav-bar": {
      position: "absolute",
      top: "2.5rem",
      right: 0,
    },
    "& .nav-btn": {
      width: "100%",
      display: "block",
      position: "relative",
    },
    "& svg": {
      position: "absolute",
      right: 0,
      width: "2.5rem",
    },
    "& .open": {
      visibility: "visible",
    },
    "& .close": {
      visibility: "hidden",
    },

    "&:hover": {
      left: "unset",
    },
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
    "@media (max-width: 400px)": {
      marginBottom: unit * 0.5,
      borderRadius: `${unit * 2}px 0 0 ${unit * 2}px`,
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
