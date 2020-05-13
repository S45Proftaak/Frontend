import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import { useTranslation } from "react-i18next";
import Login from "./components/login";
import Home from "./components/Home";
import Administration from "./components/Administration";

function App() {
  const { t } = useTranslation();

  return (
    <div className="PageBackground">
      <Router>
        <Navbar Navs={[{ link: "/", name: t("App.Home") }, {link: "/administration", name: t("App.Administration") }]} />
        <div style={{ margin: 30 }} />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/administration">
            <Administration />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
