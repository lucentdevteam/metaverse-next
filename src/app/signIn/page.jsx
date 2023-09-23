import React, { useEffect, useState } from "react";
import AccountDialog from "../../components/accountDialog/AccountDialog";
import "./style.scss";
import FormTitle from "../../components/form/FormTitle";
import Input from "../../components/form/Input";
import {
  AppleSignInIcon,
  EmailIcon,
  GoogleSignInIcon,
  PasswordIcon,
} from "../../assets/Icons";
import Button from "../../components/button/Button";
import Checkbox from "../../components/checkbox/Checkbox";
import EmailSent from "../../components/EmailSent/EmailSent";
import ErrorMsg from "../../components/ErrorMsg";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useLoginUserMutation } from "@/api/authApi";
import { useRouter } from "next/navigation";
import {
  setIsUserLoggedIn,
  setUserDetails,
} from "@/store/slices/userDetailSlice";
import { UserAuth } from "@/firebase/AuthContext";
import { getIsUserExist } from "@/api/utils";

const SignIn = () => {
  const dispatch = useDispatch();
  const { user, googleSignIn, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);
  const [loginUser] = useLoginUserMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const userDetails = useSelector((state) => state);

  const router = useRouter();
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleKeepLoggedIn = () => {
    setKeepLoggedIn(!keepLoggedIn);
  };

  const handleOnChangeEmail = (e) => {
    setEmail(e.target.value);
    setLoginError("");
  };

  const handleOnChangePassword = (e) => {
    setPassword(e.target.value);
    setLoginError("");
  };

  const validateForm = () => {
    let isValid = true;
    let emailError;
    let passwordError;

    if (!email) {
      emailError = "Please enter email";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      emailError = "Invalid email format";
      isValid = false;
    } else {
      emailError = "";
    }

    if (!password) {
      passwordError = "Please enter password";
      isValid = false;
    } else if (password.length < 6) {
      passwordError = "Password must be at least 6 characters long";
      isValid = false;
    } else {
      passwordError = "";
    }

    setEmailError(emailError);
    setPasswordError(passwordError);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        // const payload = {
        //   email,
        //   password,
        // };
        // const data = await loginUser(payload).unwrap();
        // console.log("Login ", data);
        // if (data?.data) {
        //   dispatch(setUserDetails(data?.data));
        //  }

        let isExist = await getIsUserExist(email);

        if (isExist && Object?.keys(isExist).length > 0) {
          if (isExist?.is_password?.booleanValue) {
            if (isExist?.password?.stringValue === password) {
              const userdata = {
                email: isExist?.email?.stringValue,
                password: isExist?.password?.stringValue || "",
                first_name: isExist?.first_name?.stringValue,
                last_name: isExist?.last_name?.stringValue,
                country: isExist?.country?.stringValue || "India",
                user_type: isExist?.user_type?.stringValue || "",
                talent_type: isExist?.talent_type?.arrayValue || "",
                virtual_worlds: isExist?.virtual_worlds?.stringValue || "",
                experience: isExist?.experience?.integerValue || "",
                familiar_with: isExist?.familiar_with?.arrayValue || "",
                is_password: false,
              };

              dispatch(setUserDetails(userdata));

              router.push("/account");
            } else {
              setLoginError("Incorrect Password");
            }
          } else {
            setLoginError(
              "Please log in using google , as You already registered with google"
            );
          }
        } else {
          setLoginError("Email is not registered");
        }
      } catch (error) {
        console.log("Error : ", error);
        setLoginError(error?.data?.message);
      }
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    dispatch(setUserDetails({}));
    dispatch(setIsUserLoggedIn(false));
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      async function getIsUserExistsOrNot() {
        try {
          let isExist = await getIsUserExist(user?.email);
          if (isExist && Object?.keys(isExist).length > 0) {
            const userdata = {
              email: isExist?.email?.stringValue,
              password: isExist?.password?.stringValue || "",
              first_name: isExist?.first_name?.stringValue,
              last_name: isExist?.last_name?.stringValue,
              country: isExist?.country?.stringValue || "India",
              user_type: isExist?.user_type?.stringValue || "",
              talent_type: isExist?.talent_type?.arrayValue || "",
              virtual_worlds: isExist?.virtual_worlds?.stringValue || "",
              experience: isExist?.experience?.integerValue || "",
              familiar_with: isExist?.familiar_with?.arrayValue || "",
              is_password: false,
            };

            dispatch(setUserDetails(userdata));

            router.push("/account");
          } else {
            var name = user?.displayName.split(" ");

            const userdata = {
              email: user?.email,
              password: "",
              first_name: name?.[0],
              last_name: name?.slice(1).join(" "),
              country: "India",
              user_type: "",
              talent_type: "",
              virtual_worlds: "",
              experience: "",
              familiar_with: "",
              is_password: false,
            };
            dispatch(setUserDetails(userdata));
            router.push("/register");
          }
        } catch (error) {
          console.log({ error });
        }
      }

      getIsUserExistsOrNot();
    }
  }, [user]);

  return (
    <div className="signin-container animation-card-height-one">
      <AccountDialog>
        <div className="signIn-form">
          <FormTitle
            title="WELCOME BACK"
            subTitle="Enter your name and email address to receive updates on your activities."
          />
          <div className="signIn-form-fields">
            <div className="input-and-error">
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
            <div className="input-and-error">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                typePass={true}
                placeholder="Password"
                icon={<PasswordIcon />}
                displayEye={showPassword}
                handleShowPassword={handleShowPassword}
                value={password}
                onChange={handleOnChangePassword}
                className={`${password != "" && "active"}`}
              />
              {passwordError && <ErrorMsg msg={passwordError} />}
            </div>
            <div style={{ width: "100%" }}>
              <Button type="button" text="Submit" clickFun={handleSubmit} />
              <div>{loginError && <ErrorMsg msg={loginError} />}</div>
            </div>

            <div className="checkboxAndForgetPasswordContainer">
              <Checkbox
                isChecked={keepLoggedIn}
                setIsChecked={handleKeepLoggedIn}
              />
              <Link
                className="forgetPasswordContainer"
                href={"/forget-password"}
              >
                {" "}
                Forget Password{" "}
              </Link>
            </div>

            <div className="linePartition">Or</div>

            <div className="signInOptions">
              <div className="signInOptionButton">
                <div
                  className="signInOptionButtonText"
                  onClick={handleSignInWithGoogle}
                >
                  Sign in with Google
                </div>
                <div>
                  <GoogleSignInIcon />{" "}
                </div>
              </div>
              <div className="signInOptionButton">
                <div className="signInOptionButtonText" onClick={handleSignOut}>
                  Sign in with Apple
                </div>
                <div>
                  <AppleSignInIcon />{" "}
                </div>
              </div>
            </div>

            <div className="notHaveAccount">
              Don’t have an account?{" "}
              <Link href={"/register"}> Register here </Link>
            </div>
          </div>
        </div>
      </AccountDialog>
    </div>
  );
};

export default SignIn;
