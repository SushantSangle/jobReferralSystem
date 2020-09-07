import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
 
import {Parse} from 'parse/react-native'
import ImagePicker from 'react-native-image-crop-picker';
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('job-Referral-System');
Parse.serverURL='https://parse.sushant.xyz:1304/';
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

  getCompanyData=()=>{
    
    Parse.Config.get()
    .then((config) =>{

      console.log(config);
      this.setState({
        companyName: config.get('CompanyName'),
        companyAbout: config.get('CompanyAbout'),
      });
    }, function(error) {
     console.log('Some error occurred. Please try again.' + error);
    });
  }

  onPressSelectImage = () =>{
  ImagePicker.openPicker({
    width: 400,
    height: 400,
    cropping: true,
    includeBase64:true
  }).then(image => {
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
    var logoImage = new Parse.File('image.jpeg', { base64: image });
    logoImage.save().then((imageData)=> {

      Parse.Config.save({
        CompanyName: this.state.companyName,
        CompanyAbout: this.state.companyAbout,
        logo: imageData
        
      }).then(() =>{
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

        <TouchableOpacity onPress={this.onPressSelectImage} >
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
