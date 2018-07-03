import React, { Component } from 'react';
import Select from 'react-select';
import './Pages/Register/react-select.css';

class DatePicker extends Component {
    constructor(props) {
        super(props);

        this._18YearsAgo = this.get18YearsAgo()

        if (props.value){
            this.date = new Date(props.value)
        }else{
            this.date = this._18YearsAgo;
        }


        this.state = {
            year: { value: this.date.getFullYear(), label: parseInt(this.date.getFullYear())},
            month: { value: this.date.getMonth() + 1, label: this.getMonthLabel(this.date.getMonth())},
            day: { value: this.date.getDate(), label: this.date.getDate()},

            years: this.getYears(this._18YearsAgo),
            months: this.getMonths(),
            days: this.getDays(),
        }

        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleMonthChange = this.handleMonthChange.bind(this);
        this.handleDayChange = this.handleDayChange.bind(this);
    }

    handleYearChange(selectedOption){
        this.setState({year: selectedOption}, () => this.handleChange());
    }

    handleMonthChange(selectedOption){
        this.setState({ month: selectedOption }, () => this.handleChange());
    }

    handleDayChange(selectedOption) {
        this.setState({ day: selectedOption }, () => this.handleChange());
    }

    handleChange(){
        const { year, month, day } = this.state;
        this.props.onChange(`${year.value}-${month.value}-${day.value}`);
    }

    get18YearsAgo(){
        let eighteenYearsAgo = new Date();
        return new Date(eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18));
    }

    getYears(){
        let years = [];
        for (let i = this._18YearsAgo.getFullYear(); i >= 1950; i-- ){
            years.push({value: i, label: i});
        }

        return years;
    }

    getMonthLabel(id){
        let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

        return months[id];
    }

    getMonths(){
        let months = []
        for(let i = 0; i < 12; i++){
            months.push({value: i+1, label: this.getMonthLabel(i)});
        }

        return months;
    }

    getDays(){
        let days = [];
        for(let i = 1 ; i<= 31; i++){
            days.push({value:i, label:i});
        }

        return days;
    }

    render() {
        return (
            <div className="row">
                <div className="col-xs-4">
                    <Select value={this.state.year} options={this.state.years} onChange={this.handleYearChange} />
                </div>
                <div className="col-xs-4">
                    <Select value={this.state.month} options={this.state.months} onChange={this.handleMonthChange} />
                </div>

                <div className="col-xs-4">
                    <Select value={this.state.day} options={this.state.days} onChange={this.handleDayChange} />
                </div>
            </div>
        );
    }
}

export default DatePicker;