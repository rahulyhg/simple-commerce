import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
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

        if(!this.props.isSignedIn){
            menu.push({ text: 'Sign in', path: '/login' });
            menu.push({ text: 'Register', path: '/register' });
        }else{
            menu.push({ text: 'My Account', path: '/profile' });
        }

        return (
            <React.Fragment>
                <div className="menu-wrapper col-xs-6">
                    <Link className="cart" to="/cart">
                        <div className="badge">{this.props.cart.length}</div>
                        <i className="icon-basket"></i>
                    </Link>
                    <a href="/" className="Toggler" onClick={this.toggleMenu}> <i className="icon-menu"></i> Menu</a>
                </div>

                { this.state.menuOpen && (<div className="menu-overlay">
                    <a href="/" className="menuCloser" onClick={this.toggleMenu}> <i className="icon-close"></i> </a>
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
        isSignedIn: state.isSignedIn,
        cart: state.cart || []
    }
}

export default connect(mapStateToProps)(Menu);