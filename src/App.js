import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {AuthContext} from './context/AuthContext';
import useAuth from './hooks/auth.hook';
import {useRoutes} from "./hooks/routes.hook";
import './scss/default.scss'


function App() {
  const {user, setUser, token, setToken, logout, register, login} = useAuth();

  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  console.log('user', user);
  console.log('token', token);

  return (
      <AuthContext.Provider value={{
        user, token, setUser, setToken, logout, register, login
      }}>
        <div className="App">
          <Router>
            {routes}
          </Router>
        </div>
      </AuthContext.Provider>
  );
}

export default App;
