import React, { PropTypes } from 'react'
import {
  Alert,
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity
} from 'react-native'
import Styles from './Styles/ForgotPassScreenStyles'
import Metrics from '../Themes/Metrics'
import RoundedButton from '../Components/RoundedButton'

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FoundationIcon from 'react-native-vector-icons/Foundation';

import firebaseApp from '../Config/FirebaseConfig'

const background=require("../Images/grass.png")
const alertMessage = 'The password reset link has been sent to your email.'

class LoginScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      email: "",
      visibleHeight: Metrics.screenHeight,
      topLogo: { width: Metrics.screenWidth }
    }
  }

  handlePressResetPass = () => {
    const { email } = this.state
    const { navigate } = this.props.navigation;
    firebaseApp.auth().sendPasswordResetEmail(email).then(()=>{
      alert(alertMessage);
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
    });
  }
  handleChangeEmail = (text) => {
    this.setState({ email: text })
  }

  render () {
    const { email } = this.state;
    const textInputStyle =  Styles.textInput;
    return (
      <Image source={background} style={[Styles.backgroundImage]}>
        <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={[Styles.container, {height: this.state.visibleHeight}]} keyboardShouldPersistTaps='always'>


              <Text style={Styles.rowLabel}>Please enter your email</Text>

              <View style={Styles.row}>
              <View style={{flexDirection: 'row'}}>
              <View style={Styles.iconWrapper}>
                <FoundationIcon name='mail' size={40} color="#ffffff"/>
                </View>
                <View style={Styles.inputTextWrapper}>
              <TextInput
                ref='email'
                value={email}
                style={textInputStyle}
                keyboardType='default'
                returnKeyType='next'
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={this.handleChangeEmail}
                underlineColorAndroid='transparent'
                placeholder='Email' />
                </View>
                </View>
                </View>
                <View style={Styles.loginButtonWrapper}>
                  <TouchableOpacity style={Styles.loginButton} onPress={this.handlePressResetPass}>
                  <Text style={Styles.loginText}>RESET PASSWORD</Text>
                  </TouchableOpacity>
                </View>


        </ScrollView>
      </Image>
    )
  }

}

export default LoginScreen
