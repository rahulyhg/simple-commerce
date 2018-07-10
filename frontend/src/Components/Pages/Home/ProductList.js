import React, { Component } from 'react';
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
        let { response, status} = await Api.json('get','products?items=6');

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


export default ProductsList;