import React, { Component } from 'react';
import Category from './Category';
import Api from '../../Api';
import Loader from '../../Loader';


class CategoriesList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            categoriesLoader: 'loading'
        }
    }


    componentDidMount(){
        this.getCategories();
    }

    async getCategories() {
        let { response, status } = await Api.json('get', 'categories?limit=3&random=true');

        if (parseInt(status) !== 200) {
            this.setState({ categoriesLoader: 'empty' })
            return;
        }
        this.setState({ categoriesLoader: 'success', categories: response.data });
    }

    render() {


        return (
            <div className="row home-section">
                <div className="home-section-title col-xs-12">
                    <h1>Categories</h1>
                </div>

                <Loader
                    state={this.state.categoriesLoader}
                    empty="No Categories were found in the system">

                    {this.state.categories.map(cat => <Category key={cat.id} category={cat} />)}

                </Loader>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.HomeReducer.categories,
    }
}

export default CategoriesList;