
import React from 'react';
import { Route, Switch } from 'react-router';

import Login from './Components/Pages/Login';
import Products from './Components/Pages/Products';
import Categories from './Components/Pages/Categories';
import Brands from './Components/Pages/Brands';
import Qty from './Components/Pages/Qtys';

export default (
    <Switch>
        <Route path="/login" component={Login} />
        <Route path="/products/create" component={Products.Create} />
        <Route path="/products/:id/edit" component={Products.Edit} />

        <Route path="/products/:id/qty/create" component={Qty.Create} />
        <Route path="/products/:id/qty" component={Qty.Index} />
        {/* <Route path="/products/:id/qty" component={Qty.Index} /> */}

        <Route path="/products/:id" component={Products.Show} />
        <Route path="/products" component={Products.Index} />

        <Route path="/categories/create" component={Categories.Create} />
        <Route path="/categories/:id/edit" component={Categories.Edit} />
        <Route path="/categories" component={Categories.Index} />

        <Route path="/brands/create" component={Brands.Create} />
        <Route path="/brands/:id/edit" component={Brands.Edit} />
        <Route path="/brands" component={Brands.Index} />
        <Route component={Brands.Create} />
        {/* <Route path="/" component={Home} /> */}
    </Switch>
);