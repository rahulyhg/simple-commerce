import React, { Component } from 'react';
import { connect } from "react-redux";
import { incrementProduct } from './actions';

class CartLink extends Component {

    render() {
        return (
            <React.Fragment>
                <a onClick={() => { this.props.addToCart(this.props.product);} }>
                    <i className="icon-shopping-bag"></i>
                </a>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    addToCart: (product) => dispatch(incrementProduct(product))
})

export default connect(undefined, mapDispatchToProps)(CartLink);