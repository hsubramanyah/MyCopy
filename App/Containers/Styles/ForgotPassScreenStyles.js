import { StyleSheet } from 'react-native'
import Colors from '../../Themes/Colors'
import Metrics from '../../Themes/Metrics'

export default StyleSheet.create({
  container: {
    paddingTop: 200
  },
  form: {
    marginHorizontal: 20,
    marginVertical: 5
  },
  rowLabel: {
    color: Colors.snow,
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,.1)',
    marginHorizontal:30
  },
  row: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10
  },

  textInput: {
    height: 43,
    color: Colors.black,
    width: 300,
    backgroundColor:"#ffffff"
  },
  textInputReadonly: {
    color: Colors.steel
  },
  loginRow: {
    paddingBottom: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    flexDirection: 'row'
  },
  loginButtonWrapper: {
    alignItems: 'center',
    marginVertical: 10
  },
  loginButton: {
    borderRadius: 8,
    height:50,
    width:200,
    backgroundColor: Colors.fire,
    justifyContent: 'center'
  },
  loginText: {
    color: Colors.snow,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined
  },

  textStyle: {
    alignSelf: 'center',
    color: Colors.black,
    fontSize: 18,
    fontWeight: 'bold',
    fontSize:22,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  forgotPassword:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
  },
  iconWrapper: {
    borderTopLeftRadius:9,
    borderTopRightRadius:0,
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 0,
    backgroundColor:Colors.fire ,
    height: 51,
    width: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:4,
    borderColor:Colors.fire
  },
  inputTextWrapper: {
    borderWidth: 4,
    borderColor: Colors.snow,
    borderTopLeftRadius:0,
    borderTopRightRadius: 9,
    borderBottomLeftRadius:0,
    borderBottomRightRadius: 9
  }
})
