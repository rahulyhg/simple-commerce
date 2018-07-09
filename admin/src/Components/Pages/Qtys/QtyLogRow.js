import React, { Component } from 'react';
import Label from '../../Label';

class QtyLogRow extends Component {
    render() {
        const model = this.props.model;
        return (
            <tr>
                <td>{this.props.index+1}</td>
                <td>
                    {model.type == 'in' && <Label type="success">In</Label>}
                    {model.type == 'out' && <Label type="danger">Out</Label>}
                </td>
                <td>{model.value}</td>
                <td>{model.created_at}</td>
                {/* <td></td> */}
            </tr>
        );
    }
}

export default QtyLogRow;