import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, Route } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";
import Header from "./Header";
import Settings from "./Settings";

import placeholder from "../images/cranesafety.jpg";
import ProfileCraneCard from "./ProfileCraneCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlidersH } from "@fortawesome/free-solid-svg-icons";

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
      <h1>{username}</h1>
      <h2>Posts {allUsersCranes.length}</h2>
      <div className="all-user-results">
        {allUsersCranes.map((crane) => (
          <div>
            <ProfileCraneCard
              {...crane}
              userLocation={userLocation}
              image={placeholder}
            />
          </div>
        ))}
      </div>
      <button>
        <FontAwesomeIcon icon={faSlidersH} className="building-icon" />
        <Link to="/settings"></Link>
      </button>
      <Header />
      <NavBar />
      <Route exact path="/settings">
        <Settings user={username} />
      </Route>
    </div>
  );
};

Profile.propType = {
  username: PropTypes.string.isRequired,
  userLocation: PropTypes.object,
};

export default Profile;
