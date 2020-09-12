import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import LogIn from "./LogIn";
import NavBar from "./NavBar";
import Cranes from "./Cranes";
import AddCrane from "./AddCrane";
import Map from "./Map";
import Profile from "./Profile";

import "../styles/App.css";

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
