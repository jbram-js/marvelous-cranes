import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import LogIn from "./LogIn";
import Cranes from "./Cranes";
import AddCrane from "./AddCrane";
import Profile from "./Profile";
import Register from "./Register";
import Map from "./Map";

import "../styles/App.css";

const initialState = {
  fields: { username: "", password: "" },
};

function App() {
  const [user, setUser] = useState();
  const [username, setUsername] = useState();
  const [firstVisit, setFirstVisit] = useState(true);
  const [value, setValue] = useState(initialState.fields);

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
        setUsername(data.username);
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
            render={() => (user ? <Cranes /> : <Redirect to="/" />)}
          ></Route>
          <Route
            exact
            path="/add-crane"
            render={() =>
              user ? <AddCrane name={user} /> : <Redirect to="/" />
            }
          ></Route>
          <Route
            exact
            path="/map"
            render={() => (user ? <Map name={user} /> : <Redirect to="/" />)}
          ></Route>
          <Route
            exact
            path="/profile"
            render={() =>
              user ? <Profile username={username} /> : <Redirect to="/" />
            }
          ></Route>
        </Switch>
      </>
    </div>
  );
}

export default App;

//<NavBar />
//<Route exact path="/"/>
