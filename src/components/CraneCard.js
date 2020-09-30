import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import moment from "moment";
import Modal from "react-modal";
import PopUpProfile from "./PopUpProfile";
import ViewOnMap from "./ViewOnMap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faAngleDown,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faOutlineHeart } from "@fortawesome/fontawesome-free-regular";
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
  userLocation,
  handleSendLike,
  handleSendUnlike,
  numberOfLikes,
  handleSetUserLike,
  handleRemoveUserLike,
  username,
  userId,
}) => {
  const [showInfo, setShowInfo] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(true);
  const [showLessButton, setShowLessButton] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showMapButton, setShowMapButton] = useState(true);
  const [usersCranes, setUsersCranes] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [likeButton, setLikeButton] = useState(true);
  const [unlikeButton, setUnlikeButton] = useState(false);

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

  const handleBothLikes = () => {
    handleSendLike(_id);
    handleSetUserLike(userId);
    setLikeButton(false);
    setUnlikeButton(true);
  };

  const handleRemoveBothLikes = () => {
    handleSendUnlike(_id);
    handleRemoveUserLike(userId);
    setLikeButton(true);
    setUnlikeButton(false);
  };

  const handleGetUserInfo = () => {
    axios
      .get("https://test-crane.herokuapp.com/craneUser", {
        params: {
          craneUser: craneUser,
        },
      })
      .then(({ data }) => {
        setUsersCranes(data);
        return axios
          .get(`https://test-crane.herokuapp.com/${userId}/users`)
          .then(({ data }) => {
            setUserInfo(data);
            setShowProfile(true);
          });
      });
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
      <div className="likes">
        {likeButton && (
          <button
            type="submit"
            className="like-button"
            onClick={handleBothLikes}
          >
            <FontAwesomeIcon icon={faOutlineHeart} className="like-icon" />
          </button>
        )}
        {unlikeButton && (
          <button
            type="submit"
            className="like-button"
            onClick={handleRemoveBothLikes}
          >
            <FontAwesomeIcon icon={faHeart} className="like-icon" />
          </button>
        )}
        {numberOfLikes}
      </div>
      <div className="basic-info" onClick={handleGetUserInfo}>
        {showMoreButton && (
          <button
            className="show-more-button"
            onClick={() => handleImageClick()}
          >
            <FontAwesomeIcon icon={faAngleRight} className="show-more-button" />
          </button>
        )}
        {showLessButton && (
          <button className="show-more-button" onClick={handleHideInfo}>
            <FontAwesomeIcon icon={faAngleDown} className="show-more-button" />
          </button>
        )}
        <strong className="username">{username}</strong>
        <p>{craneCaption}</p>
      </div>
      {showInfo && (
        <div className="extra-info">
          <div className="extra-info-items">
            <strong>Crane Rate:</strong> {craneRate}
            <br />
            <strong>Location Rate:</strong> {craneBackgroundRate}
            <br />
            <strong>Comment:</strong> {craneDescription}
            {userLocation.latitude === "" && userLocation.longitude === "" ? (
              <p className="crane-distance">
                Turn on location settings to see distance from you
              </p>
            ) : (
              <p className="crane-distance">
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
            top: "15%",
            left: "5%",
            right: "0px",
            bottom: "0px",
            background: "none",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            outline: "none",
          },
        }}
      >
        <PopUpProfile
          username={username}
          memberSince={moment(userInfo.MemberSince).format("Do MMM yy")}
          addedCranes={usersCranes.length}
          respects={userInfo.LikesSent}
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
