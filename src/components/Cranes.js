import React, { useEffect, useState } from "react";
import axios from "axios";
import CraneCard from "./CraneCard";
import NavBar from "../components/NavBar";
import FilterAndSort from "./FilterAndSort";

import placeholder from "../images/cranesafety.jpg";

import "../styles/Cranes.css";

const Cranes = () => {
  const [allCranes, setAllCranes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("https://test-crane.herokuapp.com/cranes")
        .then(({ data }) => {
          const shuffledArray = data.sort(() => Math.random() - 0.5);
          setAllCranes(shuffledArray);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);

  console.log(allCranes);

  return (
    <div className="Cranes">
      <FilterAndSort />
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
