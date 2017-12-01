/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  View
} from 'react-native';
import App from './App/Containers/App'

export default class InterviewStudio extends Component {
  render() {
    return(
      <View style={{flex: 1}}>
      <App />
      </View>
    )
  }
}

AppRegistry.registerComponent('InterviewStudio', () => InterviewStudio);
