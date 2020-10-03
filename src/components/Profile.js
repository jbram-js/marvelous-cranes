import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import NavBar from "./NavBar";
import Header from "./Header";

import ProfileCraneCard from "./ProfileCraneCard";

import "../styles/Profile.css";

const Profile = ({ userId, userLocation }) => {
  const [allUsersCranes, setAllUsersCranes] = useState([]);
  const [username, setUsername] = useState();

  useEffect(() => {
    axios
      .get(`https://test-crane.herokuapp.com/craneUser?userID=${userId}`)
      .then(({ data }) => {
        setAllUsersCranes(data);
        axios
          .get(`https://test-crane.herokuapp.com/${data[0].userID}/users`)
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
              image={cranes.image}
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
