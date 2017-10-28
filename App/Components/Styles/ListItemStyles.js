import { StyleSheet } from 'react-native'
import Colors from '../../Themes/Colors'
import Metrics from '../../Themes/Metrics'

export default StyleSheet.create({
  listItem: {
      borderBottomColor: '#eee',
      borderColor: 'gray',
      flexDirection:'row',
      alignItems:'center',
      borderWidth: 1,
      padding:20,
      flex: 1,
      //flexWrap: 'wrap'
    },
  listItemTitle: {
      flex: 1,
      color: '#000',
      flexDirection:'row',
      fontWeight: 'bold',
      fontSize: 16,
      flexWrap: 'wrap',
      //width: 100

  },
  listItemAddress: {
      //flex: 6,
      //color: '#000',
      flexDirection:'row',
      fontWeight: 'bold',
      fontSize: 14,
      width: 100
      //whitespace: preline
      //flexWrap: 'wrap'
  },
})
