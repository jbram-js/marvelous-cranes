import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
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
  const [sortFunction, setSortFunction] = useState();
  const [filterValue, setFilterValue] = useState(initialState.fields);
  const [numberOfLikes, setNumberOfLikes] = useState();
  const [sortType, setSortType] = useState();

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
      .get(
        `https://test-crane.herokuapp.com/cranes?${sortFunction}=${sortType}`
      )
      .then(({ data }) => setAllCranes(data))
      .catch((err) => console.error(err));
  }, [sortFunction, sortType]);

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
          .then(({ data }) => setNumberOfLikes(data.craneLikes));
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
            });
        };
        patch();
      });
  };

  // patch to state how many likes have been sent by a user

  const handleSetUserLike = async (userId) => {
    await axios
      .get(`https://test-crane.herokuapp.com/${userId}/users`)
      .then(({ data }) => {
        const likesSent = data.LikesSent;
        const addedLike = likesSent + 1;
        const userID = data._id;
        axios.patch(`https://test-crane.herokuapp.com/updateUsers/${userID}`, {
          params: {
            LikesSent: addedLike,
          },
        });
      });
  };

  const handleRemoveUserLike = async (userId) => {
    await axios
      .get(`https://test-crane.herokuapp.com/${userId}/users`)
      .then(({ data }) => {
        const likesSent = data.LikesSent;
        const removedLike = likesSent - 1;
        const userID = data._id;
        axios.patch(`https://test-crane.herokuapp.com/updateUsers/${userID}`, {
          params: {
            LikesSent: removedLike,
          },
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
          setSortType={setSortType}
        />
      </div>
      {allCranes.map((cranes) => (
        <div className="crane-card">
          <CraneCard
            {...cranes}
            image={cranes.image}
            markers={cranes.markers}
            userLocation={userLocation}
            handleSendLike={handleSendLike}
            handleSendUnlike={handleSendUnlike}
            numberOfLikes={cranes.craneLikes}
            handleSetUserLike={handleSetUserLike}
            handleRemoveUserLike={handleRemoveUserLike}
            userId={cranes.userID}
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
