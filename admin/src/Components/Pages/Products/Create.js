import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Panel from '../../Panel';
import ProductForm from './ProductForm';

class Create extends Component {
    render() {
        return (
            <Panel
                title="Create Products"
                actionBtns={<Link className=" m-t-15 btn btn-primary" to="/products">Back to products</Link>}>

                <ProductForm product={{}} />

            </Panel>
        );
    }
}

export default Create;