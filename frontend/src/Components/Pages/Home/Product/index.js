import React, { Component } from 'react';
import './Product.css';

class Product extends Component {
    render() {
        const product = this.props.product;

        const className = this.props.className? "product-box "+this.props.className : 'product-box';

        return (
            <div className={className}>
                <div className="thumbnail">
                    <img src={product.image} alt={product.name} className="img-responsive"/>

                    <div className="actions">
                        <a><i className="icon-basket"></i></a>
                        <a><i className="icon-eye"></i></a>
                        <a><i className="icon-heart"></i></a>
                    </div>
                </div>
                <section className="info">
                    <h3 className="title">{product.name}</h3>
                    <div><strong>Price:</strong> <span className="price">{product.price}$</span></div>
                    <div><strong>Brand:</strong> <span className="price">{product.brand.data.name}</span></div>
                </section>
            </div>
        );
    }
}

export default Product;