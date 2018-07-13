import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Api from '../../Api';
import Table from '../../Table';
import Panel from '../../Panel';
import Loader from '../../Loader';
import QtyLogRow from './QtyLogRow';

import Create from './Create';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            models: [],
            loading: 'loading',
            hasError: false,
        };

        this.id = props.match.params.id;

        this.headers = [
            {id: 1, text: "#"},
            {id: 2, text: "Type"},
            {id: 3, text: "Qty"},
            {id: 3, text: "Price Per Unit"},
            {id: 4, text: "Created At"},
            {id: 5, text: "Comments"}
        ]

        this.getQtyLogs = this.getQtyLogs.bind(this);
    }

    componentDidMount(){
        this.getQtyLogs();
    }

    async getQtyLogs(){
        let {response, status} = await Api.jsonAuth(
            this.props.user.token,
            'get',
            `admin/products/${this.id}/quantities`
        );

        if(status !== 200){
            this.setState({loading: '', hasError: true});
            return;
        }

        this.setState({ loading: 'success', models: response.data });
    }

    render() {
        if (this.state.hasError){
            return <Redirect to="/404" />
        }
        return (
            <Panel
                title="Product Qty Log"
                actionBtns={<Link to={`/products/${this.id}/qty/create`} className="btn btn-primary">Register Qty Record</Link>}
                >
                <Loader state={this.state.loading}>
                    <Table hover striped headers={this.headers}>
                        {this.state.models.length > 0 && this.state.models.map((model, index) => <QtyLogRow model={model} index={index} key={model.id} />) }
                        {this.state.models.length <= 0 && (
                            <tr>
                                <td colSpan="5" className="text-center">No Qty records were registered</td>
                            </tr>
                        )}
                    </Table>
                </Loader>

            </Panel>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.User
});

export default {
    Index: connect(mapStateToProps)(Index),
    Create
}