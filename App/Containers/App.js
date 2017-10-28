import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {StackNavigator} from 'react-navigation';

import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import ForgotPassScreen from './ForgotPassScreen';
import SignUpScreen from './SignUpScreen';
import PitchLocatorScreen from './PitchLocatorScreen';
import AddPitchScreen from './AddPitchScreen';
import PitchesScreen from './PitchesScreen';
import SinglePitchFunctionsScreen from './SinglePitchFunctionsScreen';

const App = StackNavigator({
  splash:{
      screen: SplashScreen,
      navigationOptions:{
        headerStyle:{ position: 'absolute', backgroundColor: 'transparent', borderBottomWidth: 0, zIndex: 100, top: 0, left: 0, right: 0 },
        headerVisible: false,
        left: null,
      }
  },
  login:{
      screen: LoginScreen,
      navigationOptions:{
        headerStyle:{ position: 'absolute', backgroundColor: 'transparent', borderBottomWidth: 0, zIndex: 100, top: 0, left: 0, right: 0 },
        headerVisible: false,
        left: null,
      }
  },
  home:{
      screen: HomeScreen,
      navigationOptions:{
        headerStyle:{ position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0 },
        headerVisible: false,
        title: 'Home'
      }
  },
  signUp:{
      screen: SignUpScreen,
      navigationOptions:{
        headerStyle:{ position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0 },
        title:'Sign Up'
      }
  },
  forgotPass:{
      screen: ForgotPassScreen,
      navigationOptions:{
        headerStyle:{ position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0 },
        title:'Reset Password'
      }
  },
  pitchLocator:{
      screen: PitchLocatorScreen,
      navigationOptions:{
        headerStyle:{ position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0 },
        headerVisible: false,
        title:'Pitch Locator'
      }
  },
  addPitch:{
      screen: AddPitchScreen,
      navigationOptions:{
        headerStyle:{ position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0 },
        headerVisible: false,
        title:'Add Pitch'
      }
  },
  pitchesScreen:{
      screen: PitchesScreen,
      navigationOptions:{
        headerStyle:{ position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0 },
        headerVisible: false,
        title:'Questions'
      }
  },
  singlePitchFunctionsScreen:{
      screen: SinglePitchFunctionsScreen,
      navigationOptions:{
        headerStyle:{ position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0 },
        headerVisible: false,
        title:'Record Video'
      }
  }
},{ mode: 'modal' })

export default App
