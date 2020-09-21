import React, { useState } from "react";
import Modal from "react-modal";
import PopUpProfile from "./PopUpProfile";
import ViewOnMap from "./ViewOnMap";

import "../styles/CraneCard.css";

const CraneCard = ({
  image,
  craneUser,
  craneCaption,
  craneRate,
  craneBackgroundRate,
  craneDescription,
  markers,
}) => {
  const [showInfo, setShowInfo] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showMapButton, setShowMapButton] = useState(true);

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

  const handleShowViewOnMap = () => {
    setShowMap(true);
    setShowMapButton(false);
  };

  const handleHideViewOnMap = () => {
    setShowMap(false);
    setShowMapButton(true);
  };

  return (
    <div className="CraneCard">
      <img className="card-image" src={image} alt="crane"></img>
      <div className="username" onClick={() => handleShowProfile()}>
        {craneUser}
      </div>
      <div>{craneCaption}</div>

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
          <div className="extraInfo-items">
            BACKDROP RATE- {craneBackgroundRate}
          </div>
          <div className="extraInfo-items">COMMENT- {craneDescription}</div>
          {showMapButton && (
            <button type="submit" onClick={handleShowViewOnMap}>
              VIEW ON MAP
            </button>
          )}
          {showMap && <button onClick={handleHideViewOnMap}>HIDE MAP</button>}
          <button type="submit" className="likeButton">
            Like
          </button>
          <button onClick={handleHideInfo}>Show less</button>
        </div>
      )}

      {showMap && <ViewOnMap markers={markers} />}

      <Modal isOpen={showProfile}>
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
