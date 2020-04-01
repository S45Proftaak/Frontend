import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import { useTranslation } from 'react-i18next';
import Login from './components/login';
import Home from './components/Home';

function App() {
  const {t} = useTranslation();


  return (
     <div className="App-header">
       <Router>
         <Navbar Navs={[
           {link: "/", name: t('App.Home')}
         ]}/>
         <div style={{margin: 30}}/>


         <Switch>
           <Route exact path='/'></Route>
           <Route exact path='/login'><Login/></Route>
         </Switch>
       </Router>
      </div>
  );
}

export default App;
