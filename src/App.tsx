import React from "react";
import {BrowserRouter as Router, Redirect, Switch} from 'react-router-dom';

import {Login} from './pages/Login/Login';
import {PasswordHealth} from './pages/PasswordHealth/PasswordHealth';
import {PrivateRoute} from './components/routes/PrivateRoute';
import {PublicRoute} from './components/routes/PublicRoute';
import {Routes} from './constants';
import {UserContextProvider} from './components/UserContext';

import './style/styles.scss';


export const App = () => (
    <Router>
        <Switch>
            <PublicRoute
                path={Routes.Login}
                component={Login}
            />
            <PrivateRoute
                path={Routes.PasswordHealth}
                component={() => <UserContextProvider><PasswordHealth/></UserContextProvider>}
            />
            <PrivateRoute
                path={Routes.Root}
                component={() => <Redirect to={Routes.PasswordHealth}/>}
            />
        </Switch>
    </Router>
);
