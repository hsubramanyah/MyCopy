import React, { PropTypes } from 'react'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  LayoutAnimation
} from 'react-native'
import Styles from './Styles/SignUpScreenStyles'
import Metrics from '../Themes/Metrics'
import RoundedButton from '../Components/RoundedButton'
import firebaseApp from '../Config/FirebaseConfig'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import ImageSlider from 'react-native-image-slider';
import Geocoder from 'react-native-geocoding'


//const mettlesporticon = require("../Images/Capture.jpg");
const background=require("../Images/grass.png");
const image1=require("../Images/image1.jpg");
const image2=require("../Images/image2.jpg");


class AddPitchScreen extends React.Component {

  isAttempting = false
  keyboardDidShowListener = {}
  keyboardDidHideListener = {}

  constructor (props) {
    super(props)
    this.state = {
      title : '',
      address : '',
      surface : '',
      size : '',
      lights : '',
      latitude : '',
      longitude :'',
      visibleHeight: Metrics.screenHeight,
      topLogo: { width: Metrics.screenWidth },
      position: 1,
      interval: null
    }
  }

  componentWillMount () {
    Geocoder.setApiKey('AIzaSyB6i5NS2u4zFJf6iVTpsKiFwzMG0HJEmas');
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
    this.setState({interval: setInterval(() => {
            this.setState({position: this.state.position === 2 ? 0 : this.state.position + 1});
        }, 3000)});
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
    clearInterval(this.state.interval);
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

  handleChangeTitle = (text) => {
    this.setState({ title: text })
  }
  handleChangeAddress = (text) => {
    this.setState({ address: text })
  }
  handleChangeSurface = (text) => {
    this.setState({ surface: text })
    this.handlePressGeocode();
  }
  handleChangeSize = (text) => {
    this.setState({ size: text })
  }
  handleChangeLights = (text) => {
    this.setState({ lights: text })
  }
  handleChangeLatitude = (float) => {
    this.setState({ latitude: float })
  }
  handleChangeLongitude = (float) => {
    this.setState({ longitude: float })
  }
  handlePressGeocode = () => {
    Geocoder.getFromLocation(this.state.address).then(
      json => {
        var location = json.results[0].geometry.location;
        this.setState({ latitude: location.lat })
        this.setState({ longitude: location.lng })
        //alert(location.lat + ", " + location.lng);
      },
      error => {
        alert(error);
      }
    );
  }

  //Creates a new pitch and if that is successful, updates the user information.
  handlePressAddPitch = () =>{

    const { title, address, surface, size, lights, latitude, longitude } = this.state;
    const { navigate } = this.props.navigation;

      //this.isAttempting = false;
      this.getFirebaseRef().child('pitches').push({
        title : title,
        address : address,
        surface : surface,
        size : size,
        lights : lights,
        latitude : latitude,
        longitude : longitude
      }).catch((error)=>{
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });

      alert("Pitch added successfully");
  }

  getFirebaseRef() {
    return firebaseApp.database().ref();
  }
  render () {
    const { title, address, surface, size, lights, latitude, longitude } = this.state;
    return (
      <Image source={background} style={[Styles.backgroundImage]}>
        <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={[Styles.container, {height: this.state.visibleHeight}]} keyboardShouldPersistTaps='always'>
        <View style={Styles.textWrapper}>
              <Text style={Styles.textStyle}>
              Complete the fields below
              </Text>
              <Text style={Styles.textStyle}>
              to add a pitch!
            </Text>
            </View>
          <View style={Styles.form}>
          <View style={Styles.row}>
          <View style={{flexDirection: 'row'}}>
          <View style={Styles.iconWrapper}>
            <FoundationIcon name='marker' size={40} color="#ffffff"/>
            </View>
            <View style={Styles.inputTextWrapper}>
                <TextInput
                ref='title'
                style={Styles.textInput}
                value={title}
                keyboardType='default'
                returnKeyType='next'
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={this.handleChangeTitle}
                underlineColorAndroid='transparent'
                onSubmitEditing={() => this.refs.address.focus()}
                placeholder='Title' />
            </View>
            </View>
            </View>

            <View style={Styles.row}>
            <View style={{flexDirection: 'row'}}>
            <View style={Styles.iconWrapper}>
              <FoundationIcon name='marker' size={35} color="#ffffff"/>
              </View>
              <View style={Styles.inputTextWrapper}>
              <TextInput
                ref='address'
                style={Styles.textInput}
                value={address}
                keyboardType='default'
                returnKeyType='next'
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={this.handleChangeAddress}
                underlineColorAndroid='transparent'
                onSubmitEditing={() => this.refs.surface.focus()}
                placeholder='Address' />
            </View>
            </View>
            </View>

            <View style={Styles.row}>
            <View style={{flexDirection: 'row'}}>
            <View style={Styles.iconWrapper}>
              <FoundationIcon name='marker' size={35} color="#ffffff"/>
              </View>
              <View style={Styles.inputTextWrapper}>
              <TextInput
                ref='surface'
                style={Styles.textInput}
                value={surface}
                keyboardType='default'
                returnKeyType='next'
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={this.handleChangeSurface}
                underlineColorAndroid='transparent'
                onSubmitEditing={() => this.refs.size.focus()}
                placeholder='Surface' />
            </View>
            </View>
            </View>

            <View style={Styles.row}>
            <View style={{flexDirection: 'row'}}>
            <View style={Styles.iconWrapper}>
              <FoundationIcon name='marker' size={35} color="#ffffff"/>
              </View>
              <View style={Styles.inputTextWrapper}>
              <TextInput
                ref='size'
                style={Styles.textInput}
                value={size}
                keyboardType='default'
                returnKeyType='next'
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={this.handleChangeSize}
                underlineColorAndroid='transparent'
                onSubmitEditing={() => this.refs.lights.focus()}
                placeholder='Size' />
            </View>
            </View>
            </View>

            <View style={Styles.row}>
            <View style={{flexDirection: 'row'}}>
            <View style={Styles.iconWrapper}>
              <FoundationIcon name='marker' size={35} color="#ffffff"/>
              </View>
              <View style={Styles.inputTextWrapper}>
              <TextInput
                ref='lights'
                style={Styles.textInput}
                value={lights}
                keyboardType='default'
                returnKeyType='next'
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={this.handleChangeLights}
                underlineColorAndroid='transparent'
                onSubmitEditing={() => this.refs.latitude.focus()}
                placeholder='Lights (Type Yes or No)' />
            </View>
            </View>
            </View>
          </View>

              <View style={Styles.loginButtonWrapper}>
                <TouchableOpacity style={Styles.loginButton} onPress={this.handlePressAddPitch}>
                <Text style={Styles.loginText}>Add Pitch</Text>
                </TouchableOpacity>
              </View>

          </ScrollView>
      </Image>
    )
  }

}

export default AddPitchScreen
