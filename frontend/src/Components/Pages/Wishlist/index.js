import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { flashErrorMessage, flashSuccessMessage } from 'redux-flash';
import Loader from '../../Loader';
import Table from '../../Table';
import Api from '../../Api';
import WishlistRow from './WishlistRow';

class Index extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loaderState: 'loading',
            products: []
        }

        this.headers = [
            {id: 1, text: '#'},
            {id: 2, text: 'Product Image'},
            {id: 3, text: 'Product Name'},
            {id: 4, text: ''}
        ];

        this.deleteWishlistItem = this.deleteWishlistItem.bind(this);
    }


    componentDidMount(){
        this.getWishlist();
    }

    async getWishlist(){
        let {response, status} = await Api.jsonAuth(
            this.props.user.token,
            'get',
            'wishlist'
        );

        if (parseInt(status) !== 200){
            this.props.sendErrorFlashMessage("An error occurred while getting wishlist");
            this.setState({loaderState: 'empty'});
            return;
        }

        this.setState({ loaderState: 'success', products: response.data});
        return;
    }

    async deleteWishlistItem(product){
        let {response, status} = await Api.jsonAuth(
            this.props.user.token,
            'delete',
            'wishlist',
            {product_id: product.id}
        );

        if(parseInt(status) !== 200){
            this.props.sendErrorFlashMessage("An Error occurred while deleting the message");
            return;
        }

        let products = this.state.products;
        let index = products.findIndex(IProduct => IProduct.id === product.id);
        products = [
            ...products.slice(0, index),
            ...products.slice(index+1)
        ];
        this.setState({products: products});
        this.props.sendSuccessFlashMessage("Product was removed from wishlist successfully");
    }

    render() {
        if(!this.props.user.token){
            return <Redirect to="/login" />
        }

        const products = this.state.products;

        return (
            <div className="container">
                <section className="home-section">
                    <div className="home-section-title">
                        <h1>My Wishlist</h1>
                    </div>

                    <Loader state={this.state.loaderState}
                            empty="No wishlist were found">
                        <Table headers={this.headers}>
                            {products.length > 0 && products.map((product,index) =>
                            <WishlistRow
                                index={index}
                                key={product.id}
                                product={product}
                                onDeleteClicked={this.deleteWishlistItem} />)}

                            {products.length == 0 &&
                                <tr>
                                    <td colSpan="4" className="text-center">No Items were found in the wishlist</td>
                                </tr>
                            }
                        </Table>
                    </Loader>

                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.User
});

const mapDispatchToProps = (dispatch) => ({
    sendErrorFlashMessage: (message) => dispatch(flashErrorMessage(message)),
    sendSuccessFlashMessage: (message) => dispatch(flashSuccessMessage(message))
})

export default connect(mapStateToProps, mapDispatchToProps)(Index);