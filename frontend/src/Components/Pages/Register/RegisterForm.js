import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import Select from 'react-select';
import ProgressButton from 'react-progress-button';
import DatePicker from '../../DatePicker';
import './react-select.css';
import Api from '../../Api';
import ErrorsBox from '../../ErrorsBox';

class RegisterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name: props.user.first_name || '',
            last_name: props.user.last_name || '',
            email: props.user.email || '',
            password: props.user.password || '',
            password_confirmation: props.user.password_confirmation || '',
            birthday: props.user.birthday || '',
            country: props.user.country || {},
            city: props.user.city || {},
            address: props.user.address || '',

            buttonState : '',
            errors: []
        }


        this.onFieldChange = this.onFieldChange.bind(this);
        this.onCountryChange = this.onCountryChange.bind(this);
        this.onCityChange = this.onCityChange.bind(this);
        this.onBirthDayChanged = this.onBirthDayChanged.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onCountryChange(selectedOption){
        this.setState({ country: selectedOption});
        this.getCities();
    }

    onCityChange(selectedOption){
        this.setState({ city: selectedOption });
    }

    onFieldChange(event){
        const newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }

    onBirthDayChanged(date){
        this.setState({ birthday: date })
    }

    onFormSubmit(e){
        e.preventDefault();
        if (this.props.token){
            return this.updateOrRegister('put', 'profile', this.props.token);
        }
        return this.updateOrRegister('post', 'register');
    }

    async updateOrRegister(method, url, token){
        this.setState({ buttonState: 'loading' });

        let headers = {};
        if(typeof token !== 'undefined'){
            headers['authorization'] = `Bearer ${token}`;
        }

        let {response, status} = await Api.json(
            method,
            url,
            {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                birthday: this.state.birthday,
                address: this.state.address,
                password: this.state.password,
                password_confirmation: this.state.password_confirmation,
            },
            headers
        );

        if(status !== 200){
            this.setState({ buttonState: 'error', errors: response.meta.message });
            return;
        }

        this.setState({ buttonState: 'success', errors: 'success' });

        if (typeof token !== 'undefined'){
            this.props.onUpdateSuccess(response.data);
        }
        return;
    }

    render() {
        if(this.state.errors === 'success' && !this.props.token){
            return <Redirect to="/login" />
        }

        return (
            <form onSubmit={this.onFormSubmit} className="col-xs-12 col-md-8 col-md-offset-2">

                {(this.state.errors !== 'success' && this.state.errors.length > 0 ) && <ErrorsBox errors={this.state.errors} />}

                <div className="row">
                    <div className="form-group col-xs-12 col-sm-6">
                        <label htmlFor="first_name">First Name</label>
                        <input type="text" name="first_name" value={this.state.first_name} onChange={this.onFieldChange} className="form-control" id="first_name" />
                    </div>

                    <div className="form-group col-xs-12 col-sm-6">
                        <label htmlFor="last_name">Last Name</label>
                        <input type="text" name="last_name" value={this.state.last_name} onChange={this.onFieldChange} className="form-control" id="last_name" />
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-xs-12 col-md-6">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" value={this.state.email} onChange={this.onFieldChange} className="form-control" id="email"/>
                    </div>

                    <div className="form-group col-xs-12 col-sm-6">
                        <label htmlFor="birthday">Date of Birth</label>
                        <DatePicker value={this.state.birthday} onChange={this.onBirthDayChanged} />
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-xs-12 col-md-6">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" value={this.state.password} onChange={this.onFieldChange} className="form-control" id="password" />
                    </div>

                    <div className="form-group col-xs-12 col-md-6">
                        <label htmlFor="password_confirmation">Password Confirmation</label>
                        <input type="password" name="password_confirmation" value={this.state.password_confirmation} onChange={this.onFieldChange} className="form-control" id="password_confirmation" />
                    </div>
                </div>

                <div className="row">
                    {/* <div className="form-group col-xs-12 col-sm-6">
                        <label htmlFor="country">Country</label>
                        <Select value={this.state.country} onChange={this.onCountryChange} options={this.state.countries} />
                    </div>
                    <div className="form-group col-xs-12 col-sm-6">
                        <label htmlFor="city">City</label>
                        <Select value={this.state.city} onChange={this.onCityChange} options={this.state.cities} />
                    </div> */}

                    <div className="form-group col-xs-12">
                        <label htmlFor="address">Address</label>
                        <input type="text" name="address" value={this.state.address} onChange={this.onFieldChange} className="form-control" id="address" />
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12 col-md-6 col-md-offset-3">
                        <ProgressButton state={this.state.buttonState} >Go</ProgressButton>
                    </div>
                </div>

            </form>
        );
    }
}

export default RegisterForm;