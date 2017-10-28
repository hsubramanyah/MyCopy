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

const background=require("../Images/grass.png")


class PitchesScreen extends React.Component {

  constructor (props) {
    super(props);
    this.pitchesRef = firebaseApp.database().ref('/questions');

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource: dataSource
    };
  }

  componentDidMount() {
  // start listening for firebase updates
    this.listenForTasks(this.pitchesRef);
  }

  listenForTasks(pitchesRef) {

    pitchesRef.on('value', (dataSnapshot) => {
    var pitchesArray = [];
    dataSnapshot.forEach((child) => { console.log(child.val());
      pitchesArray.push({
        text: child.val().text,
        // address: child.val().address,
        // surface: child.val().surface,
        // lights: child.val().lights,
        // size: child.val().size,
        // latitude: child.val().latitude,
        // longitude: child.val().longitude,
        //  _key: child.key
      });
    });

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(pitchesArray)
    });
    });
  }

  renderItem(task) {
    return (
      <TouchableOpacity  onPress={() => this.props.navigation.navigate("singlePitchFunctionsScreen", { text:
            `${task.text}`
              //, address: `${task.address}`, surface: `${task.surface}`, lights: `${task.lights}`, size: `${task.size}`, latitude: `${task.latitude}`, longitude: `${task.longitude}`
            })}>
        < ListItem task={task} />
      </TouchableOpacity>
    );
  }

  handlePressSinglePitch = () =>{
    const { navigate } = this.props.navigation;
    navigate('singlePitchFunctionsScreen');
  }


  render () {
    //const { email } = this.state;
    //const textInputStyle =  Styles.textInput;
    return (
      <Image source={background} style={[PitchListStyles.backgroundImage]}>
        <View style= {PitchListStyles.container}>
        <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={[PitchListStyles.container, {height: this.state.visibleHeight}]} keyboardShouldPersistTaps='always'>
          <ListView
              dataSource={this.state.dataSource}
              enableEmptySections={true}
              renderRow={this.renderItem.bind(this)}
              style={PitchListStyles.listView}
          />
        </ScrollView>
        </View>
      </Image>
    )
  }

}

export default PitchesScreen
