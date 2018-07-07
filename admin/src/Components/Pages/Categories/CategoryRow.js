import React, { Component } from 'react';
import { Link } from "react-router-dom";

class CategoryRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteDisabled: false
        }
        this.onDeleteActionClicked = this.onDeleteActionClicked.bind(this);
    }

    onDeleteActionClicked(){
        this.setState({ deleteDisabled: true });
        this.props.onDeleteActionClicked(this.props.category)
    }

    render() {
        const category = this.props.category;
        return (
            <tr>
                <td>{category.id}</td>
                <td><img src={category.image} alt={category.name} className="img-responsive"/></td>
                <td>{category.name}</td>
                <td>
                    <div className="btn-group">
                        <Link className="btn btn-success" to={`/categories/${category.id}/edit`}>Edit Category</Link>
                        <button className="btn btn-danger" disabled={this.state.deleteDisabled} onClick={this.onDeleteActionClicked}>Delete</button>
                    </div>
                </td>
            </tr>
        );
    }
}

export default CategoryRow;