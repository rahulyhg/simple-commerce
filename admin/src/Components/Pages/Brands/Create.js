import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import BrandForm from './BrandForm';
import Panel from '../../Panel';

class Create extends Component {
    render() {
        return (
            <Panel
                title="Brands"
                actionBtns={<Link to="/brands" className="btn btn-primary m-t-15">Back to Brands</Link>}>
                <BrandForm brand={{}} />
            </Panel>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})
export default connect(mapStateToProps)(Create);