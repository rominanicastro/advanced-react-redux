import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
import requireAuth from 'components/requireAuth';

class CommentBox extends Component {
    state = {
        comment: ''
    };

    handleChange = (event) => {
        // re render the component. This action is async
        this.setState({comment: event.target.value}) 
    }

    handleSubmit = event => {
        event.preventDefault();

        // Call an action creator and save the comment
        this.props.saveComment(this.state.comment);
        this.setState({ comment: '' });
    }
    
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h4>Add a comment</h4>
                    <textarea onChange={this.handleChange} value={this.state.comment} />
                    <div>
                        <button>Submit comment</button>
                    </div>
                </form>
                <button className="fetch-comments-btn" onClick={this.props.fetchComments}>Fetch comments</button>
            </div>
        );
    }
}

// first parameter = map state or props function
// second parameter = actions object
export default connect(null, actions)(requireAuth(CommentBox));