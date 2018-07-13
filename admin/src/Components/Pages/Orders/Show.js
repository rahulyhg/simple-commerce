import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Panel from "../../Panel";
import Loader from "../../Loader";
import Table from "../../Table";
import Api from "../../Api";

import InfoTable from './InfoTable';
import ProductRow from './ProductRow';

class Show extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: 'Order Details',
            loaderState: 'loading',

            order: {}
        };

        this.id = props.match.params.id;

        this.productsHeader = [
            {id: 1, text: "#"},
            {id: 2, text: "Product Image"},
            {id: 3, text: "Product Name"},
            {id: 4, text: "Product Price"},
            {id: 5, text: "Qty"},
            {id: 6, text: "Total Price"},
        ]

        this.approveOrder = this.approveOrder.bind(this);
        this.cancelOrder = this.cancelOrder.bind(this);
    }

    componentDidMount(){
        this.getOrder();
    }

    approveOrder() {
        this.updateOrderStatus('approved');
    }

    cancelOrder() {
        this.updateOrderStatus('canceled');
    }

    async getOrder(){
        let {response, status} = await Api.jsonAuth(
            this.props.user.token,
            'get',
            `orders/${this.id}`
        );

        if(parseInt(status) !== 200){
            this.setState({loaderState: 'empty'});
            return;
        }

        this.setState({loaderState: 'success', order: response.data, title: `Order #${response.data.id} Details`});
    }

    async updateOrderStatus(newStatus){
        let {response, status} = await Api.jsonAuth(
            this.props.user.token,
            'put',
            `orders/${this.id}`,{
                status: newStatus
            }
        );

        if(parseInt(status) !== 200){
            return;
        }

        let order = {
            ...this.state.order,
            status: newStatus
        }

        this.setState({ order });

    }

    render() {
        if(!this.props.user.token){
            return <Redirect to="/login" />
        }

        const products = this.state.order.products ? this.state.order.products.data : [];

        return (
            <React.Fragment>
                <Panel title={this.state.title}>
                    <Loader state={this.state.loaderState}>
                        <InfoTable
                            order={this.state.order}
                            onApproveOrderClicked={this.approveOrder}
                            onCancelOrderClicked={this.cancelOrder}
                            />
                    </Loader>
                </Panel>

                <Panel title="Order Products">
                    <Loader state={this.state.loaderState}>
                        <Table hover striped headers={this.productsHeader}>
                            {products.length > 0 && products.map((product,index) =>
                                <ProductRow key={product.id} index={index} product={product} />
                            )}
                        </Table>
                    </Loader>
                </Panel>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.User
});

export default connect(mapStateToProps)(Show);