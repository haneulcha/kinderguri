import React, { Fragment, useState, Dispatch, SetStateAction } from "react";
import { extractTypes } from "../util";

interface DropDownProps {
  name: string;
  list: any[];
  setOption: Dispatch<SetStateAction<string>>;
}

const DropDown: React.FC<DropDownProps> = ({ name, list, setOption }) => {
  const [value, setValue] = useState("");
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setOption(value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <label htmlFor={`dropdown-${name}`}></label>
        <select
          name={name}
          id={`dropdown-${name}`}
          value={value}
          onChange={handleChange}
        >
          <option value={""}>전체</option>
          {list &&
            extractTypes(list).map((item: any, i: number) => (
              <option value={item} key={`select-${i}`}>
                {item}
              </option>
            ))}
        </select>
        <input type="submit" value="확인" />
      </form>
    </Fragment>
  );
};

export default DropDown;
