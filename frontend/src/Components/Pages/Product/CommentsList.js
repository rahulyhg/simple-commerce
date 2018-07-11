import React, { Component } from 'react';
import CommentItem from './Comment';

class CommentsList extends Component {
    render() {
        const comments = this.props.comments;
        return (
            <section className="reviews">
                {comments.length > 0 &&
                comments.map(comment => <CommentItem key={comment.id} comment={comment} />)
                }
            </section>
        );
    }
}

export default CommentsList;