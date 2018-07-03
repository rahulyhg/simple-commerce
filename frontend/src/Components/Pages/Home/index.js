import React, { Component } from 'react';
import { connect } from 'react-redux';
import CategoriesList from './CategoriesList';
import ProductsList from './ProductsList';

class Home extends Component {

    componentDidMount(){
        this.getCategories();

        this.getProducts();
    }

    getCategories() {
        let categories = [
            {
                id: 1,
                name: 'boots',
                image: 'http://files.microservices.test/api/files/e5c3b26e-7e31-11e8-823d-20c9d084fdb9?s=400'
            },
            {
                id: 2,
                name: 'gear',
                image: 'http://files.microservices.test/api/files/34a0ea8c-7e32-11e8-864c-20c9d084fdb9?s=400'
            },
            {
                id: 3,
                name: 'bicycles',
                image: 'http://files.microservices.test/api/files/5a09ad54-7e32-11e8-b2b0-20c9d084fdb9?s=400'
            },
        ];

        this.props.onGotCategories(categories);
    }

    getProducts(){
        let products = [
            {
                id: 1,
                name: 'Awesome Ble Sneakers',
                price: 150,
                image: 'http://files.microservices.test/api/files/d1b723fe-7e46-11e8-bd2e-20c9d084fdb9?s=400',
                added_to_wishlist: true,
                rating: 5,
                brand: {
                    data: {
                        id: 1,
                        name: 'Nike'
                    }
                }
            },
            {
                id: 2,
                name: 'The Mountains Bicycle',
                price: 1100,
                image: 'http://files.microservices.test/api/files/ebad3ffc-7e44-11e8-bfaf-20c9d084fdb9?s=400',
                rating: 3,
                brand: {
                    data:{
                        id: 1,
                        name : 'Mountains'
                    }
                }
            },
            {
                id: 3,
                name: 'The ultra Light Bicycle',
                price: 1500,
                image: 'http://files.microservices.test/api/files/f9968ab0-7e44-11e8-81f2-20c9d084fdb9?s=400',
                rating: 4,
                brand: {
                    data: {
                        id: 1,
                        name: 'Manufacturer'
                    }
                }
            },
            {
                id: 4,
                name: 'Bicycle by the river',
                price: 1500,
                image: 'http://files.microservices.test/api/files/01f98d24-7e45-11e8-b935-20c9d084fdb9?s=400',
                brand: {
                    data: {
                        id: 1,
                        name: 'Manufacturer'
                    }
                }
            },
            {
                id: 5,
                name: 'The Cities suitable bicycle',
                price: 1500,
                image: 'http://files.microservices.test/api/files/e1656042-7e44-11e8-88f1-20c9d084fdb9?s=400',
                rating: 4,
                brand: {
                    data: {
                        id: 1,
                        name: 'Cities for bicycles'
                    }
                }
            },
            {
                id: 6,
                name: 'The Ultra Light boots',
                price: 1000,
                image: 'http://files.microservices.test/api/files/cd106d58-7e44-11e8-93dc-20c9d084fdb9?s=400',
                rating: 3,
                brand: {
                    data: {
                        id: 1,
                        name: 'Nike'
                    }
                }
            },
        ];
        this.props.onGotProducts(products);
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

const mapStateToProps = (state) => ({})

const mapDispatchToProps = dispatch => ({
    onGotCategories: (categories) => {
        dispatch({
            type: 'UPDATE_CATEGORIES',
            categories,
        });
    },
    onGotProducts: (products) => {
        dispatch({
            type: 'UPDATE_PRODUCTS',
            products
        });
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);