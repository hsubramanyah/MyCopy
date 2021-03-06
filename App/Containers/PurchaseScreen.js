import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions,
  Alert
} from 'react-native';
import Colors from '../Themes/Colors';
import Styles from './Styles/LoginScreenStyles';
import RoundedButton from '../Components/RoundedButton';
import firebaseApp from '../Config/FirebaseConfig';
import Metrics from '../Themes/Metrics';

const background = require('../Images/grass.png');

export default class PurchaseScreen extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }
  purchase() {
    return true;
  }
  handlePurchaseOne = () => {
    const { params } = this.props.navigation.state;
    //this.allQuestions = firebaseApp.database().ref('/questions');
    this.userQuestions =
    firebaseApp.database().ref(`users/${firebaseApp.auth().currentUser.uid}/questions`);

      Alert.alert(
        'Confirm Message',
        `Are you sure you want to purchase this question for $${params.price}`,
        [
          { text: 'Yes' , onPress: () => {
            if (this.purchase()) {

              this.userQuestions.child(params._key).set({
                text: params.text,
                feedback: false,
                responseUrl: 'a'
              }).then(() => {
                const { navigate } = this.props.navigation;
                alert('Question Unlocked!');
                navigate('home');
                //this.props.navigation.pop();
              }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);
              });
            }
          }
        },
        { text: 'Cancel', onPress: () => console.log('cancel') },
        { cancelable: false }
        ]
      );

  }

  handlePurchaseAll = () => {
    const { params } = this.props.navigation.state;
    console.log(params.lockedQuestions);
    //this.allQuestions = firebaseApp.database().ref('/questions');
    this.userQuestions =
    firebaseApp.database().ref(`users/${firebaseApp.auth().currentUser.uid}/questions`);
    var j;
    var total = 0;
    for (j = 0; j < params.lockedQuestions.length; j++) {
      total += params.lockedQuestions[j].price;
    }
    Alert.alert(
      'Confirm Message',
      `Are you sure you want to purchase all questions for $${total}`,
      [
        { text: 'Yes' , onPress: () => {
          if (this.purchase()) {
            var i;

            for (i = 0; i < params.lockedQuestions.length; i++) {
              this.userQuestions.child(params.lockedQuestions[i]._key).set({
                text: params.lockedQuestions[i].text,
                feedback: false,
                responseUrl: 'a'
              });
            }
            const { navigate } = this.props.navigation;
            alert('All Questions Unlocked!');
            navigate('home');
          }
        }
      },
      { text: 'Cancel', onPress: () => console.log('cancel') },
      { cancelable: false }
      ]
    )


    /*if (this.purchase()) {
      this.userQuestions.child(params._key).set({
        text: params.text,
        feedback: false,
        response: false
      }).then(() => {
        const { navigate } = this.props.navigation;
        alert('Question Unlocked!');
        navigate('home');
        //this.props.navigation.pop();
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
    }*/
  }
  render() {
    const { params } = this.props.navigation.state;
    return (

      <ImageBackground source={background} style={[Styles.backgroundImage]}>
        <ScrollView
        contentContainerStyle={{ justifyContent: 'center' }}
        style={{paddingTop: 50, height: Metrics.screenHeight}} keyboardShouldPersistTaps='always'
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
                 This is a place holder for question description.

              </Text>
            </View>

            <RoundedButton
              style={Styles.loginButton}
              text={`Price: $${params.price}`}
            />
            <RoundedButton
              style={Styles.loginButton}
              text='Purchase this Question'
              onPress={this.handlePurchaseOne}
            />
            <RoundedButton
              style={Styles.loginButton}
              text='Purchase all Questions'
              onPress={this.handlePurchaseAll}
            />

          </View>
        </ScrollView>
      </ImageBackground>


    );
  }

}
