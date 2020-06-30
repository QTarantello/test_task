import "core-js/stable";
import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom";
import { MainPage } from "./js/components/MainPage.jsx";
import "./index.css";

const App = () => {
    return (
        <div styleName="container">
          <div styleName="header">
              <MainPage / >
          </div>
        </div>
      );
}

const appElement = document.getElementById("app");

if (appElement !== null) {
  ReactDOM.render(<App />, appElement);
}