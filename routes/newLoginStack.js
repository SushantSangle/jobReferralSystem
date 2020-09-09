import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import App1 from '../App1';
import { NavigationContainer } from '@react-navigation/native';

const LStack = createStackNavigator();
const LoginStack = () => {
    return (
        <NavigationContainer>
            <LStack.Navigator>
                <LStack.Screen name="LoginScreen" component={LoginScreen} />
                <LStack.Screen name="App1" component={App1} />
            </LStack.Navigator>
        </NavigationContainer>

    );
}

export default LoginStack;