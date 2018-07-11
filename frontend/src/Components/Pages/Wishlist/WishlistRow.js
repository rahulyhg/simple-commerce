import React, { Component } from 'react';

class WishlistRow extends Component {
    render() {
        const product = this.props.product;
        return (
            <tr>
                <td>{this.props.index + 1}</td>
                <td><img src={product.image_url} alt={product.title} className="img-responsive"/></td>
                <td>{product.title}</td>
                <td>
                    <button
                        className="btn btn-danger"
                        onClick={() => this.props.onDeleteClicked(product)}>
                        <i className="icon-trash-2"></i>
                    </button>
                </td>
            </tr>
        );
    }
}

export default WishlistRow;