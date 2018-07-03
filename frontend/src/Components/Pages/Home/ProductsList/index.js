import React, { Component } from 'react';
import { connect } from "react-redux";
import Loader from "../../../Loader";
import EmptyState from "../../../EmptyState";
import Product from "../Product";

class ProductsList extends Component {
    render() {
        let content;

        let products = this.props.products;
        if(typeof products === 'undefined'){
            content = <Loader />
        }else if(!products.length){
            content = <EmptyState>No Products were added</EmptyState>
        }else{
            content = products.map(product => <Product key={product.id} product={product} className="col-md-4 col-sm-6 col-xs-12" />)
        }
        return (
            <div className="row section">
                <div className="home-section-title">
                    <h1>Featured Products</h1>
                </div>
                {content}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    products: state.HomeReducer.products
});

export default connect(mapStateToProps)(ProductsList);