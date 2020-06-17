import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import adventureWorksLogo from './Adventureworks Logo Black.png';
import MyOrder from "./MyOrder";
import Chat from "./Chat";
import Home from "./Home";
import './App.css'
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin, withAITracking } from '@microsoft/applicationinsights-react-js';
import { createBrowserHistory } from "history";

const browserHistory = createBrowserHistory({basename: ''});
let reactPlugin = new ReactPlugin();
let appInsights = new ApplicationInsights({
  config: {
    instrumentationKey: process.env.REACT_APP_INSTRUMENTATION_KEY,
    extensions: [reactPlugin],
    extensionConfig: {
      [reactPlugin.identifier]: { history: browserHistory }
    }
  }
});
appInsights.loadAppInsights();

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="topnav">
            <div className="navItem">
              <Link to="/">Home</Link>
            </div>
            <div className="navItem">
              <Link to="/myOrder">My Order</Link>
            </div>
            <div className="navItem">
              <Link to="/chat">Support Chat</Link>
            </div>
        </nav>
        <header className="App-header">
        <img src={adventureWorksLogo} className="App-logo" alt="logo" />
        </header>
        <Switch>
          <Route path="/myOrder">
              <MyOrder />
          </Route>
          <Route path="/chat">
            <Chat />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default withAITracking(reactPlugin, App);
