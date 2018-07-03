
import React from 'react';
import { Route, Switch } from 'react-router';

// Import modules/routes
import Home from './Components/Pages/Home';
import Cart from './Components/Pages/Cart';
import LogIn from './Components/Pages/LogIn';

export default (
    <Switch>
        <Route path="/login" component={LogIn} />
        <Route path="/cart" component={Cart} />
        <Route path="/" component={Home} />
    </Switch>
);