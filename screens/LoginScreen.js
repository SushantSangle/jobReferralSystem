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
import { Parse, User,Config } from 'parse/react-native';
Parse.User.enableUnsafeCurrentUser()
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('job-Referral-System');
Parse.serverURL = 'https://parse.sushant.xyz:1304/';

export default class LoginScreen extends Component {

  constructor(props) {
    super(props);

    this.navigation = this.props.navigation;
    this.state = {
      username: '',
      password: '',
      loggedIn: false
    };

    this.checkLoggedIn = () => {
      if (loggedIn) {
        ToastAndroid("Logged In",ToastAndroid.SHORT);
        this.navigation.navigate("Home");
      }
    }

    User.currentAsync().then((user) => {
      if (user != null) {
        ToastAndroid.show("Logged In", ToastAndroid.LONG);
        this.navigation.navigate("Home");
      }
    }, (error) => {
      this.setVisibility(true);
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

