import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Category extends Component {
    render() {
        const category = this.props.category;
        return (
            <div className="category-box col-md-4 col-xs-6">
                <Link to={`/category/${category.id}`}>
                    <img className="img-responsive" src={`${category.image}?s=400`} alt={category.name} />
                </Link>
            </div>
        );
    }
}

export default Category;