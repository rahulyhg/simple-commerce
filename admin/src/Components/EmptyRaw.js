import React, { Component } from 'react';

class EmptyRaw extends Component {
    render() {
        return (
            <tr>
                <td className="text-center" colSpan={this.props.colspan}>
                    {this.props.children}
                </td>
            </tr>
        );
    }
}

export default EmptyRaw;