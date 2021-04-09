import React from "react";
import styled from "@emotion/styled";

import { unit, colors, glass } from "../styles";

export default function SearchBar(props: any) {
  return <Container>{props.children}</Container>;
}

const Container = styled("div")({
  textAlign: "center",
  marginBottom: unit * 2,
  form: {
    display: "inline-block",
  },
  "select, input": {
    fontFamily: "Spoqa Han Sans Neo",
    fontSize: "90%",
    color: colors.text,
    minWidth: "6rem",
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
    top: "0.65rem",
    right: "25%",
    position: "absolute",
    fontSize: "0.8rem",
  },
  option: {
    background: glass.glassBg,
    boxShadow: glass.glassShadow,
    backdropFilter: glass.backdropFilter,
    WebkitBackdropFilter: glass.backdropFilter,
  },
});
