import * as React from 'react';
import { Button, View, Text, SafeAreaView,Image } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeStack from './routes/newHomeStack';
import UserStack from './routes/newUserManage';
import PostStack from './routes/newPostManage';
import SettingsStack from './routes/newSettingsStack';
import LoginScreen from './screens/LoginScreen';
import RoleManager from './utils/RoleManager';

const Drawer = createDrawerNavigator();
export default class App1 extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        console.log("ROLEMANAER in render:" + RoleManager.getLevel())
        console.log(this.state)

        return (
            <>
                <SafeAreaView style={{ height: '100%' }}>
                    <NavigationContainer theme={RoleManager.get_dark() ? DarkTheme : DefaultTheme}>
                        {console.log("In Navigation Container:", RoleManager.get_dark())}
                        <Drawer.Navigator>
                            <Drawer.Screen name="Home" component={HomeStack} />
                            {RoleManager.getLevel()<2 && <Drawer.Screen name="User" component={UserStack} />}
                            <Drawer.Screen name="Settings" component={SettingsStack} />
                        </Drawer.Navigator>
                    </NavigationContainer>
                </SafeAreaView>
            </>
        );

    }
}
