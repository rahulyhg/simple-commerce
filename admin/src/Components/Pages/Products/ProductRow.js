import React, { Component } from 'react';

class ProductRow extends Component {
    render() {
        const product = this.props.product
        return (
            <React.Fragment>
                <tr>
                    <td>{product.id}</td>
                    <td><img className="img-responsive" src={product.image} alt={product.name} /></td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.qty}</td>
                    <td></td>
                </tr>
            </React.Fragment>
        );
    }
}

export default ProductRow;