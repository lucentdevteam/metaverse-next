import React, { useState } from "react";
import "./popup.scss";
import img from "./welcome-image.png";
import Image from "next/image";

const WelcomePopup = ({ setPopup }) => {
  return (
    <div className="welcome-popup">
      <div className="popup-wrapper">
        <div className="content">
          <div>
            <h4 className="title">
              Welcome <br></br> Wasiu!
            </h4>
            <h4 className="sub-title">Start with your first project post.</h4>
            <p className="text">Start with your first project post.</p>
            <div className="btn-wrapper">
              <button
                onClick={() => setPopup(false)}
                className="btn btn-1"
                type="button"
              >
                Go To Dashboard
              </button>
              <button
                onClick={() => setPopup(false)}
                className="btn btn-2"
                type="button"
              >
                Continue To Post Project
              </button>
            </div>
          </div>
        </div>
        <div className="img">
          <Image src={img} />
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;
