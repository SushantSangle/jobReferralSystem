import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';
import Navigator from './routes/drawer';

export default class App extends Component {
  render() {
    return (
      <>
        <Navigator />
      </>
    );
  }
};

const styles = StyleSheet.create({
});

