import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useLocation } from "react-router-dom";
import CraneCard from "./CraneCard";
import NavBar from "../components/NavBar";
import FilterAndSort from "./FilterAndSort";

import placeholder from "../images/cranesafety.jpg";

import "../styles/Cranes.css";

const initialState = {
  fields: {
    bottomRate: 0,
    topRate: 10,
    bottomRateCrane: 0,
    topRateCrane: 10,
  },
};

const Cranes = ({ userLocation }) => {
  const [allCranes, setAllCranes] = useState([]);
  const [likeButton, setLikeButton] = useState(true);
  const [unlikeButton, setUnlikeButton] = useState(false);
  const [sortFunction, setSortFunction] = useState({});
  const [filterValue, setFilterValue] = useState(initialState.fields);

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
  }, []);

  // request that handles sort and filters
  useEffect(() => {
    axios
      .get(`https://test-crane.herokuapp.com/cranes?sort=${sortFunction}`)
      .then(({ data }) => setAllCranes(data))
      .catch((err) => console.error(err));
  }, [sortFunction]);

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

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("https://test-crane.herokuapp.com/AllRatings", {
          params: filterValue,
        })
        .then(({ data }) => {
          setAllCranes(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, [filterValue]);

  console.log(filterValue);
  return (
    <div className="Cranes">
      <FilterAndSort
        userLocation={userLocation}
        allCranes={allCranes}
        setSortFunction={setSortFunction}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
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
      <NavBar />
    </div>
  );
};

Cranes.propType = {
  userLocation: PropTypes.object,
};

export default Cranes;
