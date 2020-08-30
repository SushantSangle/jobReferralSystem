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

const PRIMARY_THEME = {
  name: 'dark',

  primary_background: '#222629',
  secondary_background: '#474B4F',
  accent: '#6B6E70',

  headings: '#86C232',
  description: '#61892F',
  text: '#333333',

  dark_green: '#61892F',
  light_green: '#86C232',
  light_blue: '#9CB4D8',
  dark_blue: '#29487D',
  gray: '#606770',
  black: '#000000'
}

const DARK_THEME = {
  name: 'light',

  primaryBackground: '#EEE2DC',
  secondaryBackground: '#EDC7B7',
  accent: '#BAB2B5',

  headings: '#AC3B61',
  description: '#123C69',
  text: '#333333',


  dark_green: '#61892F',
  light_green: '#86C232',
  light_blue: '#9CB4D8',
  dark_blue: '#29487D',
  gray: '#606770',
  black: '#000000'
}

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

