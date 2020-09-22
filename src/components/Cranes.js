import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import CraneCard from "./CraneCard";
import NavBar from "../components/NavBar";
import FilterAndSort from "./FilterAndSort";

import placeholder from "../images/cranesafety.jpg";

import "../styles/Cranes.css";

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

  useEffect(() => {
    axios
      .get(`https://test-crane.herokuapp.com/cranes${search}`)
      .then(({ data }) => setAllCranes(data))
      .catch((err) => console.error(err));
  }, [search]);

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

  console.log(allCranes);

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
          <CraneCard {...cranes} image={placeholder} markers={cranes.markers} />
        </div>
      ))}
      <NavBar />
    </div>
  );
};

export default Cranes;
