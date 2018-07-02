import React, { Component } from 'react';
import classNames from 'classnames';

class LoveLink extends Component {
    constructor(props) {
        super(props);

        this.state = {
            added_to_wishlist: props.product.added_to_wishlist,
        }

        this.sendFavRequest = this.sendFavRequest.bind(this)
    }

    sendFavRequest(){
        //positive thoughts :D
        this.setState(prevState => ({
            ...prevState,
            added_to_wishlist: !prevState.added_to_wishlist
        }));

        //TODO:SEND REQUEST

        //after requests
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

export default LoveLink;