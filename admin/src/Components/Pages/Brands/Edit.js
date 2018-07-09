import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import BrandForm from './BrandForm';
import Panel from '../../Panel';

class Edit extends Component {

    render() {
        const id = this.props.match.params.id;
        const brand = this.props.brands.find(cat => cat.id == id);

        return (
            <Panel
                title="Brands"
                actionBtns={<Link to="/brands" className="btn btn-primary m-t-15">Back To Brands</Link>}>
                <BrandForm brand={brand} />
            </Panel>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    brands: state.Brands
})
export default connect(mapStateToProps)(Edit);