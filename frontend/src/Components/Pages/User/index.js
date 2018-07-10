import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import RegisterForm from '../Register/RegisterForm';
import { updateUserInfo } from '../User/actions';

class UserProfile extends Component {

    render() {
        const user = this.props.user;
        if(!user.token){
            return <Redirect to="/login" />
        }

        return (
            <section className="home-section clearfix">
                <div className="home-section-title">
                    <h1>Update {user.info.first_name+' '+user.info.last_name} Profile</h1>
                </div>
                <div className="col-xs-12">
                    <RegisterForm user={user.info} token={user.token} onUpdateSuccess={this.props.updateUserInfo} />
                </div>

            </section>
        );
    }
}

const mapStateToProps  = (state) => ({
    user: state.User
});

const mapDispatchToProps = (dispatch) => ({
    updateUserInfo: (user) => dispatch(updateUserInfo(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);