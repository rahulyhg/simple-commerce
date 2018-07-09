import React, { Component } from 'react';

class Panel extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="m-t-25 m-b-15 clearfix">
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
                    </div>
                </div>
            </div>
        );
    }
}

export default Panel;