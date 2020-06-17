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
import { useSelector } from "react-redux";
import JwtDecode from "jwt-decode";

function App() {
  const { t } = useTranslation();
  const token = useSelector((state) => state.loginReducer.payload);

  const showNav = () => {
    if (token !== null || token !== undefined) {
      let model = undefined;
      try {
        model = JwtDecode(token.token);
      } catch {
        model = "logout";
      }
      switch (model.role) {
        case "ROLE_EMPLOYEE": {
          return [
            { link: "/", name: t("App.Home") },
            { link: "/leaderboard", name: t("App.Leaderboard") },
          ];
        }
        case "ROLE_SECRETARY": {
          return [
            { link: "/", name: t("App.Home") },
            { link: "/administration", name: t("App.Administration") },
            { link: "/leaderboard", name: t("App.Leaderboard") },
          ];
        }
        case "ROLE_ADMIN": {
          return [
            { link: "/", name: t("App.Home") },
            { link: "/administration", name: t("App.Administration") },
            { link: "/leaderboard", name: t("App.Leaderboard") },
            { link: "/admin", name: t("Admin.Home") },
          ];
        }
        default: {
          return [{ link: "/", name: t("App.Home") }];
        }
      }
    }
  };

  return (
    <div className="PageBackground">
      <Router>
        <Navbar Navs={showNav()} />

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
