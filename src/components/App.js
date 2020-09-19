import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LogIn from "./LogIn";
import Cranes from "./Cranes";
import AddCrane from "./AddCrane";
import AddCranes2 from "./AddCrane";
import Profile from "./Profile";
import Register from "./Register";
import Map from "./Map";
import "../styles/App.css";

function App() {
  const [user, setUser] = useState();
  const [firstVisit, setFirstVisit] = useState(true);

  return (
    <div className="App">
      <>
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
            render={() => (user ? <Cranes user={user} /> : <Redirect to="/" />)}
          ></Route>
          <Route
            exact
            path="/add-crane"
            render={() =>
              user ? <AddCrane user={user} /> : <Redirect to="/" />
            }
          ></Route>
          <Route
            exact
            path="/map"
            render={() => (user ? <Map user={user} /> : <Redirect to="/" />)}
          ></Route>
          <Route
            exact
            path="/profile"
            render={() =>
              user ? <Profile user={user} /> : <Redirect to="/" />
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
