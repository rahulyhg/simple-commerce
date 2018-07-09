import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProductRow extends Component {
    render() {
        const product = this.props.product
        return (
            <React.Fragment>
                <tr>
                    <td>{product.id}</td>
                    <td><img className="img-responsive" src={product.image_url} alt={product.name} /></td>
                    <td>{product.title}</td>
                    <td>{product.price}</td>
                    <td>{product.qty}</td>
                    <td>
                        <div className="btn-group">
                            <Link to={`/products/${product.id}`} className="btn btn-info">Product Info</Link>
                            <Link to={`/products/${product.id}/edit`} className="btn btn-success">Edit</Link>
                            <Link to={`/products/${product.id}/qty`} className="btn btn-default">Qty Log</Link>
                            <button className="btn btn-danger" onClick={() => this.props.onDeleteClicked(this.props.product)}>Delete</button>
                        </div>
                    </td>
                </tr>
            </React.Fragment>
        );
    }
}

export default ProductRow;