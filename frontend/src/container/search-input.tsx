import React, { useState, Dispatch, SetStateAction } from "react";

interface SearchInputProps {
  setKeyword: Dispatch<SetStateAction<string>>;
}

const SearchInput: React.FC<SearchInputProps> = ({ setKeyword }) => {
  const [value, setValue] = useState("");
  // const handleSubmit = (event: React.FormEvent) => {
  //   event.preventDefault();
  //   setOption(value);
  // };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setKeyword(event.target.value);
  };

  return (
    <form>
      <input
        value={value}
        onChange={handleChange}
        placeholder="검색어 입력"
      ></input>
    </form>
  );
};

export default SearchInput;
