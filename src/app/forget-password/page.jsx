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

const ForgetPassword = ({
  showForgetPasswordPage,
  setShowForgetPasswordPage,
}) => {
  const [email, setEmail] = useState("");
  const [showSentEmailMsg, setShowSentEmailMsg] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [forgetPwdFlag, setForgetPwdFlag] = useState(false);

  // useEffect(() => {
  //   const containers = document.querySelectorAll(".redirect-button-container");
  //   containers.forEach((container) => {
  //     container.style.display = showSentEmailMsg ? "none" : "block";
  //   });
  // }, [showSentEmailMsg]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setForgetPwdFlag(true);
    }, 100);

    return () => clearTimeout(delay);
  }, []);

  const handleSentEmailMsg = () => {
    if (validateForm()) {
      setShowSentEmailMsg(!showSentEmailMsg);
    }
  };

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
      <div className={`opacity-0 h-0 ${showSentEmailMsg ? " active" : ""}`}>
        <EmailSent
          title="EMAIL SENT"
          subTitle="Please check your email and follow the prompt"
        />
      </div>

      {!showSentEmailMsg && (
        <div className={`animation-card-height-one`}>
          <AccountDialog>
            <div className="forget-password">
              <div
                className={`forget-password-img-container ${
                  forgetPwdFlag ? "adjust-margin" : ""
                }`}
              >
                <Image src={ForgotPasswordImg} loading={"lazy"} />
              </div>
              <FormTitle
                title="RESET YOUR PASSWORD"
                subTitle="Enter your  email address and select Send Email."
                component={showForgetPasswordPage ? "forget-pwd" : ""}
                flag={forgetPwdFlag ? "forget-pwd-active" : ""}
              />
              <div className="w-full">
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  icon={<EmailIcon />}
                  value={email}
                  onChange={handleOnChangeEmail}
                  className={`${email != "" ? "active" : ""}`}
                />
                {emailError && <ErrorMsg msg={emailError} />}
              </div>
              <div className="w-full h-[1px] bg-[#f1b0ea]"></div>

              <div className="forget-password-Buttons">
                {/* <Link href={"/"}> */}
                <div
                  className="forget-password-Button"
                  onClick={() => setShowForgetPasswordPage(false)}
                >
                  <div className="forget-password-Button-text">
                    Back To Sign in
                  </div>
                </div>
                {/* </Link> */}
                <div
                  className="flex w-full h-12 px-3 py-[18px] justify-center items-center gap-5 flex-[1_0_0] border-[1px]  border-solid border-white rounded-[8px] cursor-pointer bgGradientOne"
                  onClick={handleSentEmailMsg}
                >
                  <div className="textWhite text-[20px] font-semibold leading-normal">
                    Send Email
                  </div>
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
