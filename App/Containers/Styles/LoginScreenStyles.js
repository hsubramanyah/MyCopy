import { StyleSheet } from 'react-native'
import Colors from '../../Themes/Colors'
import Metrics from '../../Themes/Metrics'

export default StyleSheet.create({
  container: {
    paddingTop: 40
  },
  form: {
    marginHorizontal: 20,
    marginVertical: 10
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
  topLogo: {
    alignSelf: 'center',
    resizeMode: 'contain',
    height: 150,
    width: 150
  },
  logoWrapper: {
    marginVertical:30
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined
  },
  textWrapper: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.1)',
    marginHorizontal:30
  },
  textStyle: {
    fontFamily: 'Helvetica-Light',
    alignSelf: 'center',
    color: Colors.snow,
    fontWeight: 'bold',
    fontSize: 16
  },
  normalTextStyle: {
    paddingHorizontal:15,
    color: Colors.snow,
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: 'rgba(0,0,0,.1)',
    marginHorizontal:10
  },
  forgotPassword:{
        flexDirection:'row',

        justifyContent:'center'
        },
  iconWrapper: {
    borderTopLeftRadius:9,
    borderTopRightRadius:0,
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 0,
    backgroundColor: Colors.fire ,
    height: 51,
    width: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:4,
    borderColor:Colors.fire
  },
  loginButton: {
    borderRadius: 10,
    height:40,
    width:120,
    backgroundColor: Colors.purple,
    justifyContent: 'center'
  },
  loginText: {
    color: Colors.snow,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginButtonWrapper: {
    alignItems: 'center',
    marginVertical: 10
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
