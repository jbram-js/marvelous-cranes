import React from "react";
<<<<<<< HEAD
import CraneCard from "./CraneCard";

import placeholder from "../images/cranesafety.jpg";

import "../styles/Cranes.css";

const Cranes = () => {
  return (
    <div className="Cranes">
      <h1>All Cranes</h1>
      <CraneCard
        user="ethanscranes"
        image={placeholder}
        caption="Beauty"
        craneRate="10"
        backdropRate="6"
        comment="Not much wrong"
      />
    </div>
  );
=======
import NavBar from "./NavBar";

const Cranes = ({ userLoggedIn }) => {
  return (
    <>
      <NavBar />
      <div className="Cranes">All Cranes</div>
    </>
  );

>>>>>>> 3ade560b6b114bffc7a46f27af5ec9b5863e3dd9
};

export default Cranes;
