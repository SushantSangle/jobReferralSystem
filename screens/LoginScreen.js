import React, { Component } from 'react';
import {
  Text,
  Alert,
  Button,
  View,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default class LoginScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  onPress = () => {
    alert("Signed In");
  }

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

        <TouchableOpacity onPress={this.onPress} >
          <View style={styles.signin}>
            <Text style={{ color: "#ffffff" }}>
              Sign In
            </Text>
          </View>
        </TouchableOpacity>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginBottom: 30,
  },

  logoContainer: {
    width: 100,
    height: 100,
    resizeMode: 'stretch',
    borderRadius: 30,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  inputext: {
    width: '80%',
    height: 44,
    padding: 10,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    marginBottom: 20,
    marginHorizontal: 20,
    borderRadius: 20,
  },
signin: { 
  borderRadius: 20, 
  backgroundColor: "#3ab795", 
  height: 40, width: 150, 
  justifyContent: "center", 
  alignItems: "center" },
});