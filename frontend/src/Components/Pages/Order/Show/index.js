import React, { Component } from 'react';
import { connect } from "react-redux";
import { flashErrorMessage, flashSuccessMessage } from 'redux-flash';
import Loader from '../../../Loader';
import Api from '../../../Api';
import Table from '../../../Table';
import CartRow from '../../Cart/CartRow'

class Show extends Component {
    constructor(props) {
        super(props);

        this.state = {
            order: {},
            title: 'Order Details',
            loaderState: 'loading',
        };

        this.id = props.match.params.id;

        this.onCancelClicked = this.onCancelClicked.bind(this);

        this.productHeaders = [
            { id: 1, text: '#' },
            { id: 2, text: 'Image' },
            { id: 3, text: 'Product Name' },
            { id: 6, text: 'Price' },
            { id: 4, text: 'Qty' },
            { id: 5, text: 'Total Price' }
        ]
    }

    componentDidMount(){
        this.getOrder();
    }

    onCancelClicked(e){
        e.preventDefault();
        this.cancelOrder();
    }

    async getOrder(){
        let {response, status} = await Api.jsonAuth(
            this.props.user.token,
            'get',
            `orders/${this.id}`
        );

        if(parseInt(status) !== 200){
            this.setState({loaderState: 'empty'})
            return;
        }

        this.setState({order: response.data, loaderState: 'success', 'title': `Order #${response.data.id} Details`});
        return;
    }

    async cancelOrder(){
        let {status} = await Api.jsonAuth(
            this.props.user.token,
            'put',
            `orders/${this.id}`,
            {
                'status': 'canceled'
            }
        );

        if (parseInt(status) !== 200){
            this.props.sendErrorFlashMessage("An error Occurred while trying to cancel order");
            return;
        }

        let order = {
            ...this.state.order,
            status: 'canceled'
        };

        this.setState({order});

        this.props.sendSuccessFlashMessage("Order got canceled successfully");
    }

    render() {
        const order = this.state.order;
        const products = order.products ? order.products.data : [];
        return (
            <div className="container">
                <section className="home-section">
                    <div className="home-section-title">
                        <h1>{this.state.title}</h1>
                    </div>

                    <Loader
                        state={this.state.loaderState}
                        empty="Can't find Order"
                    >

                        <Table hover striped bordered headers={[]}>
                            <tr>
                                <td>Order Id</td>
                                <td>{order.id}</td>
                            </tr>
                            <tr>
                                <td>Order Created At</td>
                                <td>{order.created_at}</td>
                            </tr>
                            <tr>
                                <td>Order Total Price</td>
                                <td>{order.total_price}</td>
                            </tr>
                            <tr>
                                <td>Order Status</td>
                                <td>
                                    {order.status === 'active' && `Active but still needs to be approved by admin`}
                                    {order.status === 'approved' && `Approved by admin`}
                                    {order.status === 'canceled' && `Canceled`}
                                </td>
                            </tr>
                            {order.status === 'active' &&
                                <tr>
                                    <td>Cancel Order</td>
                                    <td><button className="btn btn-default" onClick={this.onCancelClicked}>Cancel Order</button></td>
                                </tr>
                            }
                        </Table>

                        <h1 className="text-center m-t-50">Order Products</h1>

                        <Table hover striped headers={this.productHeaders}>
                            {products.length > 0 && products.map((product,index) =>
                                <CartRow key={product.id} index={index} product={product} qty={product.qty_pivot} qtyType="number-only" />
                            )}
                        </Table>
                    </Loader>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.User
});

const mapDispatchToProps = (dispatch) => ({
    sendErrorFlashMessage: (message) => dispatch(flashErrorMessage(message)),
    sendSuccessFlashMessage: (message) => dispatch(flashSuccessMessage(message))
})

export default connect(mapStateToProps, mapDispatchToProps)(Show);