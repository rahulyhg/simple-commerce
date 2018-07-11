import React, { Component } from 'react';
import { connect } from 'react-redux';
import { flashErrorMessage, flashSuccessMessage } from 'redux-flash';
import { updateCart, flushCart } from "./actions";
import Table from '../../Table';
import Loader from '../../Loader';
import Api from '../../Api';
import CartRow from './CartRow';
import './Cart.css'

class Cart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loaderState: 'success',
            emptyMessage: 'You haven\'t added any items in the cart'
        }

        this.headers = [
            {id: 1, text: '#'},
            {id: 2, text: 'Image'},
            {id: 3, text: 'Product Name'},
            {id: 4, text: 'Qty'},
            {id: 5, text: 'Total Price'}
        ]

        this.submitOrder = this.submitOrder.bind(this);
    }


    submitOrder(e){
        e.preventDefault();

        this.sendOrderRequest();
    }

    async sendOrderRequest(){
        if(!this.props.user.token){
            this.props.sendErrorFlashMessage('You need to login before submitting order');
            return;
        }

        this.setState({loaderState: 'loading'});

        let products = this.props.cart.map(item => ({product_id: item.product.id, qty:item.qty}) );
        let {response, status} = await Api.jsonAuth(
            this.props.user.token,
            'post',
            'orders',
            {products}
        );

        this.setState({ loaderState: 'success' });
        if (parseInt(status) !== 200){
            this.props.sendErrorFlashMessage('An error Occurred while submitting order');
            return;
        }

        this.setState({emptyMessage: 'Order was submitted successfully and cart was cleaned'});
        this.props.sendSuccessFlashMessage('Order was submitted successfully');
        this.props.flushCart();
    }

    render() {
        const cart = this.props.cart;
        return (
            <React.Fragment>
                <div className="container">
                    <div className="home-section">
                        <div className="home-section-title">
                            <h1>Shopping Cart</h1>
                        </div>

                        <Loader state={this.state.loaderState}>

                            <Table hover striped headers={this.headers}>
                                {cart.length > 0 && cart.map((item,index) =>
                                    <CartRow key={item.product.id} index={index} item={item} />
                                )}

                                {!cart.length &&
                                    <tr>
                                        <td colSpan="6" className="text-center">{this.state.emptyMessage}</td>
                                    </tr>
                                }

                            </Table>

                        </Loader>

                        <div className="pull-right btn-group">
                            <button onClick={this.props.onUpdateClick} className="m-t-50 m-b-50 btn btn-primary">Update Cart</button>
                            <button className="m-t-50 m-b-50 btn btn-success" onClick={this.submitOrder}>Submit Order</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    cart: state.CartReducer,
    user: state.User
})

const mapDispatchToProps = (dispatch) => ({
    onUpdateClick: () => dispatch(updateCart()),
    flushCart: () => dispatch(flushCart()),
    sendErrorFlashMessage: (message) => dispatch(flashErrorMessage(message)),
    sendSuccessFlashMessage: (message) => dispatch(flashSuccessMessage(message))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart);