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
      <p>{username}</p>
      <p>
        <strong>Cranes added: </strong>
        {allUsersCranes.length}
      </p>
      <Link to="/settings">
        <button>
          {" "}
          <img src={settings} className="NavBarIcons" alt="All cranes icon" />
        </button>
      </Link>

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
