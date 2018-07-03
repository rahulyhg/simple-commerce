import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import LoveLink from '../../../LoveLink';
import CartLink from '../../Cart/CartLink';
import './Product.css';

class Product extends Component {
    render() {
        const product = this.props.product;

        const className = this.props.className? "product-box "+this.props.className : 'product-box';

        return (
            <div className={className}>
                <div className="thumbnail">
                    <Link to={"products/" + product.id}>
                        <img src={product.image} alt={product.name} className="img-responsive"/>
                    </Link>

                    <div className="actions">
                        <CartLink product={product} />
                        <Link to={"products/" + product.id}><i className="icon-eye"></i></Link>
                        <LoveLink product={product} />
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