import React from "react";
import "../styles/App.css";
import logo from "../images/logo.svg";
import crane from "../images/crane.gif";

function App() {
  return (
    <div className="App">
      <img src={logo} alt="Logo" className="logo-home" />
      <h1 className="app-header">
        Welcome to the Cranger Zone! <br></br>🏗️ Under construction 🏗️
      </h1>
      <img src={crane} alt="gif" className="crane-gif" />
      <p>Test</p>
    </div>
  );
}

export default App;
