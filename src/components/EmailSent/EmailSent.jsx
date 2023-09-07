import React from "react";
import "./style.scss";
import EmailSentImg from "../../assets/images/email-sent.png";
import FormTitle from "../form/FormTitle";
import Image from "next/image";

const EmailSent = (props) => {
  const { title, subTitle } = props;

  return (
    <div className="email-sent-container">
      <div>
        <Image src={EmailSentImg} />
      </div>
      <FormTitle title={title} subTitle={subTitle} />
    </div>
  );
};

export default EmailSent;
