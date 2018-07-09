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
import Edit from './Edit';
import Show from './Show';

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
        ];

        this.deleteProduct = this.deleteProduct.bind(this);
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

    async deleteProduct(product){
        let {response, status} = await Api.jsonAuth(
            this.props.user.token,
            'delete',
            `admin/products/${product.id}`
        );

        if (parseInt(status) !== 200){
            return;
        }

        let products = this.state.products;
        const index = products.findIndex(prod => prod.id === product.id);
        products = [
            ...products.slice(0,index-1),
            ...products.slice(index+1)
        ];

        return this.setState({products})
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
            tableContent = products.map(product => <ProductRow onDeleteClicked={this.deleteProduct} key={product.id} product={product} />)
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
    Create,
    Edit,
    Show
};