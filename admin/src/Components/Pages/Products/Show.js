import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Panel from '../../Panel';
import Loader from '../../Loader';
import Api from '../../Api';
import ProductInfoTable from './ProductInfoTable';

class Show extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: {},
            hasError: false,
            loading: 'loading'
        };

        this.id = props.match.params.id;
    }

    componentDidMount(){
        this.getProduct();
    }

    async getProduct(){
        let {response, status} = await Api.jsonAuth(
            this.props.user.token,
            'get',
            `admin/products/${this.id}`
        );

        if(status != 200){
            this.setState({ hasError: true, loading: 'empty'});
            return;
        }

        this.setState({ product: response.data, loading: 'success'});
    }

    render() {
        if(this.state.hasError){
            return <Redirect to="/404" />
        }

        return (
            <Panel
                title="Product Info"
                actionBtns={<Link className=" m-t-15 btn btn-primary" to="/products">Back to products</Link>}>
                <Loader state={this.state.loading}>
                    <ProductInfoTable product={this.state.product} />
                </Loader>
            </Panel>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.User
});

export default connect(mapStateToProps)(Show);