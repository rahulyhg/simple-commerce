import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Api from '../../Api';
import Loader from '../../Loader';
import Panel from '../../Panel';
import QtyForm from './QtyForm';


class Create extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: 'Register Qty Record',
            hasError: false,
            loading: 'loading',
            product: {},
        }

        this.id = props.match.params.id;

        this.getProduct = this.getProduct.bind(this);
    }

    componentDidMount(){
        this.getProduct();
    }

    async getProduct() {
        let { response, status } = await Api.jsonAuth(
            this.props.user.token,
            'get',
            `admin/products/${this.id}`
        );

        if (status != 200) {
            this.setState({ hasError: true});
            return;
        }

        this.setState({ product: response.data, loading: 'success', title: `Register Qty Record for ${response.data.title}` });
    }

    render() {
        if(this.state.hasError){
            return <Redirect to="/404" />
        }
        return (
            <Panel
                title={this.state.title}
                actionBtns={<Link className="btn btn-primary m-t-15" to={`/products/${this.id}/qty`}>Back To Qty Log</Link>}
            >
                <Loader state={this.state.loading}>
                    <QtyForm product={this.state.product} token={this.props.user.token} />
                </Loader>
            </Panel>
        );
    }
}

const mapStateToProps = (state) => ({
    user : state.User
})

export default connect(mapStateToProps)(Create);