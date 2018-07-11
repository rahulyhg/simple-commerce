import React, { Component } from 'react';
import { connect } from "react-redux";
import Product from "./Product";
import Api from "../../Api";
import Loader from "../../Loader";

class ProductsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loader: 'loading',
            products: []
        }
    }

    componentDidMount(){
        this.getProducts();
    }

    async getProducts(){
        let headers = {};
        if(this.props.user.token){
            headers['Authorization'] = `Bearer ${this.props.user.token}`;
        }

        let { response, status} = await Api.json('get','products?items=6',{},headers);

        if (parseInt(status) !== 200){
            this.setState({ loader: 'empty'});
            return;
        }

        this.setState({loader: 'success', products: response.data});
    }

    render() {
        return (
            <div className="row section">
                <div className="home-section-title">
                    <h1>Featured Products</h1>
                </div>
                <Loader state={this.state.loader}
                    empty="No Products were found in the system"
                    >
                    {this.state.products.map(product => <Product className="col-md-4" key={product.id} product={product} />)}
                </Loader>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.User
})

export default connect(mapStateToProps)(ProductsList);