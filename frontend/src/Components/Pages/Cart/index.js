import React, { Component } from 'react';
import { connect } from 'react-redux';
import QtyField from './QtyField';
import { updateCart } from "./actions";
import './Cart.css'

class Cart extends Component {
    render() {
        const cart = this.props.cart;
        return (
            <React.Fragment>
                <div className="container">
                    <div className="home-section">
                        <div className="home-section-title">
                            <h1>Shopping Cart</h1>
                        </div>

                        <table className="text-center table table-striped table-hover">
                            <thead>
                                <tr>
                                    <td>#</td>
                                    <td>Image</td>
                                    <td>Product Name</td>
                                    <td>Price</td>
                                    <td>Total price</td>
                                    <td>Qty</td>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item, index) => {
                                    return (
                                        <tr key={item.product.id}>
                                            <td>{index+1}</td>
                                            <td><img src={`${item.product.image_url}`} alt={item.product.title} className="img-responsive"/></td>
                                            <td>{item.product.title}</td>
                                            <td>{item.product.price}</td>
                                            <td>{item.product.price * item.qty}</td>
                                            <td><QtyField product={item.product}>{item.qty}</QtyField></td>
                                        </tr>
                                    );
                                })}

                                {
                                    !cart.length &&
                                    (<tr>
                                        <td colSpan="6">You haven't added any items in the cart</td>
                                    </tr>)
                                }
                            </tbody>
                        </table>

                        <div className="pull-right btn-group">
                            <button onClick={this.props.onUpdateClick} className="m-t-50 m-b-50 btn btn-primary">Update Cart</button>
                            <button className="m-t-50 m-b-50 btn btn-success">Submit Order</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    cart: state.CartReducer
})

const mapDispatchToProps = (dispatch) => ({
    onUpdateClick: () => dispatch(updateCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart);