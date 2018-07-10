import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import ProgressButton from 'react-progress-button';
import { logIn } from "../User/actions";
import Api from '../../Api';
import AlertBox from '../../AlertBox';

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            buttonState: '',
            loginState: false
        }

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }

    onFormSubmit(e) {
        e.preventDefault();
        this.login();
    }

    onEmailChange(e){
        this.setState({email: e.target.value});
    }

    onPasswordChange(e){
        this.setState({password: e.target.value});
    }

    async login(){
        this.setState({buttonState: 'loading'});

        let { response, status } = await Api.json(
            'post',
            'login',
            {
                email: this.state.email,
                password: this.state.password
            }
        );

        status = parseInt(status);
        if (status === 401){
            this.setState({ buttonState: 'error', loginState: 'unauthorized' });
            return;
        }

        if (parseInt(status) !== 200){
            this.setState({ buttonState: 'error', loginState: 'unknown-error' });
            return;
        }
        this.setState({ buttonState: 'success', loginState: 'success' });
        this.props.onUserLoggedIn(response.data, response.meta.token);
    }

    render() {
        if (this.state.loginState){
            return <Redirect to="/" />
        }

        return (
            <form onSubmit={this.onFormSubmit} className="col-xs-12 col-md-6 col-md-offset-3">

                {this.state.loginState === 'unauthorized' && <AlertBox type="danger">Email Or Password is incorrect</AlertBox>}
                {this.state.loginState === 'unknown-error' && <AlertBox type="danger">An Error Occurred. Please Try again</AlertBox>}

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" value={this.state.email} onChange={this.onEmailChange} className="form-control" id="email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={this.state.password} onChange={this.onPasswordChange} className="form-control" id="password" />
                </div>
                <div className="pull-right">
                    <ProgressButton state={this.state.buttonState}>Go</ProgressButton>
                </div>
            </form>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    onUserLoggedIn: (user, token) => dispatch(logIn(user, token))
});

export default connect(null, mapDispatchToProps)(LoginForm);