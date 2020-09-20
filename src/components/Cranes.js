import React from "react";
import axios from "axios";
import CraneCard from "./CraneCard";
import NavBar from "../components/NavBar";

import placeholder from "../images/cranesafety.jpg";

import "../styles/Cranes.css";

const Cranes = () => {

const handleAllCranes = (event) => {
  event.preventDefault();
  axios
    .get("https://test-crane.herokuapp.com/cranes")
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};




  return (
    <div className="Cranes">
      <CraneCard
        username="ethanscranes"
        image={placeholder}
        caption="Beauty"
        craneRate="10"
        backdropRate="6"
        comment="Not much wrong"
      />
      <div>
        <button onClick={handleAllCranes}>load all</button>
      </div>
      <NavBar />
    </div>
  );
};

export default Cranes;
