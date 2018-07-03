import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class CartBagLink extends Component {
    render() {
        return (
            <React.Fragment>
                <Link className="cart" to="/cart">
                    <div className="badge">{this.props.cart.reduce((qty, item) => qty += item.qty, 0)}</div>
                    <i className="icon-shopping-bag"></i>
                </Link>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    cart: state.CartReducer
})

export default connect(mapStateToProps)(CartBagLink);