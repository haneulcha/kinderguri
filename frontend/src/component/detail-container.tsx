import React from "react";
import { Link } from "@reach/router";
import styled from "@emotion/styled";
import { unit, colors } from "../styles";
import Modal from "./modal";

export default function DetailContainer(props: any) {
  return (
    <Modal>
      <Overlay>
        <Container>
          <Link to="../" className="close">
            ×
          </Link>
          {props.children}
        </Container>
      </Overlay>
    </Modal>
  );
}

const Overlay = styled("div")({
  backgroundColor: colors.overlay,
  position: "fixed",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1,
});

const Container = styled("section")({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  padding: "2rem",
  minWidth: "30rem",
  backgroundColor: colors.paper,
  borderRadius: unit * 1,
  color: colors.text,
  "h2, h3": {
    marginTop: unit * 1,
  },

  "& h2, .tel, .addr, .homepage": {
    textAlign: "center",
    marginBottom: unit * 0.5,
  },

  "& .type": {
    fontWeight: "bold",
  },
  "& img": {
    margin: unit * 2,
    maxWidth: "28rem",
  },
  "& .updated": {
    marginTop: unit * 1,
    textAlign: "right",
    fontSize: "0.8rem",
  },
  "& .close": {
    textDecoration: "none",
    position: "absolute",
    fontSize: "2rem",
    fontWeight: "bold",
    right: 15,
    top: 10,
  },
  "@media (max-width: 400px)": {
    maxWidth: "85%",
    minWidth: "unset",
    padding: "1rem",
    "& h2": {
      fontSize: "1.6rem",
    },
    "& .close": {
      fontSize: "1.5rem",
    },
    "& .back": {
      textAlign: "right",
      textDecoration: "underline",
    },
  },
});
