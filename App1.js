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
        this.state = {
            loggedIn: false,
            Login: true,
            Home: true,
            User: false,
            Post: false,
            Settings: false,
            Refresh: false
        }
    }
    componentDidMount(){
        if (RoleManager.getLevel() === 0) {
            this.state.loggedIn = true;
            this.state.Login = false;
            this.state.Home = true;
            this.state.User = true;
            this.state.Post = true;
            this.state.Settings = true;
            this.state.Refresh = true;
        }
        if (RoleManager.getLevel() === 1) {
            this.state.loggedIn = true;
            this.state.Login = false;
            this.state.Home = true;
            this.state.User = false;
            this.state.Post = true;
            this.state.Settings = true;
            this.state.Refresh = true;
        }
        if (RoleManager.getLevel() >= 2) {
            this.state.loggedIn = true;
            this.state.Login = false;
            this.state.Home = true;
            this.state.User = false;
            this.state.Post = false;
            this.state.Settings = true;
            this.state.Refresh = true;
        }
        this.setState(this.state);
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
                            {this.state.Home && <Drawer.Screen name="Home" component={HomeStack} />}
                            {this.state.User && <Drawer.Screen name="User" component={UserStack} />}
                            {this.state.Post && <Drawer.Screen name="Post" component={PostStack} />}
                            {this.state.Settings && <Drawer.Screen name="Settings" component={SettingsStack} />}
                        </Drawer.Navigator>
                    </NavigationContainer>
                </SafeAreaView>
            </>
        );

    }
}
