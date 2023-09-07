import React, { useState } from "react";
import FormTitle from "@/components/form/FormTitle";
import Button from "@/components/button/Button";
import ClientProfileIcon from "@/assets/images/Client.png";
import TalentProfileIcon from "@/assets/images/Talent.png";
import ErrorMsg from "@/components/ErrorMsg";
import Image from "next/image";
import { useRouter } from "next/navigation";
const SelectUser = () => {
  const [activeUser, setActiveUser] = useState("");

  const router = useRouter();

  const handleUser = (user) => {
    setActiveUser(user);
  };

  console.log({ activeUser });

  const goTORegister = () => {
    if (activeUser == "client") {
      router.push("register/client-register");
    } else if (activeUser == "talent") {
      router.push("register/talent-register");
    }
  };
  return (
    <div className="select-user animation-card-height-one">
      <FormTitle title="JOIN AS A CLIENT OR TALENT" />

      <div className="users">
        <div className="user-client" onClick={() => handleUser("client")}>
          <div
            className="profile"
            style={
              activeUser === "client"
                ? { backgroundColor: "#B12773" }
                : { backgroundColor: "#575757" }
            }
          >
            <Image src={ClientProfileIcon} alt="client-profile" />
          </div>
          <div
            className={`user-client-wrapper${
              activeUser == "client" ? " active" : " not-active"
            }`}
          >
            <input
              type="radio"
              checked={activeUser == "client"}
              name="user-type"
              className="user-radio"
              onChange={() => handleUser("client")}
            />
            <h5 className="user-type">I Am A Client</h5>
            <p className="user-description">
              I am hiring for a talent while exploring the metaverse and other
              features.
            </p>
          </div>
        </div>
        <div className="user-talent" onClick={() => handleUser("talent")}>
          <div
            className="profile"
            style={
              activeUser === "talent"
                ? { backgroundColor: "#0D8095" }
                : { backgroundColor: "#575757" }
            }
          >
            <Image src={TalentProfileIcon} alt="talent-profile" />
          </div>
          <div
            className={`user-talent-wrapper${
              activeUser == "talent" ? " active" : " not-active"
            }`}
          >
            <input
              type="radio"
              checked={activeUser == "talent"}
              name="user-type"
              className="user-radio"
              onChange={() => handleUser("talent")}
            />
            <h5 className="user-type">I Am A Talent</h5>
            <p className="user-description">
              I am a talent looking for work in the metaverse
            </p>
          </div>
        </div>
      </div>
      <Button
        type="button"
        text="Continue"
        clickFun={goTORegister}
        disable={activeUser !== "" ? false : true}
      />
    </div>
  );
};

export default SelectUser;
