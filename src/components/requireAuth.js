/** file name in lower case since convention mention that
    a file which first letter is lowercase means that it will
    export by default a function whereas a file with uppercase 
    in its first letter means thar it will export by default
    a class.  
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (ChildComponent) => {
    class ComposedComponent extends Component {

        componentDidMount() {
            this.redirectToHome();
        }

        componentDidUpdate() {
            this.redirectToHome();
        }

        redirectToHome() {
            if (!this.props.auth) {
                // nativate to home page
                this.props.history.push('/');
            }
        }

        render() {
            return <ChildComponent {...this.props} />
        }
    }


    function mapStateToProps(state) {
        return { auth: state.auth }
    }

    return connect(mapStateToProps)(ComposedComponent);
};