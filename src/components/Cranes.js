import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import CraneCard from "./CraneCard";
import NavBar from "../components/NavBar";
import FilterAndSort from "./FilterAndSort";
// import Header from "./Header";
// import { getDistance } from "geolib";

import placeholder from "../images/cranesafety.jpg";

import "../styles/Cranes.css";
// import userEvent from "@testing-library/user-event";

const initialState = {
  location: {
    latitude: "",
    longitude: "",
  },
};

const Cranes = () => {
  const [allCranes, setAllCranes] = useState([]);
  const [userLocation, setUserLocation] = useState(initialState.location);
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
      .get(`https://test-crane.herokuapp.com/cranes${search}`)
      .then(({ data }) => setAllCranes(data))
      .catch((err) => console.error(err));
  }, [search]);

  // patch request to send a like

  const handleSendLike = (craneID) => {
    axios
      .get("https://test-crane.herokuapp.com/craneID", {
        params: { id: JSON.stringify(craneID) },
      })
      .then(({ data }) => {
        const numberOfLikes = data[0].craneLikes;
        const addedLike = numberOfLikes + 1;
        console.log("hello");
        axios
          .patch("https://test-crane.herokuapp.com/Update", {
            params: {
              id: JSON.stringify(craneID),
            },
          })
          .then(() => {
            console.log("success");
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

  // logic to get users location

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getCoordinates);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };
  const getCoordinates = (position) => {
    setUserLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  };

  getLocation();

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
          />
        </div>
      ))}
      <NavBar />
    </div>
  );
};

export default Cranes;
