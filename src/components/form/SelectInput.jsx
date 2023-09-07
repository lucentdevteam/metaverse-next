import React from "react";
import "./style.scss";

const SelectInput = ({ name, onChange, value, options, halfWidth = false }) => {
  return (
    <div className={`input-container${halfWidth ? " half-width" : ""}`}>
      <div className="input-wrapper">
        <select className="input-field select" name={name}>
          {options.map((item) => (
            <option value={item.value}>{item.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectInput;
