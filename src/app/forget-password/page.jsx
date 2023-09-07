"use client";
import React, { useEffect, useState } from "react";
import "./style.scss";
import AccountDialog from "@/components/accountDialog/AccountDialog";
import FormTitle from "@/components/form/FormTitle";
import ForgotPasswordImg from "@/assets/images/Forgot-Password.png";
import Input from "@/components/form/Input";
import { EmailIcon } from "@/assets/Icons";
import EmailSent from "@/components/EmailSent/EmailSent";
import ErrorMsg from "@/components/ErrorMsg";
import Link from "next/link";
import Image from "next/image";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [showSentEmailMsg, setShowSentEmailMsg] = useState(false);
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    const containers = document.querySelectorAll(".redirect-button-container");
    containers.forEach((container) => {
      container.style.display = showSentEmailMsg ? "none" : "block";
    });
  }, [showSentEmailMsg]);

  const handleSentEmailMsg = () => {
    if (validateForm()) {
      setShowSentEmailMsg(!showSentEmailMsg);
    }
  };

  console.log({ showSentEmailMsg });

  const validateForm = () => {
    let isValid = true;
    let emailError;

    if (!email) {
      emailError = "Please enter email";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      emailError = "Please enter a valid email address";
      isValid = false;
    } else {
      emailError = "";
    }

    setEmailError(emailError);
    return isValid;
  };

  const handleOnChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="forget-password-container">
      <div className={`animation-card ${showSentEmailMsg ? " active" : ""}`}>
        <EmailSent
          title="EMAIL SENT"
          subTitle="Please check your email and follow the prompt"
        />
      </div>

      {!showSentEmailMsg && (
        <div className={`animation-card-height-one`}>
          <AccountDialog>
            <div className="forget-password">
              <div className="forget-password-img-container">
                <Image src={ForgotPasswordImg} loading={"lazy"} />
              </div>
              <FormTitle
                title="RESET YOUR PASSWORD"
                subTitle="Enter your  email address and select Send Email."
              />
              <div style={{ width: "100%" }}>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  icon={<EmailIcon />}
                  value={email}
                  onChange={handleOnChangeEmail}
                  className={`${email != "" && "active"}`}
                />
                {emailError && <ErrorMsg msg={emailError} />}
              </div>
              <div className="forget-password-divider"></div>

              <div className="forget-password-Buttons">
                <Link href={"/"}>
                  <div className="forget-password-Button">
                    <div className="forget-password-Button-text">
                      Back To Sign in
                    </div>
                  </div>
                </Link>
                <div
                  className="forget-password-Button bgGradient"
                  onClick={handleSentEmailMsg}
                >
                  <div className="textWhite">Send Email</div>
                </div>
              </div>
            </div>
          </AccountDialog>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
