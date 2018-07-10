import React, { Component } from 'react';
import Label from '../../Label';

class TreasuryPaperRow extends Component {
    render() {
        const model = this.props.model;

        let content;

        if (model.accountable.data.model_type === 'product' ){
            content = `Product: ${model.accountable.data.title}`;
        }else{
            content = `Order #${model.accountable.data.id}`;
        }
        return (
            <tr>
                <td>{this.props.index+1}</td>
                <td>
                    {content}
                </td>
                <td>
                    {model.type === 'in' && <Label type="success">In</Label>}
                    {model.type === 'out' && <Label type="danger">Out</Label>}
                </td>
                <td>{model.value}</td>
                <td>{model.created_at}</td>
            </tr>
        );
    }
}

export default TreasuryPaperRow;