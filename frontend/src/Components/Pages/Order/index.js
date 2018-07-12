import React, { Component } from 'react';
import { connect } from "react-redux";
import Loader from '../../Loader';
import Table from '../../Table';
import Api from '../../Api';
import OrderRow from './OrderRow';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loaderState: 'loading',
            orders: []
        };

        this.headers = [
            {id: 1, text: '#'},
            {id: 2, text: 'Order #'},
            {id: 3, text: 'Total Price'},
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

        if (parseInt(status) !== 200){
            this.setState({loaderState: 'success'});
            return;
        }

        this.setState({loaderState: 'success', orders: response.data});
    }

    render() {
        return (
            <div className="container">
                <section className="home-section">
                    <div className="home-section-title">
                        <h1>My Orders</h1>
                    </div>

                    <Loader state={this.state.loaderState}>
                        <Table hover striped headers={this.headers}>
                            {this.state.orders.length > 0 && this.state.orders.map((order, index) => <OrderRow key={order.id} order={order} index={index} />)}
                            {this.state.orders.length == 0 &&
                                <tr>
                                    <td colSpan="6" className="text-center">No Orders were submitted</td>
                                </tr>
                            }
                        </Table>
                    </Loader>
                </section>
            </div>
        );
    }
}

const mapStateToOrders = (state) => ({
    user: state.User
})

export default connect(mapStateToOrders)(Index);