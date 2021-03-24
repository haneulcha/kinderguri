import React, { Fragment, useState } from "react";

interface DropDownProps {
  name: string;
  list: string[];
}

const DropDown: React.FC<DropDownProps> = ({ name, list }) => {
  const [select, setSelect] = useState<string>();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("selected", select);
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(event.target.value);
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <label htmlFor={`dropdown-${name}`}></label>
        <select
          name={name}
          id={`dropdown-${name}`}
          value={select}
          onChange={handleChange}
        >
          {list &&
            list.map((item, i) => (
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
