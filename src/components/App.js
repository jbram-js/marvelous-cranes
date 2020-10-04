import React, { useState, useEffect } from "react";
import {
  Route,
  Switch,
  Redirect,
  useLocation,
  useHistory,
} from "react-router-dom";
import axios from "axios";
import store from "store";
import { useMediaQuery } from "react-responsive";
import LogIn from "./LogIn";
import Cranes from "./Cranes";
import AddCrane from "./AddCrane";
import Profile from "./Profile";
import Register from "./Register";
import Map from "./Map";
import LandingPage from "./LandingPage";

import "../styles/App.css";
import Settings from "./Settings";

const initialState = {
  fields: { username: "", password: "" },
  location: {
    latitude: "",
    longitude: "",
  },
  token: localStorage.getItem('token'),
  isAuthenticated: localStorage.getItem('token') ? true : false
};

const App = () => {
  const [user, setUser] = useState();
  const [value, setValue] = useState(initialState.fields);
  const [userLocation, setUserLocation] = useState(initialState.location);

  const history = useHistory();
  

  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      await axios
        .post("https://test-crane.herokuapp.com/login", {
          username: value.username,
          password: value.password,
        })
        .then(({ data }) => {
          localStorage.setItem("token", data.accessToken);
          //grabUserInfo(data.accessToken)
          axios.get("https://test-crane.herokuapp.com/getUserInfo",{
          headers: { 
            'Authorization': 'Bearer ' + data.accessToken
          }
        })
        .then(({ data }) => {
          setUser(data[0])
          store.set('loggedIn', true);       
          history.push("/cranes");
        })
        .catch((err) => {
        console.log(err);
        });
        })
        .catch((err) => {
          console.log(err);
          alert("Error Logging in!");
        });
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

  return (
    <div className="App">
      <ScrollToTop />
      <>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route
            exact
            path="/login"
            render={() => (
              <LogIn
                setUser={setUser}
                handleSubmit={handleSubmit}
                value={value}
                setValue={setValue}
              />
            )}
          ></Route>
          <Route exact path="/register">
            <Register />
          </Route>

          <Route
            exact
            path="/cranes"
            render={() => <Cranes userLocation={userLocation} />}
          >
            {!initialState.isAuthenticated && <Redirect to="/login" />}
          </Route>
          <Route
            exact
            path="/add-crane"
            render={() => <AddCrane user={user}/>}
          >
            {!initialState.isAuthenticated && <Redirect to="/login" />}
          </Route>

          <Route exact path="/map" render={() => <Map />}>
            {!initialState.isAuthenticated && <Redirect to="/login" />}
          </Route>
          <Route
            exact
            path="/profile"
            render={() => (
              <Profile  userLocation={userLocation} />
            )}
          >
            {!initialState.isAuthenticated && <Redirect to="/login" />}
          </Route>
          <Route exact path="/settings" render={() => <Settings  />}>
            {!initialState.isAuthenticated && <Redirect to="/login" />}
          </Route>
        </Switch>
      </>
    </div>
  );
};

export default App;
