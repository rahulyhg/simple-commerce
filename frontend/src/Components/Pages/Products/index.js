import React, { Component } from 'react';
import { connect } from "react-redux";
import { updateBrands, updateCategories } from "./actions";
import Api from "../../Api";
import Loader from "../../Loader";
import FilterSideBar from './FilterSideBar'
import Product from '../Home/Product'
import './Products.css'

class Index extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categories: parseInt(props.match.params.id) ? [parseInt(props.match.params.id)] : [],
            brands: [],
            keyword: '',

            products: [],

            selectedCategories: [parseInt(props.match.params.id)],

            loaderState: 'loading'
        }

        this.filterProducts = this.filterProducts.bind(this);
    }


    componentDidMount(){
        if(!this.props.categories.length)
            this.fetchCategories()
                .then((categories) => {
                    this.props.updateCategories(categories);
                });

        if (!this.props.brands.length)
            this.fetchCategories('brand')
                .then((brands) => {
                    this.props.updateBrands(brands);
                });

        this.getProducts();
    }

    fetchCategories(type = 'default'){
        return Api.jsonAuth(
            this.props.user.token,
            'get',
            `categories?type=${type}`
        ).then(({ response, status }) => {
            if (parseInt(status) !== 200) {
                return Promise.resolve([]);
            }

            return Promise.resolve(response.data);
        });
    }

    async getProducts(){
        this.setState({loaderState: 'loading'});

        let {response, status} = await Api.jsonAuth(
            this.props.user.token,
            'get',
            `products?categories=${this.state.categories.join(',')}&brands=${this.state.brands.join(',')}&s=${this.state.keyword}`
        );

        if(parseInt(status) !== 200){
            this.setState({loaderState: 'empty', products: []});
            return;
        }

        this.setState({loaderState: 'success', 'products': response.data});
        return;
    }

    filterProducts(state){
        this.setState(state,() => this.getProducts());
    }

    render() {
        const products = this.state.products;
        return (
            <div className="container">
                <section className="home-section">
                    <div className="home-section-title">
                        <h1>Products</h1>
                    </div>
                </section>

                <div className="row">

                    <aside className="filter-sidebar col-xs-12 col-sm-6 col-md-3">
                        <FilterSideBar
                            categories={this.props.categories}
                            selectedCategories={this.state.selectedCategories}
                            brands={this.props.brands}
                            selectedBrands={[]}
                            onFilterStart={this.filterProducts}
                            />
                    </aside>

                    <main className="products-list col-xs-12 col-sm-6 col-md-9">
                        <Loader
                            state={this.state.loaderState}
                            empty="An Error occurred"
                            >
                            {products.length > 0 && products.map(product =>
                                <Product className="col-md-6" key={product.id} product={product} />
                            )}
                        </Loader>
                    </main>
                </div>{/*end of row*/}

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.User,
    categories: state.Categories,
    brands : state.Brands
});

const mapDispatchToProps  = (dispatch) => ({
    updateCategories : (categories) => dispatch(updateCategories(categories)),
    updateBrands: (brands) => dispatch(updateBrands(brands)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Index);