import React from 'react';
import { mount } from 'enzyme';
import CommentBox from 'components/CommentBox';
import Root from 'Root';

/**We can import this 3 things in order to fix provider dependency: 
 *  import { createStore } from 'redux';
    import { Provider } from 'react-redux';
    import reducers from 'reducers';
 * But it is NOT a good approach to solve the problem. It doesnt escale */

/** In each test file we should import this 3 pieces,
 * and set a provider.
 * If we modify the provider, for example adding a middleware,
 * we should modify every test file
 */

let wrapped;
 
beforeEach(() => {
    wrapped = mount(
    <Root>
        <CommentBox />
    </Root>); // Full DOM rendering
});

afterEach(() => {
    wrapped.unmount(); // remove the component from DOM to not mess up the DOM
});

it('has a text area and two buttons', () => {
    expect(wrapped.find("textarea").length).toEqual(1);
    expect(wrapped.find("button").length).toEqual(2);
});

describe('the text area', () => {

    beforeEach(() => {
        wrapped.find("textarea").simulate('change', {
            // replace the function argument, 
            // in this case replace event parameter
            target: { value: 'new comment' }
        });

        // re render the component in order to NOT wait  
        // the component re render after update its state
        wrapped.update();
    });

    it('has a textarea that users can type in', () => {
        expect(wrapped.find("textarea").prop('value')).toEqual('new comment');
    });

    it('when form is submitted, text area gets emptied', () => {
        /** Good practice. Check if value is effectively changed in first place before submit.
            if this value is not checked, test may give us a false positive  */
        expect(wrapped.find("textarea").prop('value')).toEqual('new comment'); 
        wrapped.find("form").simulate('submit');
        wrapped.update();
        expect(wrapped.find("textarea").prop('value')).toEqual('');
    });

})

