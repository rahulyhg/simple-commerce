import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import LoveLink from '../../../LoveLink';
import CartLink from '../../Cart/CartLink';
import Rating from 'react-rating';
import './Product.css';

class Product extends Component {
    render() {
        const product = this.props.product;

        const className = this.props.className? "product-box "+this.props.className : 'product-box';

        return (
            <div className={className}>
                <div className="thumbnail">
                    <Link to={"/products/" + product.id}>
                        <img src={`${product.image_url}?s=400`} alt={product.title} className="img-responsive"/>
                    </Link>

                    <div className="actions">
                        <CartLink product={product} />
                        <Link to={"/products/" + product.id}><i className="icon-eye"></i></Link>
                        <LoveLink product={product} />
                    </div>
                </div>
                <section className="info">
                    <h3 className="title">{product.title}</h3>
                    <div className="rating">
                        <Rating
                            start={0}
                            stop={5}
                            step={1}
                            initialRating={product.rating}
                            readonly={true}
                            placeholderSymbol={<i className="icon-star-empty"></i>}
                            emptySymbol={<i className="icon-star-empty"></i>}
                            fullSymbol={<i className="icon-star-full"></i>}
                        />
                    </div>
                    <div><strong>Price:</strong> <span className="price">{product.price}$</span></div>
                    <div><strong>Brand:</strong> <span className="price">{product.brands.data[0].name}</span></div>
                </section>
            </div>
        );
    }
}

export default Product;