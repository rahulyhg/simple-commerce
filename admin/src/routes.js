
import React from 'react';
import { Route, Switch } from 'react-router';

import Login from './Components/Pages/Login';
import Products from './Components/Pages/Products';
import Categories from './Components/Pages/Categories';

export default (
    <Switch>
        <Route path="/login" component={Login} />
        <Route path="/products/create" component={Products.Create} />
        <Route path="/products" component={Products.Index} />

        <Route path="/categories/create" component={Categories.Create} />
        <Route path="/categories/:id/edit" component={Categories.Edit} />
        <Route path="/categories" component={Categories.Index} />
        <Route component={Categories.Create} />
        {/* <Route path="/" component={Home} /> */}
    </Switch>
);