import React, { Component } from 'react';
import {connect} from 'react-redux';
import Category from '../Category';
import Loader from '../../../Loader';
import './CategoryList.css'

class CategoriesList extends Component {

    render() {
        let content;
        let categories = this.props.categories;
        if(typeof categories === 'undefined'){
            content = <Loader></Loader>;
        }else if(!categories.length){
            content = <p>No Categories were added</p>;
        }else{
            content = this.props.categories.map(cat => <Category key={cat.id} id={cat.id} image={cat.image} name={cat.name} />)
        }

        return (
            <div className="row CategoryList">
                <div className="CategoryList-title col-xs-12">
                    <h1>Categories</h1>
                </div>
                {content}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.HomeReducer.categories,
    }
}

export default connect(mapStateToProps)(CategoriesList);