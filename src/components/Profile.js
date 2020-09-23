import React from "react";
import NavBar from "./NavBar";
import Header from "./Header";

const Profile = ({ username }) => {
  return (
    <div className="Profile">
      <h1>{username}</h1>
      <Header />
      <NavBar />
    </div>
  );
};

export default Profile;
