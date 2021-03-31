import React from "react";
import styled from "@emotion/styled";

import { unit, colors, glass } from "../styles";

export default function PageContainer(props: any) {
  return <Container>{props.children}</Container>;
}

// const Bar = styled("div")({
//   flexShrink: 0,
//   height: 12,
//   backgroundColor: colors.primary,
// });

const Container = styled("main")({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  position: "absolute",
  right: 0,
  // width: "32%",
  height: "100%",
  minWidth: 400,
  zIndex: 1,
  h1: {
    margin: `${unit * 4}px 0`,
    textAlign: "center",
  },
  backgroundColor: glass.glassBg,
  boxShadow: glass.glassShadow,
  backdropFilter: glass.backdropFilter,
  WebkitBackdropFilter: glass.backdropFilter,

  //   width: "100%",
  //   maxWidth: 600,
  //   margin: "0 auto",
  //
  //   paddingBottom: unit * 5,
});
