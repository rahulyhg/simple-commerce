import React, { Component } from 'react';
import LoadingAnimation from './LoadingAnimation';
import EmptyState from '../EmptyState';

class Loader extends Component {
    render() {
        if(this.props.state === 'loading'){
            return <LoadingAnimation />
        }

        if (this.props.state === 'empty'){
            return <EmptyState>{this.props.empty}</EmptyState>
        }

        return (
            <React.Fragment>
                {this.props.children}
            </React.Fragment>
        );
    }
}

export default Loader;