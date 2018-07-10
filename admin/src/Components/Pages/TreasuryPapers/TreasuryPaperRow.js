import React, { Component } from 'react';
import Label from '../../Label';

class TreasuryPaperRow extends Component {
    render() {
        const model = this.props.model;
        return (
            <tr>
                <td>{this.props.index+1}</td>
                <td>
                    {model.type === 'Modules\ShoppingCart\Entities\Order' && `Order #${model.accountable.data.id}`}
                    {model.type === 'Modules\ShoppingCart\Entities\Product' && `Product: ${model.accountable.data.title}`}
                </td>
                <td>
                    {model.type === 'in' && <Label type="success">In</Label>}
                    {model.type === 'out' && <Label type="danger">Out</Label>}
                </td>
                <td>{model.type}</td>
                <td>{model.created_at}</td>
            </tr>
        );
    }
}

export default TreasuryPaperRow;