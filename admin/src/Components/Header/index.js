import React, { Component } from 'react';
import UserCard from '../User/UserCard';
import './Header.css'

class Header extends Component {
    render() {
        return (
            <header class="site-header">
                <div className="logo">
                    Wheels
                </div>

                <div className="pull-left">
                    <UserCard />
                </div>
            </header>
        );
    }
}

export default Header;