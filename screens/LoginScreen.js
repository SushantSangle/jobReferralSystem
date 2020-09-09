import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import { Parse, User } from 'parse/react-native';
import RoleManager from '../utils/RoleManager';
import AsyncStorage from '@react-native-community/async-storage';
import ConfigLoader from '../utils/ConfigLoader';

Parse.User.enableUnsafeCurrentUser()
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('job-Referral-System');
Parse.serverURL = 'https://parse.sushant.xyz:1304/parse';


export default class LoginScreen extends Component {

  constructor(props) {
    User.logOut();
    super(props);
    this.navigation = this.props.navigation;
    this.state = {
      username: '',
      password: '',
      loggedIn: true,
      img: "",
      loading: true,
      roleLevel : 3,
    };

    User.currentAsync().then(async(user) => {
      try{
        this.state.img=await ConfigLoader.getLogoFromAsync();
        this.setState(this.state);
      }catch(error){
        console.log("NO LOGO FOUND ERROR:"+error);
      }
      if (user != null) {
        ToastAndroid.show("Logged In", ToastAndroid.LONG);
        this.roleLevel = await RoleManager.setRole();
        setTimeout(async()=>{
          this.navigation.navigate("Home");
        },300);
      }else{
        this.state.loggedIn=false;
        this.state.loading=false;
        this.setState(this.state);
      }
    }).catch((error) => {
      console.log("Error with logging in" + error);
      this.state.loggedIn = false;
      this.state.loading = false;
      this.setState(this.state);
    });
  }
  onPress = () => {
    const user = User.logIn(this.state.username, this.state.password);
    this.state.loggedIn = true;
    this.state.loading = true;
    this.setState(this.state);
    user.then(
      async() => {
        this.roleLevel = await RoleManager.setRole();
        this.navigation.navigate("Home");
        ToastAndroid.show('Signed In', ToastAndroid.SHORT);
      },
      async() => {
        this.state.loggedIn=false;
        this.state.loading=false;
        this.setState(this.state);
        ToastAndroid.show('Login failed', ToastAndroid.SHORT);
        this.state.password = '';
        this.state.username = '';
      }
    ).catch((error)=>{
      console.log("Error Loggin IN:"+error);
    });
  };
  componentDidMount() {
    this.setState(this.state);
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
            source= {{uri: `data:${this.state.img.mime};base64,${this.state.img.data}`}}
            style={styles.logoContainer}
        />
        {this.state.loading && <ActivityIndicator
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