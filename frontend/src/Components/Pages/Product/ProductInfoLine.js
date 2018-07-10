import React, { Component } from 'react';

class ProductInfoLine extends Component {
    render() {
        return (
            <div className="m-t-20">
                <strong>{this.props.label}: </strong>
                {this.props.value}
            </div>
        );
    }
}

export default ProductInfoLine;