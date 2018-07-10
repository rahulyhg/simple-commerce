import React, { Component } from 'react';
import ProductInfoLine from './ProductInfoLine';
import Label from '../../Label';
import Rating from 'react-rating';
import Comments from './Comments';
import CommentForm from './CommentForm';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class SingleProduct extends Component {
    render() {
        const product = this.props.product;
        return (

            <div className="container">
                <div className="row m-t-50">
                    <div className="col-md-5 col-xs-12 product-thumbnail">
                        <img src={`${product.image_url}?s=500`} alt={product.title} className="img-responsive"/>
                    </div>
                    <div className="col-md-7 col-xs-12 product-info">
                        <ProductInfoLine label="Price" value={product.price} />
                        <ProductInfoLine label="Available Qty" value={product.qty} />

                        <ProductInfoLine label="Availability" value={
                            product.qty > 0 && <Label type="success" >In Stock</Label>
                            ||
                            product.qty <= 0 && <Label type="danger" >Not Available at the moment</Label>
                        } />

                        <ProductInfoLine label="Brand" value={product.brands.data[0].name} />
                        <ProductInfoLine label="Categories" value={product.categories.data.map(cat => cat.name).join(', ')} />
                        <ProductInfoLine label="Rating" value={
                            <div className="rating" style={{display: 'inline-block', marginLeft: '10px'}}>
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
                        } />
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12">
                        <Tabs>
                            <TabList>
                                <Tab>Description</Tab>
                                <Tab>Reviews</Tab>
                                <Tab>Submit A Review</Tab>
                            </TabList>

                            <TabPanel>
                                {product.description}
                            </TabPanel>
                            <TabPanel>
                                <Comments comments={product.comments} />
                            </TabPanel>
                            <TabPanel>
                                <CommentForm product={product} />
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </div>
        );
    }
}

export default SingleProduct;