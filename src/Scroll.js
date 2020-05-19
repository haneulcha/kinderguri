import React from "react";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

const Scroll = () => {
  const scrollToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", (e) => {
    const map = document.getElementById("map");
    if (window.pageYOffset > 300) {
      map.style.position = "sticky";
      map.classList.add("map-scroll");
    } else {
      map.classList.remove("map-scroll");
    }
  });

  return (
    <ArrowUpwardIcon
      className="scroll-top-btn"
      onClick={scrollToTop}
      fontSize="large"
    />
  );
};
export default Scroll;
