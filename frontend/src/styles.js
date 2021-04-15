import React from "react";
import { Global, css } from "@emotion/react";
export const unit = 8;
export const colors = {
  primary: "#F95738", // orange
  secondary: "#F4D35E", // yellow
  accent: "#e535ab",
  background: "#FAF0CA", // lemon
  paper: "#FCF9ED",
  overlay: "rgba(0,0,0,0.5)",
  grey: "#d8d9e0",
  text: "#0D3B66", // indigo
  textSecondary: "#747790",
};

export const glass = {
  glassBg: "rgba( 255, 255, 255, 0.20 )",
  glassShadow: "0 8px 16px 0 rgba( 31, 38, 135, 0.16 )",
  backdropFilter: "blur( 8.0px )",
  border: "1px solid rgba( 255, 255, 255, 0.18 )",
};

export const GlobalStyles = () => {
  return (
    <Global
      styles={css`      
        import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
        
        * {
          box-sizing: border-box;
        }
        html,
        body {
          height: 100%;
        }
        body {
          margin: 0;
          padding: 0;
          font-family: "Spoqa Han Sans Neo", -apple-system, BlinkMacSystemFont,
            "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
            "Droid Sans", "Helvetica Neue", sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          color: ${colors.text};
        }
        p {
          margin: 0;
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          margin: 0;
          font-weight: 600;
        }
        h1 {
          font-size: 2rem;
          line-height: 1;
        }
        h2 {
          font-size: 1.8rem;
        }
        h3 {
          font-size: 1.3rem;
        }
        ul,
        li {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        a {
          color: unset;
          text-decoration: none;
        }
        select {
          font-family: "Spoqa Han Sans Neo";
        }
        .map {
          height: 100vh;
          width: 100vw;
          position: fixed;
        }
        .onmap {
          font-weight: bold;
          text-align: center;
          padding: 10px;
          min-width: 250px;
        }
        .loading {
          margin: 0 auto;
          width: 100%;
          height: 92vh;
          padding-top: 40vh;
          text-align: center;         
        }
        .sethome-overlay{
          width: 6rem;
          height: 2rem;
          display: flex;
          align-items: center;
          border-radius: 1rem;
          background-color: ${colors.secondary};
          color: ${colors.text};
          text-align: center;
          cursor: pointer;
        }
        .sethome-overlay .sethome {
          width: 100%;
          font-size: 0.9rem;
        }
        .sethome-overlay:hover {
          background-color: ${colors.primary};
          color: white;          
        }
        .home-marker {
          position: absolute;
          top: -27px;
          left: -12px;
          // margin-left: -115px;          
          border-radius: 50% 50% 50% 0;
          border: 4px solid ${colors.text};
          width: 30px;
          height: 30px;
          transform: rotate(-45deg);
        }
        
        .home-marker::after {
          position: absolute;
          content: '';
          width: 15px;
          height: 15px;
          border-radius: 50%;
          top: 35%;
          left: 39%;
          margin-left: -5px;
          margin-top: -4px;
          background-color: ${colors.text};
        }

      `}
    />
  );
};
