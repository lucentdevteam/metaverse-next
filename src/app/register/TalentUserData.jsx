import React, { useState } from "react";
import Checkbox from "@/components/checkbox/Checkbox";
import AccountDialog from "@/components/accountDialog/AccountDialog";
import "./style.scss";
import FormTitle from "@/components/form/FormTitle";
import Input from "@/components/form/Input";
import ErrorMsg from "@/components/ErrorMsg";
import Button from "@/components/button/Button";
import Devider from "@/components/Devider";
import SelectedStar from "@/assets/images/SelectedStar.svg";
import UnSelectedStar from "@/assets/images/UnselectedStar.svg";
import RadioUnchecked from "@/assets/images/Radio_Unchecked.svg";
import RadioUncheckedPink from "@/assets/images/Radio_checked.svg";
import RadioUncheckedGray from "@/assets/images/Radio_checked1.svg";
import RadioUncheckedBlue from "@/assets/images/Radio_checked2.svg";
import Image from "next/image";
import Link from "next/link";

const TalentUserData = ({ setEmailSent, goToBack, handleSubmit, errors }) => {
  const [types, setTypes] = useState([]);
  const [virtual, setvirtual] = useState("");
  const [virtualId, setvirtualId] = useState(-1);
  const [virtualTypes, setVirtualTypes] = useState([]);
  const [selectedStars, setSelectedStars] = useState(0);
  const totalStars = 5;

  const typesList = [
    "Metaverse",
    "Modelers",
    "Architect",
    "Web3",
    "AI Experts",
    "Artist & Creator",
    "Designer",
    "Animators",
    "Animators",
    "Game Developer",
    "Managers",
    "Managers",
  ];
  const virtuals = [
    {
      title: "Yes, I’ve built worlds before.",
      selectedIcon: RadioUncheckedBlue,
      unselected: RadioUnchecked,
    },
    {
      title: "No I’m new to this.",
      selectedIcon: RadioUncheckedPink,
      unselected: RadioUnchecked,
    },
    {
      title: "I’m not sure?",
      selectedIcon: RadioUncheckedGray,
      unselected: RadioUnchecked,
    },
  ];

  const virtualContentList = [
    "Unreal Engine",
    "Cinema 4D",
    "Unity",
    "Blender",
    "3D Studio Max",
    "Nuclino",
    "Maya",
    "Revit",
    "Others",
  ];

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= totalStars; i++) {
      const isSelected = i <= selectedStars;

      const item = (
        <div onClick={() => handleStarClick(i)}>
          {isSelected ? (
            <Image src={SelectedStar} />
          ) : (
            <Image src={UnSelectedStar} />
          )}
        </div>
      );
      stars.push(item);
    }
    return stars;
  };

  const handleStarClick = (starCount) => {
    setSelectedStars(starCount);
  };

  const handleVirtualTypes = (item) => {
    let newItems = [...virtualTypes];
    const index = newItems.indexOf(item);

    if (index > -1) {
      newItems.splice(index, 1);
    } else {
      newItems.push(item);
    }
    setVirtualTypes(newItems);
  };

  const renderVirtualContent = () => {
    switch (virtualId) {
      case 0:
        return (
          <div className="text-white mt-5">
            <h4 className="text-[32px] font-light text-left text-white m-0 tracking-[1px] ">
              How would you describe your experience with building in the
              metaverse?
            </h4>

            <div className="py-5 px-0 flex justify-between max-m">
              <div className="">
                <div className="virtual-content-rating-details-text-details">
                  1 = I’m new to this.{" "}
                </div>
                <div className="virtual-content-rating-details-text-details">
                  5 = I’ve built wolrds in Metaverse before.
                </div>
              </div>
              <div className="virtual-content-rating-starts">
                {renderStars()}
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="text-white mt-5">
            <h4 className="text-[32px] font-light text-left text-white m-0 tracking-[1px] ">
              What type of 3D creation software are you familiar with?
            </h4>

            <div className="virtual-content-types-list">
              {virtualContentList.map((item) => {
                return (
                  <div className="virtual-content-type-item">
                    <div className="checkboxAndForgetPasswordContainer">
                      <Checkbox
                        isChecked={virtualTypes.includes(item)}
                        setIsChecked={() => handleVirtualTypes(item)}
                        label={item}
                        whiteLabel={true}
                      ></Checkbox>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 2:
        return null;

      default:
        return null;
    }
  };

  const handletypes = (item) => {
    let newItems = [...types];
    const index = newItems.indexOf(item);

    if (index > -1) {
      newItems.splice(index, 1);
    } else {
      newItems.push(item);
    }
    setTypes(newItems);
  };

  const handleTalentuserData = () => {
    handleSubmit({ types, virtualTypes, selectedStars });
    // setEmailSent(true);
  };

  return (
    <div className="flex justify-center py-5 px-0 animation-card-height-one">
      <AccountDialog>
        <div className="signIn-form">
          <FormTitle
            title="YOU ARE ALMOST THERE"
            subTitle="Please fill out the rest information"
          />
          <div className="border border-[#686b72] w-full"></div>
          <div className="w-full flex gap-8 flex-col justify-center items-center full-width">
            <div className="types-container">
              <h4 className="text-[32px] font-light text-left tracking-[1px] text-white mx-3">
                Please select talent type
              </h4>
              <div className="flex justify-between flex-wrap">
                {typesList.map((item) => {
                  return (
                    <div className="min-w-[33.33%] mb-3">
                      <div className="checkboxAndForgetPasswordContainer">
                        <Checkbox
                          isChecked={types.includes(item)}
                          setIsChecked={() => handletypes(item)}
                          label={item}
                          whiteLabel={true}
                        ></Checkbox>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="devider"></div>
            <div className="flex justify-between flex-wrap">
              <h4 className="text-[32px] font-light text-left tracking-[1px] text-white mx-3">
                Have you built virtual worlds before?
              </h4>
              <div className="flex justify-between flex-wrap w-full">
                {virtuals.map((item, i) => {
                  return (
                    <div className="w-full">
                      <div className="inline-flex mb-3 cursor-pointer rounded-[32px] border border-[#315866] bg-[#1a272c] px-4 py-[7px]  text-white text-[16px]">
                        <Image
                          src={
                            item.title == virtual
                              ? item?.selectedIcon
                              : item?.unselected
                          }
                          onClick={() => {
                            setvirtual(item.title);
                            setvirtualId(i);
                          }}
                        />
                        <label
                          className="cursor-pointer pl-[10px] flex justify-center items-center"
                          onClick={() => {
                            setvirtual(item.title);
                            setvirtualId(i);
                          }}
                          style={{ cursor: "pointer", paddingLeft: "10px" }}
                          for={`${item.title}-${i}`}
                        >
                          {item.title}
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
              {renderVirtualContent()}
            </div>
            <div className="devider"></div>
            <div style={{ width: "100%" }}>
              <div className="btn-wrap">
                <button
                  type="button"
                  onClick={goToBack}
                  className="secondaryBtn btn-1"
                >
                  Back
                </button>

                <Button
                  clickFun={handleTalentuserData}
                  type="button"
                  text="Submit"
                />
              </div>
              {errors.clientRegisterError && (
                <ErrorMsg msg={errors.clientRegisterError} />
              )}
            </div>

            <div className="register-container">
              <div className="link-to-sign violet-color">
                Already have an account?{" "}
                <Link href="/" className="blue-color font-500">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </AccountDialog>
    </div>
  );
};

export default TalentUserData;
