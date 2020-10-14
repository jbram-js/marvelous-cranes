import React, { useState, useEffect } from "react";
import {
  Route,
  Switch,
  Redirect,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import LogIn from "./LogIn";
import Cranes from "./Cranes";
import AddCrane from "./AddCrane";
import Profile from "./Profile";
import Register from "./Register";
import Map from "./Map";
import LandingPage from "./LandingPage";
import { getToken, removeUserSession, setUserSession } from './utils';


import "../styles/App.css";
import Settings from "./Settings";
import LargeDevice from "./LargeDevice";

const initialState = {
  location: {
    latitude: "",
    longitude: "",
  },
  isAuthenticated: localStorage.getItem("token") ? true : false,
};

const App = () => {
  const [userLocation, setUserLocation] = useState(initialState.location);
  const [authLoading, setAuthLoading] = useState(true);
 
  const largeScreen = useMediaQuery({
    query: "(min-device-width: 600px)",
  });

  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };

  // logic to get users location

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getCoordinates);
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    };
    const getCoordinates = (position) => {
      setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    };

    getLocation();
  }, []);

//handles refresh 
  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios
    .get("https://test-crane.herokuapp.com/getUserInfo", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then(response => {
      setUserSession(token, response.data[0]);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);
 
  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }


  return (
    <div className="App">
      <ScrollToTop />
      {largeScreen && <LargeDevice />}
      <Switch>
        <Route exact path="/" render={() => (<LandingPage />)}/>   
        <Route exact path="/login" render={() => (<LogIn />)}/>
        <Route exact path="/register" render={() => (<Register />)}/>
        <Route exact path="/cranes" render={() => getToken() ? <Cranes userLocation={userLocation} /> : <Redirect to="/login" />} />
        <Route exact path="/add-crane" render={() => getToken() ? <AddCrane /> : <Redirect to="/login" /> }/>
        <Route exact path="/map" render={() => getToken() ? <Map /> : <Redirect to="/login" /> }/>
        <Route exact path="/profile" render={() => getToken() ? <Profile  userLocation={userLocation} /> : <Redirect to="/login" /> }/>
        <Route exact path="/settings" render={() => getToken() ? <Settings /> : <Redirect to="/login" /> }/>
      </Switch>
    </div>
  );
};

export default App;
