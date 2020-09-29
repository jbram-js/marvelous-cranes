import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";
import Header from "./Header";
import settings from "../icons/settings.svg";

import placeholder from "../images/cranesafety.jpg";
import ProfileCraneCard from "./ProfileCraneCard";

import "../styles/Profile.css";

const Profile = ({ username, userLocation }) => {
  const [allUsersCranes, setAllUsersCranes] = useState([]);

  useEffect(() => {
    axios
      .get("https://test-crane.herokuapp.com/craneUser", {
        params: { craneUser: username },
      })
      .then(({ data }) => {
        setAllUsersCranes(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="Profile">
      <p className="cranes-added">
        <strong>Cranes added: </strong>
        {allUsersCranes.length}
      </p>
      <div className="all-user-results">
        {allUsersCranes.map((cranes) => (
          <div>
            <ProfileCraneCard
              {...cranes}
              numberOfLikes={cranes.craneLikes}
              userLocation={userLocation}
              image={placeholder}
            />
          </div>
        ))}
      </div>

      <Header />
      <NavBar />
    </div>
  );
};

Profile.propType = {
  username: PropTypes.string.isRequired,
  userLocation: PropTypes.object,
};

export default Profile;
