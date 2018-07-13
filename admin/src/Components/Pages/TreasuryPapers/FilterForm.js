import React, { Component } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput'
import Select from 'react-select';
import './react-day-picker.css';
import '../Products/react-select.css';

class FilterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: { value: 'all', 'label': 'All' },
            startDate: props.startDate || '',
            endDate: props.endDate || ''
        }

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onStartDateChanged = this.onStartDateChanged.bind(this);
        this.onEndDateChanged = this.onEndDateChanged.bind(this);
    }

    onTypeChange(selected){
        this.setState({type: selected});
    }

    onStartDateChanged(date){
        date = new Date(date);
        this.setState({ startDate: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}` });
    }

    onEndDateChanged(date){
        date = new Date(date);
        this.setState({ endDate: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}` });
    }

    onFormSubmit(e){
        e.preventDefault();

        this.props.onFormSubmit({
            type: this.state.type.value,
            start_date: this.state.startDate,
            end_date: this.state.endDate,
        })
    }

    render() {
        return (
            <form className="col-xs-12 col-md-8 col-md-offset-2 m-b-50" onSubmit={this.onFormSubmit}>
                <div className="row">
                    <div className="col-xs-12 col-sm-4 form-group">
                        <label>Type</label>
                        <Select placeholder="select type"
                            value={this.state.type}
                            onChange={this.onTypeChange}
                            options={[
                                { value: 'all', 'label': 'All' },
                                { value: 'Order', 'label': 'Sales' },
                                { value: 'Product', 'label': 'Quantities' }
                            ]} />
                    </div>
                    <div className="col-xs-12 col-sm-4 form-group">
                        <label>From</label>
                        <DayPickerInput
                            onDayChange={this.onStartDateChanged} />
                    </div>
                    <div className="col-xs-12 col-sm-4 form-group">
                        <label>To</label>
                        <DayPickerInput
                            onDayChange={this.onEndDateChanged}
                            />
                    </div>
                </div>
                <div className="pull-right">
                    <button className="btn btn-default">Filter</button>
                </div>
            </form>
        );
    }
}

export default FilterForm;