import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Header from "./Header";
import axios from "axios";

import placeholder from "../images/cranesafety.jpg";
import ProfileCraneCard from "./ProfileCraneCard";

import "../styles/Profile.css";

const Profile = ({ username, userLocation }) => {
  const [allUsersCranes, setAllUsersCranes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("https://test-crane.herokuapp.com/craneUser", {
          params: { craneUser: JSON.stringify(username) },
        })
        .then(({ data }) => {
          setAllUsersCranes(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  });
  return (
    <div className="Profile">
      <h1>{username}</h1>
      <h2>Posts {allUsersCranes.length}</h2>
      <button>Settings</button>
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
    </div>
  );
};

export default Profile;
