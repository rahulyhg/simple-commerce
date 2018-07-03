import React, { Component } from 'react';
import { connect } from "react-redux";
import RegisterForm from '../Register/RegisterForm';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.updateProfile = this.updateProfile.bind(this);
    }

    updateProfile(){
        return Promise.resolve({
            meta: {
                code: 1
            }
        });
    }
    render() {
        // const user = props.user;
        const user = {
            id: 1,
            first_name: "Mohammed",
            last_name: "Manssour",
            birthday : "1992-9-12",
            country: {
                value: 1,
                label: 'Syria'
            },
            city: {
                value: 1,
                label: 'Damascus'
            },
            address: "this is address"
        }
        return (
            <section className="home-section clearfix">
                <div className="home-section-title">
                    <h1>Update {user.first_name+' '+user.last_name} Profile</h1>
                </div>
                <div className="col-xs-12">
                    <RegisterForm user={user} onRegisterClick={this.updateProfile} />
                </div>

            </section>
        );
    }
}

const mapStateToProps  = (state) => ({
    user: state.User
})

export default connect(mapStateToProps)(UserProfile);