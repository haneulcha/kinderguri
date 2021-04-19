import React, { Fragment } from "react";
import styled from "@emotion/styled";

export default function ListContainer(props: any) {
  return <Container>{props.children}</Container>;
}

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  // flexGrow: 1,
  // width: "100%",
  // height: "78.5vh",
  overflowY: "scroll",
  overflowScrolling: "touch",
  WebkitOverflowScrolling: "touch",
  "::-webkit-scrollbar": {
    display: " none",
  },
  "@media (max-width: 400px)": {
    flexDirection: "row",
    overflowX: "scroll",
    // overflowY: "unset",
    width: "100vw",
    // height: "50vh",
  },
});
