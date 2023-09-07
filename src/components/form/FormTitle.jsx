import React from "react";
import "./style.scss";

const FormTitle = (props) => {
  const { title, subTitle, btn } = props;
  return (
    <div className="title-container">
      {title && <div className="title">{title}</div>}
      {subTitle && <div className="sub-title">{subTitle} {btn}</div>}
    </div>
  );
};

export default FormTitle;
