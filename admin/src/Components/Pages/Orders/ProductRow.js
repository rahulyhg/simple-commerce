import React, { Component } from 'react';

class ProductRow extends Component {
    render() {
        const product = this.props.product;
        return (
            <tr>
                <td>{this.props.index+1}</td>
                <td><img src={product.image_url} alt={product.title} className="img-responsive"/></td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.qty_pivot}</td>
                <td>{product.price * product.qty_pivot}</td>
            </tr>
        );
    }
}

export default ProductRow;