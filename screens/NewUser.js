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
Parse.serverURL='https://parse.sushant.xyz:1304/parse';

export default class NewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
    name: '',
    Username:'',
    password:'',
    address: '',
    designation:'',
    phone:'',
    qualifications:'',
    department:'',
    status:'',
    organization:'',
    ResidentialAddress:'',
    description:'',
    link:'',
    workExperience:'',
    dob:'',
    gender:'',
    auth:''
  };
 }

 setDetails(){
    var Name = this.state.name.split(' ');
  {
    var user = new User();    
    user.set('username',this.state.Username);
    user.set('password',this.state.password);
    user.set('email',this.state.address);
    user.set('name',this.state.name)
    try{
      user.save()
      .then((UserResult)=>{
        this.uploadIntoEmployeeData(UserResult);

        this.setState({
          name: '',       
          Username:'',
          password:'',
          address: '',
          designation:'',
          phone:'',
          qualifications:'',
          department:'',
          status:'',
          organization:'',
          ResidentialAddress:'',
          description:'',
          link:'',
          workExperience:'',
          dob:'',
          gender:'',
          auth:''
         });
        
      },(error) =>{
        return false;
      });
    }catch(error){
      return false;
    }
  }
  return true;
 }

 uploadIntoEmployeeData(user){

    var Name = this.state.name.split(' ');

    var EmployeeDetails = Parse.Object.extend("employeeData");
    var employeeDetails = new EmployeeDetails();

    console.log(user);

    employeeDetails.save({

      firstName: Name[0],
      fathersName: Name[1],
      lastName: Name[2],
      email: this.state.address,
      aakade:this.state.phone,
      qualification:this.state.qualifications,
      Department:this.state.department,
      status:this.state.status,
      organization:this.state.organization,
      placeToLive:this.state.ResidentialAddress,
      Designation:this.state.designation,
      description:this.state.description,
      link:this.state.link,
      workExperience:this.state.workExperience,
      dateOfSpawn: new Date(this.state.dob),
      gender: this.state.gender,
      UserPointer: user.toPointer(),
    }).then((result) => {
      console.log(result);
    },(error) => {
      console.log('Error in employee Data:' + error);
    });
 }
 onPressSingleUser = () => {
   var count=0;
   if(this.setDetails()){
    count++;
   }
   alert(count+ " user has been created.")
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
                  this.setState({
                    name: rows[i]['name'] ,
                    Username:rows[i]['username'],
                    password:rows[i]['password'],
                    address: rows[i]['address'],
                    designation:rows[i]['designation'],
                    phone:rows[i]['phone'],
                    qualifications:rows[i]['qualification'],
                    department:rows[i]['department'],
                    organization:rows[i]['organization'],
                    ResidentialAddress:rows[i]['residentialAddress'],
                    description:rows[i]['description'],
                    link:rows[i]['link'],
                    workExperience:rows[i]['workExperience'],
                    dob:rows[i]['dob'],
                    gender:rows[i]['gender']
                    
                    
                  })
                 if(this.setDetails()){
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
      placeholder={'FirstName MiddleName LastName'} 
      />

    <Text style={styles.text}>Username*</Text>
      <TextInput 
      value={this.state.username}
      onChangeText={(Username) => this.setState({ Username })}
      label="username"
      style={styles.inputext}
      placeholder={'Enter Username'} 
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

      <Text style={styles.text}>Designation*</Text>
      <TextInput
      value={this.state.designation}
      onChangeText={(designation)=>this.setState({designation})}
      label="designation"
      style={styles.inputext}
      placeholder={'Enter designation'}
      />

      <Text style={styles.text}>Phone Number*</Text>
      <TextInput
      value={this.state.phone}
      onChangeText={(phone)=>this.setState({phone})}
      label="phone"
      style={styles.inputext}
      placeholder={'Enter phone'}
      />

    <Text style={styles.text}>Date of Birth*</Text>
      <TextInput
      value={this.state.dob}
      onChangeText={(dob)=>this.setState({dob})}
      label="dob"
      style={styles.inputext}
      placeholder={'Enter dob'}
      />

    <Text style={styles.text}>Gender*</Text>
      <TextInput
      value={this.state.gender}
      onChangeText={(gender)=>this.setState({gender})}
      label="gender"
      style={styles.inputext}
      placeholder={'Enter gender'}
      />


      <Text style={styles.text}>Qualifications*</Text>
      <TextInput
      value={this.state.qualifications}
      onChangeText={(qualifications)=>this.setState({qualifications})}
      label="qualifications"
      style={styles.inputext}
      placeholder={'Enter qualifications'}
      />


      <Text style={styles.text}>Department*</Text>
      <TextInput
      value={this.state.department}
      onChangeText={(department)=>this.setState({department})}
      label="department"
      style={styles.inputext}
      placeholder={'Enter department'}
      />

      <Text style={styles.text}>Status*</Text>
      <TextInput
      value={this.state.status}
      onChangeText={(status)=>this.setState({status})}
      label="status"
      style={styles.inputext}
      placeholder={'Enter status'}
      />

      
      <Text style={styles.text}>Organization*</Text>
      <TextInput
      value={this.state.organization}
      onChangeText={(organization)=>this.setState({organization})}
      label="organization"
      style={styles.inputext}
      placeholder={'Enter organization'}
      />

      <Text style={styles.text}>Residential Address*</Text>
      <TextInput
      value={this.state.ResidentialAddress}
      onChangeText={(ResidentialAddress)=>this.setState({ResidentialAddress})}
      label="ResidentialAddress"
      style={styles.inputext}
      placeholder={'Enter ResidentialAddress'}
      />

      <Text style={styles.text}>Link*</Text>
      <TextInput
      value={this.state.link}
      onChangeText={(link)=>this.setState({link})}
      label="link"
      style={styles.inputext}
      placeholder={'Enter link'}
      />

      <Text style={styles.text}>work Experience*</Text>
      <TextInput
      value={this.state.workExperience}
      onChangeText={(workExperience)=>this.setState({workExperience})}
      label="workExperience"
      style={styles.inputext}
      placeholder={'Enter workExperience'}
      />

      <Text style={styles.text}>Description*</Text>
      <TextInput
          multiline={true}
          numberOfLines={4}
          value={this.state.description}
          onChangeText={text => this.setState({ description: text })}
          label="description"
          style={styles.inputext}
          placeholder={'Enter Description'}
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
