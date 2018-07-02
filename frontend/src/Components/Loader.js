import React, { Component } from 'react';

class Loader extends Component {

    render() {
        return (
            <div className="col-md-12 loader">
                <div className="lds-ripple"><div></div><div></div></div>
            </div>
        );
    }
}

export default Loader;