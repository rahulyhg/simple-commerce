import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import Api from '../../Api';
import Loader from '../../Loader/index';
import Panel from '../../Panel';
import Table from '../../Table';
import EmptyRaw from '../../EmptyRaw';
import ProductRow from './ProductRow';

import Create from './Create';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'loaderState': 'loading',
            products: []
        };

        this.headers = [
            {id: 1, text: '#'},
            {id: 2, text: 'Image'},
            {id: 3, text: 'Name'},
            {id: 4, text: 'Price'},
            {id: 5, text: 'Available Qty'},
            {id: 6, text: 'Actions'},
        ]
    }

    componentDidMount(){
        this.getProducts();
    }

    async getProducts(){
        const props = this.props;
        let {response, status} = await Api.jsonAuth(props.user.token , 'get', 'admin/products');

        if(status != 200){
            this.setState({'loaderState': 'empty'});
        }

        this.setState({ 'loaderState': 'success' })
        this.setState({products: response.data});
    }

    render() {
        if(!this.props.user.token){
            return <Redirect to="/login" />
        }

        const products = this.state.products;
        let tableContent = '';
        if(!products.length){
            tableContent = <EmptyRaw colspan="6">No Products Yet</EmptyRaw>
        }else{
            tableContent = products.map(product => <ProductRow key={product.id} product={product} />)
        }

        return (
            <Panel
                title="Products"
                actionBtns={<Link className=" m-t-15 btn btn-primary" to="/products/create">Create Product</Link>}>
                <Loader state={this.state.loaderState}>
                    <Table headers={this.headers}>
                        {tableContent}
                    </Table>
                </Loader>
            </Panel>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.User
})
let reduxIndex = connect(mapStateToProps)(Index);

export default {
    Index: reduxIndex,
    Create
};