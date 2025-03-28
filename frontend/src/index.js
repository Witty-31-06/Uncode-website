import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
const basename = "/Uncode-website"; // Your repo name

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter basename={basename}>
    <App />
  </BrowserRouter>
);

