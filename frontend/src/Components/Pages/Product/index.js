import React, { Component } from 'react';

class Product extends Component {
    constructor(props) {
        super(props);

        this.status = {
            product: {}
        }
    }

    componentDidMount(){
        //make api request
    }

    render() {
        return (
            <section className="home-section">
                <div className="home-section-title">
                    <h1></h1>
                </div>
            </section>
        );
    }
}

export default Product;