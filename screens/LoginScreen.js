import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  AsyncStorage,
  ToastAndroid,
  ActivityIndicator,
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
      loggedIn: true,
      img: ""
    };

    User.currentAsync().then((user) => {
      if (user != null) {
        ToastAndroid.show("Logged In", ToastAndroid.LONG);
        setTimeout(async()=>{
          this.navigation.navigate("Home");
        },1000);
      }else{
        this.state.loggedIn=false;
        this.setState(this.state);
      }
    }, (error) => {
      console.log("Error with logging in" + error);
      this.state.loggedIn=false;
    });
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
  componentDidMount(){
    this.setState(this.state);
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
            source={require('../images/snack-icon.png')} 
            style={styles.logoContainer}
        />
        {this.state.loggedIn && <ActivityIndicator 
          size='large'
          color='#69a74e'
          />
        }
        {!this.state.loggedIn && <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          label="Username"
          style={styles.inputext}
          placeholder={'Username'}
        />}

        {!this.state.loggedIn && <TextInput
          placeholder={'Password'}
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          label="Password"
          secureTextEntry={true}
          style={styles.inputext}
        />}

        {!this.state.loggedIn && <TouchableOpacity onPress={this.onPress}>
          <View style={styles.signin}>
            <Text style={{ color: '#ffffff' }}>Sign In</Text>
          </View>
        </TouchableOpacity>
        }
      </View>
    );
  }
}

const styles = require('../stylesheets/loginScreen');

