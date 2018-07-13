import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import Panel from '../../Panel';
import Loader from '../../Loader';
import Table from '../../Table';
import Api from '../../Api';
import OrderRow from './OrderRow';

import Show from './Show'

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loaderState: 'loading',
            orders: []
        }

        this.headers = [
            {id: 1, text: '#'},
            {id: 2, text: 'Order Id'},
            {id: 3, text: 'Order Total Price'},
            {id: 4, text: 'Order Status'},
            {id: 5, text: 'Created At'},
            {id: 6, text: ''},
        ];
    }

    componentDidMount(){
        this.getOrders();
    }

    async getOrders(){
        let {response, status} = await Api.jsonAuth(
            this.props.user.token,
            'get',
            'orders'
        );

        if(parseInt(status) !== 200){
            this.setState({loaderState: 'empty'});
            return;
        }

        this.setState({orders: response.data, loaderState: 'success'});
    }

    render() {
        if(!this.props.user.token){
            return <Redirect to="/login" />
        }

        const orders = this.state.orders;
        return (
            <div className="container">
                <Panel title="Orders">
                    <Loader state={this.state.loaderState}>
                        <Table headers={this.headers} hover striped>
                            {orders.length == 0 &&
                                <tr>
                                    <td className="text-center" colSpan="6">No Orders were submitted yet</td>
                                </tr>
                            }

                            {orders.length > 0 && orders.map((order, index) =>
                                <OrderRow key={order.id} index={index} order={order} />
                            )}
                        </Table>
                    </Loader>
                </Panel>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.User
})

export default {
    Index: connect(mapStateToProps)(Index),
    Show
};