import "core-js/stable";
import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom";

const App = () => {
    return (
        <div styleName="container">
          <div styleName="header">
              {console.log("Hello, World!")}
          </div>
        </div>
      );
}

const appElement = document.getElementById("app");

if (appElement !== null) {
  ReactDOM.render(<App />, appElement);
}