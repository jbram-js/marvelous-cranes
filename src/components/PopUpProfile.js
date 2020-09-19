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
