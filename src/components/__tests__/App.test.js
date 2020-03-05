import React from 'react';
import { shallow } from 'enzyme';
import App from 'components/App';
import CommentBox from 'components/CommentBox';
import CommentList from 'components/CommentList';

let wrapped;

// enzyme doc -> https://airbnb.io/enzyme/

beforeEach(() => {
    wrapped = shallow(<App />); // render component without their children
});

it('shows a comment box', () => {
    // we use .find to search every instance of CommentBox component inside App component
    // .find returns an array
    expect(wrapped.find(CommentBox).length).toEqual(1);
});

it('shows a comment list', () => {
    expect(wrapped.find(CommentList).length).toEqual(1);
});