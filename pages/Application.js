
import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginPage from './Login';
import HomePage from './Home';



class Application extends Component {

    componentWillMount() {
        this.props = {
          ...this.props,
          ...this.props.navigation
        }
    }
    render() {
        if (this.props.isLoggedIn) {
            return <HomePage/>;
        } else {
            return <LoginPage />;
        }
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.auth.isLoggedIn
    };
}

export default connect(mapStateToProps)(Application); // redux



