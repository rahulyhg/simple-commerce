import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import RegisterForm from "./RegisterForm";

class Register extends Component {
    render() {
        if(this.props.user.id){
            return <Redirect to="/" />;
        }

        return (
            <div className="container">
                <section className="row home-section">
                    <div className="col-md-12 home-section-title">
                        <h1>Register</h1>
                    </div>
                    <RegisterForm user={{}} onRegisterClick={Promise.resolve({meta: {code: 1} } )} />
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user : state.User
});

export default connect(mapStateToProps)(Register);