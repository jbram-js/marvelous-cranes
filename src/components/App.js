import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import LogIn from "./LogIn";
import Cranes from "./Cranes";
import AddCrane from "./AddCrane";
import Profile from "./Profile";
import Register from "./Register";
import Map from "./Map";
import Rules from "./Rules";

import "../styles/App.css";

const initialState = {
  fields: { username: "", password: "" },
  location: {
    latitude: "",
    longitude: "",
  },
};

function App() {
  const [user, setUser] = useState();
  const [firstVisit, setFirstVisit] = useState(true);
  const [value, setValue] = useState(initialState.fields);
  const [userLocation, setUserLocation] = useState(initialState.location);

  const history = useHistory();
  //const name = window.localStorage.getItem("login"); //temporary until cookies are implemented

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://test-crane.herokuapp.com/login", {
        username: value.username,
        password: value.password,
      })
      .then(({ data }) => {
        setUser(data);
        localStorage.setItem("login", data.username);
        history.push("/cranes");
      })
      .catch((err) => {
        console.log(err);
        alert("Error Logging in!");
      });
  };

  const handleInput = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };
  console.log(user);

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
      <>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <LogIn
                setUser={setUser}
                handleSubmit={handleSubmit}
                handleInput={handleInput}
                value={value}
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
          ></Route>
          <Route
            exact
            path="/add-crane"
            render={() => <AddCrane user={"bram"} />}
          />

          <Route exact path="/map" render={() => <Map />}></Route>
          <Route
            exact
            path="/profile"
            render={() => (
              <Profile username={user.username} userLocation={userLocation} />
            )}
          ></Route>
        </Switch>
      </>
    </div>
  );
}

export default App;

//<NavBar />
//<Route exact path="/"/>
