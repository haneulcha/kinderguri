import React, { Fragment } from "react";
import styled from "@emotion/styled";

import { unit, colors, glass } from "../styles";

export default function SearchBar(props: any) {
  return <Container>{props.children}</Container>;
}

const Container = styled("div")({
  textAlign: "center",
  margin: `${unit * 2}px 0`,
  select: {
    fontFamily: "Spoqa Han Sans Neo",
    fontSize: "90%",
    width: "40%",
    height: unit * 5,
    marginRight: unit * 1.5,
    padding: unit * 1,
    background: glass.glassBg,
    boxShadow: glass.glassShadow,
    backdropFilter: glass.backdropFilter,
    WebkitBackdropFilter: glass.backdropFilter,
    borderRadius: unit * 2,
    border: glass.border,
    appearance: "none",
  },
  "& .select-wrapper": {
    position: "relative",
  },
  "& .select-wrapper::after": {
    content: '"▼"',
    top: unit * 1,
    right: "35%",
    position: "absolute",
  },
  option: {
    background: glass.glassBg,
    boxShadow: glass.glassShadow,
    backdropFilter: glass.backdropFilter,
    WebkitBackdropFilter: glass.backdropFilter,
  },
});
