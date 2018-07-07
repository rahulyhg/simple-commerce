import React, { Component } from 'react';

class Panel extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="clearfix">
                    <h3 className="page-title" style={{ display: 'inline-block' }}>{this.props.title}</h3>
                    <div className="pull-right">
                        {this.props.actionBtns}
                    </div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-body">
                        {this.props.children}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Panel;