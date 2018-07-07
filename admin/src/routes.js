
import React from 'react';
import { Route, Switch } from 'react-router';

import Login from './Components/Pages/Login';
import Products from './Components/Pages/Products';

export default (
    <Switch>
        <Route path="/login" component={Login} />
        <Route path="/products/create" component={Products.Create} />
        <Route path="/products" component={Products.Index} />
        <Route component={Products.Create} />
        {/* <Route path="/" component={Home} /> */}
    </Switch>
);