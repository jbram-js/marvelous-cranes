import React, { useState } from "react";

import "../styles/CraneCard.css";

const CraneCard = ({
  image,
  user,
  caption,
  craneRate,
  backdropRate,
  comment,
}) => {
  const [showInfo, setShowInfo] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(true);

  const handleImageClick = () => {
    setShowInfo(true);
    setShowMoreButton(false);
  };

  const handleHideInfo = () => {
    setShowInfo(false);
    setShowMoreButton(true);
  };
  return (
    <div className="CraneCard">
      <img className="card-image" src={image} alt="crane"></img>
      <div className="username">{user}</div>
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
    </div>
  );
};

export default CraneCard;
