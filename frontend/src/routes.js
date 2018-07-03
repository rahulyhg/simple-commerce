
import React from 'react';
import { Route, Switch } from 'react-router';

// Import modules/routes
import Home from './Components/Pages/Home';
import Cart from './Components/Pages/Cart';
import LogIn from './Components/Pages/LogIn';
import Register from './Components/Pages/Register';
import UserProfile from './Components/Pages/User';

export default (
    <Switch>
        <Route path="/login" component={LogIn} />
        <Route path="/Register" component={Register} />
        <Route path="/profile" component={UserProfile} />
        <Route path="/cart" component={Cart} />
        <Route path="/" component={Home} />
    </Switch>
);