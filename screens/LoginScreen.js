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
import { Parse, User, Config, Cloud } from 'parse/react-native';
import Roles from '../utils/RoleManager';

Parse.User.enableUnsafeCurrentUser()
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('job-Referral-System');
Parse.serverURL = 'https://parse.sushant.xyz:1304/';


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
      roleLevel: 4,
    };

    User.currentAsync().then(async (user) => {
      if (user != null) {
        ToastAndroid.show("Logged In", ToastAndroid.LONG);
        roles = await Cloud.run('getRoles');
        Roles.setRole(roles);
        setTimeout(async () => {
          this.navigation.navigate("Home");
        }, 1000);
      } else {
        this.state.loggedIn = false;
        this.state.loading = false;
        this.setState(this.state);
      }
    }, (error) => {
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
    var roles;
    user.then(
      async () => {
        roles = await Cloud.run('getRoles');
        Roles.setRole(roles);
        this.navigation.navigate("Home");
        ToastAndroid.show('Signed In', ToastAndroid.SHORT);
      },
      () => {
        this.state.loggedIn = false;
        this.state.loading = false;
        this.setState(this.state);
        ToastAndroid.show('Login failed', ToastAndroid.SHORT);
        this.state.password = '';
        this.state.username = '';
      },
    ).catch((error) => {
      console.log("Error Loggin IN:" + error);
    });
  };
  componentDidMount() {
    this.setState(this.state);
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../images/snack-icon.png')}
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