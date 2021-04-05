import React from "react";
import ReactDOM from "react-dom";
import SystemData from "./Pages/SystemData/SystemData";
import SystemDiagnosticsManager from "./Pages/SystemDiagnostics/SystemDiagnostics";
import SystemState from "./Pages/SystemState/SystemState";
import "./Styles/index.css";
import "./Styles/tailwind.css";
import { Route, Redirect, BrowserRouter as Router } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

const routing = (
  <Router>
    <div>
      <Redirect from="/" to="/data" />
      <Route path="/data" component={SystemData} />
      <Route path="/diagnostics" component={SystemDiagnosticsManager} />
      <Route path="/state" component={SystemState} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));
serviceWorker.register();
