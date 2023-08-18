import React from "react";
import { components } from "react-select";

const CustomCheckboxOption = (props) => {
  const handleChange = () => {
    const { value, isSelected, onSelected } = props;
    onSelected(value, !isSelected);
  };

  return (
    <div className="custom-checkbox-option">
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={handleChange}
          style={{ marginRight: "8px" }}
        />
        <label style={{ color: "black" }}>{props.label}</label>
      </components.Option>
    </div>
  );
};

export default CustomCheckboxOption;
