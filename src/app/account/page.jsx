"use client";
import React, { useState } from "react";
import WelcomePopup from "../../components/welcome-popup/WelcomePopup";
const AccountPage = () => {
  const [showPopup, setPopup] = useState(true);

  return (
    <div className="signin-container">
      {showPopup && <WelcomePopup setPopup={setPopup} />}
    </div>
  );
};

export default AccountPage;
