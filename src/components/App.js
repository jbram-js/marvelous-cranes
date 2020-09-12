import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import LogIn from "./LogIn";
import NavBar from "./NavBar";
import Cranes from "./Cranes";
import AddCrane from "./AddCrane";
import Map from "./Map";
import Profile from "./Profile";

import "../styles/App.css";
<<<<<<< HEAD
=======
import logo from "../images/logo-alone.svg";
import crane from "../images/crane.gif";
>>>>>>> 27e1f0269fbd21670cf722f492983863bd9c2c0b

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  return (
    <div className="App">
<<<<<<< HEAD
      {!userLoggedIn ? (
        <LogIn setUserLoggedIn={setUserLoggedIn} />
      ) : (
        <>
          <NavBar />
          <Switch>
            <Route exact path="/cranes">
              <Cranes />
            </Route>
            <Route exact path="/add-crane">
              <AddCrane />
            </Route>
            <Route exact path="/map">
              <Map />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
          </Switch>
        </>
      )}
=======
      <img src={logo} alt="Logo" className="logo-home" />
      <h1 className="app-header">
        Welcome to the Cranger Zone! <br></br>🏗️ Under construction 🏗️
      </h1>
      <img src={crane} alt="gif" className="crane-gif" />
>>>>>>> 27e1f0269fbd21670cf722f492983863bd9c2c0b
    </div>
  );
}

export default App;
