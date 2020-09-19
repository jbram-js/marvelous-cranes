import React, { useState } from "react";
import PopUpProfile from "./PopUpProfile";

import "../styles/CraneCard.css";

const CraneCard = ({
  image,
  username,
  caption,
  craneRate,
  backdropRate,
  comment,
}) => {
  const [showInfo, setShowInfo] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(true);
  const [showProfile, setShowProfile] = useState(false);

  const handleImageClick = () => {
    setShowInfo(true);
    setShowMoreButton(false);
  };

  const handleHideInfo = () => {
    setShowInfo(false);
    setShowMoreButton(true);
  };

  const handleShowProfile = () => {
    setShowProfile(true);
  };
  const handleHideProfile = () => {
    setShowProfile(false);
  };
  return (
    <div className="CraneCard">
      <img className="card-image" src={image} alt="crane"></img>
      <div className="username" onClick={() => handleShowProfile()}>
        {username}
      </div>
      <div>{caption}</div>
      <button type="submit">Like</button>

      {showMoreButton && (
        <button type="submit" onClick={() => handleImageClick()}>
          See more info
        </button>
      )}

      {showInfo && (
        <>
          <div>CRANE RATE:{craneRate}</div>
          <div>BACKDROP RATE:{backdropRate}</div>
          <div>COMMENT{comment}</div>
          <button type="submit">VIEW ON MAP</button>
          <button onClick={handleHideInfo}>Show less</button>
        </>
      )}

      {showProfile && (
        <>
          <PopUpProfile
            user="ethanscranes"
            memberSince="Ages ago"
            addedCranes="10"
            respects="10"
            handleHideProfile={handleHideProfile}
          />
        </>
      )}
    </div>
  );
};

export default CraneCard;
