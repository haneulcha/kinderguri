import React, { useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const useDropdown = (label, defaultState, options) => {
  const [state, updateState] = useState(defaultState);
  const id = `dropdown-${label.replace(" ", "").toLowerCase()}`;

  const Dropdown = () => (
    <div>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Select
        disabled={!options.length}
        id={id}
        value={state}
        onChange={(e) => updateState(e.target.value)}
        onBlur={(e) => updateState(e.target.value)}
      >
        {options.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
  return [state, Dropdown, updateState];
};

export default useDropdown;
