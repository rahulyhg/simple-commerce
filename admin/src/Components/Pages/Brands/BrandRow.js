import React, { Component } from 'react';
import { Link } from "react-router-dom";

class BrandRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteDisabled: false
        }
        this.onDeleteActionClicked = this.onDeleteActionClicked.bind(this);
    }

    onDeleteActionClicked(){
        this.setState({ deleteDisabled: true });
        this.props.onDeleteActionClicked(this.props.brand)
    }

    render() {
        const brand = this.props.brand;
        return (
            <tr>
                <td>{brand.id}</td>
                <td><img src={`${brand.image_url}?s=100`} alt={brand.name} className="img-responsive"/></td>
                <td>{brand.name}</td>
                <td>
                    <div className="btn-group">
                        <Link className="btn btn-success" to={`/brands/${brand.id}/edit`}>Edit Brand</Link>
                        <button className="btn btn-danger" disabled={this.state.deleteDisabled} onClick={this.onDeleteActionClicked}>Delete</button>
                    </div>
                </td>
            </tr>
        );
    }
}

export default BrandRow;