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
import { motion } from "framer-motion";

const ForgetPassword = ({ handleBackBtnClick }) => {
  const [email, setEmail] = useState("");
  const [showSentEmailMsg, setShowSentEmailMsg] = useState(false);
  const [emailError, setEmailError] = useState("");

  // useEffect(() => {
  //   const containers = document.querySelectorAll(".redirect-button-container");
  //   containers.forEach((container) => {
  //     container.style.display = showSentEmailMsg ? "none" : "block";
  //   });
  // }, [showSentEmailMsg]);

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

  const visible = { opacity: 1, y: 0, transition: { duration: 0.5 } };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible,
  };

  console.log("HELLOOO ");

  return (
    <motion.div className="forget-password-container">
      {/* <div className={`animation-card ${showSentEmailMsg ? " active" : ""}`}>
        <EmailSent
          title="EMAIL SENT"
          subTitle="Please check your email and follow the prompt"
        />
      </div> */}

      {/* {!showSentEmailMsg && ( */}
      <div className={`animation-card-height-one`}>
        {/* <AccountDialog> */}
        <motion.div
        // layout
        // initial="hidden"
        // animate="visible"
        // exit={{ opacity: 0, transition: { duration: 1 } }}
        // variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
        ></motion.div>
        <div className="forget-password">
          <motion.div
            className="forget-password-img-container"
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible,
            }}
          >
            <Image src={ForgotPasswordImg} loading={"lazy"} />
          </motion.div>
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FormTitle
              title="RESET YOUR PASSWORD"
              subTitle="Enter your  email address and select Send Email."
            />
          </motion.div>
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
            <div>
              <div
                className="forget-password-Button"
                onClick={handleBackBtnClick}
              >
                <div className="forget-password-Button-text">
                  Back To Sign in
                </div>
              </div>
            </div>
            <div
              className="forget-password-Button bgGradient"
              onClick={handleSentEmailMsg}
            >
              <div className="textWhite">Send Email</div>
            </div>
          </div>
        </div>
        {/* </AccountDialog> */}
      </div>
      {/* // )} */}
    </motion.div>
  );
};

export default ForgetPassword;
