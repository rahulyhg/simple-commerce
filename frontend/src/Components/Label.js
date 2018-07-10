import React, { Component } from 'react';

class Label extends Component {
    render() {
        return (
            <div className={`label label-${this.props.type}`}>
                {this.props.children}
            </div>
        );
    }
}

export default Label;