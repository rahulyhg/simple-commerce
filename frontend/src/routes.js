
import React from 'react';
import { Route, Switch } from 'react-router';

// Import modules/routes
import Home from './Components/Pages/Home';
import LogIn from './Components/Pages/LogIn';

export default (
    <Switch>
        <Route path="/login" component={LogIn} />
        <Route path="/" component={Home} />
    </Switch>
);