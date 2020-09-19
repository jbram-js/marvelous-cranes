import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LogIn from "./LogIn";
import Cranes from "./Cranes";
import AddCrane from "./AddCrane";
import Map from "./Map";
import Profile from "./Profile";
import Register from "./Register";
import "../styles/App.css";
import NavBar from "./NavBar";

function App() {
  const [user, setUser] = useState();
  const [firstVisit, setFirstVisit] = useState(true);

  return (
    <div className="App">
      <>
        <NavBar />
        <Switch>
          <Route
            exact
            path="/"
            render={() => <LogIn setUser={setUser} />}
          ></Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route
            exact
            path="/cranes"
            render={() => <Cranes user={user} />}
          ></Route>
          <Route
            exact
            path="/add-crane"
            render={() => <AddCrane user={user} />}
          ></Route>
          <Route exact path="/map" render={() => <Map user={user} />}></Route>
          <Route
            exact
            path="/profile"
            render={() => <Profile user={user} />}
          ></Route>
        </Switch>
      </>
    </div>
  );
}

export default App;

//<NavBar />
//<Route exact path="/"/>
