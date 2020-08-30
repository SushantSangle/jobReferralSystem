import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, ScrollView, View, Image } from 'react-native';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeStack from './homeStack';
import AboutStack from './aboutStack';
import userManagementStack from './userManagementStack';
import postManagementStack from './postManagementStack';
import SettingsStack from './SettingsStack';

const CustomDrawerComponent = props => (
    <SafeAreaView style={{ flex: 1 }}>
        <View style={{ height: 150, backgroundColor: 'white' }}>
            <Image
                source={require('../images/snack-icon.png')}
                style={{
                    height: undefined,
                    width: undefined,
                    flex: 1,
                    resizeMode: 'contain',
                }}
            />
        </View>
        <ScrollView>
            <DrawerItems {...props} />
        </ScrollView>
    </SafeAreaView>
);

const user_level = 1;

const hide = () => {
    if (user_level == 1) {
        return screens;
    }
    else {
        return screens1;
    }
}

const screens = {
    Home: {
        screen: HomeStack,
        navigationOptions: {
            drawerIcon: (
                <Icon name="home" size={20} />
            )
        }
    },
    'User Management': {
        screen: userManagementStack,
        navigationOptions: {
            drawerIcon: (
                <Icon name="person" size={20} />
            )
        }
    },
    'Post Management': {
        screen: postManagementStack,
        navigationOptions: {
            drawerIcon: (
                <Icon name="newspaper" size={20} />
            )
        }
    },
    About: {
        screen: AboutStack,
        navigationOptions: {
            drawerIcon: (
                <Icon name="information-circle-outline" size={20} />
            )
        }
    },
    Settings: {
        screen: SettingsStack,
        navigationOptions: {
            drawerIcon: (
                <Icon name="settings" size={20} />
            )
        }
    }
}

const screens1 = {
    Home: {
        screen: HomeStack,
        navigationOptions: {
            drawerIcon: (
                <Icon name="home" size={20} />
            )
        }
    }
}

const RootDrawerNavigator = createDrawerNavigator(hide(), {
    contentComponent: CustomDrawerComponent
});

export default createAppContainer(RootDrawerNavigator);
