import React, { Fragment } from "react";

interface SearchBarProps {
  children?: JSX.Element;
}

const SearchBar: React.FC<SearchBarProps> = ({ children }) => {
  return <Fragment>{children}</Fragment>;
};

export default SearchBar;
