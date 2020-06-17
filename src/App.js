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
import Admin from "./components/Admin";
import LoginState from "./redux/states/LoginStatus";

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
            { link: "/admin", name: t("Admin.Home") },
          ]}
        />

        <div style={{ margin: 30 }} />

        <Switch>
          <Route exact path="/">
            <Redirect roles={["ROLE_EMPLOYEE", "ROLE_ADMIN", "ROLE_SECRETARY"]}>
              <Home />
            </Redirect>
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/administration">
            <Redirect roles={["ROLE_ADMIN", "ROLE_SECRETARY"]}>
              <Administration />
            </Redirect>
          </Route>
          <Route path={"/leaderboard"}>
            <Redirect roles={["ROLE_EMPLOYEE", "ROLE_ADMIN", "ROLE_SECRETARY"]}>
              <Leaderboard />
            </Redirect>
          </Route>
          <Route path={"/logout"}>
            <Redirect roles={["ROLE_EMPLOYEE", "ROLE_ADMIN", "ROLE_SECRETARY"]}>
              <Logout />
            </Redirect>
          </Route>
          <Route path="/admin">
            <Redirect roles={["ROLE_ADMIN"]}>
              <Admin></Admin>
            </Redirect>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
