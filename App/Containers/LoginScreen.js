import React from 'react'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  Keyboard,
  LayoutAnimation,
  TouchableHighlight
} from 'react-native'
import Styles from './Styles/LoginScreenStyles'
import Metrics from '../Themes/Metrics'

import firebaseApp from '../Config/FirebaseConfig'
import Icon from 'react-native-vector-icons/FontAwesome';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RoundedButton from '../Components/RoundedButton'


const mettlesporticon = require("../Images/mettle_box_clean.png");
const background=require("../Images/grass.png")

class LoginScreen extends React.Component{
  keyboardDidShowListener = {}
  keyboardDidHideListener = {}

  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      visibleHeight: Metrics.screenHeight,
      topLogo: { width: Metrics.screenWidth },
    }
  }
  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  keyboardDidShow = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    let newSize = Metrics.screenHeight - e.endCoordinates.height
    this.setState({
      visibleHeight: newSize,
      topLogo: {width: 100, height: 70}
    })
  }

  keyboardDidHide = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      visibleHeight: Metrics.screenHeight,
      topLogo: {width: Metrics.screenWidth}
    })
  }

  handleChangeUsername = (text) => {
    this.setState({ username: text })
  }

  handleChangePassword = (text) => {
    this.setState({ password: text })
  }

  handlePressLogin = () => {
    const { username, password } = this.state
    const { navigate } = this.props.navigation;
    firebaseApp.auth().signInWithEmailAndPassword(username, password).then(()=>{
      user = firebaseApp.auth().currentUser;
      if(user.emailVerified){
        this.isAttempting = false
        navigate('home');
      } else{
        //alert('Please verfiy your email id!');
        this.isAttempting = false
        navigate('home');
      }

    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
    });
  }
  handlePressSignup = () => {
    const { navigate } = this.props.navigation;
    navigate('signUp');
  }
  handlePressForgotPassword = () => {
    const { navigate } = this.props.navigation;
    navigate('forgotPass');
  }

  render () {
    const { username, password } = this.state
    const { fetching } = this.props
    const editable = !fetching
    const textInputStyle = editable ? Styles.textInput : Styles.textInputReadonly
    return (
      <ImageBackground source={background} style={[Styles.backgroundImage]}>
        <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={[Styles.container, {height: this.state.visibleHeight}]} keyboardShouldPersistTaps='always'>
        <View style={Styles.logoWrapper}>
          <Image source={mettlesporticon} style={[Styles.topLogo, this.state.topLogo]} />
          </View>
          <View style={Styles.textWrapper}>
            <Text style={Styles.textStyle}>
              Interview Help For Ambitious
              </Text>
              <Text style={Styles.textStyle}>
               Top-Tier Professionals
            </Text>
          </View>
            <View style={Styles.form}>
            <View style={Styles.row}>
            <View style={{flexDirection: 'row'}}>
            <View style={Styles.iconWrapper}>
              <FoundationIcon name='torso-business' size={40} color="#ffffff"/>
              </View>
              <View style={Styles.inputTextWrapper}>
              <TextInput
                ref='username'
                style={textInputStyle}
                value={username}
                editable={editable}
                keyboardType='default'
                returnKeyType='next'
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={this.handleChangeUsername}
                underlineColorAndroid='transparent'
                onSubmitEditing={() => this.refs.password.focus()}
                placeholder='Username'>
                </TextInput>
                </View>
            </View>
            </View>
            <View style={Styles.row}>
            <View style={{flexDirection: 'row'}}>
            <View style={Styles.iconWrapper}>
              <Ionicons name='ios-key' size={40} color="#ffffff"/>
              </View>
              <View style={Styles.inputTextWrapper}>
              <TextInput
                ref='password'
                style={textInputStyle}
                value={password}
                editable={editable}
                keyboardType='default'
                returnKeyType='go'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry
                onChangeText={this.handleChangePassword}
                underlineColorAndroid='transparent'
                onSubmitEditing={this.handlePressLogin}
                placeholder='Password' />
                </View>
                </View>
            </View>
            </View>
            <View style={Styles.loginButtonWrapper}>
            <TouchableOpacity style={Styles.loginButton} onPress={this.handlePressLogin}>
            <Text style={Styles.loginText}>Log In</Text>
            </TouchableOpacity>
            </View>
          <View style={Styles.forgotPassword}>
          <TouchableHighlight onPress={this.handlePressSignup}>
            <Text style={Styles.normalTextStyle}>Signup</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.handlePressForgotPassword}>
            <Text style={Styles.normalTextStyle}>Forgot Password?</Text>
          </TouchableHighlight>
          </View>
        </ScrollView>
      </ImageBackground>
    )
  }
}

export default LoginScreen
