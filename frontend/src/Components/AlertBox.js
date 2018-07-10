import React, { Component } from 'react';

class AlertBox extends Component {
    render() {
        return (
            <div className={`alert alert-${this.props.type}`}>
                {this.props.children}
            </div>
        );
    }
}

export default AlertBox;