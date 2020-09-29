import React, { useState } from "react";
import PropTypes from "prop-types";
import ViewOnMap from "./ViewOnMap";

import "../styles/ProfileCraneCard.css";

const ProfileCraneCard = ({
  _id,
  image,
  craneUser,
  craneCaption,
  craneRate,
  craneBackgroundRate,
  craneDescription,
  markers,
  userLocation,
  handleSendLike,
}) => {
  const [showInfo, setShowInfo] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(true);
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
    <div className="crane-card">
      <img className="card-image" src={image} alt="crane"></img>
      <div className="username">{craneUser}</div>
      <div>{craneCaption}</div>

      {showMoreButton && (
        <button
          type="submit"
          className="show-more-button"
          onClick={() => handleImageClick()}
        >
          See more info
        </button>
      )}

      {showInfo && (
        <div className="extra-info">
          <div className="extra-info-items">CRANE RATE- {craneRate}</div>
          <div className="extra-info-items">
            BACKDROP RATE- {craneBackgroundRate}
          </div>
          <div className="extra-info-items">COMMENT- {craneDescription}</div>
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
          <button
            type="submit"
            className="like-button"
            onClick={() => handleSendLike(_id)}
          >
            Like
          </button>
          <button onClick={handleHideInfo}>Show less</button>
        </div>
      )}

      {showMap && <ViewOnMap markers={markers} />}
    </div>
  );
};

ProfileCraneCard.propType = {
  _id: PropTypes.string.isRequired,
  craneUser: PropTypes.string.isRequired,
  craneCaption: PropTypes.string.isRequired,
  craneRate: PropTypes.number.isRequired,
  craneBackgroundRate: PropTypes.number.isRequired,
  craneDescription: PropTypes.string.isRequired,
  markers: PropTypes.array.isRequired,
  userLocation: PropTypes.object,
  handleSendLike: PropTypes.func.isRequired,
};

export default ProfileCraneCard;
