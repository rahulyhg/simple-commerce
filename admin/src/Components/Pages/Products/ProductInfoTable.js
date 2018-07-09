import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProductInfoTable extends Component {
    render() {
        const product = this.props.product;
        return (
            <table className="table table-hover table-bordered table-striped">
                <tbody>
                    <tr>
                        <td>Product Title</td>
                        <td>{product.title}</td>
                    </tr>
                    <tr>
                        <td>Product Price</td>
                        <td>{product.price}</td>
                    </tr>
                    <tr>
                        <td>Product Description</td>
                        <td>{product.description}</td>
                    </tr>
                    <tr>
                        <td>Product Image</td>
                        <td><img src={product.image_url} alt={product.title} /></td>
                    </tr>
                    <tr>
                        <td>Product Categories</td>
                        <td>{product.categories.data.map(cat => cat.name).join(', ')}</td>
                    </tr>

                    <tr>
                        <td>Product Brands</td>
                        <td>{product.brands.data.map(cat => cat.name).join(', ')}</td>
                    </tr>

                    <tr>
                        <td>Available Qty</td>
                        <td>
                            {product.qty+' '}
                            {product.qty <= 0 &&   <span className="label label-danger">Not in stock</span>}
                            {product.qty > 0 &&  <span className="label label-success">In stock</span>}
                        </td>
                    </tr>

                    <tr>
                        <td>Edit Product</td>
                        <td>
                            <Link className="btn btn-primary" to={`/products/${product.id}/edit`} > Edit </Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default ProductInfoTable;