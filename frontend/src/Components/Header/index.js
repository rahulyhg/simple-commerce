import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.css';
import Menu from '../Menu'


class Header extends Component {
    render() {
        return (
            <header className={`site-header ${this.props.location === '/' ? '' : 'inner'}`}>
                <div className="container">
                    <nav className="top-bar row">
                        <div className="col-xs-6 logo">
                            WHEELS
                        </div>

                        <Menu />
                    </nav>

                    <div className="caption">
                        <h1>Welcome To Wheels</h1>
                        <p>The number one place to buy Sports equipments</p>
                    </div>
                </div>
                <div className="mouse">
                    <i className="icon-mouse"></i>
                </div>
            </header>
        );
    }
}

const mapStateToProps = (state) => ({
    location: state.router.location.pathname
})

export default connect(mapStateToProps)(Header);