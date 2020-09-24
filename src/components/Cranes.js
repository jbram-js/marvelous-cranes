import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useLocation } from "react-router-dom";
import CraneCard from "./CraneCard";
import FilterAndSort from "./FilterAndSort";

import placeholder from "../images/cranesafety.jpg";

import "../styles/Cranes.css";

const Cranes = ({ userLocation }) => {
  const [allCranes, setAllCranes] = useState([]);
  const [likeButton, setLikeButton] = useState(true);
  const [unlikeButton, setUnlikeButton] = useState(false);

  const { search } = useLocation();

  // main request when cranes page loads

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("https://test-crane.herokuapp.com/cranes")
        .then(({ data }) => {
          setAllCranes(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, [allCranes]);

  // request that handles sort and filters
  useEffect(() => {
    axios
      .get(`https://test-crane.herokuapp.com/cranes${search}`)
      .then(({ data }) => setAllCranes(data))
      .catch((err) => console.error(err));
  }, [search]);

  // patch request to send a like and unlike

  const handleSendLike = (craneID) => {
    axios
      .get("https://test-crane.herokuapp.com/craneID", {
        params: { id: JSON.stringify(craneID) },
      })
      .then(({ data }) => {
        const numberOfLikes = data[0].craneLikes;
        const addedLike = numberOfLikes + 1;
        const newCraneID = JSON.stringify(craneID);

        axios
          .patch(
            `https://test-crane.herokuapp.com/Increment?id=${newCraneID}`,
            {
              craneLikes: addedLike,
            }
          )
          .then(() => setLikeButton(false), setUnlikeButton(true));
      });
  };

  const handleSendUnlike = (craneID) => {
    axios
      .get("https://test-crane.herokuapp.com/craneID", {
        params: { id: JSON.stringify(craneID) },
      })
      .then(({ data }) => {
        const numberOfLikes = data[0].craneLikes;
        const removedLike = numberOfLikes - 1;
        const newCraneID = JSON.stringify(craneID);
        axios
          .patch(
            `https://test-crane.herokuapp.com/Increment?id=${newCraneID}`,
            {
              craneLikes: removedLike,
            }
          )
          .then(() => {
            setLikeButton(true);
            setUnlikeButton(false);
          });
      });
  };

  // filter by crane rate

  const handleCraneRateFilter = (a, b) => {
    const fetchData = async () => {
      await axios
        .get(`https://test-crane.herokuapp.com/cranes`)
        .then(({ data }) =>
          setAllCranes(data.filter((e) => e.craneRate >= a && e.craneRate <= b))
        );
    };
    fetchData();
  };

  // filter by background rate

  const handleBackgroundRateFilter = (a, b) => {
    const fetchData = async () => {
      await axios
        .get(`https://test-crane.herokuapp.com/cranes`)
        .then(({ data }) =>
          setAllCranes(
            data.filter(
              (e) => e.craneBackgroundRate >= a && e.craneBackgroundRate <= b
            )
          )
        );
    };
    fetchData();
  };

  return (
    <div className="Cranes">
      <FilterAndSort
        userLocation={userLocation}
        allCranes={allCranes}
        handleCraneRateFilter={handleCraneRateFilter}
        handleBackgroundRateFilter={handleBackgroundRateFilter}
      />
      {allCranes.map((cranes) => (
        <div>
          <CraneCard
            {...cranes}
            image={placeholder}
            markers={cranes.markers}
            userLocation={userLocation}
            handleSendLike={handleSendLike}
            handleSendUnlike={handleSendUnlike}
            likeButton={likeButton}
            unlikeButton={unlikeButton}
          />
        </div>
      ))}
    </div>
  );
};

Cranes.propType = {
  userLocation: PropTypes.object,
};

export default Cranes;
