import React, { Component } from 'react';
import QtyField from './QtyField';

class CartRow extends Component {
    render() {
        const product = this.props.product;
        const qtyField = this.props.qtyType ? this.props.qtyType : 'default'
        return (
            <tr>
                <td>{this.props.index + 1}</td>
                <td><img src={`${product.image_url}`} alt={product.title} className="img-responsive" /></td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>
                    {qtyField === 'default' && <QtyField product={product}>{this.props.qty}</QtyField>}
                    {qtyField === 'number-only' && this.props.qty}
                </td>
                <td>{product.price * this.props.qty}</td>
            </tr>
        );
    }
}

export default CartRow;