import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import PopUpProfile from "./PopUpProfile";
import ViewOnMap from "./ViewOnMap";

import "../styles/CraneCard.css";

const CraneCard = ({
  _id,
  image,
  craneUser,
  craneCaption,
  craneRate,
  craneBackgroundRate,
  craneDescription,
  markers,
  craneLikes,
  userLocation,
  handleSendLike,
  handleSendUnlike,
  likeButton,
  unlikeButton,
  numberOfLikes,
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

  function distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;

    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit === "K") {
      dist = dist * 1.609344;
    }
    if (unit === "N") {
      dist = dist * 0.8684;
    }
    return dist;
  }

  const distances = () => {
    const inMiles = distance(
      userLocation.latitude,
      userLocation.longitude,
      markers[0].lat,
      markers[0].lng,
      "M"
    );
    return Math.round(inMiles * 1000) / 1000;
  };

  distances();

  return (
    <div className="CraneCard">
      <img className="card-image" src={image} alt="crane"></img>
      <div className="username" onClick={() => handleShowProfile()}>
        {craneUser}
      </div>
      <div>{craneCaption}</div>
      <div>{numberOfLikes} Likes</div>

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
          {userLocation.latitude === "" && userLocation.longitude === "" ? (
            <div>Turn on location settings to see distance from you</div>
          ) : (
            <div>This crane is {distances()} miles from you</div>
          )}
          {showMapButton && (
            <button type="submit" onClick={handleShowViewOnMap}>
              VIEW ON MAP
            </button>
          )}
          {showMap && <button onClick={handleHideViewOnMap}>HIDE MAP</button>}

          {likeButton && (
            <button
              type="submit"
              className="likeButton"
              onClick={() => handleSendLike(_id)}
            >
              Like
            </button>
          )}

          {unlikeButton && (
            <button
              type="submit"
              className="likeButton"
              onClick={() => handleSendUnlike(_id)}
            >
              Unlike
            </button>
          )}
          <button onClick={handleHideInfo}>Show less</button>
        </div>
      )}

      {showMap && <ViewOnMap markers={markers} />}

      <Modal
        isOpen={showProfile}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "none",
          },
          content: {
            position: "absolute",
            top: "60px",
            left: "0px",
            right: "0px",
            bottom: "0px",
            border: "1px solid #ccc",
            background: "none",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
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

CraneCard.propType = {
  _id: PropTypes.string.isRequired,
  craneUser: PropTypes.string.isRequired,
  craneCaption: PropTypes.string.isRequired,
  craneRate: PropTypes.number.isRequired,
  craneBackgroundRate: PropTypes.number.isRequired,
  craneDescription: PropTypes.string.isRequired,
  markers: PropTypes.array.isRequired,
  userLocation: PropTypes.object,
  handleSendLike: PropTypes.func.isRequired,
  handleSendUnlike: PropTypes.func.isRequired,
};
export default CraneCard;
