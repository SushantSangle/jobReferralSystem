import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, ScrollView, View, Image } from 'react-native';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import App1 from '../App1'

const screens1 = {
    Home: {
        screen: App1,
    }
}

const RootDrawerNavigator = createDrawerNavigator(screens1);

const RootNavigation = createSwitchNavigator({
    Auth: { screen: LoginScreen, navigationOptions: { header: null } },
    App: RootDrawerNavigator
}, {
    initialRouteName: 'Auth'
})

export default createAppContainer(RootNavigation);
