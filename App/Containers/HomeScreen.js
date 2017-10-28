import React, { Component } from 'react'
import {
  Alert,
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
} from 'react-native'
import firebaseApp from '../Config/FirebaseConfig'
import Styles from './Styles/LoginScreenStyles'
import Icon from 'react-native-vector-icons/FontAwesome';
import Metrics from '../Themes/Metrics'
import RoundedButton from '../Components/RoundedButton'
import VideoRecorder from 'react-native-beautiful-video-recorder';

const background=require("../Images/grass.png")
const mettlesporticon = require("../Images/mettle_box_clean.png");

export default class HomeScreen extends Component {
  keyboardDidShowListener = {}
  keyboardDidHideListener = {}
  constructor(props) {
    super(props)
    this.state = {
      topLogo: { width: Metrics.screenWidth },
    }
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
  handlePressLogout = () =>{
    const { navigate } = this.props.navigation;
    firebaseApp.auth().signOut().then(()=>{
      this.isAttempting = false
      navigate('login');
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
    });
  }
  handlePressFindPitch = () => {
    const { navigate } = this.props.navigation;
    navigate('pitchesScreen');
    //.catch(function(error) {
      // Handle Errors here.
      //var errorCode = error.code;
      //var errorMessage = error.message;
      //alert(errorMessage);
    //});
  }
  handlePressAddPitch = () => {
    const { navigate } = this.props.navigation;
    navigate('addPitch');
    //.catch(function(error) {
      // Handle Errors here.
      //var errorCode = error.code;
      //var errorMessage = error.message;
      //alert(errorMessage);
  }

  start = () => {
	this.videoRecorder.open((data) => {
		console.log('captured data', data);
	});
}

  render() {
    return (
      <Image source={background} style={[Styles.backgroundImage]}>
        <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={[Styles.container]} keyboardShouldPersistTaps='always'>
        <View style={Styles.logoWrapper}>
          <Image source={mettlesporticon} style={[Styles.topLogo, this.state.topLogo]} />
          </View>
          <View>
            <View>
                <RoundedButton style={Styles.loginButton} onPress={this.handlePressFindPitch}>
                  Interview Question List
                </RoundedButton>
                <RoundedButton style={Styles.loginButton} onPress={this.start}>
		  	          Record Video
                </RoundedButton>
		            <VideoRecorder ref={(ref) => { this.videoRecorder = ref; }} compressQuality={'medium'} />
                <RoundedButton style={Styles.loginButton} onPress={this.handlePressAddPitch}>
                  View Response
                </RoundedButton>
                <RoundedButton style={Styles.loginButton} onPress={this.handlePressLogout}>
                  Logout
                </RoundedButton>
            </View>
          </View>
        </ScrollView>
      </Image>
    )
  }
}
