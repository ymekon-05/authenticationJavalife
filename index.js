/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import Application from './pages/Application';
import store from './redux';

import { SignupPage }  from './pages//NewUser'
import {LoginPage} from './pages/Login'
import {HomePage} from './pages/Home'


 class reactReduxLogin extends React.Component {
  render() {
    return (
     
      <Provider store={store}>
        <Application />
      </Provider>
  
 
  
    );
  }
}

AppRegistry.registerComponent('reactReduxLogin', () => reactReduxLogin);


//finished for signup new users

/*  cll sing up form 
import { AppRegistry } from 'react-native';
import App from './App';

AppRegistry.registerComponent('reactReduxLogin', () => App);
*/
