import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import ProgressButton from "react-progress-button";
import Api from '../../Api';
import { updateBrand, addBrand } from "./actions";
import MissionxFileUploader from '../../MissionxFileUploader';

class BrandForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.brand.name,
            image: props.brand.image,
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
        if(this.props.brand.id){
            this.updateBrand();
        }else{
            this.createBrand();
        }
    }

    async updateBrand(){
        let brand = await this.saveBrand(`admin/brands/${this.props.brand.id}`,'put');
        if(brand !== false){
            this.props.updateBrand(brand);
            this.setState({ 'loadingState': 'success' });
        }
    }

    async createBrand(){
        let brand = await this.saveBrand(`admin/brands`,'post');
        console.log({brand})
        if (brand !== false) {
            this.props.addBrand(brand);
            this.setState({ 'loadingState': 'success' });
        }
    }

    async saveBrand(url, method){
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
            return <Redirect to="/brands" />
        }
        return (
            <form onSubmit={this.onFormSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" value={this.state.name} placeholder="Brand Name" className="form-control" id="name" onChange={this.onFieldChange}/>
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
    updateBrand: (brand) => dispatch(updateBrand(brand)),
    addBrand: (brand) => dispatch(addBrand(brand))
})

export default connect(mapStateToProps, mapDispathToProps)(BrandForm);