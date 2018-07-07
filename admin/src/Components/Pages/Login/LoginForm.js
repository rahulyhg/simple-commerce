import React, { Component } from 'react';
import { connect } from "react-redux";
import ProgressButton from 'react-progress-button';
import { Redirect } from "react-router-dom";
import Api from '../../Api';
import { login } from "../../User/actions";

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            buttonState: '',
            hasError: false
        }

        this.onFormChanged = this.onFormChanged.bind(this);
        this.onFormSubmitted = this.onFormSubmitted.bind(this);
    }

    onFormChanged(event){
        const e = event.nativeEvent;
        this.setState(prevState => {
            let newState = {};
            newState[e.target.name] = e.target.value
            return Object.assign({},prevState, newState);
        });
    }

    async onFormSubmitted(e){
        e.preventDefault();

        this.setState({buttonState: 'loading', hasError: false});
        try{
            let {response, status} = await Api.json('post','login',{
                email: this.state.email,
                password: this.state.password
            });
            if(status != 200){
                this.setState({ buttonState: 'error', hasError: true });
                return;
            }

            this.props.logUserIn(response.data, response.meta.token);
            this.setState({ buttonState: 'success' });
        }catch(e){
            this.setState({ buttonState: 'error' })
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.state.hasError &&
                    <div className="alert alert-danger">
                        email or password is incorrect
                    </div>
                }
                <form onSubmit={this.onFormSubmitted}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={this.state.email} className="form-control" onChange={this.onFormChanged}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" value={this.state.password} className="form-control" onChange={this.onFormChanged}/>
                    </div>
                    <div className="form-group text-center">
                        <ProgressButton state={this.state.buttonState}>Login</ProgressButton>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    logUserIn: (user, token) => dispatch(login(user, token))
});

export default connect(null, mapDispatchToProps)(LoginForm);