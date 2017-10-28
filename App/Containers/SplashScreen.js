import React, { Component } from 'react'
import { Image, View, ScrollView, Text } from 'react-native'
import Styles from './Styles/SplashScreenStyles'
import { NavigationActions } from 'react-navigation'

const mettlesporticon = require("../Images/mettle_box_clean.png");
const background=require("../Images/grass.png")

export default class SplashScreen extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    //const { navigate } = this.props.navigation;
    const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: 'login'})
    ]
    })
    setTimeout(() => {
      this.props.navigation.dispatch(resetAction)
    }, 1000)
  }

  render() {
    return (

      <View style={{flex:1}}>
      <Image source={background} style={[Styles.backgroundImage]}>

      <ScrollView contentContainerStyle={{flex:1, flexDirection: 'column', justifyContent: 'center'}} style={[Styles.container]} keyboardShouldPersistTaps='always'>

          <Image source={mettlesporticon} style={[Styles.topLogo]} />
        </ScrollView>
      </Image>
      </View>
    )
  }
}
