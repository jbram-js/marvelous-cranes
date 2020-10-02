import React from "react";
import PropTypes from "prop-types";

import "../styles/PopUpProfile.css";

const PopUpProfile = ({
  username,
  memberSince,
  addedCranes,
  respects,
  handleHideProfile,
}) => {
  return (
    <div className="popup-profile">
      <div className="popup-username">{username}</div>
      <div>
        <strong>Member since:</strong> {memberSince}
      </div>
      <div>
        <strong>Cranes added:</strong> {addedCranes}
      </div>
      <div>
        <strong>Respects gained:</strong> {respects}
      </div>
      <button type="submit" onClick={() => handleHideProfile()}>
        CLOSE
      </button>
    </div>
  );
};

export default PopUpProfile;
