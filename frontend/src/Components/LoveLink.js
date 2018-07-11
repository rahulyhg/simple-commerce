import React, { Component } from 'react';
import { connect } from "react-redux";
import classNames from 'classnames';
import { flashErrorMessage } from 'redux-flash';
import Api from './Api';

class LoveLink extends Component {
    constructor(props) {
        super(props);

        this.state = {
            added_to_wishlist: props.product.added_to_wishlist,
        }

        this.sendFavRequest = this.sendFavRequest.bind(this)
    }

    async sendFavRequest(){
        const token = this.props.user.token;
        if(!token){
            this.props.sendErrorFlashMessage("You must be logged in in order to add this product to your favorite list")
            return;
        }

        let method = 'post';
        if (this.state.added_to_wishlist){
            method = 'delete';
        }

        //positive thoughts :D
        this.setState(prevState => ({
            ...prevState,
            added_to_wishlist: !prevState.added_to_wishlist
        }));


        let {response, status} = await Api.jsonAuth(
            token,
            method,
            'wishlist',
            {product_id: this.props.product.id}
        );

        if (parseInt(status) !== 200){
            this.props.sendErrorFlashMessage("An error occurred")
            this.setState(prevState => ({
                ...prevState,
                added_to_wishlist: !prevState.added_to_wishlist
            }));

            return;
        }
    }

    render() {
        let className = classNames({favorite: true, added_to_wishlist: this.state.added_to_wishlist});
        return (
            <React.Fragment>
                <a className={className} onClick={this.sendFavRequest}>
                    {this.state.added_to_wishlist ? <i className="icon-heart2"></i> : <i className="icon-heart"></i> }
                </a>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.User
});

const mapDispatchToProps = (dispatch) => ({
    sendErrorFlashMessage: (message) => dispatch(flashErrorMessage(message))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoveLink)