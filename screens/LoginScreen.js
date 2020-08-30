import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  AsyncStorage,
  ToastAndroid,
} from 'react-native';
<<<<<<< HEAD
import { Parse, User,Config } from 'parse/react-native';
Parse.User.enableUnsafeCurrentUser()
=======
import PropTypes from 'prop-types';
import { Parse, User } from 'parse/react-native';
>>>>>>> 8366da6701953cb94ca34b11d23c229f8caea081
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('job-Referral-System');
Parse.serverURL = 'https://parse.sushant.xyz:1304/';

export default class LoginScreen extends Component {

  constructor(props) {
    super(props);
<<<<<<< HEAD

    this.navigation = this.props.navigation;
=======
    this.navigation = this.props.navigation;

>>>>>>> 8366da6701953cb94ca34b11d23c229f8caea081
    this.state = {
      username: '',
      password: '',
      loggedIn: false
    };
<<<<<<< HEAD

    this.checkLoggedIn = () => {
      if (loggedIn) {
        ToastAndroid("Logged In",ToastAndroid.SHORT);
        this.navigation.navigate("Home");
      }
    }
=======
>>>>>>> 8366da6701953cb94ca34b11d23c229f8caea081

    User.currentAsync().then((user) => {
      if (user != null) {
        ToastAndroid.show("Logged In", ToastAndroid.LONG);
<<<<<<< HEAD
        this.navigation.navigate("Home");
=======
>>>>>>> 8366da6701953cb94ca34b11d23c229f8caea081
      }
    }, (error) => {
      console.log("Error with logging in" + error);
    });
    Config.get().then((config)=>{
      console.log("\nAccent_color:"+config.get("accent_color"));
      config.get("logo").getData().then((data)=>{
        console.log("data:"+data);
      }).catch((error)=>{
        console.log("ERROR with file:"+error);
      })
    })
  }
  onPress = () => {
    const user = User.logIn(this.state.username, this.state.password);

    user.then(
      () => {
        this.navigation.navigate("Home");
        alert('Signed In');
      },
      () => {
        ToastAndroid.show('Login failed', ToastAndroid.SHORT);
        this.state.password = '';
        this.state.username = '';
      },
    ).catch((error)=>{
      console.log("Error Loggin IN:"+error);
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../images/snack-icon.png')}
          style={styles.logoContainer}
        />

        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          label="Username"
          style={styles.inputext}
          placeholder={'Username'}
        />

        <TextInput
          placeholder={'Password'}
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          label="Password"
          secureTextEntry={true}
          style={styles.inputext}
        />

        <TouchableOpacity onPress={this.onPress}>
          <View style={styles.signin}>
            <Text style={{ color: '#ffffff' }}>Sign In</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = require('../stylesheets/loginScreen');

