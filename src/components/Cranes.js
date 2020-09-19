import React from "react";
import CraneCard from "./CraneCard";
import NavBar from "../components/NavBar";

import placeholder from "../images/cranesafety.jpg";

import "../styles/Cranes.css";

const Cranes = () => {
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
    </div>
  );
};

export default Cranes;
