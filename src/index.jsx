import "core-js/stable";
import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom";
import { MainPage } from "./js/components/MainPage.jsx"

const App = () => {
    return (
        <div className="container">
          <div className="header">
              <MainPage / >
          </div>
        </div>
      );
}

const appElement = document.getElementById("app");

if (appElement !== null) {
  ReactDOM.render(<App />, appElement);
}