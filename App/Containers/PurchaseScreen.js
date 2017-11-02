import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions
} from 'react-native';
import Colors from '../Themes/Colors';
import Styles from './Styles/LoginScreenStyles';
import RoundedButton from '../Components/RoundedButton'

const background = require('../Images/grass.png');

export default class PurchaseScreen extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }
  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={{ flex: 1, justifyContent: 'space-around' }}>
      <ImageBackground source={background} style={[Styles.backgroundImage]}>
        <ScrollView
        contentContainerStyle={{ justifyContent: 'center' }}
        style={[Styles.container]} keyboardShouldPersistTaps='always'
        >
          <View style={{ paddingTop: 50, flex: 1 }} >

            <RoundedButton style={Styles.loginButton} text={params.text} />
            <View
              style={{
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,.1)',
                marginHorizontal: 30,
                padding: 30
               }}
            >
              <Text style={Styles.textStyle}>
                Interview Help For Ambitious
              </Text>
              <Text
                style={{
                fontFamily: 'Helvetica-Light',
                alignSelf: 'center',
                color: Colors.snow,
                fontWeight: 'bold',
                fontSize: 16
                }}
              >
                 Top-Tier Professionals

                 This is a place holder for question description.
                 This is a place holder for question description.
                 This is a place holder for question description.This is a place holder for question description.
                 This is a place holder for question description.
              </Text>
            </View>

            <RoundedButton style={Styles.loginButton} text={`Price: $${params.price}`} />
            <RoundedButton style={Styles.loginButton} text='Purchase this Question' />
            <RoundedButton style={Styles.loginButton} text='Purchase all Question' />

          </View>
        </ScrollView>
      </ImageBackground>
      </View>


    );
  }

}
