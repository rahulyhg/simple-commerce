import React, { Component } from 'react';
import { Link } from "react-router-dom";

class OrderRow extends Component {
    render() {
        const order = this.props.order;
        return (
            <tr>
                <td>{this.props.index + 1}</td>
                <td>{order.id}</td>
                <td>{order.total_price}</td>
                <td>{order.status}</td>
                <td>{order.created_at}</td>
                <td>
                    <Link to={`/orders/${order.id}`} className="btn btn-primary">
                        <i className="icon-eye"></i>
                    </Link>
                </td>
            </tr>
        );
    }
}

export default OrderRow;