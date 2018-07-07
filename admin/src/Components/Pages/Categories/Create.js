import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CategoryForm from './CategoryForm';
import Panel from '../../Panel';

class Create extends Component {
    render() {
        return (
            <Panel
                title="Categories"
                actionBtns={<Link to="/categories/create" className="btn btn-primary m-t-15">Create Category</Link>}>
                <CategoryForm category={{}} />
            </Panel>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})
export default connect(mapStateToProps)(Create);