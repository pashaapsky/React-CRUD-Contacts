import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Home from "../pages/home";
import Profile from "../pages/profile";

export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route exact path="/profile">
                    <Profile />
                </Route>

                <Redirect to="/profile" />
            </Switch>
        )
    } else {
        return (
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>

                <Redirect to="/"/>
            </Switch>
        )
    }
};