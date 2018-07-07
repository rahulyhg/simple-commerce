import React, { Component } from 'react';

class ProductForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
        this.onFormChange = this.onFormChange.bind(this)
    }

    onFormChange(event){
        const e = event.nativeEvent;
    }

    render() {
        return (
            <form>
                <div className="form-group">
                    <label htmlFor="name">Product Name</label>
                    <input type="text" name="name" value={this.state.name} onChange={this.onFormChange} className="form-control"/>
                </div>
            </form>
        );
    }
}

export default ProductForm;