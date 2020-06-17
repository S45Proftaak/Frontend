import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import * as serviceWorker from "./serviceWorker";
import "./i18n";
import { compose, applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./redux/reducers";

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}

function writeToLocalStorage(state) {
  try {
    const loginToken = JSON.stringify(state.loginReducer.payload);
    const serializedState = JSON.stringify(state);
    setCookie("LoginData", loginToken, 2);
    sessionStorage.setItem('state', serializedState);
  } catch (error) {
    console.error(error);
  }
}

function readFromLocalStorage() {
  try {
    const serializedState = sessionStorage.getItem('state');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

function checkLoginDate(store){
  if(getCookie('LoginData') !== null){
    store.dispatch({
      type : 'LOGIN_DATA_FETCHED',
      payload: JSON.parse(getCookie('LoginData'))
    })
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = composeEnhancers(applyMiddleware());
const persistedState = readFromLocalStorage();
let store = createStore(rootReducer, persistedState, middleware);
checkLoginDate(store);

store.subscribe(() => writeToLocalStorage(store.getState()));

ReactDOM.render(
  <Suspense fallback="Loading...">
    <Provider store={store}>
      <App />
    </Provider>
  </Suspense>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
