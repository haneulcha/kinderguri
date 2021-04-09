import React from "react";
import styled from "@emotion/styled";

import { unit, colors } from "../styles";

const NavButton = styled("div")({
  backgroundColor: colors.primary,
  color: colors.background,
  padding: `${unit * 1.5}px ${unit * 3}px ${unit * 1.5}px ${unit * 2}px`,
  textAlign: "center",
  borderRadius: `0 ${unit * 2}px ${unit * 2}px 0`,
  marginBottom: unit * 1,
  a: {
    textDecoration: "none",
  },
  "&:hover": {
    backgroundColor: colors.secondary,
  },
});

export default NavButton;
