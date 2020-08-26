/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Home from './screens/LoginScreen'
import Navigator from './routes/LoginStack'

export default function App(){
  return(
    <Navigator />
  );
}
