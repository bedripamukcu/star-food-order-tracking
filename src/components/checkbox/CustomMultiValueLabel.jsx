import React from "react";
import { components } from "react-select";

const CustomMultiValueLabel = (props) => {
  return (
    <components.MultiValueLabel {...props}>
      <span
        style={{
          fontSize: "18px",
          fontWeight: "500",
          lineHeight: "21px",
          letterSpacing: "0.05em",
          textAlign: "left",
          fontFamily: "SF Pro Display",
          background: "white",
          borderRadius: "4px",
          padding: "2px 4px",
        }}
      >
        {props.children}
      </span>
    </components.MultiValueLabel>
  );
};

export default CustomMultiValueLabel;
