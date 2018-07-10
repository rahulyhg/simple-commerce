import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import LoginForm from './LoginForm';

class LogIn extends Component {
    render() {
        if(this.props.user.id){
            return <Redirect to="/" />;
        }

        return (
            <div className="container">
                <section className="home-section">
                    <div className="home-section-title">
                        <h1>Login</h1>
                    </div>
                    <div className="row">
                        <LoginForm />
                    </div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.User
});

export default connect(mapStateToProps)(LogIn);