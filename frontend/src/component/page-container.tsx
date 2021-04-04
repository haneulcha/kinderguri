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
  minWidth: 400,
  zIndex: 1,
  h1: {
    margin: `${unit * 3.5}px 0`,
    textAlign: "center",
  },
  backgroundColor: glass.glassBg,
  boxShadow: glass.glassShadow,
  backdropFilter: glass.backdropFilter,
  WebkitBackdropFilter: glass.backdropFilter,
  a: {
    textDecoration: "underline",
  },
});
