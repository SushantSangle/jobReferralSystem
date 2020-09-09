import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Parse,Cloud} from 'parse/react-native'
import ImagePicker from 'react-native-image-crop-picker';
import ConfigLoader from '../utils/ConfigLoader';

Parse.setAsyncStorage(AsyncStorage);
Parse.serverURL='https://parse.sushant.xyz:1304/parse';
Parse.initialize('job-Referral-System');


export default class ChangeLogo extends Component {

  constructor(props) {
    super(props);
    this.state = {
        companyName: 'Job Referral App Test',
        companyAbout:'Where Opportunities Are Abundant!!',
        img:'',
    };
    this.getCompanyData();
  }
  componentDidMount(){
    
  }
  getCompanyData=()=>{
    Parse.Config.get()
    .then(async(config) =>{

      console.log(config);
      const image = config.get('logo');
      console.log(image);
      var imageData = ConfigLoader.getLogo();
      this.setState({
        companyName: config.get('CompanyName'),
        companyAbout: config.get('CompanyAbout'),
        img: {
          mime: image.metadata(),
          data: imageData.data,
        }
      });
    }).catch(function(error) {
      console.log('Some error occurred. Please try again.' + error);
     });
  }

  onPressSelectImage = () =>{
  ImagePicker.openPicker({
    width: 400,
    height: 400,
    cropping: true,
    includeBase64:true
  }).then((image) => {
    this.setState({
      img: image
    });  
  });
}
onPressUploadInformation = () =>{
  
  if(this.state.companyName == '' || this.state.companyAbout==''){
    alert('Please enter all the fields.');
  }else{
    var image = this.state.img.data;
    var logoImage = new Parse.File('image', { base64: image },'image/png');

    logoImage.save().then((imageData)=> {
      var imageModified = imageData;
      console.log(imageModified);
      Cloud.run('saveConfig',{
        CompanyName: this.state.companyName,
        CompanyAbout: this.state.companyAbout,
        logo: imageModified,
        
      }).then((code) =>{
        console.log(code);
        alert('Data uploaded successfully.')     
      }).catch((error)=>{
        console.error(error);
      });

    }).catch((error)=>{
      console.error(error);
    })
  }
  }

  render() {
    return (
    
      <View style={styles.container}>

        <Image
          source= {{uri: `data:${this.state.img.mime};base64,${this.state.img.data}`}}
          style= {styles.logoContainer}
        />

        <TextInput
          value={this.state.companyName}
          onChangeText={(companyName) => this.setState({ companyName })}
          label="companyName"
          style={styles.inputext}
          placeholder={'Company Name'}
        />
        
        <TextInput
          multiline = {true}
          numberOfLines ={4}
          value={this.state.companyAbout}
          onChangeText={text=>this.setState({companyAbout:text})}
          label="companyAbout"
          style={styles.inputext}
          placeholder={'Add a tagline.'}
        />

        <TouchableOpacity onPress={this.onPressSelectImage} style={{padding:10}}>
          <View style={styles.signin}>
            <Text style={{ color: "#ffffff" }}>
              Select Logo
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.onPressUploadInformation} >
          <View style={styles.signin}>
            <Text style={{ color: "#ffffff" }}>
              Upload
            </Text>
          </View>
        </TouchableOpacity>
      </View >
    );
  }
}

const styles = require('../stylesheets/loginScreen');
