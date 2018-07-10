import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import Select from 'react-select';
import ProgressButton from 'react-progress-button';
import Api from '../../Api';
import ErrorsAlert from '../../ErrorsAlert';
import '../Products/react-select.css';

class QtyForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            price_per_unit: 0,
            type: {},
            comments : '',
            buttonState: '',
            errors: ''
        }

        this.onTypeChange = this.onTypeChange.bind(this);
        this.onValueChanged = this.onValueChanged.bind(this);
        this.onPricePerUnitChanged = this.onPricePerUnitChanged.bind(this);
        this.onCommentsChanged = this.onCommentsChanged.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);

        this.options = [
            { value: 'in', 'label': 'In' },
            { value: 'out', 'label': 'Out' },
        ]
    }

    onValueChanged(e){
        this.setState({value: e.target.value});
    }

    onPricePerUnitChanged(e){
        this.setState({price_per_unit: e.target.value});
    }

    onCommentsChanged(e){
        this.setState({comments: e.target.value});
    }

    onTypeChange(selectedOption){
        this.setState({type: selectedOption});
    }

    onFormSubmit(e){
        e.preventDefault();

        this.createQtyRecord();
    }

    async createQtyRecord(){
        this.setState({ buttonState: 'loading' });

        let { response, status } = await Api.jsonAuth(
            this.props.token,
            'post',
            `admin/products/${this.props.product.id}/quantities`,
            {
                type: this.state.type.value,
                value: this.state.value,
                price_per_unit: this.state.price_per_unit,
                comments: this.state.comments
            }
        );

        if (parseInt(status) !== 200){
            this.setState({buttonState: 'error', errors: response.meta.message});
            return;
        }

        this.setState({buttonState: 'success'});
    }

    render() {
        if(this.state.buttonState === 'success'){
            return <Redirect to={`/products/${this.props.product.id}/qty`} />
        }
        return (
            <form onSubmit={this.onFormSubmit}>
                {this.state.errors.length > 0 && <ErrorsAlert errors={this.state.errors} />}
                <div className="form-group">
                    <label htmlFor="type">Type</label>
                    <Select placeholder="select Qty Log type" value={this.state.type} onChange={this.onTypeChange} options={this.options} />
                </div>

                <div className="form-group">
                    <label htmlFor="value">Qty</label>
                    <input placeholder="Qty" type="number" value={this.state.value} onChange={this.onValueChanged} className="form-control" id="value"/>
                </div>

                <div className="form-group">
                    <label htmlFor="price_per_unit">Price Per Unit</label>
                    <input
                        placeholder="Price Per Unit"
                        type="price_per_unit"
                        value={this.state.price_per_unit}
                        onChange={this.onPricePerUnitChanged}
                        className="form-control"
                        id="price_per_unit"
                        disabled={this.state.type.value !== 'in' ? 'disabled' : ''} />
                </div>

                <div className="form-group">
                    <label htmlFor="comments">Comments</label>
                    <textarea placeholder="Comments" value={this.state.comments} onChange={this.onCommentsChanged} className="form-control" id="comments" />
                </div>

                <div className="pull-right">
                    <ProgressButton state={this.state.buttonState} >Register New Qty Record</ProgressButton>
                </div>
            </form>
        );
    }
}

export default QtyForm;