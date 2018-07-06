import React, { Component } from 'react';

class EmptyState extends Component {
    render() {
        return (
            <div className="empty-state">
                {this.props.children}
            </div>
        );
    }
}

export default EmptyState;