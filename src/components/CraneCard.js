import React, { useState } from "react";
import Modal from "react-modal";
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

      {showMoreButton && (
        <button
          type="submit"
          className="showMoreButton"
          onClick={() => handleImageClick()}
        >
          See more info
        </button>
      )}

      {showInfo && (
        <div className="extraInfo">
          <div className="extraInfo-items">CRANE RATE- {craneRate}</div>
          <div className="extraInfo-items">BACKDROP RATE- {backdropRate}</div>
          <div className="extraInfo-items">COMMENT- {comment}</div>
          <button type="submit">VIEW ON MAP</button>
          <button type="submit" className="likeButton">
            Like
          </button>
          <button onClick={handleHideInfo}>Show less</button>
        </div>
      )}

      <Modal
        isOpen={showProfile}
        portalClassName="modal"
        style={{
          content: {
            top: "0%",
            left: "0",
            width: "60%",
          },
          overlay: {
            background: "none",
          },
        }}
      >
        <PopUpProfile
          user="ethanscranes"
          memberSince="01/01/01"
          addedCranes="10"
          respects="10"
          handleHideProfile={handleHideProfile}
        />
      </Modal>
    </div>
  );
};

export default CraneCard;
