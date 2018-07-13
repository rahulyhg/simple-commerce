import React, { Component } from 'react';
import Table from '../../Table';
import InfoRow from './InfoRow';

class InfoTable extends Component {
    render() {
        const order = this.props.order;
        return (
            <Table hover striped headers={[]}>
                <InfoRow label="Id">{order.id}</InfoRow>
                <InfoRow label="Created At">{order.created_at}</InfoRow>
                <InfoRow label="Total Price">{order.total_price}</InfoRow>
                {order.user && <InfoRow label="By User">{`${order.user.data.name} (${order.user.data.email})`}</InfoRow>}
                <InfoRow label="Status">
                    {order.status === 'active' && 'Order is active'}
                    {order.status === 'approved' && 'Approved'}
                    {order.status === 'canceled' && 'Canceled'}
                </InfoRow>

                {order.status == 'active' &&
                    <React.Fragment>
                        <InfoRow label="Approve Order">
                            <button className="btn btn-default" onClick={this.props.onApproveOrderClicked}>Approve Order</button>
                        </InfoRow>
                        <InfoRow label="Cancel Order">
                        <button className="btn btn-default" onClick={this.props.onCancelOrderClicked}>Cancel Order</button>
                        </InfoRow>
                    </React.Fragment>
                }
            </Table>
        );
    }
}

export default InfoTable;