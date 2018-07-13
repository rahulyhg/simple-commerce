import React, { Component } from 'react';

class InfoRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.label}</td>
                <td>{this.props.children}</td>
            </tr>
        );
    }
}

export default InfoRow;