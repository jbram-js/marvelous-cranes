import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useLocation } from "react-router-dom";
import CraneCard from "./CraneCard";
import FilterAndSort from "./FilterAndSort";
import NavBar from "./NavBar";
import Header from "./Header";

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
  const [sortFunction, setSortFunction] = useState();
  const [filterValue, setFilterValue] = useState(initialState.fields);
  const [numberOfLikes, setNumberOfLikes] = useState();

  const { search } = useLocation();

  // main request when cranes page loads

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("https://test-crane.herokuapp.com/all")
        .then(({ data }) => {
          setAllCranes(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, [numberOfLikes]);

  // request that handles sort and filters
  useEffect(() => {
    axios
      .get(`https://test-crane.herokuapp.com/all?sort={${sortFunction}}`)
      .then(({ data }) => setAllCranes(data))
      .catch((err) => console.error(err));
  }, [sortFunction]);

  console.log(sortFunction);
  // patch request to send a like and unlike

  const handleSendLike = async (craneID) => {
    await axios
      .get("https://test-crane.herokuapp.com/craneID", {
        params: { id: craneID },
      })
      .then(({ data }) => {
        const numberOfLikes = data[0].craneLikes;
        const addedLike = numberOfLikes + 1;
        const newCraneID = craneID;

        axios
          .patch(
            `https://test-crane.herokuapp.com/Increment?id=${newCraneID}`,
            {
              craneLikes: addedLike,
            }
          )
          .then(
            ({ data }) => setNumberOfLikes(data.craneLikes),
            setLikeButton(false),
            setUnlikeButton(true)
          );
      });
  };

  const handleSendUnlike = async (craneID) => {
    await axios
      .get("https://test-crane.herokuapp.com/craneID", {
        params: { id: craneID },
      })
      .then(({ data }) => {
        const numberOfLikes = data[0].craneLikes;
        const removedLike = numberOfLikes - 1;
        const newCraneID = craneID;
        const patch = async () => {
          await axios
            .patch(
              `https://test-crane.herokuapp.com/Increment?id=${newCraneID}`,
              {
                craneLikes: removedLike,
              }
            )
            .then(({ data }) => {
              setNumberOfLikes(data.craneLikes);
              setLikeButton(true);
              setUnlikeButton(false);
            });
        };
        patch();
      });
  };

  // patch to state how many likes have been sent by a user

  const handleSetUserLike = async (username) => {
    await axios
      .get(`https://test-crane.herokuapp.com/${username}/user`)
      .then(({ data }) => {
        const likesSent = data[0].LikesSent;
        const addedLike = likesSent + 1;
        const userID = data[0]._id;
        axios.patch(`https://test-crane.herokuapp.com/updateUsers/${userID}`, {
          LikesSent: addedLike,
        });
      });
  };

  const handleRemoveUserLike = async (username) => {
    await axios
      .get(`https://test-crane.herokuapp.com/${username}/user`)
      .then(({ data }) => {
        const likesSent = data[0].LikesSent;
        const removedLike = likesSent - 1;
        const userID = data[0]._id;
        axios.patch(`https://test-crane.herokuapp.com/updateUsers/${userID}`, {
          LikesSent: removedLike,
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

  return (
    <div className="all-cranes">
      <div className="filter-sort">
        <FilterAndSort
          userLocation={userLocation}
          allCranes={allCranes}
          setSortFunction={setSortFunction}
          filterValue={filterValue}
          setFilterValue={setFilterValue}
        />
      </div>
      {allCranes.map((cranes) => (
        <div className="crane-card">
          <CraneCard
            {...cranes}
            image={placeholder}
            markers={cranes.markers}
            userLocation={userLocation}
            handleSendLike={handleSendLike}
            handleSendUnlike={handleSendUnlike}
            likeButton={likeButton}
            unlikeButton={unlikeButton}
            numberOfLikes={cranes.craneLikes}
            handleSetUserLike={handleSetUserLike}
            handleRemoveUserLike={handleRemoveUserLike}
          />
        </div>
      ))}
      <NavBar />
      <Header />
    </div>
  );
};

Cranes.propType = {
  userLocation: PropTypes.object,
};

export default Cranes;
