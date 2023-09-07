import React from "react";
import "./style.scss";

const Button = (props) => {
  const { type, text, disable = false, clickFun } = props;
  return (
    <button onClick={clickFun} type={type} className={`primaryBtn ${disable && 'disabled'}`} disabled={disable}>
      {text}
    </button>
  );
};

export default Button;
