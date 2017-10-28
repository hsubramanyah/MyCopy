/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';
import App from './App/Containers/App'

export default class MyMap2 extends Component {
  render() {
    return(
      <App />
    )
  }
}

AppRegistry.registerComponent('MyMap2', () => MyMap2);
