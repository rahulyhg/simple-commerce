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
            type: '',
            buttonState: '',
            errors: ''
        }

        this.onValueChanged = this.onValueChanged.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);

        this.options = [
            { value: 'in', 'label': 'In' },
            { value: 'out', 'label': 'Out' },
        ]
    }

    onValueChanged(e){
        this.setState({value: e.target.value});
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
                value: this.state.value
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

                <div className="pull-right">
                    <ProgressButton state={this.state.buttonState} >Register New Qty Record</ProgressButton>
                </div>
            </form>
        );
    }
}

export default QtyForm;