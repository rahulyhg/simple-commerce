import React, { Component } from 'react';
import AlertBox from './AlertBox'

class ErrorsBox extends Component {
    render() {
        return (
            <AlertBox type="danger">
                Please fix the following errors
                <ul>
                    {this.props.errors.map((err,index) => <li key={index}>{err}</li>)}
                </ul>
            </AlertBox>
        );
    }
}

export default ErrorsBox;