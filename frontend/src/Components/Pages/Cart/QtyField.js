import React, { Component } from 'react';
import {connect} from 'react-redux';
import { incrementProduct, decrementProduct} from './actions'

class QtyField extends Component {
    render() {
        return (
            <div className="qty-field">
                <a
                    onClick={ () => { this.props.onIncrementClick(this.props.product) } }
                    className="qty-field-action">
                    <i className="icon-plus-circle"></i>
                </a>
                <div className="field">{this.props.children}</div>
                <a
                    onClick={() => { this.props.onDecrementClick(this.props.product) }}
                    className="qty-field-action">
                    <i className="icon-minus-circle"></i>
                </a>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    onIncrementClick: (product) => dispatch(incrementProduct(product)),
    onDecrementClick: (product) => dispatch(decrementProduct(product))
})
export default connect(undefined, mapDispatchToProps)(QtyField);