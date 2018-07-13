import React, { Component } from 'react';

class CategoriesBox extends Component {
    constructor(props) {
        super(props);

        let isChecked = {};
        props.categories.forEach(cat => {
            isChecked[cat.id] = props.selected.indexOf(cat.id) === -1 ? false : true;
        });

        this.state = {
            isChecked
        }

        this.onCheckboxStateChanged = this.onCheckboxStateChanged.bind(this);
    }

    onCheckboxStateChanged(e){

        const id = e.target.name;
        let isChecked = this.state.isChecked;
        isChecked[id] = e.target.checked;
        this.setState({isChecked});

        this.props.onCheckedChange(isChecked);
    }

    render() {
        const categories = this.props.categories;
        return (
            <div className="m-b-30">
                <h4>{this.props.title}</h4>
                {categories.length > 0 && categories.map(cat =>
                    <div key={cat.id} className="category-checkbox">
                        <input
                            type="checkbox"
                            name={cat.id}
                            onChange={this.onCheckboxStateChanged}
                            checked={this.state.isChecked[cat.id]}
                            id={`category-${cat.id}`}
                            />
                        <label htmlFor={`category-${cat.id}`}>{cat.name}</label>
                    </div>
                )}
            </div>
        );
    }
}

export default CategoriesBox;