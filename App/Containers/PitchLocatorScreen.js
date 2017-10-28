import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import firebaseApp from '../Config/FirebaseConfig';

export default class PitchLocatorScreen extends React.Component{

constructor(props){
    super(props)
    this.pitchesRef = firebaseApp.database().ref().child('/pitches');

    this.state = {

      // markers: new ListView.DataSource({
      //   rowHasChanged: (row1, row2) => row1 !== row2,
      // })
      //markers: Object.keys(this.pitchesRef).map(p => Object.assign( this.pitchesRef[p], {this.pitchesRef:p} ) )

      markers: [{}]
      // markers: [{
      //   title: 'hello1',
      //   latitude: 37.78825,
      //   longitude: -122.4324
      // },
      // {
      //   title: 'hello2',
      //   latitude: 37.808000,
      //   longitude: -122.417743 
      // }]
    }
}

  componentWillMount () {
    this.pitchesRef.on("value", (snapshot) => {

        snapshot.forEach((snap) => {
            this.state.markers.push({
                title: snap.val().title,
                latitude: parseFloat(snap.val().latitude),
                longitude: parseFloat(snap.val().longitude)
            });

        });
    });
  }
  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition((position) => {
      // Create the object to update this.state.mapRegion through the onRegionChange function
      let region = {
        latitude:       position.coords.latitude,
        longitude:      position.coords.longitude,
        latitudeDelta:  0.00922*1.5,
        longitudeDelta: 0.00421*1.5
      }
      this.onRegionChange(region, region.latitude, region.longitude);
    });

    

    // this.setState({
    //     markers: [{
    //        title: 'hello1',
    //        latitude: 37.78825,
    //        longitude: -122.4324
            
    //       },
    //       {
    //         title: 'hello2',
    //         latitude: 37.808000,
    //         longitude: -122.417743
    //       }]
    //   });
  }

  onRegionChange(region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      // If there are no new values set use the the current ones
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  onMapPress(e) {
    console.log(e.nativeEvent.coordinate.longitude);
    let region = {
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
      latitudeDelta: 0.00922*1.5,
      longitudeDelta: 0.00421*1.5
    }
    this.onRegionChange(region, region.latitude, region.longitude);
  }

  getInitialState = () =>{
    return {
        region: {
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          },
        };
  }

  snapshotToArray = (snapshot) => {
    let returnArr = [];

    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val(); 
        item.key = childSnapshot.key;
        returnArr.push(item);
    });

    return returnArr;
  }

render() {
    return (
      <View style={styles.container}>
        <MapView
          provider= { PROVIDER_GOOGLE }
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}

          showsUserLocation={true}
          followUserLocation={true}
          onRegionChange={this.onRegionChange.bind(this)}
          onPress={this.onMapPress.bind(this)}>
          
          {this.state.markers.map(marker => (
            <MapView.Marker 
              coordinate={{longitude: marker.longitude, latitude: marker.latitude}}
              title={marker.title} />
          ))}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },

  map:{
    ...StyleSheet.absoluteFillObject
  }
});