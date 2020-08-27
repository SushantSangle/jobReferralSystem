import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  AsyncStorage,
  ToastAndroid,
} from 'react-native';
import {Parse, User} from 'parse/react-native';
Parse.User.enableUnsafeCurrentUser()
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('job-Referral-System');
Parse.serverURL = 'https://parse.sushant.xyz:1304/';

export default class LoginScreen extends Component {
  setVisibility(VISIBILITY){
    this.setState={
      loggedIn: !VISIBILITY
    }
  }
  constructor(props) {
    User.logOut();
    super(props);
    this.state = {
      username: '',
      password: '',
      loggedIn: false
    };
    User.currentAsync().then((user)=>{
      if(user!=null){
        ToastAndroid.show("Logged In",ToastAndroid.LONG);
        this.setVisibility(false);
        //redirect from here
      }else{
        this.setVisibility(true);
      }
    },(error)=>{
      this.setVisibility(true);
      console.log("Error with logging in"+error);
    });
  }
  onPress = () => {
    const user = User.logIn(this.state.username, this.state.password);

    user.then(
      () => {
        alert('Signed In');
      },
      () => {
        ToastAndroid.show('Login failed', ToastAndroid.SHORT);
        this.state.password = '';
        this.state.username = '';
      },
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../images/snack-icon.png')}
          style={styles.logoContainer}
        />
        {!this.state.loggedIn && <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({username})}
          label="Username"
          style={styles.inputext}
          placeholder={'Username'}
        />}

        {!this.state.loggedIn && <TextInput
          placeholder={'Password'}
          value={this.state.password}
          onChangeText={(password) => this.setState({password})}
          label="Password"
          secureTextEntry={true}
          style={styles.inputext}
        />}
        {!this.state.loggedIn && <TouchableOpacity onPress={this.onPress}>
              <View style={styles.signin}>
                <Text style={{color: '#ffffff'}}>Sign In</Text>
              </View>
            </TouchableOpacity>
        }
         
      </View>
    );
  }
}

const styles = require('../stylesheets/loginScreen');

