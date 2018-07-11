import React, { Component } from 'react';
import Rating from 'react-rating';

class Comment extends Component {

    render() {
        const comment = this.props.comment;
        return (
            <div className="comment-box">
                <div className="comment-trash" onClick={this.deleteComment}>
                    <i className="icon-trash-2"></i>
                </div>
                <h4>{comment.user.data.name}</h4>
                <div className="rating">
                    <Rating
                        start={0}
                        stop={5}
                        step={1}
                        initialRating={comment.rating}
                        placeholderSymbol={<i className="icon-star-empty"></i>}
                        emptySymbol={<i className="icon-star-empty"></i>}
                        fullSymbol={<i className="icon-star-full"></i>}
                        readonly
                    />
                </div>
                <div className="content">
                    {comment.content}
                </div>
            </div>
        );
    }
}

export default Comment;