"use client";
import React, { useEffect, useState } from "react";
import AccountDialog from "@/components/accountDialog/AccountDialog";
import "../style.scss";
import "@/app/signIn/style.scss";
import "@/app/page.scss";
import FormTitle from "@/components/form/FormTitle";
import Input from "@/components/form/Input";
import SelectInput from "@/components/form/SelectInput";
import {
  EmailIcon,
  UserIcon,
  PasswordIcon,
  GoogleSignInIcon,
  AppleSignInIcon,
} from "@/assets/Icons";
import Button from "@/components/button/Button";
import Checkbox from "@/components/checkbox/Checkbox";
import EmailSent from "@/components/EmailSent/EmailSent";
import ErrorMsg from "@/components/ErrorMsg";
import Loader from "@/components/Loader";
import Img from "@/assets/images/completed.png";
import TalentUserData from "../TalentUserData";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRegisterUserMutation } from "@/api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "@/store/slices/userDetailSlice";
import addData from "@/api/addData";

const TalentRegister = () => {
  const userDetails = useSelector((state) => state.user.userDetails);

  const router = useRouter();
  const [emailSent, setEmailSent] = useState(false);
  const [loader, setLoader] = useState(false);
  const [talentData, setTalentData] = useState(false);

  const dispatch = useDispatch();
  const [registerUser] = useRegisterUserMutation();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [formAdditionalData, setFormAdditionalData] = useState({
    types: [],
    virtualTypes: [],
    selectedStars: 0,
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

  // useEffect(() => {
  //   const containers = document.querySelectorAll(".redirect-button-container");
  //   containers.forEach((container) => {
  //     container.style.display = emailSent ? "none" : "block";
  //   });
  // }, [emailSent]);

  const goToBack = () => {
    setTalentData(false);
  };
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setTalentData(true);
    }
  };

  const handleAdditionalDataSubmit = async ({
    types,
    virtualTypes,
    selectedStars,
  }) => {
    if (
      userDetails &&
      Object.keys(userDetails).length > 0 &&
      !userDetails?.is_password
    ) {
      const userObj = { ...userDetails };
      userObj["user_type"] = "talent";
      userObj["talent_type"] = types;
      userObj["virtual_worlds"] =
        virtualTypes.length === 0 && selectedStars ? "yes" : "no";
      userObj["experience"] = virtualTypes.length === 0 && selectedStars;
      userObj["familiar_with"] = virtualTypes;
      dispatch(setUserDetails(userObj));
      const newlyAdded = await addData("users", userObj);

      if (newlyAdded && !newlyAdded?.error) {
        router.push("/account");
        dispatch(setUserDetails(userObj));
      }
    } else {
      // try {
      const registerTalent = {
        email: formData?.email,
        password: formData?.password,
        first_name: formData?.first_name,
        last_name: formData?.last_name,
        user_type: "talent",
        talent_type: types,
        virtual_worlds:
          virtualTypes.length === 0 && selectedStars ? "yes" : "no",
        experience: virtualTypes.length === 0 && selectedStars,
        familiar_with: virtualTypes,
        is_password: true,
      };

      const newlyAdded = await addData("users", registerTalent);

      if (newlyAdded && !newlyAdded?.error) {
        router.push("/account");
        dispatch(setUserDetails(registerTalent));
      }
      //   const data = await registerUser(registerTalent);

      //   if (data?.data?.status === 200) {
      //     router.push("/");
      //     setEmailSent(formData);
      //   } else {
      //     const newErrors = { ...errors };
      //     newErrors.clientRegisterError = data?.error?.data?.message;
      //     setErrors(newErrors);
      //   }
      // } catch (error) {
      //   console.log({ error });
      // }
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

  useEffect(() => {
    if (Object?.keys(userDetails).length > 0 && !userDetails?.is_password) {
      setTalentData(true);
    }
  }, [userDetails]);

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
              {talentData ? (
                <TalentUserData
                  goToBack={goToBack}
                  setEmailSent={setEmailSent}
                  handleSubmit={handleAdditionalDataSubmit}
                  errors={errors}
                />
              ) : (
                <div className="flex justify-center py-5 px-0">
                  <AccountDialog>
                    <div className="flex gap-8 flex-col justify-center items-center">
                      <FormTitle
                        title="JOIN AS A TALENT"
                        subTitle="Enter your name and  email address to receive updates  on your activities."
                      />
                      <div className="w-[100%] flex gap-8 flex-col justify-center items-center">
                        <div className="flex justify-between gap-4 w-full max-md:flex-col max-md:justify-center max-md:w-full max-md:gap-8">
                          <Input
                            type="text"
                            name="first_name"
                            placeholder="First Name"
                            icon={<UserIcon />}
                            halfWidth={true}
                            value={formData.first_name}
                            onChange={handleInputChange}
                            className={`${
                              formData.first_name != "" && "active"
                            }`}
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
                            className={`${
                              formData.last_name != "" && "active"
                            }`}
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
                        <div className="flex justify-between gap-4 w-full max-md:flex-col max-md:justify-center max-md:w-full max-md:gap-8">
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
                        <Button
                          type="button"
                          text="Continue  To Register"
                          clickFun={handleSubmit}
                        />

                        <div className="linePartition">Or</div>

                        <div className="flex flex-col md:flex-row justify-between w-full gap-4">
                          <div className="w-full flex max-w-full h-12 px-3 py-[18px] gap-5 justify-center items-center flex-[1_0_0] border border-white rounded-[8px] ">
                            <div
                              className="text-white text-center text-[14px] md:text-[18px] font-medium leading-normal "
                              // onClick={handleSignInWithGoogle}
                            >
                              Sign in with Google
                            </div>
                            <div>
                              <GoogleSignInIcon />{" "}
                            </div>
                          </div>
                          <div className="w-full flex max-w-full h-12 px-3 py-[18px] gap-5 justify-center items-center flex-[1_0_0] border border-white rounded-[8px]">
                            <div
                              className="text-white text-center text-[14px] md:text-[18px] font-medium leading-normal "
                              // onClick={handleSignInWithApple}
                            >
                              Sign in with Apple
                            </div>
                            <div>
                              <AppleSignInIcon />{" "}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-8 flex-col">
                          <div className="text-[20px] font-medium leading-normal foundation-violet-violet-200 text-center">
                            Already have an account?{" "}
                            <Link
                              className="font-medium no-underline foundation-blue-primary-blue-500"
                              href={"/"}
                            >
                              Sign In
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AccountDialog>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default TalentRegister;
