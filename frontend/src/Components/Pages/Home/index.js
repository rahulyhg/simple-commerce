import React, { Component } from 'react';
import CategoriesList from './CategoriesList';
import ProductsList from './ProductList';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            products: [],

            categoriesLoader: 'loading',
            productsLoader: 'loading'
        }
    }

    render() {
        return (
            <div className="home-wrapper container">
                <CategoriesList />
                <ProductsList />
            </div>
        );
    }
}

export default Home;