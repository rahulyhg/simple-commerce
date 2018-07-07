import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Api from '../../Api';
import { fetchCategories, removeCategory } from './actions';
import Panel from '../../Panel';
import Table from '../../Table';
import Loader from '../../Loader';
import CategoryRow from './CategoryRow';
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
        if(!this.props.categories.length){
            this.getCategories();
        }
    }

    async getCategories(){
        this.setState({ loaderState: 'success'});
        let { response, status } = await Api.jsonAuth(this.props.user.token, 'get', 'admin/categories');

        if (parseInt(status) !== 200){
            this.props.fetchCategories([]);
        }
        this.props.fetchCategories(response.data);
        this.setState({loaderState: 'success'});
    }

    async onDeleteActionClicked(category){
        let { response, status } = await Api.jsonAuth(this.props.user.token, 'delete', `admin/categories/${category.id}`);
        if (parseInt(status) !== 200){
            return false;
        }
        this.props.removeCategory(category);
    }

    render() {
        const props = this.props;

        if(!props.user.token){
            return <Redirect to="/login" />
        }
        return (
            <Panel
                title="Categories"
                actionBtns={<Link to="/categories/create" className="btn btn-primary m-t-15">Create Category</Link>}>
                <Loader state={this.state.loaderState}>
                    <Table headers={this.headers} hover={true} striped={true}>
                        {!props.categories.length && <EmptyRow colspan="4">No Categories were added</EmptyRow>}
                        {props.categories.length && props.categories.map(cat => <CategoryRow onDeleteActionClicked={this.onDeleteActionClicked} key={cat.id} category={cat} />)}
                    </Table>
                </Loader>
            </Panel>
        );
    }
}

const mapStateToProps = (state) => ({
    user : state.User,
    categories : state.Categories
});

const mapDispatchToProps = (dispatch) => ({
    fetchCategories: (categories) => dispatch(fetchCategories(categories)),
    removeCategory: (category) => dispatch(removeCategory(category))
})

const reduxIndex = connect(mapStateToProps, mapDispatchToProps)(Index);

export default {
    Index: reduxIndex,
    Create,
    Edit
}