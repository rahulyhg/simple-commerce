import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group'
import AlertBox from './AlertBox';

class FlashMessages extends Component {
    render() {
        const messages = this.props.messages;
        return (
            <React.Fragment>
                {this.props.children}

                {messages.length > 0 && <div className="flash-messages-container">
                    <CSSTransitionGroup
                        transitionName="transition"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}>
                        {messages.map(message => <AlertBox key={message.id} type={message.isError ? 'danger' : 'success'}>{message.message}</AlertBox>)}
                    </CSSTransitionGroup>
                </div>}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    messages: state.flash.messages
})

export default connect(mapStateToProps)(FlashMessages);