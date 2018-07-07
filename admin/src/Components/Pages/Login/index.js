import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import LoginForm from './LoginForm';
import './Login.css';

class Login extends Component {
    render() {
        if(this.props.user.token){
            return <Redirect to="/" />
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 form-wrapper">
                        <LoginForm />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.User
})

export default connect(mapStateToProps)(Login);