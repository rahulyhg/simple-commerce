import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Api from '../../Api';
import Panel from '../../Panel';
import Table from '../../Table';
import Loader from '../../Loader';
import TreasuryPaperRow from './TreasuryPaperRow';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: 'loading',
            models: [],
        }

        this.getTreasuryPapers = this.getTreasuryPapers.bind(this);

        this.headers = [
            {id: 1, text: "#"},
            {id: 2, text: "Model For"},
            {id: 3, text: "Type"},
            {id: 4, text: "Value"},
            {id: 5, text: "Created At"},
        ];
    }

    componentDidMount(){
        this.getTreasuryPapers();
    }

    async getTreasuryPapers(){
        let {response,status} = await Api.jsonAuth(
            this.props.user.token,
            'get',
            'admin/treasurypapers'
        );

        if(status !== 200){
            return;
        }

        this.setState({models: response.data, 'loading': 'success'});
    }

    render() {
        return (
            <Panel
                title="Treasury Papers"
                actionBtns={<Link to="/treasury-papers/create" className="btn btn-primary">Create Treasury Papers</Link>}
                >
                <Loader state={this.state.loading}>
                    <Table headers={this.headers}>
                        {this.state.models.map((model, index) => <TreasuryPaperRow key={model.id} index={index} model={model} />)}
                        {this.state.models.length <= 0 &&
                            <tr>
                                <td colSpan="5" className="text-center">No Treasury Papers were registered</td>
                            </tr>
                        }
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
    Index: connect(mapStateToProps)(Index)
}