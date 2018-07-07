import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import ProgressButton from "react-progress-button";
import Api from '../../Api';
import { updateCategory, addCategory } from "./actions";
import MissionxFileUploader from '../../MissionxFileUploader';

class CategoryForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.category.name,
            image: props.category.image,
            loadingState: '',
            errors : []
        }

        this.onFieldChange = this.onFieldChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onUploadSuccess = this.onUploadSuccess.bind(this);
    }

    onFieldChange(event){
        this.setState({
            'name': event.target.value
        });
    }

    onUploadSuccess(image){
        this.setState({image: image});
    }

    onFormSubmit(event){
        event.preventDefault();

        this.setState({'loadingState': 'loading'});
        if(this.props.category.id){
            this.updateCategory();
        }else{
            this.createCategory();
        }
    }

    async updateCategory(){
        let category = await this.saveCategory(`admin/categories/${this.props.category.id}`,'put');
        if(category !== false){
            this.props.updateCategory(category);
            this.setState({ 'loadingState': 'success' });
        }
    }

    async createCategory(){
        let category = await this.saveCategory(`admin/categories`,'post');
        console.log({category})
        if (category !== false) {
            this.props.addCategory(category);
            this.setState({ 'loadingState': 'success' });
        }
    }

    async saveCategory(url, method){
        let {response, status} = await Api.jsonAuth(
                                this.props.user.token,
                                method,
                                url,
                                {
                                    name: this.state.name,
                                    image: this.state.image
                                }
                            );
        if(status !== 200){
            this.setState({erros: response.meta.message});
            return false;
        }
        return response.data;
    }

    render() {
        if(this.state.loadingState === 'success'){
            return <Redirect to="/categories" />
        }
        return (
            <form onSubmit={this.onFormSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" value={this.state.name} placeholder="Category Name" className="form-control" id="name" onChange={this.onFieldChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="file">Image</label>
                    <div className="row"></div>
                    <MissionxFileUploader image={this.state.image} onUploadFinished={this.onUploadSuccess} />
                </div>

                <div className="pull-right">
                    <ProgressButton state={this.state.loadingState}>Save</ProgressButton>
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.User
})

const mapDispathToProps = (dispatch) => ({
    updateCategory: (category) => dispatch(updateCategory(category)),
    addCategory: (category) => dispatch(addCategory(category))
})

export default connect(mapStateToProps, mapDispathToProps)(CategoryForm);