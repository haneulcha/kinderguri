import React, { Fragment } from "react";
import styled from "@emotion/styled";

import { unit, colors, glass } from "../styles";

export default function ListItemContainer(props: any) {
  return <Container>{props.children}</Container>;
}

const Container = styled("section")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: 350,
  margin: `0 auto`,
  marginBottom: unit * 1.2,
  background: glass.glassBg,
  boxShadow: glass.glassShadow,
  backdropFilter: glass.backdropFilter,
  WebkitBackdropFilter: glass.backdropFilter,
  borderRadius: unit * 1,
  border: glass.border,
  padding: unit * 1.5,
  paddingBottom: unit * 1,
  pointer: "cursor",
  "& h3, .tel": {
    textAlign: "center",
    marginBottom: unit * 0.8,
  },
  "& .type": {
    fontWeight: "bold",
  },
  "& .to-detail": {
    textAlign: "right",
  },
});