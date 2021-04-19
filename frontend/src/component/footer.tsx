import React from "react";
import styled from "@emotion/styled";
import { unit, colors } from "../styles";

export default function Footer(props: any) {
  return (
    <FooterContainer role="contentinfo">
      <address>
        <a href="http://haneulcha.com" target="_blank">
          © 2021 Haneul Cha
        </a>
      </address>
    </FooterContainer>
  );
}

const FooterContainer = styled("footer")({
  position: "fixed",
  left: 0,
  bottom: 0,
  margin: unit * 1.5,
  padding: `${unit * 0.5}px ${unit * 1}px`,
  backgroundColor: colors.text,
  fontSize: "0.8rem",
  color: colors.secondary,
  zIndex: 1,
  "@media (max-width: 400px)": {
    // left: "unset",
    bottom: "unset",
    // right: 0,
    fontSize: "0.5rem",
    padding: "3px 6px",
  },
});
