import React, { Component } from 'react';
import Panel from '../Panel';

class P404 extends Component {
    render() {
        return (
            <Panel title="Not Found">
                <div className="text-center" style={{fontSize: '40px'}}>
                    404
                </div>
            </Panel>
        );
    }
}

export default P404;