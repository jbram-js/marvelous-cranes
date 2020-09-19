import React from "react";

import "../styles/PopUpProfile.css";

const PopUpProfile = ({
  user,
  memberSince,
  addedCranes,
  respects,
  handleHideProfile,
}) => {
  return (
    <div className="PopUpProfile">
      <div>{user}</div>
      <div>{memberSince}</div>
      <div>{addedCranes}</div>
      <div>{respects}</div>
      <button type="submit" onClick={() => handleHideProfile()}>
        Close
      </button>
    </div>
  );
};

export default PopUpProfile;
