import React, { Component } from 'react';
import CategoriesBox from './CategoriesBox';

class FilterSideBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            keyword: '',
            categories: [],
            brands: []
        };

        this.onKeywordChange = this.onKeywordChange.bind(this);
        this.onCategoriesChange = this.onCategoriesChange.bind(this);
        this.onBrandsChange = this.onBrandsChange.bind(this);

        this.startFilter = this.startFilter.bind(this);
    }

    onKeywordChange(e){
        let keyword = e.target.value;
        this.setState({keyword});

    }

    onCategoriesChange(checkedStatus){
        let categories = [];
        for( var key in checkedStatus){
            if(checkedStatus.hasOwnProperty(key) && checkedStatus[key])
                categories.push(key);
        }

        this.setState({categories})
    }

    onBrandsChange(checkedStatus){
        let brands = [];
        for( var key in checkedStatus){
            if(checkedStatus.hasOwnProperty(key) && checkedStatus[key])
                brands.push(key);
        }

        this.setState({brands})
    }

    startFilter(e){
        e.preventDefault();

        this.props.onFilterStart(this.state);
    }

    render() {
        return (
            <React.Fragment>
                <div className="form-group">
                    <label htmlFor="s">Filter By Name</label>
                    <input type="text" value={this.state.keyword} onChange={this.onKeywordChange} placeholder="Filter" className="form-control" id="s"/>
                </div>

                <CategoriesBox
                    title="Categories"
                    categories={this.props.categories}
                    selected={this.props.selectedCategories}
                    onCheckedChange={this.onCategoriesChange}/>

                <CategoriesBox
                    title="Brands"
                    categories={this.props.brands}
                    selected={this.props.selectedBrands}
                    onCheckedChange={this.onBrandsChange} />

                <button className="btn btn-default pull-right" onClick={this.startFilter}>Filter</button>
            </React.Fragment>
        );
    }
}

export default FilterSideBar;