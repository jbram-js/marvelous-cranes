import React, { useEffect, useState } from "react";
import axios from "axios";
import CraneCard from "./CraneCard";
import NavBar from "../components/NavBar";

import placeholder from "../images/cranesafety.jpg";

import "../styles/Cranes.css";

const Cranes = ({ craneUser }) => {
  const [allCranes, setAllCranes] = useState([]);

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
  });

  return (
    <div className="Cranes">
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
