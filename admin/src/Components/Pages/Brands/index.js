import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Api from '../../Api';
import { fetchBrands, removeBrand } from './actions';
import Panel from '../../Panel';
import Table from '../../Table';
import Loader from '../../Loader';
import BrandRow from './BrandRow';
import EmptyRow from '../../EmptyRaw';

import Create from './Create';
import Edit from './Edit';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loaderState: 'success'
        }

        this.headers = [
            {id: 1, text: "#"},
            {id: 3, text: "Image"},
            {id: 2, text: "Name"},
            {id: 4, text: "Actions"},
        ];

        this.onDeleteActionClicked = this.onDeleteActionClicked.bind(this);
    }

    componentDidMount(){
        if(!this.props.brands.length){
            this.getBrands();
        }
    }

    async getBrands(){
        this.setState({ loaderState: 'success'});
        let { response, status } = await Api.jsonAuth(this.props.user.token, 'get', 'admin/brands');

        if (parseInt(status) !== 200){
            this.props.fetchBrands([]);
        }
        this.props.fetchBrands(response.data);
        this.setState({loaderState: 'success'});
    }

    async onDeleteActionClicked(brand){
        let { response, status } = await Api.jsonAuth(this.props.user.token, 'delete', `admin/brands/${brand.id}`);
        if (parseInt(status) !== 200){
            return false;
        }
        this.props.removeBrand(brand);
    }

    render() {
        const props = this.props;

        if(!props.user.token){
            return <Redirect to="/login" />
        }
        return (
            <Panel
                title="Brands"
                actionBtns={<Link to="/brands/create" className="btn btn-primary m-t-15">Create Brand</Link>}>
                <Loader state={this.state.loaderState}>
                    <Table headers={this.headers} hover={true} striped={true}>
                        {!props.brands.length && <EmptyRow colspan="4">No Brands were added</EmptyRow>}
                        {props.brands.length && props.brands.map(cat => <BrandRow onDeleteActionClicked={this.onDeleteActionClicked} key={cat.id} brand={cat} />)}
                    </Table>
                </Loader>
            </Panel>
        );
    }
}

const mapStateToProps = (state) => ({
    user : state.User,
    brands : state.Brands
});

const mapDispatchToProps = (dispatch) => ({
    fetchBrands: (brands) => dispatch(fetchBrands(brands)),
    removeBrand: (brand) => dispatch(removeBrand(brand))
})

const reduxIndex = connect(mapStateToProps, mapDispatchToProps)(Index);

export default {
    Index: reduxIndex,
    Create,
    Edit
}