import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { Parse, User } from 'parse/react-native';
import RoleManager from '../utils/RoleManager';
import AsyncStorage from '@react-native-community/async-storage';
import ConfigLoader from '../utils/ConfigLoader';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeStack from '../routes/newHomeStack';
import UserStack from '../routes/newUserManage';
import SettingsStack from '../routes/newSettingsStack';


Parse.User.enableUnsafeCurrentUser()
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('job-Referral-System');
Parse.serverURL = 'https://parse.sushant.xyz:1304/parse';

const Drawer = createDrawerNavigator();
export default class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.state = {
      username: '',
      password: '',
      loggedIn: true,
      img: "",
      loading: true,
      roleLevel: 3,
      Lock:false,
    };

    User.currentAsync().then(async (user) => {
      try {
        this.state.img = await ConfigLoader.getLogoFromAsync();
        this.setState(this.state);
      } catch (error) {
        console.log("NO LOGO FOUND ERROR:" + error);
      }
      if (user != null) {
        ToastAndroid.show("Logged In", ToastAndroid.LONG);
        this.roleLevel = await RoleManager.setRole();
        if(this.roleLevel==100){
          this.state.loggedIn = false;
          this.state.loading = false;
          this.setState(this.state);
        }else{
          setTimeout(async () => {
            this.state.lock=true;
            this.setState(this.state);
          }, 300);
        }
      } else {
        this.state.loggedIn = false;
        this.state.loading = false;
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
      async () => {
        this.roleLevel = await RoleManager.setRole();
        this.state.lock=true;
        this.setState(this.state);
        ToastAndroid.show('Signed In', ToastAndroid.SHORT);
      },
      async () => {
        this.state.loggedIn = false;
        this.state.loading = false;
        this.setState(this.state);
        ToastAndroid.show('Login failed', ToastAndroid.SHORT);
        this.state.password = '';
        this.state.username = '';
      }
    ).catch((error) => {
      console.log("Error Loggin IN:" + error);
    });
  };
  componentDidMount() {
    this.setState(this.state);
  }
  render() {
    return (
      <>
        {!this.state.lock && <View style={styles.container}>
          <Image
            source={{ uri: `data:${this.state.img.mime};base64,${this.state.img.data}` }}
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
        </View>}
        {this.state.lock && <SafeAreaView style={{ height: '100%' }}>
          <NavigationContainer theme={RoleManager.get_dark() ? DarkTheme : DefaultTheme}>
              {console.log("In Navigation Container:", RoleManager.get_dark())}
              <Drawer.Navigator>
                  <Drawer.Screen name="Home" component={HomeStack} />
                  {RoleManager.getLevel()<2 && <Drawer.Screen name="User" component={UserStack} />}
                  <Drawer.Screen name="Settings" component={SettingsStack} />
              </Drawer.Navigator>
          </NavigationContainer>
        </SafeAreaView>}
      </>
    );
  }
}

const styles = require('../stylesheets/loginScreen');