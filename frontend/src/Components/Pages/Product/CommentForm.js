import React, { Component } from 'react';
import Rating from 'react-rating';
import ProgressButton from 'react-progress-button';
import Api from "../../Api";
import ErrorsBox from '../../ErrorsBox';

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rating: 0,
            content : '',
            buttonLoader: '',
            errors: []
        }

        this.onRatingChange = this.onRatingChange.bind(this);
        this.onContentChange = this.onContentChange.bind(this)
        this.onFormSubmit = this.onFormSubmit.bind(this)
    }

    onRatingChange(rating){
        this.setState({rating});
    }

    onContentChange(e){
        this.setState({content: e.target.value});
    }

    onFormSubmit(e){
        e.preventDefault();

        this.sendComment();
    }

    async sendComment(){
        this.setState({buttonLoader: 'loading'});

        let {response, status} = await Api.jsonAuth(
            this.props.user.token,
            'post',
            `products/${this.props.product.id}/comments`,
            {
                rating: this.state.rating,
                content: this.state.content
            }
        );

        if(parseInt(status) != 200){
            this.setState({errors: response.meta.message, buttonLoader: 'error'});
            return;
        }
        this.setState({ buttonLoader: 'success' });
        this.props.onCommentSaved(response.data);
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                {this.state.errors.length > 0 && <ErrorsBox errors={this.state.errors} />}
                <div className="form-group row">
                    <label className="col-md-3 col-xs-6">Rating</label>
                    <div className="col-md-9 col-xs-6 rating">
                        <Rating
                            start={0}
                            stop={5}
                            step={1}
                            initialRating={this.state.rating}
                            placeholderSymbol={<i className="icon-star-empty"></i>}
                            emptySymbol={<i className="icon-star-empty"></i>}
                            fullSymbol={<i className="icon-star-full"></i>}
                            onChange={this.onRatingChange}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="content" className="col-md-3 col-xs-6">Comment</label>
                    <div className="col-md-9 col-xs-6 rating">
                        <textarea value={this.state.content} onChange={this.onContentChange} className="form-control" id="content" />
                    </div>
                </div>

                <div className="pull-right">
                    <ProgressButton state={this.state.buttonLoader}>Go</ProgressButton>
                </div>
            </form>
        );
    }
}

export default CommentForm;