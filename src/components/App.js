import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LogIn from "./LogIn";
import Cranes from "./Cranes";
import AddCrane from "./AddCrane";
import Profile from "./Profile";
import Register from "./Register";
import Map from "./Map";
import "../styles/App.css";

function App() {
  const [user, setUser] = useState();
  const [firstVisit, setFirstVisit] = useState(true);
  const name = window.localStorage.getItem("login"); //temporary until cookies are implemented
  console.log(user);
  return (
    <div className="App">
      <>
        <Switch>
          <Route
            exact path="/"
            render={() => <LogIn setUser={setUser} />}
          ></Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route
            exact path="/cranes"
            render={() => (name ? <Cranes name={name} /> : <Redirect to="/" />)}
          ></Route>
          <Route
            exact path="/add-crane"
            render={() =>
              name ? <AddCrane name={name} /> : <Redirect to="/" />
            }
          ></Route>
          <Route
            exact path="/map"
            render={() => (name ? <Map name={name} /> : <Redirect to="/" />)}
          ></Route>
          <Route
            exact path="/profile"
            render={() =>
              name ? <Profile name={name} /> : <Redirect to="/" />
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
