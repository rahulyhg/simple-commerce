import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { logIn } from "../User/actions";
import ProgressButton from 'react-progress-button'

class LogIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            buttonState: ''
        }

        this.login = this.login.bind(this);
    }

    login(e){
        e.preventDefault();

        this.setState({buttonState: 'loading'});

        setTimeout(() => {
            this.setState({buttonState: 'success'});
            this.props.onUserLoggedIn({id: 1});
        }, 2000);
    }

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
                        <form className="col-xs-12 col-md-6 col-md-offset-3">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="text" name="email" className="form-control" id="email"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" className="form-control" id="password" />
                            </div>
                            <div className="pull-right">
                                <ProgressButton onClick={this.login} state={this.state.buttonState}>Go</ProgressButton>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.User
});

const mapDispatchToProps = (dispatch) => ({
    onUserLoggedIn: (user) => dispatch(logIn(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);