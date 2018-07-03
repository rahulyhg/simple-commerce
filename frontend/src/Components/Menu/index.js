import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import CartBagLink from '../Pages/Cart/CartBagLink';
import './Menu.css';

class Menu extends Component {

    constructor(props){
        super(props);

        this.state = {
            menuOpen : false
        };

        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu(e){
        e.preventDefault();
        this.setState(prevState => Object.assign({}, prevState, { menuOpen: !prevState.menuOpen }));
    }

    render() {
        const menu = [
            {text: 'Home', path: '/'},
            {text: 'Products', path: '/products'},
        ]

        if(!this.props.user.id){
            menu.push({ text: 'Sign in', path: '/login' });
            menu.push({ text: 'Register', path: '/register' });
        }else{
            menu.push({ text: 'My Account', path: '/profile' });
        }

        return (
            <React.Fragment>
                <div className="menu-wrapper col-xs-6">
                    <CartBagLink />
                    <a href="/" className="Toggler" onClick={this.toggleMenu}> <i className="icon-menu"></i> Menu</a>
                </div>

                { this.state.menuOpen && (<div className="menu-overlay">
                    <a href="/" className="menuCloser" onClick={this.toggleMenu}> <i className="icon-cross"></i> </a>
                    <ul className="menu">
                    {
                        menu.map(
                            menuItem => (<li key={menuItem.text}><Link to={menuItem.path} >{menuItem.text}</Link></li>)
                        )
                    }
                    </ul>
                </div>)
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.User,
    }
}

export default connect(mapStateToProps)(Menu);