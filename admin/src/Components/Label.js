import React, { Component } from 'react';

class Label extends Component {
    render() {
        return (
            <span className={`label label-${this.props.type}`}>
                {this.props.children}
            </span>
        );
    }
}

export default Label;