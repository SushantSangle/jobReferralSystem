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
      loggedIn: true,
      img: ""
    };

    User.currentAsync().then((user) => {
      if (user != null) {
        ToastAndroid.show("Logged In", ToastAndroid.LONG);
        setTimeout(async()=>{
          this.navigation.navigate("Home");
        },500);
      }else{
        this.state.loggedIn=false;
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
    Config.get().then((result)=>{
      result.get("logo").getData().then((result)=>{
        console.log(result);
        this.renderBackupImg();       
      }).catch((error)=>{
        this.renderBackupImg();
      })
    }).catch((error)=>{
        this.renderBackupImg();
    })
  }
  renderBackupImg(){
    this.setState({
        password : '',
        username : '',
        loggedIn : this.state.loggedIn,
        img : "" 
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
            source={require('../images/snack-icon.png')} 
            style={styles.logoContainer}
        />

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

