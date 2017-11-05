import React, {
  Component
} from 'react';

import {
  View,
  Text
} from 'react-native';

import styles from './Styles/ListItemStyles.js';
import Metrics from '../Themes/Metrics'

class ListItem extends Component {
  render() {
    return (
      <View style={styles.listItem}>

        <Text style={styles.listItemTitle}>
          {this.props.task.text}
          {this.props.task.address}
        </Text>

      </View>
    );
  }
}

module.exports = ListItem;
