import React, {
  Component
} from 'react';

import {
  View,
  Text
} from 'react-native';
import FoundationIcon from 'react-native-vector-icons/Foundation';

import styles from './Styles/ListItemStyles.js';
import Metrics from '../Themes/Metrics'
import Colors from '../Themes/Colors';


class ListQuestions extends Component {
  renderImage() {
    console.log(this.props.task.price);
    if (this.props.task.price) {
      return (
        <View
          style={{
            borderTopLeftRadius: 9,
            borderTopRightRadius: 9,
            borderBottomLeftRadius: 9,
            borderBottomRightRadius: 9,
            backgroundColor: Colors.fire,
            height: 30,
            width: 30,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth:4,
            borderColor: Colors.fire,

          }}
        >
        <FoundationIcon name='lock' size={25} color="#ffffff" />
        </View>
      )
    } else {
      return (
        <View
          style={{
            height: 30,
            width: 30 }}
        />

      )
    }
  }
  render() {
    return (
      <View
        style={{
          borderBottomColor: '#eee',
          borderColor: 'gray',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          padding: 20,
          flex: 1
          //flexWrap: 'wrap'
        }}
      >
      <View style={{flexDirection: 'row', flex: 1, alignItems: 'center',
      justifyContent: 'space-around',}}>

        {this.renderImage()}
        <Text
          style={{
            flex: 1,
            color: '#000',
            flexDirection: 'row',
            fontWeight: 'bold',
            fontSize: 16,
            flexWrap: 'wrap',
            marginHorizontal: 10

          }}
        >
          {this.props.task.text}

        </Text>
</View>
      </View>
    );
  }
}

module.exports = ListQuestions;
