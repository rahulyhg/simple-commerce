import React, { Component } from 'react';
import { connect } from 'react-redux';
import CategoriesList from './CategoriesList';

class Home extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount(){
        this.getCategories();
    }

    getCategories() {
        console.log("getting categories");
        let categories = [
            {
                id: 1,
                name: 'boots',
                image: 'http://files.microservices.test/api/files/e5c3b26e-7e31-11e8-823d-20c9d084fdb9?s=400'
            },
            {
                id: 2,
                name: 'gear',
                image: 'http://files.microservices.test/api/files/34a0ea8c-7e32-11e8-864c-20c9d084fdb9?s=400'
            },
            {
                id: 3,
                name: 'bicycles',
                image: 'http://files.microservices.test/api/files/5a09ad54-7e32-11e8-b2b0-20c9d084fdb9?s=400'
            },
        ];

        this.props.onGetCategories(categories);
    }

    render() {
        return (
            <div className="home-wrapper container">
                <CategoriesList />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = dispatch => ({
    onGetCategories: (categories) => {
        dispatch({
            type: 'UPDATE_CATEGORIES',
            categories,
        });
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);