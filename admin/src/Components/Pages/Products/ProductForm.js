import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import ProgressButton from "react-progress-button";
import Select from 'react-select';
import Api from '../../Api';
import ErrorsAlert from '../../ErrorsAlert';
import MissionxFileUploader from '../../MissionxFileUploader';
import './react-select.css';

class ProductForm extends Component {
    constructor(props) {
        super(props);

        let brands = this.getProductCategories('brands')

        this.state = {
            name: props.product.title || '',
            price: props.product.price || '',
            image: props.product.image || '',
            description: props.product.description || '',
            categories: this.getProductCategories(),
            brands: brands.length ? brands[0] : {},

            errors: '',

            buttonState: ''
        }

        this.onFormChange = this.onFormChange.bind(this)
        this.onUploadSuccess = this.onUploadSuccess.bind(this);
        this.onCategoriesChange = this.onCategoriesChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(e){
        e.preventDefault();
        const product = this.props.product;
        if(product.id){
            return this.saveCategory('put',`admin/products/${product.id}`);
        }
        return this.saveCategory('post',`admin/products`);
    }

    onFormChange(event){
        const e = event.nativeEvent;
        this.setState((prevState) => {
            let newState = {};
            newState[e.target.name] = e.target.value;
            return Object.assign({},prevState, newState);
        });
    }

    onCategoriesChange(selectedOption, field){
        this.setState(prevState => {
            let newState = {};
            newState[field] = selectedOption;
            return Object.assign({},prevState, newState);
        })
    }

    onUploadSuccess(image) {
        this.setState({ image: image });
    }

    getProductCategories(field = 'categories'){
        let categories = this.props.product[field];
        if(typeof categories === 'undefined' ){
            return [];
        }

        return categories.data.map(cat => ({ value: cat.id, label: cat.name}));
    }

    getCategories(field){
        let categories= this.props[field];
        return categories.map(cat => ({value: cat.id, label: cat.name}));
    }

    async saveCategory(method, url){
        this.setState({buttonState: 'loading'});

        let {response, status} = await Api.jsonAuth(
                        this.props.user.token,
                        method,
                        url,
                        {
                            title: this.state.name,
                            image: this.state.image,
                            description: this.state.description,
                            price: this.state.price,
                            categories: this.state.categories.map(cat => cat.value),
                            brands: this.state.brands.value
                        }
                    );
        if(parseInt(status) !== 200){
            this.setState({buttonState: 'error', errors: response.meta.message});
            return;
        }
        this.setState({buttonState: 'success'});
        setTimeout(() => {
            this.setState({errors: 'emptyWithSuccess'});
        }, 1000);
    }

    render() {
        if(this.state.errors  === 'emptyWithSuccess'){
            return <Redirect to="/products" />
        }

        return (
            <form onSubmit={this.onFormSubmit}>

                {this.state.errors && <ErrorsAlert errors={this.state.errors} />}

                <div className="form-group">
                    <label htmlFor="name">Product Name</label>
                    <input type="text" name="name" placeholder="Product Name" value={this.state.name} onChange={this.onFormChange} className="form-control" id="name"/>
                </div>

                <div className="form-group">
                    <label htmlFor="price">Product Price</label>
                    <input type="text" name="price" placeholder="Product Price" value={this.state.price} onChange={this.onFormChange} className="form-control" id="price" />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Product Description</label>
                    <textarea name="description" placeholder="Product Description" value={this.state.description} onChange={this.onFormChange} className="form-control" id="description" />
                </div>

                <div className="form-group">
                    <label htmlFor="file">Image</label>
                    <div className="row"></div>
                    <MissionxFileUploader image={this.state.image} onUploadFinished={this.onUploadSuccess} />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Product Categories</label>
                    <Select isMulti closeOnSelect={false} closeMenuOnSelect={false} simpleValue={true} closeOnSelect={false} value={this.state.categories} placeholder="Select Product Category" onChange={(selected) => this.onCategoriesChange(selected, 'categories')} options={this.getCategories('categories')} />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Product Brands</label>
                    <Select value={this.state.brands} placeholder="Select Product Brand" onChange={(selected) => this.onCategoriesChange(selected, 'brands')} options={this.getCategories('brands')} />
                </div>

                <div className="pull-right">
                    <ProgressButton state={this.state.buttonState}>Save</ProgressButton>
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state) => ({
    categories: state.Categories,
    brands: state.Brands,
    user: state.User
})
export default connect(mapStateToProps)(ProductForm);