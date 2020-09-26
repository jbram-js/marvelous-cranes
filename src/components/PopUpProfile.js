import React from "react";
import PropTypes from "prop-types";

import "../styles/PopUpProfile.css";

const PopUpProfile = ({
  craneUser,
  memberSince,
  addedCranes,
  respects,
  handleHideProfile,
}) => {
  return (
    <div className="PopUpProfile">
      <div className="popup-username">{craneUser}</div>
      <div>MEMBER SINCE- {memberSince}</div>
      <div>CRANES ADDED- {addedCranes}</div>
      <div>RESPECTS GIVEN- {respects}</div>
      <button type="submit" onClick={() => handleHideProfile()}>
        Close
      </button>
    </div>
  );
};

export default PopUpProfile;
