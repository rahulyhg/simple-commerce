import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Panel from '../../Panel';
import Api from '../../Api';
import Loader from '../../Loader';
import ProductForm from './ProductForm';

class Edit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: {},
            'loading': 'loading',
            hasError: false
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        this.getProduct(id);
    }

    async getProduct(id){
        let {response, status} = await Api.jsonAuth(
            this.props.user.token,
            'get',
            `admin/products/${id}`
        );

        if (parseInt(status) !== 200){
            this.setState({hasError: true});
            return;
        }

        this.setState({product: response.data, 'loading': 'success'});
    }

    render() {
        if (this.state.hasError){
           return <Redirect to="/404" />
        }
        return (
            <Panel
                title="Edit Product"
                actionBtns={<Link className=" m-t-15 btn btn-primary" to="/products">Back to products</Link>}>

                <Loader state={this.state.loading}>
                    <ProductForm product={this.state.product} />
                </Loader>

            </Panel>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.User
})

export default connect(mapStateToProps)(Edit);