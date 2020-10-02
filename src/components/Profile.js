import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import NavBar from "./NavBar";
import Header from "./Header";

import placeholder from "../images/cranesafety.jpg";
import ProfileCraneCard from "./ProfileCraneCard";

import "../styles/Profile.css";

const Profile = ({ userId, userLocation }) => {
  const [allUsersCranes, setAllUsersCranes] = useState([]);
  const [username, setUsername] = useState();

  useEffect(() => {
    axios
      .get("https://test-crane.herokuapp.com/craneUser", {
        params: { userID: userId },
      })
      .then(({ data }) => {
        setAllUsersCranes(data);
        console.log(data);
        axios
          .get(`https://test-crane.herokuapp.com/${data.userID}/users`)
          .then(({ data }) => {
            setUsername(data.username);
          });
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
              username={username}
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
