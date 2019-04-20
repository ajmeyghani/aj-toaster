import React from "react";
import ReactDOM from "react-dom";
import Toaster from "toaster/toaster";
import App from "./app";

ReactDOM.render(
<Toaster theme="theme2">
  <App />
</Toaster>, document.querySelector("#app"));
