import React, { Component } from 'react';
import classNames from 'classnames';

class Table extends Component {
    render() {
        const props = this.props;
        let classes = classNames({
            table: true,
            'table-hover' : props.hover,
            'table-striped' : props.striped
        });
        return (
            <table className={classes}>
                <thead>
                    <tr>
                        {props.headers.map(header=> <td key={header.id}>{header.text}</td>)}
                    </tr>
                </thead>
                <tbody>
                    {this.props.children}
                </tbody>
            </table>
        );
    }
}

export default Table;