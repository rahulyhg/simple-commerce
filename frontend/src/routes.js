
import React from 'react';
import { Route, Switch } from 'react-router';

// Import modules/routes
import Home from './Components/Pages/Home';
import Cart from './Components/Pages/Cart';
import LogIn from './Components/Pages/LogIn';
import Register from './Components/Pages/Register';
import UserProfile from './Components/Pages/User';
import Products from './Components/Pages/Products';
import Product from './Components/Pages/Product';
import Wishlist from './Components/Pages/Wishlist';
import Order from './Components/Pages/Order';
import Show from './Components/Pages/Order/Show';

export default (
    <Switch>
        <Route path="/login" component={LogIn} />
        <Route path="/Register" component={Register} />
        <Route path="/orders/:id" component={Show} />
        <Route path="/orders" component={Order} />
        <Route path="/profile" component={UserProfile} />
        <Route path="/wishlist" component={Wishlist} />
        <Route path="/cart" component={Cart} />
        <Route path="/products/:id" component={Product} />
        <Route path="/category/:id" component={Products} />
        <Route path="/products" component={Products} />
        <Route path="/" component={Home} />
    </Switch>
);