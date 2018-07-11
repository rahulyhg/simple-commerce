import React, { Component } from 'react';
import QtyField from './QtyField';

class CartRow extends Component {
    render() {
        const item = this.props.item;
        return (
            <tr>
                <td>{this.props.index + 1}</td>
                <td><img src={`${item.product.image_url}`} alt={item.product.title} className="img-responsive" /></td>
                <td>{item.product.title}</td>
                <td>{item.product.price}</td>
                <td><QtyField product={item.product}>{item.qty}</QtyField></td>
                <td>{item.product.price * item.qty}</td>
            </tr>
        );
    }
}

export default CartRow;