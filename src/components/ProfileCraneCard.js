import React, { useState } from "react";
import PropTypes from "prop-types";
import ViewOnMap from "./ViewOnMap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faAngleDown,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

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
  numberOfLikes,
  userLocation,
  username,
}) => {
  const [showInfo, setShowInfo] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(true);
  const [showLessButton, setShowLessButton] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showMapButton, setShowMapButton] = useState(true);

  const handleImageClick = () => {
    setShowInfo(true);
    setShowMoreButton(false);
    setShowLessButton(true);
  };

  const handleHideInfo = () => {
    setShowInfo(false);
    setShowMoreButton(true);
    setShowLessButton(false);
    setShowMap(false);
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
    <div className="crane-card-profile">
      <img className="card-image-profile" src={image} alt="crane"></img>

      <div className="likes-profile">
        <FontAwesomeIcon icon={faHeart} className="like-icon-profile" />

        {numberOfLikes}
      </div>

      <div className="basic-info-profile">
        {showMoreButton && (
          <button
            className="show-more-button-profile"
            onClick={() => handleImageClick()}
          >
            <FontAwesomeIcon
              icon={faAngleRight}
              className="show-more-button-profile"
            />
          </button>
        )}
        {showLessButton && (
          <button className="show-more-button-profile" onClick={handleHideInfo}>
            <FontAwesomeIcon
              icon={faAngleDown}
              className="show-more-button-profile"
            />
          </button>
        )}
        <strong className="username">{username}</strong>
        <p>{craneCaption}</p>
      </div>

      {showInfo && (
        <div className="extra-info-profile">
          <div className="extra-info-items-profile">
            <strong>Crane Rate:</strong> {craneRate}
            <br />
            <strong>Location Rate:</strong> {craneBackgroundRate}
            <br />
            <strong>Comment:</strong> {craneDescription}
            {userLocation.latitude === "" && userLocation.longitude === "" ? (
              <p className="crane-distance-profile">
                Turn on location settings to see distance from you
              </p>
            ) : (
              <p className="crane-distance-profile">
                This crane is <strong>{distances()} miles</strong> from you
              </p>
            )}
          </div>
          {showMapButton && (
            <button type="submit" onClick={handleShowViewOnMap}>
              VIEW ON MAP
            </button>
          )}
          {showMap && <button onClick={handleHideViewOnMap}>HIDE MAP</button>}
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
