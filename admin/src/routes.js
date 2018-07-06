
import React from 'react';
import { Route, Switch } from 'react-router';

import Login from './Components/Pages/Login';

export default (
    <Switch>
        <Route path="/login" component={Login} />
        {/* <Route path="/" component={Home} /> */}
    </Switch>
);