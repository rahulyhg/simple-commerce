import React, { Component } from 'react';
import { connect } from "react-redux";
import Api from '../../Api';
import Loader from '../../Loader';
import SingleProduct from './SingleProduct'
import './product.css';

class Product extends Component {
    constructor(props) {
        super(props);

        this.state = {
            'title' : 'Product Page',
            product: {},
            loader: 'loading',
            notFound: false
        }

        this.id = props.match.params.id;
    }

    componentDidMount(){
        this.getProduct();
    }

    async getProduct(){
        //user is logged in add it's token
        let headers = {};
        if(typeof this.props.user.token !== 'undefined'){
            headers['Authorization'] = `Bearer ${this.props.user.token}`;
        }
        let { response, status } = await Api.json('get', `products/${this.id}`, {}, headers);

        status = parseInt(status);
        if (status == 404){
            this.setState({notFound: true});
            return;
        }

        if(status !== 200){
            this.setState({loader: 'empty'});
            return;
        }

        const product = response.data;
        this.setState({title: product.title, product: product, loader: 'success'});
    }

    render() {
        if(this.state.notFound){
            //TODO:: redirect to 404 page
        }
        return (
            <section className="home-section clearfix">
                <div className="home-section-title">
                    <h1>{this.state.title}</h1>
                </div>

                <Loader state={this.state.loader}>
                    <SingleProduct product={this.state.product} user={this.props.user} />
                </Loader>
            </section>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.User
})

export default connect(mapStateToProps)(Product);