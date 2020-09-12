import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Parse, User } from "parse/react-native"
import FilePickerManager from 'react-native-file-picker';
import { readString } from 'react-papaparse';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('job-Referral-System');
Parse.serverURL = 'https://parse.sushant.xyz:1304/parse';

export default class NewUser extends Component {
  constructor(props) {
    super(props);
    if (this.props.route.params.edit == true) {
      const employeeData = this.props.route.params.user;
      const date = employeeData.get('EmpDOB');
      console.log(date);
      const month = date.getMonth() < 10 ? ('0' + date.getMonth()) : date.getMonth();
      const day = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate();
      const dobb = "" + date.getFullYear() + "-" + month + "-" + day;
      this.state = {
        newUser: false,
        name: employeeData.get('firstName') + " " + employeeData.get("fathersName") + " " + employeeData.get("lastName"),
        Username: employeeData.get('EmpUname'),
        password: '',
        address: employeeData.get('email'),
        designation: employeeData.get('Designation'),
        department: employeeData.get("Department"),
        phone: employeeData.get("EmpPhone"),
        qualifications: employeeData.get("qualification"),
        status: employeeData.get('status'),
        organization: employeeData.get('organization'),
        ResidentialAddress: employeeData.get('EmpAddress'),
        description: employeeData.get('description'),
        link: employeeData.get('link'),
        workExperience: employeeData.get('workExperience'),
        dob: dobb,
        gender: employeeData.get('gender'),
        employeeData: employeeData,
      }
    } else {
      this.state = {
        newUser: true,
        name: '',
        Username: '',
        password: '',
        address: '',
        designation: '',
        phone: '',
        qualifications: '',
        department: '',
        status: '',
        organization: '',
        ResidentialAddress: '',
        description: '',
        link: '',
        workExperience: '',
        dob: '',
        gender: '',
        employeeData: '',
      };
    }
  }

  setDetails() {
    var Name = this.state.name.split(' ');
    var user;
    if (this.state.newUser) {
      user = new User();
    } else {
      user = this.state.employeeData.get('UserPointer');
    }

    try {
      user.set('username', this.state.Username);
      if (this.state.password.length) {
        user.set('password', this.state.password);
      }
      user.set('email', this.state.address);
      user.set('name', this.state.name)
      user.save()
        .then((UserResult) => {
          this.uploadIntoEmployeeData(UserResult);

          this.setState({
            name: '',
            Username: '',
            password: '',
            address: '',
            designation: '',
            phone: '',
            qualifications: '',
            department: '',
            status: '',
            organization: '',
            ResidentialAddress: '',
            description: '',
            link: '',
            workExperience: '',
            dob: '',
            gender: '',
            newUser: this.state.newUser,
            employeeData: this.state.employeeData,
          });

        }, (error) => {
          return false;
        });
    } catch (error) {
      ToastAndroid.show("Cannot create/modify user right now please try restarting app.", ToastAndroid.LONG);
      this.props.navigation.goBack();
      return false;
    }
    return true;
  }

  uploadIntoEmployeeData(user) {

    var Name = this.state.name.split(' ');

    var EmployeeDetails = Parse.Object.extend("employeeData");
    var employeeDetails;
    if (this.state.newUser) {
      employeeDetails = new EmployeeDetails();
    } else {
      employeeDetails = this.state.employeeData;
    }
    console.log(user);

    employeeDetails.save({

      firstName: Name[0],
      fathersName: Name[1],
      lastName: Name[2],
      email: this.state.address,
      EmpPhone: this.state.phone,
      qualification: this.state.qualifications,
      Department: this.state.department,
      status: this.state.status,
      organization: this.state.organization,
      EmpAddress: this.state.ResidentialAddress,
      Designation: this.state.designation,
      description: this.state.description,
      link: this.state.link,
      workExperience: this.state.workExperience,
      EmpDOB: new Date(this.state.dob),
      gender: this.state.gender,
      UserPointer: user.toPointer(),
      EmpUname: this.state.Username,

    }).then((result) => {
      console.log(result);
      if (!this.state.newUser) {
        ToastAndroid.show("User details updated,will show up next time you load stuff", ToastAndroid.LONG);
        this.props.navigation.goBack();
      }
    }, (error) => {
      ToastAndroid.show("Error creating user", ToastAndroid.SHORT);
      console.log('Error in employee Data:' + error);
      if (this.state.newUser) user.destroy().catch((error) => { });
    });
  }
  onPressSingleUser = () => {
    var count = 0;
    if (this.setDetails()) {
      count++;
    }
    if (this.state.newUser) {
      alert(count + " user has been created.")
    } else {
      ToastAndroid.show("Changes are being applied.", ToastAndroid.SHORT);
    }
  }

  onPressBulkUser = () => {
    FilePickerManager.showFilePicker(null, (responseFile) => {

      if (responseFile.didCancel) {
        console.log('Cancelled file picking');
      } else if (responseFile.error) {
        alert('Some error occurred.Please try again.' + responseFile.error);
      } else {
        if (responseFile.type == 'text/comma-separated-values') {
          alert('File selected.Uploading the users.');
          var fRead = require('react-native-fs');
          try {
            fRead.readFile(responseFile.path, 'utf8')
              .then((fData) => {

                var PapaData = readString(fData, {
                  header: true,
                  skipEmptyLines: true,
                  worker: true,
                  complete: (results) => {
                    var count = 0;
                    var rows = results.data;
                    for (var i = 0; i < rows.length; i++) {
                      console.log(rows[i]['username'] + "**" + rows[i]['password'] + "**" + rows[i]['address']);
                      this.setState({
                        name: rows[i]['name'],
                        Username: rows[i]['username'],
                        password: rows[i]['password'],
                        address: rows[i]['address'],
                        designation: rows[i]['designation'],
                        phone: rows[i]['phone'],
                        qualifications: rows[i]['qualification'],
                        department: rows[i]['department'],
                        organization: rows[i]['organization'],
                        ResidentialAddress: rows[i]['residentialAddress'],
                        description: rows[i]['description'],
                        link: rows[i]['link'],
                        workExperience: rows[i]['workExperience'],
                        dob: rows[i]['dob'],
                        gender: rows[i]['gender'],
                        employeeData: this.state.employeeData,

                      })
                      if (this.setDetails()) {
                        count++;
                      }
                    }
                    alert(count + ' Users have been created.');
                  }
                })

              }, (error) => {
                alert('Some error occurred. Please try again.');
              });

          } catch (error) {
            alert('Some error occurred.Please try again.' + error);
          }
        } else {
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
            placeholder={'Firstname Middlename Lastname'}
            placeholderTextColor={styles.input_text_dark.color}
          />

          <Text style={styles.text}>Username*</Text>
          <TextInput
            value={this.state.Username}
            onChangeText={(Username) => this.setState({ Username })}
            label="username"
            style={styles.inputext}
            placeholder={'Enter Username'}
            placeholderTextColor={styles.input_text_dark.color}
          />

          <Text style={styles.text}>Password*</Text>
          <TextInput
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            label="password"
            style={styles.inputext}
            placeholder={'Enter Password (change only if editing)'}
            placeholderTextColor={styles.input_text_dark.color}
            secureTextEntry={true}
          />

          <Text style={styles.text}>Email Address*</Text>
          <TextInput
            value={this.state.address}
            onChangeText={(address) => this.setState({ address })}
            label="address"
            style={styles.inputext}
            placeholder={'Enter e-mail address'}
            placeholderTextColor={styles.input_text_dark.color}
          />

          <Text style={styles.text}>Designation*</Text>
          <TextInput
            value={this.state.designation}
            onChangeText={(designation) => this.setState({ designation })}
            label="designation"
            style={styles.inputext}
            placeholder={'Enter Designation'}
            placeholderTextColor={styles.input_text_dark.color}
          />

          <Text style={styles.text}>Phone Number*</Text>
          <TextInput
            value={this.state.phone}
            onChangeText={(phone) => this.setState({ phone })}
            label="phone"
            style={styles.inputext}
            placeholder={'Enter Phone Number'}
            placeholderTextColor={styles.input_text_dark.color}
          />

          <Text style={styles.text}>Date of Birth*</Text>
          <TextInput
            value={this.state.dob}
            onChangeText={(dob) => this.setState({ dob })}
            label="dob"
            style={styles.inputext}
            placeholder={'Enter DOB (YYYY-MM-DD)'}
            placeholderTextColor={styles.input_text_dark.color}
          />

          <Text style={styles.text}>Gender*</Text>
          <TextInput
            value={this.state.gender}
            onChangeText={(gender) => this.setState({ gender })}
            label="gender"
            style={styles.inputext}
            placeholder={'Enter Gender'}
            placeholderTextColor={styles.input_text_dark.color}
          />


          <Text style={styles.text}>Qualifications*</Text>
          <TextInput
            value={this.state.qualifications}
            onChangeText={(qualifications) => this.setState({ qualifications })}
            label="qualifications"
            style={styles.inputext}
            placeholder={'Enter Qualifications'}
            placeholderTextColor={styles.input_text_dark.color}
          />


          <Text style={styles.text}>Department*</Text>
          <TextInput
            value={this.state.department}
            onChangeText={(department) => this.setState({ department })}
            label="department"
            style={styles.inputext}
            placeholder={'Enter Department'}
            placeholderTextColor={styles.input_text_dark.color}
          />

          <Text style={styles.text}>Status*</Text>
          <TextInput
            value={this.state.status}
            onChangeText={(status) => this.setState({ status })}
            label="status"
            style={styles.inputext}
            placeholder={'Enter Status'}
            placeholderTextColor={styles.input_text_dark.color}
          />


          <Text style={styles.text}>Organization*</Text>
          <TextInput
            value={this.state.organization}
            onChangeText={(organization) => this.setState({ organization })}
            label="organization"
            style={styles.inputext}
            placeholder={'Enter Organization'}
            placeholderTextColor={styles.input_text_dark.color}
          />

          <Text style={styles.text}>Residential Address*</Text>
          <TextInput
            value={this.state.ResidentialAddress}
            onChangeText={(ResidentialAddress) => this.setState({ ResidentialAddress })}
            label="ResidentialAddress"
            style={styles.inputext}
            placeholder={'Enter Residential Address'}
            placeholderTextColor={styles.input_text_dark.color}
          />

          <Text style={styles.text}>Link*</Text>
          <TextInput
            value={this.state.link}
            onChangeText={(link) => this.setState({ link })}
            label="link"
            style={styles.inputext}
            placeholder={'Enter LinkedIn or GitHub link'}
            placeholderTextColor={styles.input_text_dark.color}
          />

          <Text style={styles.text}>Work Experience*</Text>
          <TextInput
            value={this.state.workExperience}
            onChangeText={(workExperience) => this.setState({ workExperience })}
            label="workExperience"
            style={styles.inputext}
            placeholder={'Enter workExperience'}
            placeholderTextColor={styles.input_text_dark.color}
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
            placeholderTextColor={styles.input_text_dark.color}
          />
          <TouchableOpacity onPress={this.onPressSingleUser} >
            <View style={styles.signin}>
              <Text style={{ color: "#ffffff" }}>
                Upload
                </Text>
            </View>
          </TouchableOpacity>

          {this.state.newUser && <TouchableOpacity onPress={this.onPressBulkUser} >
            <View style={styles.signin}>
              <Text style={{ color: "#ffffff" }}>
                Upload Users using CSV
                </Text>
            </View>
          </TouchableOpacity>}
        </ScrollView>
      </View>
    );
  }
}
const styles = require('../stylesheets/newPost');
