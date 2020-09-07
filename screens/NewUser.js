import React, { Component } from 'react';
import {
 Text,
 View,
 ScrollView,
 TextInput,
 TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Parse, User} from "parse/react-native"
import FilePickerManager from 'react-native-file-picker';
import {readString} from 'react-papaparse';
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('job-Referral-System');
Parse.serverURL='https://parse.sushant.xyz:1304/';

export default class NewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
    name: '',
    password:'',
    address: ''
  };
 }

 setDetails(name,password,address){
  if(name == '' || password == '' || address == ''){
    alert('Please Enter all the fields.');
    return false;
  }else{
    var user = new Parse.User();    
    user.set('username',name);
    user.set('password',password);
    user.set('email',address);
    try{
      user.save()
      .then(()=>{
        this.setState({
          name: '',
          password:'',
          address: ''
         });
         return true;
      },(error) =>{
        return false;
      });
    }catch(error){
      return false;
    }
  }
 }
 onPressSingleUser = () => {
   if(this.setDetails(this.state.name,this.state.password,this.state.address)){
    alert('New user has been created.');
   }else{
    alert('Some error occurred. Please try again');
   }
}

onPressBulkUser = () => {
  FilePickerManager.showFilePicker(null,(responseFile)=>{
      
    if(responseFile.didCancel){
      console.log('Cancelled file picking');
    }else if(responseFile.error){
      alert('Some error occurred.Please try again.' + responseFile.error);
    }else{
      if(responseFile.type == 'text/comma-separated-values'){
        alert('File selected.Uploading the users.');
        var fRead = require('react-native-fs');
        try{
          fRead.readFile(responseFile.path,'utf8')
          .then((fData) =>{

            var PapaData = readString(fData,{
              header:true,
              skipEmptyLines:true,
              worker:true,
              complete:(results) => {
                var count=0;
                var rows = results.data;
                for(var i=0;i<rows.length;i++){
                  console.log(rows[i]['username']+"**"+rows[i]['password']+"**"+rows[i]['address']);
                 if(this.setDetails(rows[i]['username'],rows[i]['password'],rows[i]['address'])){
                  count++;
                  }                  
                }
                alert(count+' Users have been created.');              }
            })

          },(error)=>{
            alert('Some error occurred. Please try again.');
          });

        }catch(error){
          alert('Some error occurred.Please try again.'+error);
        }
      }else{
        alert('Please select a CSV file.');
      }
    }
  });
}

  render() {
    return (
      <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
      
      <Text style={styles.text}>Name*</Text>
      <TextInput 
      value={this.state.name}
      onChangeText={(name) => this.setState({ name })}
      label="name"
      style={styles.inputext}
      placeholder={'Enter Name'} 
      />
  
      <Text style={styles.text}>Password*</Text>
      <TextInput 
      value={this.state.password}
      onChangeText={(password) => this.setState({ password })}
      label="password"
      style={styles.inputext}
      placeholder={'Enter Password'}
      secureTextEntry={true} 
      />
  
      <Text style={styles.text}>Email Address*</Text>
      <TextInput
      value={this.state.address}
      onChangeText={(address)=>this.setState({address})}
      label="address"
      style={styles.inputext}
      placeholder={'Enter Address'}
      />
  
  
      <TouchableOpacity onPress={this.onPressSingleUser} >
      <View style={styles.signin}>
      <Text style={{ color: "#ffffff" }}>
      Upload 
      </Text>
      </View>
      </TouchableOpacity>
  
      <TouchableOpacity onPress={this.onPressBulkUser} >
      <View style={styles.signin}>
      <Text style={{ color: "#ffffff" }}>
      Upload Users using CSV
      </Text>
      </View>
      </TouchableOpacity>
      </ScrollView>
      </View>
    );
    }
}
const styles = require('../stylesheets/newPost');
