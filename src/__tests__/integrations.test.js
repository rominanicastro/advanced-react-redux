import React from 'react';
import { mount } from 'enzyme';
import Root from 'Root';
import App from 'components/App';

// moxios mock out the axios API. fake out requests
// https://github.com/axios/moxios
import moxios from 'moxios';

beforeEach(() => {
    // intercept any request that axios send
    moxios.install();

    // responde some data to axios request
    moxios.stubRequest('http://jsonplaceholder.typicode.com/comments', {
        // custimize how maxios respondes to that request
        status: 200, 
        response: [{ name: 'Fetched #1' }, { name: 'Fetched #2' }]
    })
});

afterEach(() => {
    // uninstall moxios
    moxios.uninstall();
});

it('can fetch a list of comments and display them', (done) => {
    // Attemp to render the entire app
    const wrapped = mount(
        <Root>
            <App />
        </Root>
    );
    // find the 'fetchcomments' button and click it
    wrapped.find('.fetch-comments-btn').simulate('click');

    // wait for maxios intercepting the call
    moxios.wait(() => {
        // refresh component
        wrapped.update();
        // expect to find a list of comments
        expect(wrapped.find('li').length).toEqual(2);
        // the it statement doesnt finish until done function is called
        done();
        wrapped.unmount();
    }); 
});