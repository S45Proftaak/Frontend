import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import { useTranslation } from "react-i18next";
import Login from "./components/login";
import Home from "./components/Home";
import Administration from "./components/Administration";
import Redirect from "./components/Redirect";
import Leaderboard from "./components/Leaderboard";
import Logout from "./components/Logout";

function App() {
  const { t } = useTranslation();

  return (
    <div className="PageBackground">
      <Router>
        <Navbar
          Navs={[
            { link: "/", name: t("App.Home") },
            { link: "/administration", name: t("App.Administration") },
            { link: "/leaderboard", name: t("App.Leaderboard") },
          ]}
        />
        <div style={{ margin: 30 }} />

        <Switch>
          <Route exact path="/">
            <Redirect>
              <Home />
            </Redirect>
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/administration">
            <Redirect>
              <Administration />
            </Redirect>
          </Route>
          <Route path={"/leaderboard"}>
            <Redirect>
              <Leaderboard />
            </Redirect>
          </Route>
          <Route exact path="/logout">
            <Redirect>
              <Logout />
            </Redirect>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
