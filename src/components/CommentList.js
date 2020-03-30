import React, { Component } from 'react';
import { connect } from 'react-redux';

class CommentList extends Component {
    renderComments() {
        return this.props.comments.map(comment => {
            return <li key={comment}>{comment}</li>
        })
    }

    render() {
        return (
            <div>
                <h4>CommentList</h4>
                <ul>
                    {this.renderComments()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { comments: state.comments };
}

// connect is a perfect example of high order component
export default connect(mapStateToProps)(CommentList);