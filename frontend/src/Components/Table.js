import React, { Component } from 'react';
import classNames from 'classnames';

class Table extends Component {
    render() {
        const props = this.props;
        let classes = classNames({
            table: true,
            'table-hover' : props.hover,
            'table-striped' : props.striped,
            'table-bordered' : props.border
        });
        return (
            <table className={classes}>
                { props.headers.length > 0 &&
                <thead>
                    <tr>
                        {props.headers.map(header=> <th key={header.id}>{header.text}</th>)}
                    </tr>
                </thead>
                }
                <tbody>
                    {this.props.children}
                </tbody>
            </table>
        );
    }
}

export default Table;