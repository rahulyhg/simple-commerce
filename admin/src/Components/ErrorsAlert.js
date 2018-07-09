import React, { Component } from 'react';

class ErrorsAlert extends Component {
    render() {
        return (
            <div className="alert alert-danger">
                Please fix the following Errors
                <ul>
                    {this.props.errors.map((err,index) => <li key={index}>{err}</li>)}
                </ul>
            </div>
        );
    }
}

export default ErrorsAlert;