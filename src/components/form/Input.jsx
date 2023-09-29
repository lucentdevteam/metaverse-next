import React from "react";
import "./style.scss";
import { OpenEyeIcon, CloseEyeIcon } from "../../assets/Icons";

const Input = ({
  type,
  name,
  placeholder,
  icon,
  displayEye,
  handleShowPassword,
  typePass,
  onChange,
  className,
  value,
  halfWidth = false,
  children,
  error,
}) => {
  return (
    <div className={`input-container${halfWidth ? " half-width" : ""}`}>
      <div
        className={`input-wrapper ${
          error?.length ? "input-error-wrapper" : ""
        }`}
      >
        <span className="icon">{icon}</span>
        <input
          type={type}
          name={name}
          className={`input-field ${className ?? ""}`}
          value={value}
          onChange={onChange}
        />
        <label className="input-label">{placeholder}</label>
        {(type === "password" || typePass) && (
          <span className="icon right" onClick={() => handleShowPassword()}>
            {displayEye ? <OpenEyeIcon /> : <CloseEyeIcon />}
          </span>
        )}
      </div>
      {children}
    </div>
  );
};

export default Input;
