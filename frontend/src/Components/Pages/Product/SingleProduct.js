import React, { Component } from 'react';
import ProductInfoLine from './ProductInfoLine';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import LoginForm from '../LogIn/LoginForm';
import Label from '../../Label';
import Rating from 'react-rating';
import CommentsList from './CommentsList';
import CommentForm from './CommentForm';
import AlertBox from '../../AlertBox';

class SingleProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: props.product.comments.data || []
        };

        this.afterCommentSaved = this.afterCommentSaved.bind(this);
    }

    afterCommentSaved(comment){
        let comments = this.state.comments;
        comments = [
            comment,
            ...comments
        ];
        this.setState({comments});
    }

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
                                <CommentsList comments={this.state.comments} />
                            </TabPanel>
                            <TabPanel>
                                {(typeof this.props.user.token != 'undefined' && product.current_user_rate === null) &&
                                    <CommentForm user={this.props.user} product={product} onCommentSaved={this.afterCommentSaved} /> }

                                {(typeof this.props.user.token != 'undefined' && product.current_user_rate !== null) &&
                                <AlertBox type="info">You have submitted a review for this product before</AlertBox> }
                                {!this.props.user.token && (
                                    <React.Fragment>
                                        <h4 className="text-center">You have to login in order to submit a review</h4>
                                        <LoginForm />
                                    </React.Fragment>
                                ) }
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </div>
        );
    }
}

export default SingleProduct;