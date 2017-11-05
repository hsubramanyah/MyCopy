import React, { Component } from 'react'
import { Image, View, ScrollView, Text } from 'react-native'
import Styles from './Styles/SplashScreenStyles'
import { NavigationActions } from 'react-navigation'
import AWSConfig from '../Config/AWS';
import { RNS3 } from 'react-native-aws3';
import AWS from 'aws-sdk/dist/aws-sdk-react-native';
const S3 = new AWS.S3({
  region:'us-east-1',
  signatureVersion: 'v4',
  accessKeyId: AWSConfig.accessKey,
  secretAccessKey: AWSConfig.secretKey

})

const mettlesporticon = require("../Images/mettle_box_clean.png");
const background=require("../Images/grass.png")

export default class SplashScreen extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {

    /*var params ={Bucket:'react-app-store-video', Key: 'testfolder10/',ACL:'public-read', Body:''};
    S3.upload(params, function(err,data){
        if (err) {
          console.log("Error:", err);
        }else {
          console.log("Success");
        }
      });
    //createFoldersInAWS () {
      /*const file = {
        // `uri` can also be a file system path (i.e. file://)
        //uri: '/Users/macpc/Desktop/images.jpeg',
        //name: "image1.jpeg",
        type: "text/directory"
      }

      const options = {
        keyPrefix: "testfolder3/",
        bucket: "react-app-store-video",

        successActionStatus: 201,
        acl: 'public-read',
        region:AWSConfig.region,
        accessKey: AWSConfig.accessKey,
        secretKey: AWSConfig.secretKey
      }

      RNS3.put(file, options).then(response => {
        if (response.status !== 201)
          throw new Error("Failed to upload image to S3");
        console.log(response.body);
      });*/
    //}
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
