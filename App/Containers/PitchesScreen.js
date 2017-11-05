import React, { PropTypes } from 'react'
import {
  Alert,
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ListView
} from 'react-native'
import Styles from './Styles/ForgotPassScreenStyles'
import PitchListStyles from './Styles/PitchesListStyles'
import Metrics from '../Themes/Metrics'
import RoundedButton from '../Components/RoundedButton'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import FoundationIcon from 'react-native-vector-icons/Foundation'
import firebaseApp from '../Config/FirebaseConfig'
import ListItem from '../Components/ListItem'
import ListQuestions from '../Components/ListQuestions'

const background = require('../Images/grass.png');


class PitchesScreen extends React.Component {

  constructor(props) {
    super(props);
    this.allQuestions = firebaseApp.database().ref('/questions');
    this.userQuestions =
    firebaseApp.database().ref(`users/${firebaseApp.auth().currentUser.uid}/questions`);

    const dataSourceUserQues = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    const dataSourcePurchaseQues = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });


    //test
    //var ques1={};
    /*question1 = firebaseApp.database().ref('/questions/question1');
    question1.on('value', (dataSnapshot) => {
      this.ques1={
      text: dataSnapshot.child("text").val(),
      response: false,
      feedback: false
      //delete this.ques1.price;

    }*/
    question1 = firebaseApp.database().ref('/questions/question1');

    question1.on('value', (dataSnapshot) => {
      ques1 = {
      text: dataSnapshot.child('text').val(),
      response: false,
      feedback: false

    }
    this.questions = [{
      question1: ques1
    }]

    console.log('log40 ', this.questions);
    });
//console.log('log43 ',ques1);
    //test
    this.state = {
      dataSourceUserQues: dataSourceUserQues,
      dataSourcePurchaseQues: dataSourcePurchaseQues
      //question1 : this.ques1
    };
    console.log('test ', this.state);
  }

  componentDidMount() {
  // start listening for firebase updates
    this.listenForTasks(this.userQuestions, this.allQuestions);
  }

  containsKey(array, key) {
    var i;
    for (i = 0; i < array.length; i++) {
      if (array[i]._key === key) {
        return true;
      }
    }
    /*array.forEach((val)=>{
      console.log(val._key==key);
      if(val._key==key) {
        return true;
      }
    });*/
    return false;
  }

  listenForTasks(userQuestions, allQuestions) {
    const unlockedQuestions = [];
    userQuestions.on('value', (dataSnapshot) => {
      dataSnapshot.forEach((child) => {
        console.log(child.val());
        console.log(child.key);
        unlockedQuestions.push({
          text: child.val().text,
          _key: child.key
        });
      });

      this.setState({
        dataSourceUserQues: this.state.dataSourceUserQues.cloneWithRows(unlockedQuestions),
        unlockedQuestions: unlockedQuestions
        });
    });
    const lockedQuestions = [];
    allQuestions.on('value', (dataSnapshot) => {
      dataSnapshot.forEach((child) => {
        console.log(child.val());
        console.log(child.key);
        if (!this.containsKey(unlockedQuestions, child.key)) {
          lockedQuestions.push({
            text: child.val().text,
            price: child.val().price,
            _key: child.key
          });
        }
      });
console.log(lockedQuestions);
    this.setState({
      dataSourcePurchaseQues: this.state.dataSourceUserQues.cloneWithRows(lockedQuestions),
      lockedQuestions: lockedQuestions
    });
    });
  }

  renderFreeItem(task) {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('singlePitchFunctionsScreen',
        { text: `${task.text}`,
          _key: `${task._key}`
        })}
      >

        <ListQuestions task={task} />
      </TouchableOpacity>
    );
  }

  renderLockedItem(task) {
    console.log(this.state);
    return (
      <TouchableOpacity  onPress={() => this.props.navigation.navigate('purchaseScreen', { text:
            `${task.text}`, _key: `${task._key}`, price: `${task.price}`, lockedQuestions: this.state.lockedQuestions
              //, surface: `${task.surface}`, lights: `${task.lights}`, size: `${task.size}`, latitude: `${task.latitude}`, longitude: `${task.longitude}`
            })}>
        < ListQuestions task={task} />
      </TouchableOpacity>
    );
  }

  handlePressSinglePitch = () =>{
    const { navigate } = this.props.navigation;
    navigate('singlePitchFunctionsScreen');
  }


  render() {
    //const { email } = this.state;
    //const textInputStyle =  Styles.textInput;
    return (
      <Image source={background} style={[PitchListStyles.backgroundImage]}>
        <View style= {PitchListStyles.container}>
        <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={[PitchListStyles.container, {height: this.state.visibleHeight}]} keyboardShouldPersistTaps='always'>
          <ListView
              dataSource={this.state.dataSourceUserQues}
              enableEmptySections={true}
              renderRow={this.renderFreeItem.bind(this)}
              style={PitchListStyles.listView}
          />
          <ListView
              dataSource={this.state.dataSourcePurchaseQues}
              enableEmptySections={true}
              renderRow={this.renderLockedItem.bind(this)}
              style={PitchListStyles.listView}
          />
        </ScrollView>
        </View>
      </Image>
    )
  }

}

export default PitchesScreen
