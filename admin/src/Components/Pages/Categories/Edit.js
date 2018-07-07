import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CategoryForm from './CategoryForm';
import Panel from '../../Panel';

class Edit extends Component {

    render() {
        const id = this.props.match.params.id;
        const category = this.props.categories.find(cat => cat.id == id);

        return (
            <Panel
                title="Categories"
                actionBtns={<Link to="/categories" className="btn btn-primary m-t-15">Back To Categories</Link>}>
                <CategoryForm category={category} />
            </Panel>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    categories: state.Categories
})
export default connect(mapStateToProps)(Edit);