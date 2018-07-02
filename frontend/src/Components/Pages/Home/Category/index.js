import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Category extends Component {
    render() {
        return (
            <div className="category-box col-md-4 col-xs-6">
                <Link to={'category/'+this.props.id}>
                    <img className="img-responsive" src={this.props.image} alt={this.props.name} />
                </Link>
            </div>
        );
    }
}

export default Category;