import React, { Component } from 'react'
import {
  Alert,
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  Dimensions
} from 'react-native'
import firebaseApp from '../Config/FirebaseConfig'
import Styles from './Styles/LoginScreenStyles'
import Icon from 'react-native-vector-icons/FontAwesome';
import Metrics from '../Themes/Metrics'
import RoundedButton from '../Components/RoundedButton'
import getDirections from 'react-native-google-maps-directions'

const background=require("../Images/grass.png")
const mettlesporticon = require("../Images/mettle_box_clean.png");

const {width, height} = Dimensions.get('window')
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export default class HomeScreen extends Component {
  keyboardDidShowListener = {}
  keyboardDidHideListener = {}
  constructor(props) {
    super(props)
    this.pitchesRef = firebaseApp.database().ref().child('/pitches');

    this.state = {
      topLogo: { width: Metrics.screenWidth },

      initialPosition:{
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      
      error: null
    }
  }

  watchId: ?number=null
  // componentDidMount() {
  //   this.watchId = navigator.geolocation.watchPosition(
  //     (position) => {
  //       this.setState({
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude,
  //         error: null,
  //       });
  //     },
  //     (error) => this.setState({ error: error.message }),
  //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
  //   );
  // }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {

        var lat = parseFloat(position.coords.latitude)
        var long = parseFloat(position.coords.longitude)

        var initialRegion = {
          latitude: lat,
          longitude: long,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }

        this.setState({initialPosition : initialRegion})
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 })

      this.watchId = navigator.geolocation.watchPosition((position) => {
        var lat = parseFloat(position.coords.latitude)
        var long = parseFloat(position.coords.longitude)

        var lastRegion = {
          latitude : lat,
          longitude : long,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }  

        this.setState({initialPosition : lastRegion})

      })
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
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

  handlePressGetDirections = () => {
    //const { navigate } = this.props.navigation;
    //navigate('pitchesScreen');
    const { params } = this.props.navigation.state;
    //const { latitude, longitude } = this.state;
    const data = {
      source: {
         latitude: parseFloat(this.state.initialPosition.latitude),
         longitude: parseFloat(this.state.initialPosition.longitude)
         //latitude: parseFloat(latitude),
         //longitude: parseFloat(longitude)
         //latitude: 41.840389,
         //longitude: -87.616390
      },
      destination: {
        latitude: parseFloat(params.latitude),
        longitude: parseFloat(params.longitude)
        //latitude: 41.867573,
        //longitude: -87.614038
      },
      params: [
        {
          key: "dirflg",
          value: "d"
        }
      ]
  }
    getDirections(data);
  }
  handlePressPitchDetails = () => {
    const { params } = this.props.navigation.state;
    //const { navigate } = this.props.navigation;
    //navigate('addPitch');
    //<Text>{`${params.title} \n`}</Text>
    var a = params.title;
    var b = params.address;
    var c = params.surface;
    var d = params.lights;
    var e = params.size;
    Alert.alert("Pitch Details", "Name:" + a + "\n" + "Address:" + b +"\n"+"Surface:"+c+"\n"+"Lights:"+d+"\n"+"Size:"+e);
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
                
                <RoundedButton style={Styles.loginButton} onPress={this.handlePressGetDirections}>
                  Directions
                </RoundedButton>
                <RoundedButton style={Styles.loginButton} onPress={this.handlePressAddPitch}>
                  Start a game in this pitch
                </RoundedButton>
                <RoundedButton style={Styles.loginButton} onPress={this.handlePressPitchDetails}>
                  Pitch Details
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
