import React from "react";
import "./style.scss";
import { CheckedCheckBox, UnCheckedCheckBox } from "../../assets/Icons";

const Checkbox = (props) => {
  const {
    isChecked,
    setIsChecked,
    label = "Keep me logged in",
    whiteLabel = false,
    error,
    children,
  } = props;

  return (
    <div className={`${error?.length ? "input-error-wrapper" : ""}`}>
      <div className={`checkboxContainer `}>
        <div className="checkboxes">
          {isChecked ? (
            <CheckedCheckBox onClick={() => setIsChecked()} />
          ) : (
            <UnCheckedCheckBox
              onClick={() => setIsChecked()}
            ></UnCheckedCheckBox>
          )}
        </div>
        <div
          className={`checkboxLabel${whiteLabel ? " white-text" : ""}`}
          onClick={() => setIsChecked()}
        >
          {label}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Checkbox;
