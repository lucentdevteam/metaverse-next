"use client";

import React, { useEffect, useState } from "react";
import AccountDialog from "@/components/accountDialog/AccountDialog";
import "../style.scss";
import "@/app/signIn/style.scss";
import "@/app/page.scss";
import FormTitle from "@/components/form/FormTitle";
import Input from "@/components/form/Input";
import SelectInput from "@/components/form/SelectInput";
import { EmailIcon, UserIcon, PasswordIcon } from "@/assets/Icons";
import Button from "@/components/button/Button";
import Checkbox from "@/components/checkbox/Checkbox";
import EmailSent from "@/components/EmailSent/EmailSent";
import ErrorMsg from "@/components/ErrorMsg";
import Loader from "@/components/Loader";
import Img from "@/assets/images/completed.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRegisterUserMutation } from "@/api/authApi";
import { useDispatch } from "react-redux";
const ClientRegister = () => {
  const router = useRouter();

  const [emailSent, setEmailSent] = useState(false);
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    clientRegisterError: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const [agreed, setAgreed] = useState(false);
  const [agreedError, setAgreedError] = useState(false);

  const countries = [
    { label: "India", value: "india" },
    { label: "Canada", value: "canada" },
  ];
  const [country, setCountry] = useState(countries[0]);
  const dispatch = useDispatch();
  const [registerUser] = useRegisterUserMutation();

  useEffect(() => {
    const containers = document.querySelectorAll(".redirect-button-container");
    containers.forEach((container) => {
      container.style.display = emailSent ? "none" : "block";
    });
  }, [emailSent]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.first_name) {
      newErrors.first_name = "Please enter first name";
      isValid = false;
    } else {
      newErrors.first_name = "";
    }
    if (!formData.last_name) {
      newErrors.last_name = "Please enter last name";
      isValid = false;
    } else {
      newErrors.last_name = "";
    }
    if (!formData.email) {
      newErrors.email = "Please enter email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    } else {
      newErrors.email = "";
    }

    if (!formData.password) {
      newErrors.password = "Please enter password";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    } else {
      newErrors.password = "";
    }

    if (!formData.confirm_password) {
      newErrors.confirm_password = "Please enter confirm password";
      isValid = false;
    } else if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = "Password & confirm password does not match";
      isValid = false;
    } else {
      newErrors.confirm_password = "";
    }
    if (!agreed) {
      isValid = false;
      setAgreedError("Please accept the terms and conditions to proceed.");
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const registerClient = {
          email: formData?.email,
          password: formData?.password,
          first_name: formData?.first_name,
          last_name: formData?.last_name,
          country: "india",
          user_type: "client",
        };

        const data = await registerUser(registerClient);
        console.log("data", data);
        if (data?.data?.status === 200) {
          router.push("/");
          setEmailSent(formData);
        } else {
          const newErrors = { ...errors };
          newErrors.clientRegisterError = data?.error?.data?.message;
          console.log({ newErrors });
          setErrors(newErrors);
        }
      } catch (error) {
        const newErrors = { ...errors };
        newErrors.clientRegisterError = error?.data?.message;
        console.log({ newErrors });
        setErrors(newErrors);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAgreed = () => {
    setAgreedError(false);
    setAgreed(!agreed);
  };
  const handleLoader = () => {
    setLoader(true);
    setTimeout(() => {
      router.push("/account");
    }, 5000);
  };

  console.log({ errors });

  const resendBtn = (
    <p>
      Did not get verification mail?{" "}
      <a className="resend-btn" onClick={handleLoader}>
        Resend
      </a>
    </p>
  );
  const loaderTitle = (
    <h4>
      Account successfully created <Image src={Img} />
    </h4>
  );
  const termConditionText = (
    <p>
      I have read <a>terms and conditions</a> and <a>terms of clients</a> and I
      agree with the terms.
    </p>
  );
  return (
    <>
      {loader ? (
        <Loader title={loaderTitle} text="...redirecting you..." />
      ) : (
        <>
          {/* <div className={`animation-card ${emailSent ? " active" : ""}`}>
            <EmailSent
              title="Please check your email for verification"
              subTitle={resendBtn}
            />
          </div> */}
          {!emailSent && (
            <div
              className={`animation-card-height-one ${
                emailSent ? "" : " active"
              }`}
            >
              <div className="signin-container">
                <AccountDialog>
                  <div className="signIn-form">
                    <FormTitle
                      title="JOIN AS A CLIENT"
                      subTitle="Enter your name and  email address to receive updates  on your activities."
                    />
                    <div className="signIn-form-fields full-width">
                      <div className="fields-half-width">
                        <Input
                          type="text"
                          name="first_name"
                          placeholder="First Name"
                          icon={<UserIcon />}
                          halfWidth={true}
                          value={formData.first_name}
                          onChange={handleInputChange}
                          className={`${formData.first_name != "" && "active"}`}
                        >
                          {errors.first_name && (
                            <ErrorMsg msg={errors.first_name} />
                          )}
                        </Input>

                        <Input
                          type="text"
                          name="last_name"
                          placeholder="Last Name"
                          icon={<UserIcon />}
                          value={formData.last_name}
                          onChange={handleInputChange}
                          halfWidth={true}
                          className={`${formData.last_name != "" && "active"}`}
                        >
                          {errors.last_name && (
                            <ErrorMsg msg={errors.last_name} />
                          )}
                        </Input>
                      </div>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        icon={<EmailIcon />}
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`${formData.email != "" && "active"}`}
                      >
                        {errors.email && <ErrorMsg msg={errors.email} />}
                      </Input>
                      <div className="fields-half-width">
                        <Input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          typePass={true}
                          placeholder="Password"
                          icon={<PasswordIcon />}
                          displayEye={showPassword}
                          handleShowPassword={() =>
                            setShowPassword(!showPassword)
                          }
                          halfWidth={true}
                          value={formData.password}
                          onChange={handleInputChange}
                          className={`${formData.password != "" && "active"}`}
                        >
                          {errors.password && (
                            <ErrorMsg msg={errors.password} />
                          )}
                        </Input>
                        <Input
                          typePass={true}
                          type={showCPassword ? "text" : "password"}
                          name="confirm_password"
                          placeholder="Confirm Password"
                          icon={<PasswordIcon />}
                          displayEye={showCPassword}
                          handleShowPassword={() =>
                            setShowCPassword(!showCPassword)
                          }
                          value={formData.confirm_password}
                          onChange={handleInputChange}
                          halfWidth={true}
                          className={`${
                            formData.confirm_password != "" && "active"
                          }`}
                        >
                          {errors.confirm_password && (
                            <ErrorMsg msg={errors.confirm_password} />
                          )}
                        </Input>
                      </div>
                      <SelectInput
                        name="country"
                        value={country}
                        options={countries}
                      />
                      <div className="checkboxAndForgetPasswordContainer">
                        <Checkbox
                          isChecked={agreed}
                          setIsChecked={handleAgreed}
                          label={termConditionText}
                          whiteLabel={true}
                        >
                          <div className="term-condition-text">
                            {agreedError && <ErrorMsg msg={agreedError} />}
                          </div>
                        </Checkbox>
                      </div>
                      <div style={{ width: "100%" }}>
                        <Button
                          type="button"
                          text="Continue  To Register"
                          clickFun={handleSubmit}
                        />
                        {errors.clientRegisterError && (
                          <ErrorMsg msg={errors.clientRegisterError} />
                        )}
                      </div>

                      <div className="register-container">
                        <div className="link-to-sign violet-color">
                          Already have an account?{" "}
                          <Link className="blue-color font-500" href={"/"}>
                            Sign In
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccountDialog>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ClientRegister;
