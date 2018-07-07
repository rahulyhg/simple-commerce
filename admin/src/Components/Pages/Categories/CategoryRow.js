import React, { Component } from 'react';

class CategoryRow extends Component {
    render() {
        const category = this.props.category;
        return (
            <tr>
                <td>{category.id}</td>
                <td><img src={category.image} alt={category.name} className="img-responsive"/></td>
                <td>{category.name}</td>
                <td></td>
            </tr>
        );
    }
}

export default CategoryRow;