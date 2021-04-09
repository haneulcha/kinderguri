import React, { useState, Dispatch, SetStateAction } from "react";
import { extractTypes } from "../util";

interface DropDownProps {
  name: string;
  list: any[];
  setOption: Dispatch<SetStateAction<string>>;
}

const DropDown: React.FC<DropDownProps> = ({ name, list, setOption }) => {
  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
    setOption(event.target.value);
  };

  return (
    <form>
      <label htmlFor={`dropdown-${name}`}></label>
      <div className="select-wrapper">
        <select
          name={name}
          id={`dropdown-${name}`}
          value={value}
          onChange={handleChange}
          autoFocus
        >
          <option value={""}>전체</option>
          {list &&
            extractTypes(list).map((item: any, i: number) => (
              <option value={item} key={`select-${i}`}>
                {item}
              </option>
            ))}
        </select>
      </div>
    </form>
  );
};

export default DropDown;
