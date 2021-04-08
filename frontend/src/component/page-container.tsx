import React from "react";
import styled from "@emotion/styled";
import { unit, colors, glass } from "../styles";

export default function PageContainer(props: any) {
  return <Container>{props.children}</Container>;
}

const Container = styled("main")({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  position: "absolute",
  right: 0,
  minWidth: 380,
  height: "93.5vh",
  zIndex: 1,
  h2: {
    margin: `${unit * 2}px 0`,
    textAlign: "center",
  },
  backgroundColor: glass.glassBg,
  boxShadow: glass.glassShadow,
  backdropFilter: glass.backdropFilter,
  WebkitBackdropFilter: glass.backdropFilter,
  a: {
    textDecoration: "underline",
  },
  "& p.sethome-tip": {
    width: "80%",
    margin: "auto",
    fontSize: "0.9rem",
  },
});
