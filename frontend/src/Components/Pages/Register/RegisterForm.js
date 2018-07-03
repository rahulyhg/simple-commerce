import React, { Component } from 'react';
import Select from 'react-select';
import ProgressButton from 'react-progress-button';
import DatePicker from '../../DatePicker';
import './react-select.css';
import './react-day-picker.css';

class RegisterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name: '',
            last_name: '',
            birthday: '',
            country: '',
            city: '',
            address: '',
            countries: [],
            cities: [],

            buttonState : '',

            registered: false,
        }

        this.onFirstNameChange = this.onFirstNameChange.bind(this);
        this.onLastNameChange = this.onLastNameChange.bind(this);
        this.onCountryChange = this.onCountryChange.bind(this);
        this.onCityChange = this.onCityChange.bind(this);
        this.onAddressChange = this.onAddressChange.bind(this);
        this.onBirthDayChanged = this.onBirthDayChanged.bind(this);
        this.register = this.register.bind(this);
    }


    componentDidMount(){
        this.getCountries();
    }

    getCountries(){
        let countries = [
            {
                value: 1,
                label: 'Syria'
            },
            {
                value: 2,
                label: 'Lebanon'
            }
        ]

        this.setState({countries})
    }

    getCities(){
        let cities = [
            {
                value: 1,
                label: 'Damascus',
            },
            {
                value: 2,
                label: 'Aleppo',
            },
            {
                value: 3,
                label: 'Homs',
            }
        ]

        this.setState({cities})
    }

    onCountryChange(selectedOption){
        this.setState({ country: selectedOption});
        this.getCities();
    }

    onCityChange(selectedOption){
        this.setState({ city: selectedOption });
    }

    onFirstNameChange(e){
        this.setState({ first_name: e.target.value})
    }

    onLastNameChange(e){
        this.setState({ last_name: e.target.value })
    }

    onAddressChange(e){
        this.setState({ address: e.target.value })
    }

    onBirthDayChanged(date){
        this.setState({ birthday: date })
    }

    register(e){
        e.preventDefault();

        this.setState({buttonState: 'loading'});

        setTimeout(() => {
            this.setState({buttonState: 'success'});
        }, 2000);
    }

    render() {
        return (
            <form className="col-xs-12 col-md-8 col-md-offset-2">
                <div className="row">
                    <div className="form-group col-xs-12 col-sm-6">
                        <label htmlFor="first_name">First Name</label>
                        <input type="text" value={this.state.first_name} className="form-control" id="first_name" onChange={this.onFirstNameChange} />
                    </div>
                    <div className="form-group col-xs-12 col-sm-6">
                        <label htmlFor="last_name">Last Name</label>
                        <input type="text" value={this.state.last_name} className="form-control" id="last_name" onChange={this.onLastNameChange} />
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-xs-12 col-sm-6">
                        <label htmlFor="birthday">Date of Birth</label>
                        <DatePicker onChange={this.onBirthDayChanged} />
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-xs-12 col-sm-6">
                        <label htmlFor="country">Country</label>
                        <Select value={this.state.country} onChange={this.onCountryChange} options={this.state.countries} />
                    </div>
                    <div className="form-group col-xs-12 col-sm-6">
                        <label htmlFor="city">City</label>
                        <Select value={this.state.city} onChange={this.onCityChange} options={this.state.cities} />
                    </div>

                    <div className="form-group col-xs-12">
                        <label htmlFor="address">Address</label>
                        <input type="text" value={this.state.address} className="form-control" id="address" onChange={this.onAddressChange} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12 col-md-6 col-md-offset-3">
                        <ProgressButton state={this.state.buttonState} onClick={this.register} >Register</ProgressButton>
                    </div>
                </div>

            </form>
        );
    }
}

export default RegisterForm;