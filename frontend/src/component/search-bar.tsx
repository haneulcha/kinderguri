import React from "react";
import styled from "@emotion/styled";

import { unit, colors, glass } from "../styles";

export default function SearchBar(props: any) {
  return <Container className="search">{props.children}</Container>;
}

const Container = styled("div")({
  textAlign: "center",
  marginBottom: "2vh",
  form: {
    display: "inline-block",
  },
  "select, input": {
    fontFamily: "Spoqa Han Sans Neo",
    fontSize: "90%",
    color: colors.text,
    minWidth: "6rem",
    height: "4.5vh",
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
    top: "33%",
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
  "@media (max-width: 400px)": {
    textAlign: "center",
    margin: "6px 0",
    "select, input": {
      height: "unset",
      fontSize: "unset",
    },
  },
});
