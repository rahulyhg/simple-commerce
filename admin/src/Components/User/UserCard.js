import React, { Component } from 'react';
import { connect } from "react-redux";

class UserCard extends Component {
    render() {
        return (
            <div>

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.User
});

export default connect(mapStateToProps)(UserCard);