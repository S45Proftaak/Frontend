import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import { useTranslation } from 'react-i18next';

function App() {
  const {t} = useTranslation();


  return (
     <div className="App-header">
       <Router>
         <Navbar Navs={[
           {link: "/", name: t('App.Home')}
         ]}/>


         <Switch>
           <Route exact key='/'></Route>
         </Switch>
       </Router>
      </div>
  );
}

export default App;
