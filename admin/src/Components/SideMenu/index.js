import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { logout } from '../User/actions';

import './SideMenu.css';

class SideMenu extends Component {
    isUserSignedIn(){
        return this.props.user.token;
    }

    generateMenuItems(){
        let menuItems = [];

        if (this.isUserSignedIn()) {
            menuItems.push({ id: 1, icon: 'icon-package', to: '/products' });
            menuItems.push({ id: 2, icon: 'icon-database', to: '/categories' });
            menuItems.push({ id: 3, icon: 'icon-layers', to: '/brands' });
            menuItems.push({ id: 4, icon: 'icon-box', to: '/orders' });
            menuItems.push({ id: 5, icon: 'icon-dollar-sign', to: '/treasury-papers' });
        } else {
            menuItems.push({ id: 6, icon: 'icon-user2', to: '/login' });
        }

        return menuItems;
    }

    render() {
        var menuItems = this.generateMenuItems()

        return (
            <aside className="side-menu-wrapper">
                <div className="menu">
                    <ul>
                        {menuItems.map(item => <li key={item.id}><Link to={item.to}><i className={item.icon}></i></Link></li>)}
                    </ul>
                    { this.isUserSignedIn() &&
                        <ul className="logout">
                            <li><Link to='logout'><i className="icon-user-x"></i></Link></li>
                        </ul>
                    }
                </div>
            </aside>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.User
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);